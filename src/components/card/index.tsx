import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Divider, Icon} from '../../modules/core';
import {IconList} from '../../../assets/Icon/icon';
import {theme} from '../../utils/theme';
import {getIconStyle} from '../../modules/core/Icon/useIconStyle';

export type Transactions = {
  category: IconList;
  description?: string;
  amount: string;
}[];

const TransactionCard = () => {
  const transactions: Transactions = [
    {
      category: IconList.Clothing,
      description: '3 frocks',
      amount: '$50.00',
    },
    {
      category: IconList.Education,
      description: 'Books and school supplies',
      amount: '$100.00',
    },
    {
      category: IconList.Entertainment,
      description: 'Movie tickets and streaming services',
      amount: '$25.00',
    },
    {
      category: IconList.Food,
      description: 'Groceries and dining out',
      amount: '$200.00',
    },
    {
      category: IconList.GiftsDonation,
      description: 'Gifts for others and charitable donations',
      amount: '$50.00',
    },
    {
      category: IconList.Transportation,
      description: 'Gas, public transportation, and car maintenance',
      amount: '$150.00',
    },
    {
      category: IconList.Health,
      description: 'Healthcare expenses and gym memberships',
      amount: '$75.00',
    },
    {
      category: IconList.Housing,
      description: 'Rent, mortgage, and home repairs',
      amount: '$1000.00',
    },
  ];
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.headContainer}>
        <Text style={cardStyle.headText}>Monday</Text>
        <Text style={cardStyle.headText}>$1413</Text>
      </View>
      <Divider marginVertical={10} />
      <View>
        {transactions.map(i => {
          const style = getIconStyle(i.category);
          return (
            <View style={cardStyle.transcation}>
              <View style={cardStyle.transactionContainer}>
                <Icon
                  name={i.category}
                  size="md"
                  backgroundColor={style.backgroundColor}
                  color={style.color}
                />
                <View style={cardStyle.categoryContainer}>
                  <Text style={cardStyle.categoryText}>
                    {i.category.toLocaleUpperCase()}
                  </Text>
                  <Text style={cardStyle.descriptionText}>{i.description}</Text>
                </View>
              </View>
              <Text style={cardStyle.amount}>{i.amount}</Text>
            </View>
          );
        })}
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
    width: Dimensions.get('screen').width,
  },
  headContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  headText: {},
  total: {},
  transactionContainer: {flexDirection: 'row'},
  categoryContainer: {marginLeft: 10},
  categoryText: {},
  descriptionText: {},
  amount: {},
  transcation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
