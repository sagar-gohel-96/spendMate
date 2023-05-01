import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconSize, useIconSize} from './useIconSize';
import {useSize} from './useSize';

interface IconProps {
  name: string;
  size?: IconSize;
  color?: string;
  backgroundColor?: string;
}

const Icon: React.FC<IconProps> = props => {
  const {container} = iconStyle;
  const iconSize = useIconSize(props.size ?? 'md');
  const size = useSize(props.size ?? 'md');

  return (
    <View style={[container, size, {backgroundColor: props.backgroundColor}]}>
      <VIcon {...props} size={iconSize} name={props.name} />
    </View>
  );
};

export default Icon;

const iconStyle = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
