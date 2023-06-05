import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Divider, Icon} from '../../modules/core';
import {theme} from '../../utils/theme';
import {fonts} from '../../utils/fonts';
import {useTransaction} from '../../../src/entity/hook/useTransaction';
import {getIconStyle} from '../../../src/modules/core/Icon/useIconStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  CreateTransactionPayload,
  GetTransactionData,
  TransactionType,
} from 'types';
import {currency} from '../../utils';
import dayjs from 'dayjs';

const TransactionCard = () => {
  const {getTransactions} = useTransaction();
  const navigation = useNavigation<any>();
  const {isLoading} = getTransactions;

  useEffect(() => {
    getTransactions.refetch();
  }, [getTransactions]);

  const amountString = useCallback(
    ({amount, type}: {amount: number; type: TransactionType}) => {
      if (type === 'Expense') {
        return `-${amount + currency}`;
      } else {
        return `+${amount + currency}`;
      }
    },
    [],
  );

  const calculateTotalAmount = useCallback(() => {
    if (!getTransactions.data || !getTransactions.data.data) {
      return 0;
    }
    const transactions = getTransactions.data.data;
    const total = transactions.reduce(
      (acc: number, transaction: CreateTransactionPayload) => {
        if (transaction.transactionType === 'Expense') {
          return acc - transaction.amount;
        } else if (transaction.transactionType === 'Income') {
          return acc + transaction.amount;
        }
        return acc;
      },
      0,
    );
    return `${total + currency}`;
  }, [getTransactions.data]);

  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.headContainer}>
        <Text style={cardStyle.headText}>Transactions</Text>
        <Text style={cardStyle.headText}>{calculateTotalAmount()}</Text>
      </View>
      <Divider marginVertical={10} />
      <ScrollView>
        <View>
          {getTransactions?.data?.data.length <= 0 && (
            <Text style={cardStyle.emptyData}> No Transaction Found</Text>
          )}
          {isLoading && <ActivityIndicator />}
          {getTransactions?.data?.data &&
            getTransactions?.data?.data.map((item: GetTransactionData) => {
              const style = getIconStyle(item.category as any);
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Transaction', {id: item._id})
                  }
                  key={item._id}>
                  <View style={cardStyle.transcation}>
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
                        <Text style={cardStyle.amount}>
                          {amountString({
                            amount: item.amount,
                            type: item.transactionType,
                          })}
                        </Text>
                        <Text style={cardStyle.descriptionText}>
                          {dayjs(item.date).format('L LT')}
                        </Text>
                      </View>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={cardStyle.descriptionText}>
                        {item.description ?? '...'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
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
  emptyData: {
    fontFamily: fonts.CarosSoftMedium,
    textAlign: 'center',
  },
});
