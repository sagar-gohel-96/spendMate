import {Transaction} from '../../types';
import {apiClient} from '../apiClient';

const getTransactions = async () => {
  const res = await apiClient.get('/transaction');
  return res.data;
};

const createTransactions = async (payload: Transaction) => {
  const res = await apiClient.post('/transaction/create', payload);
  return res.data;
};

const updateTransactions = async (
  id: String,
  payload: Partial<Transaction>,
) => {
  const res = await apiClient.put(`'/transaction/${id}`, payload);
  return res.data;
};

export const TransactionService = {
  getTransactions,
  createTransactions,
  updateTransactions,
};
