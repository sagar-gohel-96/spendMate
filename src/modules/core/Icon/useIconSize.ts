export const useIconSize = (size: IconSize) => {
  if (size === 'sm') {
    return 22;
  }
  if (size === 'lg') {
    return 32;
  }
  if (size === 'md') {
    return 28;
  }
};

export type IconSize = 'sm' | 'md' | 'lg';
