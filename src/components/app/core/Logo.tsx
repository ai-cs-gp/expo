import React from 'react';
import { Image, ImageProps } from 'expo-image';

const LOGO_SOURCE = {
  default: require('@/assets/images/logo.png'),
};

type Props = {
  className?: string;
  source?: ImageProps['source'];
  width?: number;
  height?: number;
} & ImageProps;

export const Logo = ({ className, source, width, height, ...props }: Props) => {
  return <Image source={source || LOGO_SOURCE.default} className={className} style={{ width, height }} {...props} />;
};
