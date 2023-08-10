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
      <ScrollView showsVerticalScrollIndicator={false} style={s.rootContainer}>
        <View style={s.headerWrapper}>
          <Logo />
          <View style={s.profileWrapper}>
            <View style={s.avatar}>
              <Avatar
                size={40}
                label={user ? user?.name.charAt(0).toUpperCase() : 'G'}
                backgroundColor={theme.text.description}
              />
            </View>
            <View>
              <Text style={s.secondaryText}>
                {user ? user.name : 'Guest User'}
              </Text>
              <Text style={s.primaryText}>Morning</Text>
            </View>
          </View>
        </View>

        <View>
          <HomeBanner />
        </View>

        <View style={s.transactionWrapper}>
          <TransactionList setTransactionId={setTransactionId} open={open} />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const s = StyleSheet.create({
  rootContainer: {
    padding: 12,
    backgroundColor: theme.colors.white,
  },
  profileWrapper: {
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
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    marginRight: 10,
  },
  transactionWrapper: {
    flex: 1,
  },
});
