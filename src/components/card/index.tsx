import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Divider, Icon} from '../../modules/core';
import {IconList} from '../../../assets/Icon/icon';
import {theme} from '../../utils/theme';
const TransactionCard = () => {
  const transactions = [{name: IconList.Clothing}];
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.headContainer}>
        <Text style={cardStyle.headText}>Monday</Text>
        <Text style={cardStyle.headText}>$1413</Text>
      </View>
      <Divider marginVertical={10} />
      <View>
        {transactions.map(i => (
          <Icon name={i.name} size="md" backgroundColor="black" color="gray" />
        ))}
      </View>
    </View>
  );
};

export default TransactionCard;

const cardStyle = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
    borderColor: theme.colors.border,
  },
  headContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  headText: {},
  total: {},
});
