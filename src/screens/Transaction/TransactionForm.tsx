import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';

const TransactionForm = () => {
  const [checked, setChecked] = React.useState('first');
  return (
    <View>
      <TextInput label="description" mode="outlined" />
      <View>
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <Text>hello</Text>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
      </View>
    </View>
  );
};

export default TransactionForm;
