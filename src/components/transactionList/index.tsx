import React, {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, Icon} from '../../modules/core';
import {theme} from '../../utils/theme';
import {fonts} from '../../utils/fonts';
import {useTransaction} from '../../../src/entity/hook/useTransaction';
import {getIconStyle} from '../../../src/modules/core/Icon/useIconStyle';
import {NoDataImage} from '../../assets/Image';
import {
  CreateTransactionPayload,
  TransactionData,
  TransactionType,
} from 'types';
import {currency} from '../../utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Image} from 'react-native';

dayjs.extend(relativeTime);

interface TransactionListProps {
  setTransactionId: Dispatch<SetStateAction<string>>;
  open: () => void;
}

const TransactionList = (props: TransactionListProps) => {
  const {getTransactions} = useTransaction();
  const {isLoading} = getTransactions;
  const {setTransactionId, open} = props;

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
    return Math.abs(total) + currency;
  }, [getTransactions.data]);

  const renderItem = ({item}: {item: TransactionData}) => {
    const style = getIconStyle(item.category as any);
    return (
      <TouchableOpacity
        onPress={() => {
          setTransactionId(item._id);
          open();
        }}
        key={item._id}>
        <View style={s.container}>
          <Icon
            name={item.category}
            size="md"
            backgroundColor={style.backgroundColor}
            color={style.color}
          />
          <View style={s.section}>
            <View style={s.sectionLeft}>
              <Text style={s.categoryText}>
                {item.category.toLocaleUpperCase()}
              </Text>
              <Text style={s.descriptionText}>{item.description ?? '...'}</Text>
            </View>
            <View style={s.sectionRight}>
              <Text style={s.amount}>{item.amount + currency}</Text>
              <Text style={s.descriptionText}>
                {dayjs(item?.createdAt).format('MM MMMM YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.root}>
      <View style={s.title}>
        <Text style={s.headText}>Transactions</Text>
        <Text style={s.headText}>{calculateTotalAmount()}</Text>
      </View>
      <Divider marginVertical={10} />
      {isLoading && <ActivityIndicator />}
      {getTransactions?.data?.data?.length > 0 ? (
        getTransactions?.data?.data.map((item: TransactionData) =>
          renderItem({item}),
        )
      ) : (
        <Image source={NoDataImage} style={s.image} />
      )}
    </View>
  );
};

export default TransactionList;

const s = StyleSheet.create({
  root: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
    borderColor: theme.colors.border,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 12,
    flex: 1,
    gap: 15,
  },
  title: {
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
    backgroundColor: 'green',
  },
  categoryText: {
    fontFamily: fonts.CarosSoftMedium,
    color: theme.text.header,
    fontSize: 16,
  },
  descriptionText: {
    fontFamily: fonts.CarosSoftMedium,
    color: theme.text.description,
  },
  amount: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 20,
    color: theme.colors.pink,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  sectionLeft: {
    justifyContent: 'space-between',
  },
  sectionRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'contain',
    aspectRatio: 1,
    alignSelf: 'center',
  },
});
