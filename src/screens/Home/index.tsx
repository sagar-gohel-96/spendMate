import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Logo from '../../components/logo';
import {HomeBanner} from '../../modules/core';
import {theme} from '../../utils/theme';
import TransactionCard from '../../components/card';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

const HomeScreen = () => {
  const {
    user: {user},
  } = useSelector((store: RootState) => store);

  return (
    <ScrollView>
      <View style={homeScreenStyle.rootContainer}>
        <View style={homeScreenStyle.sectionOne}>
          <Logo />

          <View style={homeScreenStyle.headerContainer}>
            <View style={homeScreenStyle.avatar}>
              <Avatar.Text
                size={40}
                label={user ? user.name.charAt(0).toUpperCase() : 'G'}
              />
            </View>
            <View>
              <Text style={homeScreenStyle.primaryText}>Morning</Text>
              <Text style={homeScreenStyle.secondaryText}>
                {user ? user.name : 'Guest User'}
              </Text>
            </View>
          </View>
        </View>
        <HomeBanner />
        <TransactionCard />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const homeScreenStyle = StyleSheet.create({
  rootContainer: {
    padding: 12,
    paddingTop: 4,
    backgroundColor: theme.colors.white,
  },
  searchContainer: {
    justifyContent: 'space-between',
    marginVertical: 8,
    borderWidth: 1,
  },
  headerContainer: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  primaryText: {fontWeight: '500', fontSize: 14},
  secondaryText: {
    fontWeight: 'bold',
    color: theme.text.exeeria,
    fontSize: 16,
  },
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
  sectionOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  avatar: {
    marginRight: 10,
  },
});
