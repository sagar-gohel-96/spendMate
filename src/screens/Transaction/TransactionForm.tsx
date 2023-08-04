import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RadioButton, RadioGroup, TextField} from 'react-native-ui-lib';
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
import {List, Calendar, FileText, CurrencyInr} from 'phosphor-react-native';
import {X} from 'phosphor-react-native';

export type MyRouteProp = RouteProp<Record<string, {id?: string}>>;
interface TransactionFormProps {
  close: () => void;
  id?: string;
}

const TransactionForm = (props: TransactionFormProps) => {
  const {close, id} = props;
  const [paramId, setParamId] = useState(id);
  const {ref, open, close: closeCategorySheet} = useModalize();
  const keyboard = useKeyboard();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [styleType, setStyleType] = useState(false);
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

  const handleCancelTransaction = () => {
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
          <View style={s.loadingWrapper}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={s.root}>
              <View style={s.tabWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Expense);
                    setStyleType(!styleType);
                  }}
                  style={styleType ? s.activeTab : s.inActiveTab}>
                  <Text style={styleType ? s.activeTabText : s.inActiveTabText}>
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Income);
                    setStyleType(!styleType);
                  }}
                  style={!styleType ? s.activeTab : s.inActiveTab}>
                  <Text
                    style={!styleType ? s.activeTabText : s.inActiveTabText}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={s.form}>
                <View style={s.formInputWrapper}>
                  <List size={32} color={theme.icon.primary} />
                  <View style={s.formInputContent}>
                    <TextField
                      placeholder="category"
                      style={s.formInput}
                      onFocus={() => open()}
                      value={values.category}
                      showSoftInputOnFocus={false}
                      onPressOut={() => open()}
                    />
                  </View>
                </View>

                <View style={s.formInputWrapper}>
                  <Calendar size={32} color={theme.icon.primary} />
                  <View style={s.formInputContent}>
                    <TextField
                      placeholder="DD/MM/YYYY"
                      style={s.formInput}
                      showSoftInputOnFocus={false}
                      onFocus={() => showDatePicker()}
                      value={values?.date?.toDateString()}
                    />
                  </View>
                </View>

                <View style={s.formInputWrapper}>
                  <FileText size={32} color={theme.icon.primary} />
                  <View style={s.formInputContent}>
                    <TextField
                      placeholder="Description"
                      style={s.formInput}
                      value={values.description}
                      onChangeText={handleChange('description')}
                    />
                  </View>
                </View>

                <View style={s.formInputWrapper}>
                  <CurrencyInr size={32} color={theme.icon.primary} />
                  <View style={s.formInputContent}>
                    <TextField
                      placeholder="0"
                      value={values.amount?.toString()}
                      keyboardType="numeric"
                      onChangeText={handleChange('amount')}
                      style={s.formInput}
                    />
                  </View>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              {paramId ? (
                <View style={s.btngrp}>
                  <View style={s.secondaryButton}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => showDeleteAlert(handleDeleteTransaction)}
                      disabled={deleteTransactionLoading}>
                      <Text style={s.secondaryButtonText}>
                        {deleteTransactionLoading ? 'Deleting' : 'Delete'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={s.primaryButton}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleUpdateTransaction}
                      disabled={updateTransactionLoading}>
                      <Text style={s.buttonText}>
                        {updateTransactionLoading ? 'Updating...' : 'Update'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={s.btngrp}>
                  <View style={s.secondaryButton}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleCancelTransaction}>
                      <Text style={s.secondaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={s.primaryButton}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleCreateTransaction}
                      disabled={createTransactionLoading}>
                      <Text style={s.buttonText}>
                        {createTransactionLoading ? 'Saving...' : 'Save'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
        {keyboard.keyboardShown && <View style={{height: 1400}} />}
      </ScrollView>
      <Modalize adjustToContentHeight ref={ref}>
        <TouchableOpacity
          onPress={() => closeCategorySheet()}
          style={s.cancelWrapper}
          hitSlop={0.3}>
          <X weight="fill" size={28} color="white" />
        </TouchableOpacity>
        <View style={s.categoryWrapper}>
          <RadioGroup
            onValueChange={handleChange('category')}
            value={values.category}
            style={s.radioGroup}>
            {values.transactionType === 'Expense' &&
              expenseCategories.map((i, index) => (
                <View style={s.categoryContent} key={index}>
                  <RadioButton value={i} />
                  <Text style={s.categoryText}>{i}</Text>
                </View>
              ))}
            {values.transactionType === 'Income' &&
              incomeCategories.map((i, index) => (
                <View style={s.categoryContent} key={index}>
                  <RadioButton value={i} />
                  <Text style={s.categoryText}>{i}</Text>
                </View>
              ))}
          </RadioGroup>
        </View>
      </Modalize>
    </>
  );
};
export default TransactionForm;

const s = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  inActiveTab: {
    borderBottomWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderBottomColor: theme.button.color,
  },
  activeTabText: {
    textAlign: 'center',
    fontFamily: fonts.CarosSoftBold,
    color: theme.icon.primary,
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderBottomColor: theme.icon.primary,
  },
  inActiveTabText: {
    textAlign: 'center',
    fontFamily: fonts.CarosSoftMedium,
    color: theme.button.color,
    fontSize: 16,
  },
  root: {padding: 18},
  cancelWrapper: {
    marginRight: 10,
    marginTop: 10,
    padding: 8,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: '#e7e7e7',
    borderRadius: 50,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
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

  categoryText: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 20,
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

  categoryWrapper: {
    padding: 20,
  },

  typeRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  radioGroup: {
    gap: 10,
  },

  errorText: {color: 'red', fontFamily: fonts.CarosSoftMedium},

  buttonText: {
    fontSize: 14,
    fontFamily: fonts.CarosSoftMedium,
    color: theme.button.text,
    textAlign: 'center',
  },

  btngrp: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 20,
  },

  primaryButton: {
    backgroundColor: theme.button.color,
    borderRadius: 10,
    padding: 14,
    flex: 1,
  },
  secondaryButton: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.button.color,
    flex: 1,
  },
  secondaryButtonText: {
    color: theme.button.color,
    fontSize: 14,
    fontFamily: fonts.CarosSoftMedium,
    textAlign: 'center',
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
});
