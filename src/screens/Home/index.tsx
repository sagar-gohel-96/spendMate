import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Logo from '../../components/logo';
import {Icon, Select} from '../../modules/core';
import {value} from '../../modules/core/Select';

const HomeScreen = () => {
  const data: value[] = [
    {label: 'daily', value: 'daily'},
    {label: 'weekly', value: 'weekly'},
    {label: 'monthly', value: 'monthly'},
    {label: 'yearly', value: 'yearly'},
  ];
  const {searchContainer, rootContainer, headerContainer} = homeScreenStyle;
  const [selectedValue, setSelectedValue] = useState('daily');
  return (
    <View style={rootContainer}>
      <View style={searchContainer}>
        <Logo />
        <Icon name="magnify" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Avatar.Text size={40} label="XD" />
        <View style={headerContainer}>
          <Text>Morning</Text>
          <Text>Jef oliver</Text>
        </View>
      </View>
      <Select
        selectedValue={selectedValue}
        data={data}
        setSelectedValue={setSelectedValue}
      />
    </View>
  );
};

export default HomeScreen;

const homeScreenStyle = StyleSheet.create({
  rootContainer: {padding: 15, backgroundColor: '#F2F2F2'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerContainer: {},
});
