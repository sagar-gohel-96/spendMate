import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, RadioButton, RadioGroup} from 'react-native-ui-lib';
import {useKeyboard} from '@react-native-community/hooks';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Modalize, useModalize} from 'react-native-modalize';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {useFormik} from 'formik';
import {RouteProp} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
import {expenseCategories, incomeCategories} from '../../utils/categories';
import {useTransaction} from '../../entity/hook/useTransaction';
import {transactionValidationSchema} from '../../../validationShema';
import {CreateTransactionPayload, TransactionType} from '../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type MyRouteProp = RouteProp<Record<string, {id?: string}>>;
interface TransactionFormProps {
  close: () => void;
  id?: string;
}

const TransactionForm = (props: TransactionFormProps) => {
  const {close, id} = props;
  const {ref, open} = useModalize();
  const keyboard = useKeyboard();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [paramId, setParamId] = useState(id);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const {
    user: {user},
  } = useSelector((store: RootState) => store);

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

  console.log(singleTransaction, 'aaa');

  const formik = useFormik({
    initialValues: {} as CreateTransactionPayload,
    validationSchema: transactionValidationSchema,
    onSubmit: () => {},
  });

  const {values, handleChange, resetForm, setFieldValue, errors} = formik;

  const formikRef = useRef(formik);
  useEffect(() => {
    setParamId(id);
  }, [id]);

  const setFormValues = useCallback(() => {
    if (singleTransaction) {
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
        category: expenseCategories[0],
        date: new Date(),
        description: '',
        transactionType: TransactionType.Expense,
        amount: null,
      });
    }
  }, [singleTransaction, user?._id]);

  useEffect(() => {
    const category =
      values.transactionType === TransactionType.Expense
        ? expenseCategories[0]
        : incomeCategories[0];
    setFieldValue('category', category);
  }, [setFieldValue, values.transactionType]);

  useEffect(() => {
    setFormValues();
  }, [id, setFormValues]);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      scrollViewRef.current?.scrollTo({y: 230, animated: true});
    }
  }, [keyboard, keyboard.keyboardShown]);

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, [setDatePickerVisibility]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFieldValue('date', date);
  };

  const handleCreateTransaction = async () => {
    if (Object.keys(errors).length > 0) {
      Snackbar.show({
        text: JSON.stringify(errors),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    await mutateCreateTransaction(values);
    Snackbar.show({
      text: 'Transaction Created',
      duration: Snackbar.LENGTH_LONG,
    });
    resetForm();
    close();
  };

  const handleUpdateTransaction = async () => {
    await mutateUpdateTransaction({
      transactionId: paramId as string,
      payload: values,
    });
    Snackbar.show({
      text: 'Transaction Updated',
      duration: Snackbar.LENGTH_LONG,
    });
    close();
  };

  const handleDeleteTransaction = async () => {
    await mutateDeleteTransaction().then(() =>
      Snackbar.show({
        text: 'Transaction Deleted',
        duration: Snackbar.LENGTH_LONG,
      }),
    );
    close();
  };

  const showDeleteAlert = (onConfirm: () => void) => {
    Alert.alert('DELETE', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, Delete !',
        onPress: onConfirm,
        style: 'default',
      },
    ]);
  };

  return (
    <>
      <ScrollView ref={scrollViewRef}>
        {singleTransactionLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: Dimensions.get('window').height,
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={formStyle.root}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 9,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Expense);
                  }}
                  style={{
                    backgroundColor:
                      values.transactionType === TransactionType.Expense
                        ? theme.text.exeeria
                        : theme.colors.gray,
                    borderWidth: 1,
                    paddingVertical: 12,
                    borderRadius: 12,
                    paddingHorizontal: 50,
                    borderColor:
                      values.transactionType === 'Expense'
                        ? 'white'
                        : theme.text.exeeria,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: fonts.CarosSoftBold,
                      color:
                        values.transactionType === TransactionType.Expense
                          ? 'white'
                          : theme.text.exeeria,
                      borderRadius: 8,
                      fontSize: 16,
                    }}>
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Income);
                  }}
                  style={{
                    backgroundColor:
                      values.transactionType === TransactionType.Income
                        ? theme.text.exeeria
                        : theme.colors.gray,
                    borderWidth: 1,
                    paddingVertical: 12,
                    borderRadius: 12,
                    paddingHorizontal: 50,
                    borderColor:
                      values.transactionType === 'Income'
                        ? 'white'
                        : theme.text.exeeria,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: fonts.CarosSoftExtraBold,
                      color:
                        values.transactionType === 'Income'
                          ? 'white'
                          : theme.text.exeeria,
                      borderRadius: 8,
                      fontSize: 16,
                    }}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={formStyle.headerContainer}>
                <Text style={formStyle.header}>Category</Text>
                <TextInput
                  placeholder="Category"
                  style={formStyle.input}
                  onFocus={() => open()}
                  value={values.category}
                  showSoftInputOnFocus={false}
                  onPressOut={() => open()}
                />
              </View>

              <View style={formStyle.headerContainer}>
                <Text style={formStyle.header}>Date</Text>
                <TextInput
                  placeholder="DD/MM/YYYY"
                  style={formStyle.input}
                  showSoftInputOnFocus={false}
                  onFocus={() => showDatePicker()}
                  value={values?.date?.toDateString()}
                />
              </View>

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
                <Text style={formStyle.header}>Description</Text>
                <TextInput
                  placeholder="Description"
                  style={formStyle.input}
                  textAlignVertical="top"
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
                {errors.description && errors.description && (
                  <Text style={formStyle.errorText}>{errors.description}</Text>
                )}
              </View>

              <View style={formStyle.headerContainer}>
                <Text style={formStyle.header}>Amount</Text>
                <TextInput
                  placeholder="0"
                  value={values.amount?.toString()}
                  keyboardType="numeric"
                  onChangeText={handleChange('amount')}
                  style={[
                    formStyle.input,
                    {
                      textAlign: 'left',
                      flex: 1,
                      marginLeft: 20,
                    },
                  ]}
                />
              </View>
              {errors.amount && (
                <Text style={formStyle.errorText}>{errors.amount}</Text>
              )}
            </View>

            {paramId ? (
              <View style={formStyle.btngrp}>
                <Button
                  style={formStyle.secondaryButton}
                  outline
                  outlineColor={{color: theme.text.exeeria}}
                  onPress={() => showDeleteAlert(handleDeleteTransaction)}>
                  <Text>
                    {deleteTransactionLoading ? 'Deleting' : 'Delete'}
                  </Text>
                </Button>
                <Button
                  style={formStyle.primaryButton}
                  onPress={handleUpdateTransaction}>
                  <Text style={{color: 'white'}}>
                    {updateTransactionLoading ? 'Updating...' : 'update'}
                  </Text>
                </Button>
              </View>
            ) : (
              <Button
                style={formStyle.primaryButton}
                onPress={handleCreateTransaction}
                disabled={createTransactionLoading}>
                <Text style={{color: 'white', fontSize: 20}}>
                  {createTransactionLoading ? 'Saving...' : 'Save'}
                </Text>
              </Button>
            )}
          </>
        )}
        {keyboard.keyboardShown && <View style={{height: 1400}} />}
      </ScrollView>
      <Modalize adjustToContentHeight ref={ref}>
        <View style={formStyle.categoryContainer}>
          <RadioGroup
            onValueChange={handleChange('category')}
            value={values.category}>
            {values.transactionType === 'Expense' &&
              expenseCategories.map((i, index) => (
                <View style={formStyle.div} key={index}>
                  <RadioButton value={i} color={theme.text.exeeria} />
                  <Text style={formStyle.text}>{i}</Text>
                </View>
              ))}
            {values.transactionType === 'Income' &&
              incomeCategories.map((i, index) => (
                <View style={formStyle.div} key={index}>
                  <RadioButton value={i} color={theme.text.exeeria} />
                  <Text style={formStyle.text}>{i}</Text>
                </View>
              ))}
          </RadioGroup>
        </View>
      </Modalize>
    </>
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
    margin: 4,
  },

  header: {
    fontFamily: fonts.CarosSoftBold,
    fontSize: 16,
    color: theme.text.header,
    paddingLeft: 8,
    marginRight: 20,
    flex: 1,
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
    marginTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: theme.text.exeeria,
    fontFamily: fonts.CarosSoftMedium,
    paddingLeft: 12,
    flex: 2,
    fontSize: 16,
  },

  categoryContainer: {
    paddingBottom: 60,
  },

  typeRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: theme.text.exeeria,
    marginTop: 12,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
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

  secondaryButton: {
    marginTop: 12,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
  },
});
