import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const getPermission = async (permissionTypes) => {
  await Promise.all(permissionTypes.map(async (type) => Permissions.askAsync(type)));
};

const useImagePicker = () => {

  const takePhoto = useCallback(async () => {
    await getPermission([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
      aspect: [16, 9],
    });

    if (result.cancelled) {
      return null;
    }
    return result.uri;
  }, []);

  const selectFromCameraRoll = useCallback(async () => {
    await getPermission([Permissions.CAMERA_ROLL]);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
      aspect: [16, 9],
    });

    if (result.cancelled) {
      return null;
    }
    return result.uri;
  }, []);

  return [takePhoto, selectFromCameraRoll];
}

export default useImagePicker;
