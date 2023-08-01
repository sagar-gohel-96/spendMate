import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../utils/theme';
import ProfileScreen from '../../screens/Profile';
import {Text, TouchableOpacity, View} from 'react-native';
import AnalyticsScreen from '../../screens/Analytics';
import {StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts';
import NotificationScreen from '../../screens/Notification';
import {Modalize, useModalize} from 'react-native-modalize';
import TransactionForm from '../../screens/Transaction/TransactionForm';

const Tab = createBottomTabNavigator();

const HomeIcon = (focused: boolean) => (
  <Icon
    name="home"
    size={30}
    color={focused ? theme.text.exeeria : theme.colors.gray}
  />
);
const ProfileIcon = (focused: boolean) => (
  <Icon
    name="account"
    size={30}
    color={focused ? theme.text.exeeria : theme.colors.gray}
  />
);
const AnalyticsIcon = (focused: boolean) => (
  <Icon
    name="poll"
    size={30}
    color={focused ? theme.text.exeeria : theme.colors.gray}
  />
);

const NotificationIcon = (focused: boolean) => (
  <Icon
    name="bell"
    size={30}
    color={focused ? theme.text.exeeria : theme.colors.gray}
  />
);
const TransactionIcon = (props: {
  open: (dest?: 'top' | 'default' | undefined) => void;
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.open();
        }}>
        <Icon
          name="plus"
          size={40}
          style={tabTextStyle.addTransaction}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const Lable = (focused: boolean, value: string) => (
  <Text style={[focused && tabTextStyle.focused, tabTextStyle.label]}>
    {value}
  </Text>
);

const EmptyScreen = () => null;

const MainScreen = () => {
  const {ref, open, close} = useModalize();

  return (
    <>
      <Modalize ref={ref}>
        <TransactionForm close={close} />
      </Modalize>
      <Tab.Navigator
        initialRouteName="LandingScreen"
        screenOptions={{
          tabBarStyle: {
            paddingBottom: 4,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => HomeIcon(focused),
            tabBarLabel: focused => Lable(focused.focused, 'Home'),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({focused}) => AnalyticsIcon(focused),
            tabBarLabel: focused => Lable(focused.focused, 'Analytics'),
          }}
        />
        {/* <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: () => TransactionIcon(),
          tabBarLabel: () => null,
          headerLeft: () => LeftArrowIcon(),
          headerStyle: {
            borderBottomWidth: 1,
          },
        }}
      /> */}

        <Tab.Screen
          name="Transaction"
          component={EmptyScreen}
          options={{tabBarButton: () => <TransactionIcon open={open} />}}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => NotificationIcon(focused),
            tabBarLabel: focused => Lable(focused.focused, 'Notification'),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => ProfileIcon(focused),
            tabBarLabel: focused => Lable(focused.focused, 'Profile'),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;
const tabTextStyle = StyleSheet.create({
  label: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 12,
  },
  focused: {
    color: theme.text.exeeria,
  },
  addTransaction: {backgroundColor: theme.text.exeeria, borderRadius: 8},
});
