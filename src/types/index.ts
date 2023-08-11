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
  amount: number;
  date: Date;
}

export type CreateTransactionPayload = TransactionSchemaEntity;

export type TransactionData = BaseEntity & CreateTransactionPayload;

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;

export enum NotificationStatus {
  Read = 'read',
  Unread = 'unread',
}
export interface NotificationEntity {
  title: string;
  message: string;
  publishedAt: Date;
  status: NotificationStatus;
  imageUrl: string;
}

export type createNotificationPayload = BaseEntity & NotificationEntity;

export type updateNotificationPayload = Partial<NotificationEntity>;

export type NotificationData = BaseEntity & NotificationEntity;
