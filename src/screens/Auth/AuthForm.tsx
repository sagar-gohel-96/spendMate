import {useFormik} from 'formik';
import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../utils/theme';
import {fonts} from '../../utils/fonts';
import {useKeyboard} from '@react-native-community/hooks';
import {Icon} from '../../modules/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface AuthProps {
  screenName: string;
  buttonText: string;
  onPress: (event: UIEvent) => void;
  initialValues: SignUpField;
  setScreen?: (value: any) => void;
  bottomText: String;
}

type SignUpField = {
  email: string;
  name: string;
  password: string;
};

const AuthForm: React.FC<PropsWithChildren<AuthProps>> = props => {
  const {screenName, initialValues, buttonText, bottomText, onPress} = props;
  const keyboard = useKeyboard();
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      scrollViewRef.current?.scrollTo({y: 230, animated: true});
    }
  }, [keyboard, keyboard.keyboardShown]);

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: initialValues,
    onSubmit: (value, {resetForm}) => {
      resetForm({});
    },
  });
  return (
    <ScrollView contentContainerStyle={formStyle.container}>
      <View style={formStyle.root}>
        <View style={formStyle.head}>
          <Icon name="account-lock-open" color={theme.text.exeeria} size="lg" />
          <Text style={formStyle.header}>{screenName}</Text>
        </View>
        <View>
          <View style={formStyle.header}>
            <Icon name="rename-box" color={theme.text.exeeria} size="sm" />
            <Text style={formStyle.text}>Name</Text>
          </View>
          <TextInput
            value={values.name}
            onChange={handleChange('name')}
            style={formStyle.input}
          />
        </View>
        <View>
          <View style={formStyle.header}>
            <Icon name="email" color={theme.text.exeeria} size="sm" />
            <Text style={formStyle.text}>Email</Text>
          </View>
          <TextInput
            value={values.email}
            onChange={handleChange('email')}
            style={formStyle.input}
          />
        </View>
        <View>
          <View style={formStyle.header}>
            <Icon name="onepassword" size="sm" />
            <Text style={formStyle.text}>Password</Text>
          </View>
          <TextInput
            value={values.password}
            style={formStyle.input}
            onChange={handleChange('password')}
            secureTextEntry={true}
          />
        </View>
        <Button
          style={formStyle.button}
          textColor="white"
          onPress={handleSubmit}>
          {buttonText}
        </Button>
        <TouchableOpacity>
          <Text style={formStyle.loginText} onPress={onPress}>
            {bottomText}
            {'aaa '}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AuthForm;
const formStyle = StyleSheet.create({
  form: {flex: 1, borderWidth: 1, justifyContent: 'center'},
  root: {
    padding: 20,
    width: 300,
  },
  input: {
    backgroundColor: theme.colors.border,
    marginTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: theme.text.exeeria,
    borderRadius: 10,
    fontFamily: fonts.CarosSoftMedium,
    paddingLeft: 12,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    textAlign: 'left',
    fontFamily: fonts.CarosSoftMedium,
    color: theme.colors.banner,
    fontSize: 24,
    marginTop: 12,
  },
  button: {
    backgroundColor: theme.text.exeeria,
    marginTop: 8,
    height: 52,
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 16,
    color: theme.radioButton.color,
    marginTop: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: theme.colors.blue,
    borderBottomWidth: 3,
    paddingBottom: 12,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 8,
    color: theme.text.exeeria,
    fontFamily: fonts.CarosSoftMedium,
  },
});