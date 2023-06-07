import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {useKeyboard} from '@react-native-community/hooks';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Modalize, useModalize} from 'react-native-modalize';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {useFormik} from 'formik';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
import {Icon} from '../../modules/core';
import {categories} from '../../utils/categories';
import {useTransaction} from '../../entity/hook/useTransaction';
import {transactionValidationSchema} from '../../../validationShema';
import {CreateTransactionPayload, TransactionType} from '../../types';

export type MyRouteProp = RouteProp<Record<string, {id?: string}>>;

const TransactionForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [paramId, setParamId] = useState('');
  // const isFocused = useIsFocused();

  const {
    mutateCreateTransaction,
    createTransactionLoading,
    mutateDeleteTransaction,
    mutateUpdateTransaction,
    singleTransaction,
    singleTransactionLoading,
    updateTransactionLoading,
    deleteTransactionLoading,
  } = useTransaction(paramId);

  const {
    user: {user},
  } = useSelector((store: RootState) => store);

  const {ref, open} = useModalize();
  const keyboard = useKeyboard();
  const navigation = useNavigation<any>();
  const route = useRoute<MyRouteProp>();
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      scrollViewRef.current?.scrollTo({y: 230, animated: true});
    }
  }, [keyboard, keyboard.keyboardShown]);

  const formik = useFormik({
    initialValues: {
      // userId: user?._id!,
      // category: categories[0],
      // date: new Date(),
      // description: '',
      // transactionType: TransactionType.Expense,
      // amount: 0,
    } as CreateTransactionPayload,
    validationSchema: transactionValidationSchema,
    onSubmit: () => {},
  });

  const {values, handleChange, resetForm, setFieldValue, errors} = formik;

  const formikRef = useRef(formik);

  useFocusEffect(
    useCallback(() => {
      if (singleTransaction && paramId) {
        formikRef.current?.setValues({
          userId: singleTransaction.data.userId,
          category: singleTransaction.data.category,
          date: new Date(singleTransaction.data.date),
          description: singleTransaction.data.description,
          transactionType: singleTransaction.data.transactionType,
          amount: singleTransaction.data.amount,
        });
      } else {
        formikRef.current?.setValues({
          userId: user?._id!,
          category: categories[0],
          date: new Date(),
          description: '',
          transactionType: TransactionType.Expense,
          amount: 0,
        });
      }
    }, [paramId, singleTransaction, user?._id]),
    // if (singleTransaction && paramId) {
    //   formikRef.current?.setValues({
    //     userId: singleTransaction.data.userId,
    //     category: singleTransaction.data.category,
    //     date: new Date(singleTransaction.data.date),
    //     description: singleTransaction.data.description,
    //     transactionType: singleTransaction.data.transactionType,
    //     amount: singleTransaction.data.amount,
    //   });
    // } else {
    //   formikRef.current?.setValues({
    //     userId: user?._id!,
    //     category: categories[0],
    //     date: new Date(),
    //     description: '',
    //     transactionType: TransactionType.Expense,
    //     amount: 0,
    //   });
    // }
  );

  // useEffect(() => {
  //   if (singleTransaction && paramId) {
  //     formikRef.current?.setValues({
  //       userId: singleTransaction.data.userId,
  //       category: singleTransaction.data.category,
  //       date: new Date(singleTransaction.data.date),
  //       description: singleTransaction.data.description,
  //       transactionType: singleTransaction.data.transactionType,
  //       amount: singleTransaction.data.amount,
  //     });
  //   }
  // }, [paramId, singleTransaction, user?._id]);

  const clearRouteData = useCallback(() => {
    resetForm({});
    setParamId('');
    navigation.setParams({});
  }, [navigation, resetForm]);

  useEffect(() => {
    setParamId(route.params?.id ?? '');
    resetForm({});
    return () => {
      clearRouteData();
    };
  }, [clearRouteData, resetForm, route.params?.id]);

  useEffect(() => {
    setParamId(route.params?.id ?? '');
    // resetForm({});
  }, [paramId, resetForm, route.params]);

  // useEffect(() => {
  //   // if (params && params?.id) {
  //   //   setParamId(params?.id);
  //   // }
  //   resetForm({});
  //   return () => {
  //     console.log('inside useeffect RETURN', params);

  //     resetForm({});
  //     setParamId('');
  //   };
  // }, [isFocused, resetForm, params, paramId]);

  // useEffect(() => {
  //   const clearRouteData = () => {
  //     // Clear your route data here
  //     resetForm({});
  //     setParamId('');
  //     navigation.setParams({});
  //   };

  //   const unsubscribe = navigation.addListener('blur', clearRouteData);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigation, resetForm]);

  console.log('************** paramId', paramId);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFieldValue('date', date);
  };
  // const clearRouteData = async () => {
  //   resetForm({});
  //   setParamId('');
  //   navigation.setParams({});
  // };

  const handleCreateTransaction = async () => {
    if (Object.keys(errors).length > 0) {
      Snackbar.show({
        text: JSON.stringify(errors),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    await mutateCreateTransaction(values).then(() => {
      clearRouteData();
    });
    Snackbar.show({
      text: 'Transaction Created',
      duration: Snackbar.LENGTH_LONG,
    });
    navigation.navigate('Home');
  };

  const handleUpdateTransaction = async () => {
    await mutateUpdateTransaction({
      transactionId: paramId,
      payload: values,
    });
    clearRouteData();
    navigation.navigate('Home');
  };

  const handleDeleteTransaction = async () => {
    await mutateDeleteTransaction(paramId);
    clearRouteData();
    navigation.navigate('Home');
  };

  return (
    <ScrollView ref={scrollViewRef}>
      {singleTransactionLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={formStyle.root}>
            <View style={formStyle.headerContainer}>
              <Icon name="Type" color={theme.text.exeeria} size="sm" />
              <Text style={formStyle.header}>Type</Text>
            </View>
            <View style={formStyle.transactionType}>
              <RadioButton.Group
                onValueChange={handleChange('transactionType')}
                value={values.transactionType}>
                <View style={formStyle.typeRadio}>
                  <RadioButton
                    value={TransactionType.Expense}
                    color={theme.text.exeeria}
                  />
                  <Text style={formStyle.text}>expense</Text>
                </View>
                <View style={formStyle.typeRadio}>
                  <RadioButton
                    value={TransactionType.Income}
                    color={theme.text.exeeria}
                  />
                  <Text style={formStyle.text}>income</Text>
                </View>
              </RadioButton.Group>
            </View>
            {errors.transactionType && errors.transactionType && (
              <Text style={formStyle.errorText}>{errors.transactionType}</Text>
            )}
            <View style={formStyle.headerContainer}>
              <Icon name="Category" color={theme.text.exeeria} size="sm" />
              <Text style={formStyle.header}>Category</Text>
            </View>
            <TextInput
              placeholder="Category"
              style={formStyle.input}
              onFocus={() => open()}
              value={values.category}
              showSoftInputOnFocus={false}
              onPressOut={() => open()}
            />
            <View style={formStyle.headerContainer}>
              <Icon name="Date" color={theme.text.exeeria} size="sm" />
              <Text style={formStyle.header}>Date</Text>
            </View>
            <TextInput
              placeholder="DD/MM/YYYY"
              style={formStyle.input}
              showSoftInputOnFocus={false}
              onFocus={showDatePicker}
              value={values.date.toDateString()}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {errors.date && errors.date && (
              <Text style={formStyle.errorText}>
                {errors.date as React.ReactNode}
              </Text>
            )}
            <View style={formStyle.headerContainer}>
              <Icon name="Description" color={theme.text.exeeria} size="sm" />
              <Text style={formStyle.header}>Description</Text>
            </View>
            <TextInput
              placeholder="Description"
              style={formStyle.input}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={values.description}
              onChangeText={handleChange('description')}
            />
            {errors.description && errors.description && (
              <Text style={formStyle.errorText}>{errors.description}</Text>
            )}

            <View style={formStyle.headerContainer}>
              <Icon name="Amount" color={theme.text.exeeria} size="sm" />
              <Text style={formStyle.header}>Amount</Text>
              <TextInput
                value={values.amount?.toString()}
                keyboardType="numeric"
                onChangeText={handleChange('amount')}
                style={[
                  formStyle.input,
                  {
                    textAlign: 'center',
                    flex: 1,
                    marginLeft: 20,
                  },
                ]}
              />
            </View>
            {errors.amount && (
              <Text style={formStyle.errorText}>{errors.amount}</Text>
            )}

            {paramId ? (
              <View style={formStyle.btngrp}>
                <Button
                  style={formStyle.button}
                  textColor="white"
                  onPress={
                    handleDeleteTransaction
                    //   async () => {
                    //   await mutateDeleteTransaction(paramId).then(() =>
                    //     resetForm({}),
                    //   );
                    //   setParamId('');
                    //   navigation.navigate('Home');
                    //   Snackbar.show({
                    //     text: 'Transaction deleted',
                    //     duration: Snackbar.LENGTH_LONG,
                    //   });
                    // }
                  }>
                  {deleteTransactionLoading ? 'Deleting' : 'Delete'}
                </Button>
                <Button
                  style={formStyle.button}
                  textColor="white"
                  onPress={
                    handleUpdateTransaction
                    //   async () => {
                    //   await mutateUpdateTransaction({
                    //     transactionId: paramId,
                    //     payload: values,
                    //   });
                    //   setParamId('');
                    //   await navigation.navigate('Home');
                    //   Snackbar.show({
                    //     text: 'Transaction updated',
                    //     duration: Snackbar.LENGTH_LONG,
                    //   });
                    // }
                  }>
                  {updateTransactionLoading ? 'Updating' : 'Update'}
                </Button>
              </View>
            ) : (
              <Button
                style={formStyle.button}
                textColor="white"
                onPress={
                  handleCreateTransaction
                  //   async () => {
                  //   if (Object.keys(errors).length > 0) {
                  //     Snackbar.show({
                  //       text: JSON.stringify(errors),
                  //       duration: Snackbar.LENGTH_LONG,
                  //     });
                  //     return;
                  //   }
                  //   await mutateCreateTransaction(values).then(() => {
                  //     setParamId('');
                  //   });
                  //   Snackbar.show({
                  //     text: 'Transaction Created',
                  //     duration: Snackbar.LENGTH_LONG,
                  //   });
                  //   setParamId('');
                  //   navigation.navigate('Home');
                  // }
                }
                disabled={createTransactionLoading}>
                {createTransactionLoading ? 'Saving...' : '  Save'}
              </Button>
            )}
            <View style={{height: 240}} />
          </View>
          <Modalize adjustToContentHeight ref={ref}>
            <View style={formStyle.categoryContainer}>
              <RadioButton.Group
                onValueChange={handleChange('category')}
                value={values.category}>
                {categories.map((i, index) => (
                  <View style={formStyle.div} key={index}>
                    <RadioButton value={i} color={theme.text.exeeria} />
                    <Text style={formStyle.text}>{i}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
          </Modalize>
        </>
      )}

      {keyboard.keyboardShown && <View style={{height: 1200}} />}
    </ScrollView>
  );
};
export default TransactionForm;

const formStyle = StyleSheet.create({
  root: {padding: 18},
  banner: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 24,
    color: theme.text.header,
    borderWidth: 1,
    textAlign: 'center',
  },
  transactionType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  header: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 20,
    color: theme.text.header,
    paddingLeft: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 16,
    color: theme.radioButton.color,
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
  categoryContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  typeRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.text.exeeria,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
    fontSize: 25,
    flex: 1,
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {color: 'red', fontFamily: fonts.CarosSoftMedium},
  btngrp: {
    display: 'flex',
    flexDirection: 'row',
  },
});
