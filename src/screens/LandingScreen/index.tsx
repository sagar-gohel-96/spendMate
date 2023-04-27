import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {logo, landing} from '../../../assets/Image';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
// import {useNavigation} from '@react-navigation/native';

const LandingScreen = () => {
  // const navigation = useNavigation<any>();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('MainScreen');
  //   }, 2000);
  // }, [navigation]);

  return (
    <View style={navbarStyle.root}>
      <View style={navbarStyle.logo}>
        <Image source={logo} style={navbarStyle.image} />
        <Text style={navbarStyle.logotext}>SpendMate</Text>
      </View>
      <Image source={landing} style={navbarStyle.landingImg} />
      <Text style={navbarStyle.goal}>
        " Track every penny and take control of your finances with
        <Text style={{color: colors.PENDING}}> SpendMate</Text> "
      </Text>
    </View>
  );
};

export default LandingScreen;

const navbarStyle = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    height: '100%',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    elevation: 2,
  },
  logotext: {
    fontFamily: fonts.NoyhSlimBold,
    fontSize: 28,
    color: theme.text.secondary,
  },
  text: {
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.TEXT,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  navbar: {
    display: 'flex',
  },
  slogn: {
    padding: 20,
  },
  goal: {
    padding: 12,
    fontSize: 30,
    color: colors.TEXT,
    fontWeight: 'bold',
  },
  landingImg: {
    height: '50%',
    width: '100%',
  },
});
