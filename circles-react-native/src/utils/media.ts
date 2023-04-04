import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { Alert } from 'react-native';

export default async function getPermissionAsync(permission: Permissions.PermissionType) {
  const { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ');
    Alert.alert(
      'Cannot be done 😞',
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "Let's go!",
          onPress: () => Linking.openURL('app-settings:'),
        },
        { text: 'Nevermind', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true }
    );

    return false;
  }
  return true;
}

export async function getLocationAsync() {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (granted) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      return location;
    }
  }
}

export async function pickImageAsync() {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (granted) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      return result.assets;
    }
  }
}

export async function takePictureAsync() {
  if (await ImagePicker.requestCameraPermissionsAsync()) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      return result.assets;
    }
  }
}
