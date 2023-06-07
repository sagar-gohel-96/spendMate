import {useMutation, useQuery, useQueryClient} from 'react-query';
import {TransactionService} from '../api/transactions';
import {useMemo} from 'react';
import {CreateTransactionPayload, UpdateTransactionPayload} from 'types';

export const useTransaction = (id?: String) => {
  const queryClient = useQueryClient();
  const {data, isLoading, refetch} = useQuery('get-transactions', async () => {
    const res = await TransactionService.getTransactions();
    return res;
  });

  const {
    data: createTransactionData,
    isLoading: createTransactionLoading,
    mutateAsync: mutateCreateTransaction,
  } = useMutation(
    'create-transactions',
    async (payload: CreateTransactionPayload) => {
      const res = await TransactionService.createTransactions(payload);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['get-transactions']});
      },
    },
  );
  const {
    data: deleteTransactionData,
    isLoading: deleteTransactionLoading,
    mutateAsync: mutateDeleteTransaction,
  } = useMutation(
    'delete-transactions',
    async (transactionId: String) => {
      const res = await TransactionService.deleteTransaction(transactionId);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['get-transactions']});
      },
    },
  );

  const {
    data: updateTransactionData,
    isLoading: updateTransactionLoading,
    mutateAsync: mutateUpdateTransaction,
  } = useMutation(
    'update-transactions',
    async ({
      transactionId,
      payload,
    }: {
      transactionId: string;
      payload: UpdateTransactionPayload;
    }) => {
      const res = await TransactionService.updateTransactions(
        transactionId,
        payload,
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['get-transactions']});
      },
    },
  );

  const getTransactions = useMemo(() => {
    return {data, isLoading, refetch};
  }, [data, isLoading, refetch]);

  const {
    data: singleTransaction,
    isLoading: singleTransactionLoading,
    refetch: singleTransactionRefetch,
  } = useQuery(
    ['get-single-transaction', id],
    async () => {
      if (id) {
        const transaction = await TransactionService.getTransaction(id);
        return transaction;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['get-transactions']});
      },
    },
  );

  return {
    getTransactions,
    createTransactionData,
    createTransactionLoading,
    mutateCreateTransaction,
    deleteTransactionData,
    deleteTransactionLoading,
    mutateDeleteTransaction,
    updateTransactionData,
    updateTransactionLoading,
    mutateUpdateTransaction,
    singleTransaction,
    singleTransactionLoading,
    singleTransactionRefetch,
  };
};
