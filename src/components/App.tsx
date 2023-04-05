/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './screens/Home';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Home />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
