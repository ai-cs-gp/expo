import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export const clx = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};
