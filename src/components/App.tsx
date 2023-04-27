import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from '../navigation';

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          <NavigationStack />
        </PaperProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
