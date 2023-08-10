import {
  CreateTransactionPayload,
  TransactionData,
  UpdateTransactionPayload,
} from 'types';
import {apiClient} from '../apiClient';

const getTransactions = async (): Promise<TransactionData[]> => {
  const res = await apiClient.get('/transaction');
  return res.data;
};
const createTransactions = async (
  payload: CreateTransactionPayload,
): Promise<TransactionData> => {
  const res = await apiClient.post('/transaction/create', payload);
  return res.data;
};

const updateTransactions = async (
  id: string,
  payload: UpdateTransactionPayload,
): Promise<TransactionData> => {
  const res = await apiClient.put(`/transaction/${id}`, payload);
  return res.data;
};

const deleteTransaction = async (id: string): Promise<TransactionData> => {
  const res = await apiClient.delete(`/transaction/${id}`);
  return res.data;
};

const getTransaction = async (id: string): Promise<TransactionData> => {
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
