import React from 'react';
import {View} from 'react-native';
import {theme} from '../../../utils/theme';

interface DividerProps {
  height?: number;
  width?: number;
  color?: string;
  margin?: number;
  padding?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}

const Divider: React.FC<DividerProps> = props => {
  return (
    <View
      style={{
        height: props.height ?? 3,
        backgroundColor: props.color ?? theme.colors.border,
        width: props.width ?? '100%',
        marginHorizontal: props.marginHorizontal ?? 0,
        marginVertical: props.marginVertical ?? 0,
        margin: props.margin ?? 0,
        padding: props.padding ?? 0,
      }}
    />
  );
};

export default Divider;
