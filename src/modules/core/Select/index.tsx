import React, {Dispatch, SetStateAction} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {fonts} from '../../../utils/fonts';
import {theme} from '../../../utils/theme';

export type value = {label: string; value: string};

interface SelectProps {
  selectedValue: string;
  data: value[];
  setSelectedValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<TextStyle>;
}
const Select: React.FC<SelectProps> = props => {
  const {data, selectedValue, setSelectedValue, style} = props;
  return (
    <View style={[style, pickerStyle.container]}>
      <Picker
        selectedValue={selectedValue}
        itemStyle={{fontFamily: fonts.CarosSoft, fontSize: 10}}
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {data.map((i, index) => (
          <Picker.Item label={i.label} value={i.value} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export default Select;
const pickerStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blue,
    padding: 0,
  },
});
