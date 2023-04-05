import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native/types';

export interface TypographyProps {
  title: string;
  margin?: number;
  marginX?: number;
  marginY?: number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  variant: string;
  wrap?: string;
}

const Typography = (props: TypographyProps) => {
  const {title, margin, marginX, marginY, padding} = props;
  return (
    <Text style={{fontSize: typographyStyle.variant.fontSize}}>{title}</Text>
  );
};

const typographyStyle = StyleSheet.create({
  variant: {
    fontSize: 16,
  },
});
export default Typography;
