import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-ui-lib';
import Logo from '../../components/logo';
import {HomeBanner} from '../../modules/core';
import TransactionList from '../../components/transactionList';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {fonts, theme} from '../../utils';
import {Modalize, useModalize} from 'react-native-modalize';
import TransactionForm from '../../screens/Transaction/TransactionForm';

const HomeScreen = () => {
  const [transactionId, setTransactionId] = useState('');
  const {
    user: {user},
  } = useSelector((store: RootState) => store);

  const {ref, close, open} = useModalize();

  return (
    <>
      <Modalize ref={ref} adjustToContentHeight>
        <TransactionForm close={close} id={transactionId} />
      </Modalize>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={homeScreenStyle.rootContainer}>
        <View style={homeScreenStyle.sectionOne}>
          <Logo />
          <View style={homeScreenStyle.headerContainer}>
            <View style={homeScreenStyle.avatar}>
              <Avatar
                size={40}
                label={user ? user?.name.charAt(0).toUpperCase() : 'G'}
                backgroundColor={theme.text.description}
              />
            </View>
            <View>
              <Text style={homeScreenStyle.secondaryText}>
                {user ? user.name : 'Guest User'}
              </Text>
              <Text style={homeScreenStyle.primaryText}>Morning</Text>
            </View>
          </View>
        </View>
        <HomeBanner />
        <TransactionList setTransactionId={setTransactionId} open={open} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const homeScreenStyle = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 4,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  primaryText: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: fonts.CarosSoftMedium,
  },
  secondaryText: {
    color: theme.text.exeeria,
    fontSize: 16,
    fontFamily: fonts.CarosSoftExtraBold,
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
