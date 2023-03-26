import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import BaseContainer from './BaseContainer';
import LoginScreen from './screen/loginScreen';
import { NavigationContainer } from "@react-navigation/native";
import StackLogin from './navigation/stack/loginStack';
import UserContext from './shared/usrContext';
import { useState } from 'react';
export default function AppMain() {
  const[userVal, setUserVal] = useState('')
  return (
    <BaseContainer>
      <UserContext.Provider  value={{userVal, setUserVal}}>
        <NavigationContainer>
          <StackLogin />
        </NavigationContainer>
      </UserContext.Provider>
    </BaseContainer>
  );
}


