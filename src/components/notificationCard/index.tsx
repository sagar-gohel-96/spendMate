import React from 'react';
import dayjs from 'dayjs';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Clock} from 'phosphor-react-native';
import {fonts, theme} from '../../utils';

export enum NotificationStatusType {
  Read = 'Read',
  Unread = 'Unread',
}

export interface NotificationCardProps {
  data: {
    imageUrl: string;
    message: string;
    title: string;
    status: NotificationStatusType;
    publishedAt: Date;
  };
}
const NotificationCard = (props: NotificationCardProps) => {
  const {imageUrl, message, publishedAt, title} = props.data;
  const time = dayjs(publishedAt).format('h HH A');

  return (
    <View style={s.root}>
      <View style={s.contentWrapper}>
        <Image
          source={{uri: `data:image/jpeg;base64,${imageUrl}`}}
          style={s.image}
        />
        <View style={s.detailWrapper}>
          <Text style={s.titleText}>{title}</Text>
          <Text style={s.messageText}>{message}</Text>
        </View>
      </View>
      <View style={s.footerWrapper}>
        <Clock color="gray" size={16} />
        <Text style={s.timeText}>{time}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

export const s = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: theme.colors.sky,
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 30,
  },
  detailWrapper: {
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
    overflow: 'scroll',
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 6,
  },
  titleText: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 20,
  },
  messageText: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 16,
    width: '100%',
  },
  timeText: {
    fontSize: 12,
  },
});
