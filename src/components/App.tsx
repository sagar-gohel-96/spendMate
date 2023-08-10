import React, {useState} from 'react';
import 'react-native-gesture-handler';
import NavigationStack from '../navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClientProvider, QueryClient} from 'react-query';
import {store} from '../app/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <NavigationStack />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
