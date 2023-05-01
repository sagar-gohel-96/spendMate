import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {landing} from '../../../assets/Image';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../components/logo';
import {Icon} from '../../modules/core';

const LandingScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainScreen');
    }, 2000);
  }, [navigation]);

  return (
    <View style={landingScreenStyle.container}>
      <View style={landingScreenStyle.logoContainer}>
        <Logo />
      </View>
      <View style={landingScreenStyle.sectionTwo}>
        <View style={landingScreenStyle.background} />
        <View style={landingScreenStyle.nextContainer}>
          <View style={landingScreenStyle.nextButton}>
            <Icon name="chevron-right" color="white" />
          </View>
        </View>
        <Image source={landing} style={landingScreenStyle.landingImg} />
        <Text style={landingScreenStyle.goal}>
          Track every penny and take control of your finances with us.
        </Text>
        <Text style={landingScreenStyle.description}>
          Spend smarter, save better, and achieve your financial goals with
          SpendMate.
        </Text>
        <View style={landingScreenStyle.dotContainer}>
          {[...Array(3).keys()].map(i => {
            return <View style={landingScreenStyle.bottomDot} key={i} />;
          })}
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

const landingScreenStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 15,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.button,
  },
  navbar: {
    display: 'flex',
  },
  goal: {
    fontSize: 22,
    color: theme.text.secondary,
    textAlign: 'center',
    fontFamily: fonts.CarosSoftHeavy,
    marginHorizontal: 20,
    marginTop: 10,
  },
  landingImg: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  description: {
    color: theme.colors.gray,
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25,
    marginHorizontal: 20,
  },
  sectionTwo: {
    alignItems: 'center',
    position: 'relative',
    width: Dimensions.get('window').width - 40,
    padding: 20,
  },
  background: {
    backgroundColor: theme.colors.blue,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
  bottomDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.PENDING,
    marginHorizontal: 2,
  },
  dotContainer: {
    marginTop: 50,
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    width: '100%',
  },
  nextContainer: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 10,
    bottom: -10,
    right: 10,
  },
  nextButton: {
    backgroundColor: theme.colors.color,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
