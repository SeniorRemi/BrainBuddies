import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './Screens/RegisterPage';
import LoginPage from './Screens/LoginPage';

const Stack = createNativeStackNavigator();


export default function App() {

return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name = 'Register' component={RegisterPage} />
   
  </Stack.Navigator>
</NavigationContainer>
);
};