import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/home';
import ProductDetails from './src/components/productDetails';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider, Box} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                  headerTitle: 'Details',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
