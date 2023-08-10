import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextField} from 'react-native-ui-lib';
import {useKeyboard} from '@react-native-community/hooks';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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

export type MyRouteProp = RouteProp<Record<string, {id?: string}>>;
interface TransactionFormProps {
  close: () => void;
  id?: string;
}

const TransactionForm = (props: TransactionFormProps) => {
  const {close, id} = props;
  const [paramId, setParamId] = useState(id);
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
  const keyboard = useKeyboard();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);

  const [activeTab, setActiveTab] = useState<TransactionType>(
    TransactionType.Expense,
  );

  const selectedCategory =
    activeTab === TransactionType.Expense
      ? expenseCategories[0]
      : incomeCategories[0];

  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const formik = useFormik({
    initialValues: {} as CreateTransactionPayload,
    validationSchema: transactionValidationSchema,
    onSubmit: () => {},
  });

  const {
    values,
    handleChange,
    resetForm,
    setFieldValue,
    errors,
    touched,
    dirty,
    handleBlur,
  } = formik;

  const scrollViewRef = useRef<ScrollView | null>(null);
  const disableButton = !(dirty && Object.keys(errors).length === 0);

  const {
    user: {user},
  } = useSelector((store: RootState) => store);

  const formikRef = useRef(formik);

  useEffect(() => {
    if (paramId) {
      setParamId(id);
      const category =
        values.transactionType === TransactionType.Expense
          ? expenseCategories[0]
          : incomeCategories[0];
      setFieldValue('category', category);
      setActiveTab(singleTransaction?.data?.transactionType as TransactionType);
      return;
    }
  }, [
    id,
    paramId,
    setFieldValue,
    singleTransaction?.data?.transactionType,
    values.transactionType,
  ]);

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
        amount: 0,
      });
    }
  }, [singleTransaction, user?._id]);

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
    setDatePickerVisibility(false);
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
      {singleTransactionLoading ? (
        <View style={s.loadingWrapper}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={s.root}>
            <View style={s.tabWrapper}>
              <View
                style={[
                  s.tab,
                  activeTab === TransactionType.Income && s.activeTab,
                ]}>
                <TouchableOpacity
                  style={s.tabButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Income);
                    setActiveTab(TransactionType.Income);
                  }}>
                  <Text
                    style={[
                      s.tabText,
                      activeTab === TransactionType.Income && s.activeTabText,
                    ]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  s.tab,
                  activeTab === TransactionType.Expense && s.activeTab,
                ]}>
                <TouchableOpacity
                  style={s.tabButton}
                  activeOpacity={0.8}
                  hitSlop={20}
                  onPress={() => {
                    setFieldValue('transactionType', TransactionType.Expense);
                    setActiveTab(TransactionType.Expense);
                  }}>
                  <Text
                    style={[
                      s.tabText,
                      activeTab === TransactionType.Expense && s.activeTabText,
                    ]}>
                    Expense
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={s.form}>
              <View style={s.formInputWrapper}>
                <List size={32} color={theme.icon.primary} />
                <View style={s.formInputContent}>
                  <TextField
                    placeholder="category"
                    style={s.formInput}
                    onFocus={() => setCategoryVisible(true)}
                    value={values.category}
                    showSoftInputOnFocus={false}
                    onPressOut={() => setCategoryVisible(true)}
                    enableErrors={Boolean(errors.category && touched.category)}
                    validateOnStart
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
                    validationMessage={errors.date as string}
                    enableErrors={Boolean(errors.date && touched.date)}
                    validateOnStart
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
                    onBlur={handleBlur('description')}
                    validationMessage={errors.description}
                    validateOnStart
                    enableErrors={Boolean(
                      errors.description && touched.description,
                    )}
                  />
                </View>
              </View>
              <View style={s.formInputWrapper}>
                <CurrencyInr size={32} color={theme.icon.primary} />
                <View style={s.formInputContent}>
                  <TextField
                    placeholder="0"
                    value={String(values.amount)}
                    keyboardType="numeric"
                    onBlur={handleBlur('amount')}
                    onChangeText={handleChange('amount')}
                    style={s.formInput}
                    validationMessage={errors.amount}
                    validateOnBlur
                    enableErrors={Boolean(errors.amount && touched.amount)}
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
                    disabled={disableButton}>
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
      {isCategoryVisible && (
        <View style={s.category}>
          <FlatList
            data={
              activeTab === TransactionType.Expense
                ? expenseCategories
                : incomeCategories
            }
            contentContainerStyle={{
              padding: 10,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  s.categoryButton,
                  item === activeCategory && s.selectedButton,
                ]}
                onPress={() => {
                  setFieldValue('category', item);
                  setActiveCategory(item);
                }}>
                <Text
                  style={[
                    s.categoryText,
                    item === activeCategory && s.selectedCategory,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            numColumns={3}
          />
        </View>
      )}
      {keyboard.keyboardShown && <View style={{height: 1400}} />}
    </>
  );
};
export default TransactionForm;

const s = StyleSheet.create({
  category: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  categoryButton: {
    width: Dimensions.get('window').width / 3 - 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    margin: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: fonts.CarosSoftBold,
  },
  selectedCategory: {
    color: theme.button.color,
  },
  selectedButton: {
    borderColor: theme.button.color,
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: theme.button.color,
    borderRadius: 10,
    padding: 5,
    display: 'flex',
  },
  tab: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabText: {fontSize: 16, color: theme.button.text},
  activeTab: {
    backgroundColor: '#ffffff',
  },
  activeTabText: {
    color: theme.button.color,
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

  categoryWrapper: {
    padding: 20,
  },

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
