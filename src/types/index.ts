export type Transaction = {
  category: String;
  type: TransactionType;
  desc?: String;
  date: Date;
};

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
}
