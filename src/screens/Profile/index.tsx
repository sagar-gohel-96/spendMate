import React, {useCallback} from 'react';
import {Avatar, Button} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../features/user/userSlice';
import {Dimensions, View, Alert, Text, StyleSheet} from 'react-native';
import {RootState} from 'app/store';
import {fonts, theme} from '../../utils';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {
    user: {user},
  } = useSelector((store: RootState) => store);

  const onConfirm = useCallback(async () => {
    await AsyncStorage.clear();
    dispatch(setUser(null));
    navigation.navigate('LandingScreen' as never);
  }, [dispatch, navigation]);

  const onCancel = useCallback(() => {
    navigation.navigate(ProfileScreen);
  }, [navigation]);

  return (
    <View style={s.container}>
      <View style={s.banner}>
        <Avatar
          containerStyle={s.profilepic}
          size={100}
          label={user ? user?.name.charAt(0).toUpperCase() : 'G'}
        />
      </View>
      <View style={s.profileWrapper}>
        <View style={s.deatailWrapper}>
          <Text style={s.nameText}>{user?.name}</Text>
        </View>
        <View style={s.deatailWrapper}>
          <Text style={s.emailText}>{user?.email}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => ShowAlert({onCancel, onConfirm})}
          mode="contained"
          style={{
            borderRadius: 5,
            marginTop: 30,
            width: 120,
            color: theme.button.color,
          }}>
          <Text style={{color: theme.button.text}}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};
export default ProfileScreen;
export interface ShowAlertProps {
  onCancel?: () => void;
  onConfirm: () => void;
}

const ShowAlert = (props: ShowAlertProps) => {
  const {onCancel, onConfirm} = props;
  Alert.alert('LOGOUT', 'Are you sure?', [
    {
      text: 'Cancel',
      onPress: onCancel,
      style: 'cancel',
    },
    {
      text: 'Yes,Logout !',
      onPress: onConfirm,
      style: 'default',
    },
  ]);
};

const s = StyleSheet.create({
  banner: {
    backgroundColor: theme.input.color,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {marginTop: 42},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
  },
  profilepic: {marginBottom: -72, justifyContent: 'center'},
  header: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: fonts.CarosSoftBold,
    paddingBottom: 5,
    color: theme.colors.banner,
  },
  deatailWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.CarosSoftBold,
    color: theme.colors.banner,
    fontSize: 18,
  },
  nameText: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 28,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  emailText: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 14,
  },
});
