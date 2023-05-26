import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {View} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
import {Icon} from '../../modules/core';
import {categories} from '../../utils/categories';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useFormik} from 'formik';
import {Modalize, useModalize} from 'react-native-modalize';
import {useKeyboard} from '@react-native-community/hooks';
import {useTransaction} from '../../entity/hook/useTransaction';
import {transactionValidationSchema} from '../../../validationShema';

const TransactionForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {mutateCreateTransaction} = useTransaction();

  const {ref, open} = useModalize();
  const keyboard = useKeyboard();

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      scrollViewRef.current?.scrollTo({y: 230, animated: true});
    }
  }, [keyboard, keyboard.keyboardShown]);

  enum TransactionType {
    Income = 'income',
    Expense = 'expense',
  }

  const {values, handleChange, handleSubmit, setFieldValue, errors, touched} =
    useFormik({
      initialValues: {
        category: categories[0],
        date: new Date(),
        description: '',
        type: TransactionType.Expense,
        amount: 0,
      },
      validationSchema: transactionValidationSchema,
      onSubmit: (value, {resetForm}) => {
        mutateCreateTransaction(value);
        resetForm({});
      },
    });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFieldValue('date', date);
    hideDatePicker();
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={formStyle.root}>
        <View style={formStyle.headerContainer}>
          <Icon
            name="format-list-bulleted-type"
            color={theme.text.exeeria}
            size="sm"
          />
          <Text style={formStyle.header}>Type</Text>
        </View>
        <View style={formStyle.transactionType}>
          <RadioButton.Group
            onValueChange={handleChange('type')}
            value={values.type}>
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
        {touched.type && errors.type && (
          <Text style={formStyle.errorText}>{errors.type}</Text>
        )}
        <View style={formStyle.headerContainer}>
          <Icon name="shape" color={theme.text.exeeria} size="sm" />
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
          <Icon
            name="clipboard-text-clock-outline"
            color={theme.text.exeeria}
            size="sm"
          />
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
        {touched.date && errors.date && (
          <Text style={formStyle.errorText}>
            {errors.date as React.ReactNode}
          </Text>
        )}

        <View style={formStyle.headerContainer}>
          <Icon name="shape" color={theme.text.exeeria} size="sm" />
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
        <View style={formStyle.headerContainer}>
          <Icon name="currency-rupee" color={theme.text.exeeria} size="sm" />
          <Text style={formStyle.header}>Amount</Text>
          <TextInput
            value={values.amount?.toString()}
            keyboardType="numeric"
            onChange={handleChange('amount')}
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
        {touched.amount && errors.amount && (
          <Text style={formStyle.errorText}>{errors.amount}</Text>
        )}

        <Button
          style={formStyle.button}
          textColor="white"
          onPress={handleSubmit}>
          Save
        </Button>
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
  },
  typeRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.text.exeeria,
    marginTop: 8,
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {color: 'red', fontFamily: fonts.CarosSoftMedium},
});
