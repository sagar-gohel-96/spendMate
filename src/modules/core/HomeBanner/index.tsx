import React, {useCallback} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {banner} from '../../../assets/Image';
import {fonts} from '../../../utils/fonts';
import {theme} from '../../../utils/theme';
import {useTransaction} from '../../../entity/hook/useTransaction';
import {GetTransactionData, TransactionType} from '../../../types';
import {currency} from '../../../utils';
import dayjs from 'dayjs';

const HomeBanner = () => {
  const {getTransactions} = useTransaction();

  /**
   * @param monthIndex: monthIndex starting from 0 to 11.
   * 0 indicates Jan and 11 indicates Dec
   */
  const calculateMonthlyTotalExpense = useCallback(
    (monthIndex: number) => {
      if (getTransactions.data?.data.length === 0) {
        return 0;
      }
      const allTransactions = (getTransactions.data?.data ??
        []) as GetTransactionData[];

      const expenseTransactions = allTransactions.filter(
        t => t.transactionType === TransactionType.Expense,
      );

      const monthlyExpense = expenseTransactions.filter(
        t => dayjs(t.date).month() === monthIndex,
      );

      const monthlyExpenseTotal = monthlyExpense.reduce(
        (acc, item) => acc + (item.amount ?? 0),
        0,
      );

      return monthlyExpenseTotal;
    },
    [getTransactions.data],
  );

  console.log(
    calculateMonthlyTotalExpense(dayjs().month() - 1),
    'last month data',
  );
  const {
    headtag,
    moneytag,
    difftag,
    diffContainer,
    root,
    diffText,
    bannerContainer,
    bannerImage,
  } = HomeBannerStyle;

  const lastMonthExpense = calculateMonthlyTotalExpense(dayjs().month() - 1);
  const currentMonthExpense = calculateMonthlyTotalExpense(dayjs().month());
  const diffrenceExpenseOfMonth = currentMonthExpense - lastMonthExpense;

  return (
    <View style={root}>
      <View>
        <Text style={headtag}>Expense total</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={moneytag}>{`${currentMonthExpense} ${currency} `}</Text>
          <Text style={headtag}>{`(${dayjs().format('MMMM')})`}</Text>
        </View>
        <View style={diffContainer}>
          <Text
            style={difftag}>{` ${diffrenceExpenseOfMonth} ${currency}`}</Text>
          <Text style={diffText}>
            {' '}
            than last {`${dayjs().subtract(1, 'month').format('MMMM')}`}
          </Text>
        </View>
      </View>
      <View style={bannerContainer}>
        <Image source={banner} style={bannerImage} />
      </View>
    </View>
  );
};

export default HomeBanner;

const HomeBannerStyle = StyleSheet.create({
  root: {
    marginVertical: 24,
    backgroundColor: theme.colors.banner,
    padding: 20,
    borderRadius: 7,
    gap: 6,
    flexDirection: 'row',
    position: 'relative',
  },
  headtag: {
    color: theme.colors.white,
    fontFamily: fonts.CarosSoft,
    fontSize: 18,
  },
  moneytag: {
    color: theme.colors.white,
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 48,
  },
  difftag: {
    fontSize: 12,
    backgroundColor: theme.icon[200],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    color: theme.colors.white,
    fontFamily: fonts.CarosSoftMedium,
    borderRadius: 4,
  },
  diffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.white,
  },
  diffText: {color: theme.colors.white, fontFamily: fonts.CarosSoftLight},
  bannerContainer: {
    height: 200,
    width: 200,
    position: 'absolute',
    right: -20,
    top: -10,
    transform: [{rotateX: '20deg'}],
  },
  bannerImage: {width: '100%', height: '100%', resizeMode: 'cover'},
});
