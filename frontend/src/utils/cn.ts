import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const cn = (...classes: (string | false | undefined | null)[]) => {
  return twMerge(clsx(...classes));
};
