export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
}

export type User = {
  name: string;
  email: string;
  password: string;
};

export interface UserSchemaEntity {
  email: string;
  name: string;
  password: string;
  generateAuthToken: () => string;
}
export type CreateUserPayload = Omit<UserSchemaEntity, 'generateAuthToken'>;
export type LoginUserPayload = Omit<CreateUserPayload, 'name'>;
export interface GetUserData
  extends BaseEntity,
    Omit<CreateUserPayload, 'password'> {}

export type UpdateUserPayload = Partial<CreateUserPayload>;

export interface TransactionSchemaEntity {
  userId: string;
  transactionType: TransactionType;
  category: string;
  description: string;
  amount: number | null;
  date: Date;
}

export type CreateTransactionPayload = TransactionSchemaEntity;

export type GetTransactionData = BaseEntity & CreateTransactionPayload;

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;
