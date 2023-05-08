import {IconList} from '../../../../assets/Icon/icon';
import {theme} from '../../../utils/theme';

export const getIconStyle = (
  name: IconList,
): {backgroundColor: string; color: string} => {
  if (name === IconList.Clothing) {
    return {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
    };
  }
  if (name === IconList.Education) {
    return {backgroundColor: theme.colors.button, color: theme.colors.pending};
  }
  if (name === IconList.Entertainment) {
    return {backgroundColor: theme.colors.btn, color: theme.colors.navbar};
  }
  if (name === IconList.Food) {
    return {backgroundColor: theme.icon[100], color: theme.icon[200]};
  }
  if (name === IconList.GiftsDonation) {
    return {backgroundColor: theme.colors.color, color: theme.colors.primary};
  }
  if (name === IconList.Health) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.Housing) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.Transportation) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  return {backgroundColor: 'black', color: 'gray'};
};
