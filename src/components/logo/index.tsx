import React from 'react';
import {Text} from 'react-native';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {logo} from '../../assets/Image';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';

const Logo = () => {
  return (
    <View style={logoStyle.root}>
      <Image source={logo} style={logoStyle.image} />
      <Text style={logoStyle.logotext}>SpendMate</Text>
    </View>
  );
};

export default Logo;
const logoStyle = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: 30, width: 30},
  logotext: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 19,
    color: theme.text.header,
  },
});
