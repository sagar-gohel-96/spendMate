import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Logo from '../../components/logo';
import {HomeBanner, Icon} from '../../modules/core';
import {theme} from '../../utils/theme';
import TransactionCard from '../../components/card';

const HomeScreen = () => {
  const {
    searchContainer,
    rootContainer,
    headerContainer,
    primaryText,
    header,
    secondaryText,
    sectionOne,
  } = homeScreenStyle;

  return (
    <View style={rootContainer}>
      <View style={searchContainer}>
        <Logo />
        <Icon name="magnify" />
      </View>
      <View style={header}>
        <View style={sectionOne}>
          <Avatar.Text size={40} label="SG" />
          <View style={headerContainer}>
            <Text style={primaryText}>Morning</Text>
            <Text style={secondaryText}>Jef oliver</Text>
          </View>
        </View>
      </View>
      <HomeBanner />
      <TransactionCard />
    </View>
  );
};

export default HomeScreen;

const homeScreenStyle = StyleSheet.create({
  rootContainer: {
    padding: 15,
    backgroundColor: theme.colors.white,
    height: Dimensions.get('screen').height,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerContainer: {
    marginLeft: 10,
  },
  primaryText: {fontWeight: '500', fontSize: 14},
  secondaryText: {fontWeight: 'bold', color: theme.colors.text1, fontSize: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    marginTop: 10,
  },
  select: {
    width: 150,
    height: 40,
    justifyContent: 'center',
  },
  sectionOne: {flexDirection: 'row'},
});
