import React, {Dispatch, SetStateAction} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Text} from 'react-native';

export type value = {label: string; value: string};

interface SelectProps {
  selectedValue: string;
  data: value[];
  setSelectedValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<TextStyle>;
}
const Select: React.FC<SelectProps> = props => {
  const {} = props;
  return <Text>add</Text>;
};

export default Select;
