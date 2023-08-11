import React from 'react';
import {Text} from 'react-native';
import {Drawer, View} from 'react-native-ui-lib';

const NotificationScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Drawer
        rightItems={[
          {
            text: 'Read',
            background: 'blue',
            onPress: () => console.log('read pressed'),
          },
        ]}
        leftItem={{
          text: 'Delete',
          background: 'red',
          onPress: () => console.log('delete pressed'),
        }}>
        <View centerV padding-s4 bg-white style={{height: 60}}>
          <Text>Item</Text>
        </View>
      </Drawer>
    </View>
  );
};

export default NotificationScreen;
