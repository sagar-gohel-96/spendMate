import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {logo} from '../../../assets/Image';
import {colors} from '../../utils/colors';
import {slogn} from '../../utils/slogn';
const LandingPage = () => {
  return (
    <View>
      <Image source={logo} style={navbarStyle.image} />
      <Text style={navbarStyle.goal}>
        " Track every penny and take control of your finances with
        <Text style={{color: colors.PENDING}}> SpendMate</Text> "
      </Text>
      <View style={navbarStyle.slogn}>
        {slogn.map((s: string, index: number) => (
          <Text style={navbarStyle.text} key={index}>
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default LandingPage;

const navbarStyle = StyleSheet.create({
  text: {
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.TEXT,
  },
  image: {
    width: 400,
    height: 80,
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
});
