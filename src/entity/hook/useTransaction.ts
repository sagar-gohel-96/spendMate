import {useMutation, useQuery, useQueryClient} from 'react-query';
import {TransactionService} from '../api/transactions';
import {useMemo} from 'react';
import {CreateTransactionPayload, UpdateTransactionPayload} from 'types';

export const useTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const {data, isLoading, refetch} = useQuery('get-transactions', async () => {
    const res = await TransactionService.getTransactions();
    return res;
  });

  const {
    data: singleTransaction,
    isLoading: singleTransactionLoading,
    refetch: singleTransactionRefetch,
  } = useQuery(['get-single-transaction', id], async () => {
    console.log('inside single transaction', id);

    if (id) {
      const transaction = await TransactionService.getTransaction(id);
      return transaction;
    }
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
    async () => {
      if (id) {
        const res = await TransactionService.deleteTransaction(id);
        return res.data;
      }
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
