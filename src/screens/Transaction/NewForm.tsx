import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {RadioButton, RadioGroup, Text, View} from 'react-native-ui-lib';
import {fonts} from '../../utils/fonts';
import {TransactionType} from '../../types';

const TransactionBottomSheet = () => {
  return (
    <View style={style.container}>
      <Text style={style.headerText}>Add / Edit Transaction</Text>
      <RadioGroup initialValue={'Expense'}>
        <Text style={{fontFamily: fonts.CarosSoftMedium, fontSize: 16}}>
          Type
        </Text>
        <RadioButton
          label="Expense"
          value={TransactionType.Expense}
          labelStyle={{
            marginRight: 20,
            fontFamily: fonts.CarosSoftMedium,
          }}
        />
        <RadioButton
          label="Income"
          value={TransactionType.Income}
          labelStyle={{fontFamily: fonts.CarosSoftMedium}}
        />
      </RadioGroup>
    </View>
  );
};

export default TransactionBottomSheet;

const style = StyleSheet.create({
  container: {
    padding: 20,
    height: Dimensions.get('screen').height,
  },
  headerText: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 16,
  },
  categoryContainer: {
    backgroundColor: 'yellow',
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
