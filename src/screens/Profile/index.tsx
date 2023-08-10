import React, {useCallback} from 'react';
import {Avatar, Button} from 'react-native-paper';
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
    console.log(AsyncStorage.getAllKeys(), 'all keys');
    await AsyncStorage.clear();
    dispatch(setUser(null));
    navigation.navigate('LandingScreen' as never);
  }, [dispatch, navigation]);

  const onCancel = useCallback(() => {
    navigation.navigate(ProfileScreen);
  }, [navigation]);

  return (
    <View style={profileStyle.profileContainer}>
      <View style={profileStyle.banner}>
        <Avatar.Text
          style={profileStyle.profilepic}
          size={100}
          label={user ? user?.name.charAt(0).toUpperCase() : 'G'}
        />
      </View>
      <View style={profileStyle.profileDetails}>
        <View style={profileStyle.detailContainer}>
          <Text style={profileStyle.name}>{user?.name}</Text>
        </View>
        <View style={profileStyle.detailContainer}>
          <Text style={profileStyle.email}>{user?.email}</Text>
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
          style={{borderRadius: 5, marginTop: 30, width: 120}}>
          Logout
        </Button>
      </View>
    </View>
    // </View>
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

const profileStyle = StyleSheet.create({
  banner: {
    backgroundColor: theme.input.color,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {marginTop: 42},
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
  profileContainer: {},
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.CarosSoftBold,
    color: theme.colors.banner,
    fontSize: 18,
  },
  name: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 28,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  email: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 14,
  },
});
