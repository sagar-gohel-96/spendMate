import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts';

const HomeScreen = () => {
  return <Text style={textStyle.textField}>HomeScreen</Text>;
};

export default HomeScreen;

const textStyle: any = StyleSheet.create({
  textField: {
    fontFamily: fonts.NoyhSlimBlackItalic,
    textAlign: 'center',
    fontSize: 20,
  },
});
