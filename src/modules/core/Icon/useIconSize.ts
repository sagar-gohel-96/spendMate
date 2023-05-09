export const useIconSize = (size: IconSize) => {
  if (size === 'sm') {
    return 28;
  }
  if (size === 'lg') {
    return 36;
  }
  if (size === 'md') {
    return 32;
  }
};

export type IconSize = 'sm' | 'md' | 'lg';
