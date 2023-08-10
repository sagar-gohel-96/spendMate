import React, {PropsWithChildren, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {fonts, theme} from '../../utils';
import {TextField} from 'react-native-ui-lib';
import {At, User, Keyhole} from 'phosphor-react-native';
import {LogInImage, SignUpImage} from '../../assets/Image/index';
import {useFormik} from 'formik';
import {screenType} from './index';
import {
  signUpValidationSchema,
  logInValidationSchema,
} from '../../../validationShema/index';

interface AuthProps {
  screenName: string;
  buttonText: string;
  onScreenChange: () => void;
  initialValues: SignUpField;
  setScreen?: (value: any) => void;
  bottomText: string;
  onSubmit: (value: SignUpField, {resetForm}: any) => void;
  isUserLoading: boolean;
}

type SignUpField = {
  name?: string;
  email: string;
  password: string;
};

const AuthForm: React.FC<PropsWithChildren<AuthProps>> = props => {
  const {
    screenName,
    buttonText,
    bottomText,
    onSubmit: handleFormSubmit,
    onScreenChange,
    isUserLoading,
  } = props;

  const intialValue = useMemo(() => {
    if (screenName === screenType.login) {
      return {email: '', password: ''};
    }
    return {name: '', email: '', password: ''};
  }, [screenName]);

  const {
    handleChange,
    resetForm,
    values,
    errors,
    dirty,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: intialValue,
    validationSchema:
      screenName === screenType.signup
        ? signUpValidationSchema
        : logInValidationSchema,
    onSubmit: async (value: SignUpField) => {
      try {
        handleFormSubmit(value, {resetForm});
      } catch (error) {
        console.log(error);
      }
    },
  });

  const disableButton = !(dirty && Object.keys(errors).length === 0);
  return (
    <ScrollView style={s.root}>
      <Image
        style={s.image}
        source={screenName === screenType.signup ? SignUpImage : LogInImage}
      />
      <View style={s.formContentWrapper}>
        <Text style={s.formTitle}>{screenName}</Text>
        <View style={s.form}>
          {screenName === screenType.signup && (
            <View style={s.formInputWrapper}>
              <At color={theme.icon.primary} />
              <View style={s.formInputContent}>
                <TextField
                  placeholder="John Deo"
                  style={s.formInput}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholderTextColor={theme.input.text}
                  onBlur={handleBlur('name')}
                  enableErrors={Boolean(errors.name && touched.name)}
                  validationMessage={errors.name}
                />
              </View>
            </View>
          )}
          <View style={s.formInputWrapper}>
            <User color={theme.icon.primary} />
            <View style={s.formInputContent}>
              <TextField
                placeholder="yourmail@gmail.com"
                style={s.formInput}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholderTextColor={theme.input.text}
                onBlur={handleBlur('email')}
                enableErrors={Boolean(errors.email && touched.email)}
                validationMessage={errors.email}
              />
            </View>
          </View>
          <View style={s.formInputWrapper}>
            <Keyhole color={theme.icon.primary} />
            <View style={s.formInputContent}>
              <TextField
                placeholder="Password"
                style={s.formInput}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholderTextColor={theme.input.text}
                enableErrors={Boolean(errors.password && touched.password)}
                validationMessage={errors.password}
                secureTextEntry
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[s.button, {opacity: disableButton ? 0.7 : 1}]}
          disabled={disableButton}
          onPress={() => handleSubmit()}
          activeOpacity={0.8}>
          <Text style={s.buttonText}>
            {isUserLoading ? <ActivityIndicator color="#fff" /> : buttonText}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        hitSlop={{
          top: 20,
        }}
        style={s.bottomWrapper}
        onPress={() => {
          resetForm();
          onScreenChange();
        }}>
        <Text style={s.bottomText}>{bottomText}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AuthForm;
const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: theme.colors.white,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    aspectRatio: 1,
    alignSelf: 'center',
  },

  formContentWrapper: {flex: 1.5, gap: 20},

  formTitle: {
    fontSize: 50,
    fontFamily: fonts.CarosSoftBold,
    color: theme.text.primary,
  },
  form: {gap: 10},
  formInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  formInputContent: {flex: 1},
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: theme.input.bottomBorder,
    paddingHorizontal: 5,
    height: 50,
    fontSize: 16,
    fontFamily: fonts.CarosSoftMedium,
  },
  button: {
    backgroundColor: theme.button.color,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 14,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.CarosSoftMedium,
    color: theme.button.text,
  },
  bottomWrapper: {
    marginTop: 30,
    marginBottom: 50,
  },
  bottomText: {
    fontSize: 16,
    fontFamily: fonts.CarosSoftBold,
    textAlign: 'center',
    marginBottom: 20,
  },
});
