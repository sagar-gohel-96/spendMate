import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import TransactionForm from './TransactionForm';
import {theme} from '../../utils/theme';

const TransactionScreen = () => {
  return (
    <View style={formStyle.container}>
      <TransactionForm />
    </View>
  );
};

export default TransactionScreen;

const formStyle = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.white,
    height: Dimensions.get('screen').height,
  },
});
