'use client';

import React from 'react';
import { ApolloClient, ApolloProvider as ApolloProviderClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

import { mmkStorage } from '@/lib';
import {
  deviceBrand,
  deviceManufacturer,
  deviceModelName,
  deviceOsName,
  deviceOsVersion,
  deviceTypeAsync,
  deviceUidAsync,
} from '@/utils';

const cache = new InMemoryCache();

let deviceUid: string, deviceType: string;
(async () => {
  const list = await Promise.all([deviceUidAsync(), deviceTypeAsync()]);
  deviceUid = list[0];
  deviceType = list[1];
})();

export const replaceHost = (url?: string) => (__DEV__ ? url?.replace('http://localhost:3000', API_HOST) : url);

const API_PORT = 3000;
export const API_HOST = {
  mostafa_pc: `http://192.168.1.100:${API_PORT}`,
  mostafa_mac: `http://192.168.2.127:${API_PORT}`,
  mostafa_local: `http://192.168.194.246:${API_PORT}`,
  production: 'https://benzcare-api-t6xut.ondigitalocean.app',
}[__DEV__ ? 'mostafa_pc' : 'production'];

const DEBUG = false;
const API_URI = `${API_HOST}/graphql`;

const httpLink = new HttpLink({
  uri: API_URI,
  credentials: 'include',
  fetch: (...pl) => {
    if (DEBUG) {
      const [_, options] = pl;
      const body = JSON.parse(options?.body as string);
      console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables);
    }
    return fetch(...pl);
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
});

const authLink = setContext((_, { headers: currentHeaders }) => {
  const token = mmkStorage.getString('token');
  const currentLocale = mmkStorage.getString('currentLocale');
  const location = {
    latitude: mmkStorage.getString('location.latitude'),
    longitude: mmkStorage.getString('location.longitude'),
  };

  const headers = {
    ...currentHeaders,
    Authorization: token ? `Bearer ${token}` : '',
    'Current-Locale': currentLocale,
    'Client-Device-UID': deviceUid,
    'Client-Device-Brand': deviceBrand,
    'Client-Device-Type': deviceType,
    'Client-Device-Manufacturer': deviceManufacturer,
    'Client-Device-Model-Name': deviceModelName,
    'Client-Device-OS-Name': deviceOsName,
    'Client-Device-OS-Version': deviceOsVersion,
    'Client-Device-Location': `${location.latitude},${location.longitude}`,
  };

  // console.log('authLink headers', headers);

  return { headers };
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProviderClient client={apolloClient}>{children}</ApolloProviderClient>;
};

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink, errorLink, retryLink]),
  cache,
});
