import {IconSize} from './useIconSize';

export const useSize = (size: IconSize) => {
  if (size === 'sm') {
    return {height: 32, width: 32};
  }
  if (size === 'lg') {
    return {height: 52, width: 52};
  }
  if (size === 'md') {
    return {height: 42, width: 42};
  }
};
