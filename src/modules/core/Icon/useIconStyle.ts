import {IconList} from '../../../../assets/Icon/icon';
import {theme} from '../../../utils/theme';

export const getIconStyle = (
  name: IconList,
): {backgroundColor: string; color: string} => {
  if (name === IconList.Clothing) {
    return {
      backgroundColor: '#dee2e6',
      color: '#495057',
    };
  }
  if (name === IconList.Education) {
    return {backgroundColor: '#a9d6e5', color: '#01497c'};
  }
  if (name === IconList.Entertainment) {
    return {backgroundColor: theme.colors.btn, color: theme.colors.navbar};
  }
  if (name === IconList.Food) {
    return {backgroundColor: theme.icon[100], color: theme.icon[200]};
  }
  if (name === IconList.GiftsDonation) {
    return {backgroundColor: theme.colors.pink, color: theme.colors.white};
  }
  if (name === IconList.Health) {
    return {backgroundColor: '#edf2fb', color: '#abc4ff'};
  }
  if (name === IconList.Housing) {
    return {backgroundColor: '#dac3e8', color: '#6247aa'};
  }
  if (name === IconList.Transportation) {
    return {backgroundColor: '#d0efb1', color: '#415d43'};
  }
  return {backgroundColor: 'black', color: 'gray'};
};
