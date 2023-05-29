export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export type User = {
  name: String;
  email: String;
  password: String;
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
