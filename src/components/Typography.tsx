import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native/types';

export interface TypographyProps {
  title: string;
  wrap?: string;
}

const Typography = (props: TypographyProps) => {
  const {title} = props;
  return <Text style={typographyStyle.variant}>{title}</Text>;
};

const typographyStyle = StyleSheet.create({
  variant: {
    fontSize: 16,
  },
});
export default Typography;
