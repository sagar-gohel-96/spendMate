import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from '../navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClientProvider, QueryClient} from 'react-query';

function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <PaperProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationStack />
          </QueryClientProvider>
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
