import {
  NotificationData,
  CreateNotificationPayload,
  UpdateNotificationPayload,
} from 'types';
import {apiClient} from '../apiClient';

const getNotifications = async (): Promise<NotificationData[]> => {
  const res = await apiClient.get('/notification');
  return res.data;
};

const createNotification = async (
  payload: CreateNotificationPayload,
): Promise<NotificationData> => {
  const res = await apiClient.post('/notification/', payload);
  return res.data;
};

const updateNotification = async (
  id: string,
  payload: UpdateNotificationPayload,
): Promise<NotificationData> => {
  const res = await apiClient.put(`/notification/${id}`, payload);
  return res.data;
};

const deleteNotification = async (id: string): Promise<NotificationData> => {
  const res = await apiClient.delete(`/notification/${id}`);
  return res.data;
};

const getNotification = async (id: string): Promise<NotificationData> => {
  const res = await apiClient.get(`/notification/${id}`);
  return res.data;
};

export const NotificatonService = {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotification,
};
