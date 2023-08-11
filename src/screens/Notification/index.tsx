import React from 'react';
import NotificationCard, {
  NotificationStatusType,
} from '../../components/notificationCard';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Drawer} from 'react-native-ui-lib';
import {theme} from '../../utils';
import {notificationUrl} from '../../assets/Image/notification';

const NotificationScreen = () => {
  const data = {
    imageUrl: notificationUrl,
    message: "Do you have added your today's expense",
    title: 'Heyy Dear',
    status: NotificationStatusType.Read,
    publishedAt: new Date(),
  };
  return (
    <View style={s.root}>
      <Drawer
        rightItems={[
          {
            icon: 11,
            text: 'Mark As Read',
            background: theme.colors.navbar,
            onPress: () => console.log('read pressed'),
          },
        ]}
        leftItem={{
          icon: 11,
          text: 'Delete',
          background: 'red',
          onPress: () => console.log('delete pressed'),
        }}>
        <NotificationCard data={data} />
      </Drawer>
    </View>
  );
};

export default NotificationScreen;

export const s = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.white,
    height: Dimensions.get('screen').height,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
