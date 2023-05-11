import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {View} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {fonts} from '../../utils/fonts';
import {theme} from '../../utils/theme';
import {Icon} from '../../modules/core';
import {categories} from '../../utils/categories';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TransactionForm = () => {
  const [checked, setChecked] = useState('first');
  const [categoryVisible, setcategoryVisible] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const category: string[] = [];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log(date);
    hideDatePicker();
  };

  return (
    <ScrollView>
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
          <View style={formStyle.typeRadio}>
            <RadioButton
              value="income"
              status={checked === 'income' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('income')}
              color={theme.text.exeeria}
            />
            <Text style={formStyle.text}>income</Text>
          </View>
          <View style={formStyle.typeRadio}>
            <RadioButton
              value="expense"
              status={checked === 'expense' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('expense')}
              color={theme.text.exeeria}
            />
            <Text style={formStyle.text}>expense</Text>
          </View>
        </View>
        <View style={formStyle.headerContainer}>
          <Icon name="shape" color={theme.text.exeeria} size="sm" />
          <Text style={formStyle.header}>Category</Text>
        </View>
        <TextInput
          placeholder="Category"
          style={formStyle.input}
          onFocus={() => setcategoryVisible(true)}
          showSoftInputOnFocus={false}
        />
        {categoryVisible && (
          <View style={formStyle.categoryContainer}>
            {categories.map(i => (
              <Text
                onPress={() => {
                  category.push(i.name);
                  setcategoryVisible(false);
                }}>
                {i.name}
              </Text>
            ))}
          </View>
        )}
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
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
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
        />

        <Button style={formStyle.button} textColor="white">
          Save
        </Button>
      </View>
    </ScrollView>
  );
};
export default TransactionForm;

const formStyle = StyleSheet.create({
  root: {height: Dimensions.get('screen').height, padding: 12},
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
    position: 'absolute',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1,
  },
  typeRadio: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.text.exeeria,
    marginTop: 8,
  },
});
