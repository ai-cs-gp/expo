import React from 'react';
import { View, ViewProps } from 'react-native';

import { clx } from '@/utils';

const TEST = false;

type Props = {
  height?: number;
  width?: number;
} & ViewProps;

export const Spacer = ({ height, width, ...props }: Props) => {
  return <View style={{ height, width }} className={clx(TEST && 'bg-red-500')} {...props} />; // that comment is to test the taken space of the spacer
};
