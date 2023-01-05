import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import BaseContainer from './BaseContainer';
import LoginScreen from './screen/loginScreen';
import { NavigationContainer } from "@react-navigation/native";
import StackLogin from './navigation/stack/loginStack';

export default function App() {
  return (
     <BaseContainer>
        <NavigationContainer>
          <StackLogin />
        </NavigationContainer>
      </BaseContainer>
  );
}


