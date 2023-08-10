import {CreateTransactionPayload, UpdateTransactionPayload} from 'types';
import {apiClient} from '../apiClient';

const getTransactions = async () => {
  const res = await apiClient.get('/transaction');
  return res.data;
};
const createTransactions = async (payload: CreateTransactionPayload) => {
  const res = await apiClient.post('/transaction/create', payload);
  return res.data;
};

const updateTransactions = async (
  id: string,
  payload: UpdateTransactionPayload,
) => {
  const res = await apiClient.put(`/transaction/${id}`, payload);
  return res.data;
};

const deleteTransaction = async (id: string) => {
  const res = await apiClient.delete(`/transaction/${id}`);
  return res.data;
};

const getTransaction = async (id: string) => {
  console.log('inside API call transaction ********', id);

  const res = await apiClient.get(`/transaction/${id}`);
  return res.data;
};

export const TransactionService = {
  getTransactions,
  createTransactions,
  updateTransactions,
  deleteTransaction,
  getTransaction,
};
