import React from 'react';
import {View} from 'react-native';

interface DividerProps {
  height: number;
  width: number;
  color: string;
}

const Divider: React.FC<DividerProps> = props => {
  return (
    <View
      style={{
        height: props.height,
        backgroundColor: props.color,
        width: props.width,
      }}
    />
  );
};

export default Divider;
