import {useMutation, useQuery} from 'react-query';
import {TransactionService} from '../api/transactions';
import {useMemo} from 'react';
import {Transaction} from '../../src/types';

export const useTransaction = () => {
  const {data, isLoading, refetch} = useQuery('get-transactions', async () => {
    const res = await TransactionService.getTransactions();
    return res;
  });

  const {
    data: createTransactionData,
    isLoading: createTransactionLoading,
    mutateAsync: mutateCreateTransaction,
  } = useMutation('create-transactions', async (payload: Transaction) => {
    const res = await TransactionService.createTransactions(payload);
    return res.data;
  });

  const getTransactions = useMemo(() => {
    return {data, isLoading, refetch};
  }, [data, isLoading, refetch]);

  return {
    getTransactions,
    createTransactionData,
    createTransactionLoading,
    mutateCreateTransaction,
  };
};
