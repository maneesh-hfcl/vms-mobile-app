import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    console.log("check 1");
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    console.log("project id: " + projectId);
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      console.log("check 2");
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("check 3");
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      console.log("check error occured!!!");
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

function handleRegistrationError(errorMessage) {
  console.log(e);
  alert(errorMessage);
  throw new Error(errorMessage);
}


/*
export async function registerForPushNotificationsAsync() {
    let token;
    console.log("start token");
    if (Device.isDevice) {
      console.log("start token 2");
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      console.log("start token 3");
      let finalStatus = existingStatus;
      console.log("start token 14");
      if (existingStatus !== 'granted') {
        console.log("start token 15");
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("start token 16");
        finalStatus = status;
      }
      console.log("start token 17");
      if (finalStatus !== 'granted') {
        console.log("start token 18");
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log("start token 19");
      try
      {
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
           projectId: 'm3s-mobile'//'your-project-id',
      });
      console.log(expoPushToken)
      token = expoPushToken.data;
      console.log("start token 10");
      return token;
      }
      catch(e)
      {
        console.log('exception occured!!!')
        console.log(e)
      }
//      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    console.log("token 11");
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    console.log("token 12");
    console.log("return token");
    return token;
  }

*/
