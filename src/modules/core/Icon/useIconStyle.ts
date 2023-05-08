import {IconList} from '../../../../assets/Icon/icon';

export const useIconStyle = (name: IconList) => {
  if (name === IconList.Clothing) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.Education) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.Entertainment) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.Food) {
    return {backgroundColor: 'red', color: 'yellow'};
  }
  if (name === IconList.GiftsDonation) {
    return {backgroundColor: 'red', color: 'yellow'};
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
  return {backgroungColor: 'black', color: 'gray'};
};
