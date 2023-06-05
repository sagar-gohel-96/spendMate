import {IconList} from '../../../assets/Icon/icon';
import {theme} from '../../../utils/theme';

export const getIconStyle = (
  name: IconList,
): {backgroundColor: string; color: string} => {
  if (IconList[name] === IconList.Clothing) {
    return {
      backgroundColor: '#dee2e6',
      color: '#495057',
    };
  }
  if (IconList[name] === IconList.Education) {
    return {backgroundColor: '#a9d6e5', color: '#01497c'};
  }
  if (IconList[name] === IconList.Entertainment) {
    return {backgroundColor: theme.colors.btn, color: theme.colors.navbar};
  }
  if (IconList[name] === IconList.Food) {
    return {backgroundColor: theme.icon[100], color: theme.icon[200]};
  }
  if (IconList[name] === IconList.GiftsDonation) {
    return {backgroundColor: theme.colors.pink, color: theme.colors.white};
  }
  if (IconList[name] === IconList.Health) {
    return {backgroundColor: '#edf2fb', color: '#abc4ff'};
  }
  if (IconList[name] === IconList.Housing) {
    return {backgroundColor: '#dac3e8', color: '#6247aa'};
  }
  if (IconList[name] === IconList.Transportation) {
    return {backgroundColor: '#d0efb1', color: '#415d43'};
  }
  if (IconList[name] === IconList.PersonalCare) {
    return {backgroundColor: '#d0efb1', color: '#3f3f3f'};
  }
  return {backgroundColor: 'black', color: 'red'};
};
