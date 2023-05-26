import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Logo from '../../components/logo';
import {HomeBanner, Icon} from '../../modules/core';
import {theme} from '../../utils/theme';
import TransactionCard from '../../components/card';
import {IconList} from '../../assets/Icon/icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

const HomeScreen = () => {
  const {
    user: {user},
  } = useSelector((store: RootState) => store);
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
    <ScrollView>
      <View style={rootContainer}>
        <View style={searchContainer}>
          <Logo />
          <Icon name={IconList.Search} size="lg" />
        </View>
        <View style={header}>
          <View style={sectionOne}>
            <Avatar.Text
              size={40}
              label={user ? user.name.charAt(0).toUpperCase() : 'G'}
            />
            <View style={headerContainer}>
              <Text style={primaryText}>Morning</Text>
              <Text style={secondaryText}>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  headerContainer: {
    marginLeft: 8,
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
  sectionOne: {flexDirection: 'row'},
});
