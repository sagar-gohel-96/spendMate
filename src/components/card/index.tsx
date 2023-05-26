import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Divider, Icon} from '../../modules/core';
import {IconList} from '../../assets/Icon/icon';
import {theme} from '../../utils/theme';
import {getIconStyle} from '../../modules/core/Icon/useIconStyle';
import {fonts} from '../../utils/fonts';

export type Transactions = {
  id: string;
  category: IconList;
  description?: string;
  amount: string;
}[];

const transactions: Transactions = [
  {
    id: '1',
    category: IconList.Clothing,
    description: '3 frocks',
    amount: '$50.00',
  },
  {
    id: '2',
    category: IconList.Education,
    description: 'Books and school supplies',
    amount: '$100.00',
  },
  {
    id: '3',
    category: IconList.Entertainment,
    description: 'Movie tickets and streaming services',
    amount: '$25.00',
  },
  {
    id: '4',
    category: IconList.Food,
    description: 'Groceries and dining out',
    amount: '$200.00',
  },
  {
    id: '5',
    category: IconList.GiftsDonation,
    description: 'Gifts for others and charitable donations',
    amount: '$50.00',
  },
  {
    id: '6',
    category: IconList.Transportation,
    description: 'Gas, public transportation, and car maintenance',
    amount: '$150.00',
  },
  {
    id: '7',
    category: IconList.Health,
    description: 'Healthcare expenses and gym memberships',
    amount: '$75.00',
  },
  {
    id: '8',
    category: IconList.Housing,
    description: 'Rent, mortgage, and home repairs',
    amount: '$1000.00',
  },
];
const TransactionCard = () => {
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.headContainer}>
        <Text style={cardStyle.headText}>Monday</Text>
        <Text style={cardStyle.headText}>$1413</Text>
      </View>
      <Divider marginVertical={10} />
      <View>
        {transactions.map(item => {
          const style = getIconStyle(item.category);
          return (
            <View style={cardStyle.transcation} key={item.id}>
              <Icon
                name={item.category}
                size="md"
                backgroundColor={style.backgroundColor}
                color={style.color}
              />
              <View style={cardStyle.section}>
                <View style={cardStyle.transactionContainer}>
                  <View>
                    <Text style={cardStyle.categoryText}>
                      {item.category.toLocaleUpperCase()}
                    </Text>
                  </View>
                  <Text style={cardStyle.amount}>{item.amount}</Text>
                </View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={cardStyle.descriptionText}>
                  {item.description}
                </Text>
              </View>
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
    width: '100%',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  headText: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 20,
    color: theme.text.header,
  },
  total: {},
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontFamily: fonts.CarosSoftMedium,
    color: theme.text.header,
    fontSize: 16,
  },
  descriptionText: {
    marginRight: 48,
    fontFamily: fonts.CarosSoftMedium,
    color: theme.text.description,
  },
  amount: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 20,
    color: theme.colors.pink,
  },
  transcation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 12,
  },
  section: {
    marginHorizontal: 10,
    flex: 1,
  },
});
