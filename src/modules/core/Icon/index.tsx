import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconSize, useIconSize} from './useIconSize';
import {useSize} from './useSize';
import {IconList} from '../../../../assets/Icon/icon';
import {useIconStyle} from './useIconStyle';

interface IconProps {
  name: IconList;
  size?: IconSize;
  color?: string;
  backgroundColor?: string;
}

const Icon: React.FC<IconProps> = props => {
  const {container} = iconStyle;
  const iconSize = useIconSize(props.size ?? 'md');
  const size = useSize(props.size ?? 'md');
  const styles = useIconStyle(props.name);

  return (
    <View
      style={[
        container,
        size,
        styles,
        {backgroundColor: props.backgroundColor},
      ]}>
      <VIcon {...props} size={iconSize} name={props.name} />
    </View>
  );
};

export default Icon;

const iconStyle = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
