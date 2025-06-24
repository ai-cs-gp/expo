import { MMKV } from 'react-native-mmkv';

import app from '../../../app.json';

export const mmkStorage = new MMKV({
  id: app.expo.android.package,
  // path: `${USER_DIRECTORY}/storage`,
  encryptionKey: 'benzcare-c7b14b74c7d56a00dab417ff42',
});

mmkStorage.addOnValueChangedListener((key: string) => {
  if (key.startsWith('location.')) return;
  console.log('--------------------------------');
  console.log('mmkStorage key changed:', key, mmkStorage.getString(key));
  console.log('--------------------------------');
});

const DEFAULT_VALUES = {};

Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
  if (!mmkStorage.contains(key)) mmkStorage.set(key, String(value));
});
