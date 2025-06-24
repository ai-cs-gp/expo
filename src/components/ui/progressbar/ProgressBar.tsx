import React from 'react';

import { View } from '@/components';

export type ProgressBarProps = {
  current: number;
  total: number;
  backgroundColor?: string;
  progressColor?: string;
};

export const ProgressBar = ({
  current,
  total,
  backgroundColor = 'bg-gray-200',
  progressColor = 'bg-primary',
}: ProgressBarProps) => {
  const progress = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <View className={`h-2 ${backgroundColor} rounded-full overflow-hidden`}>
      <View className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }} />
    </View>
  );
};
