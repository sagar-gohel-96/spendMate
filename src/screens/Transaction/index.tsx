import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import TransactionForm from './TransactionForm';
import {theme} from '../../utils/theme';
import {Text} from 'react-native';
import {fonts} from '../../utils/fonts';
import {transaction} from '../../../assets/Image';

const TransactionScreen = () => {
  return (
    <>
      <View style={formStyle.bannerContainer}>
        <Image source={transaction} style={formStyle.transactionImg} />
        <Text style={formStyle.banner}>Transaction</Text>
      </View>
      <View style={formStyle.container}>
        <TransactionForm />
      </View>
    </>
  );
};

export default TransactionScreen;

const formStyle = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.navbar,
    elevation: 8,
    justifyContent: 'center',
  },
  container: {
    padding: 10,
    backgroundColor: theme.colors.white,
    height: Dimensions.get('screen').height,
  },
  banner: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 24,
    color: theme.text.header,
    padding: 12,
  },
  transactionImg: {
    height: 52,
    width: 62,
  },
});
