import * as ImagePicker from "expo-image-picker";
import { PermissionStatus } from "expo-image-picker";

type PickPhotoOptions = {
  onPickPhoto: (photo: ImagePicker.ImagePickerResult) => Promise<void>;
};

type UserImagePicker = {
  pickPhoto: () => Promise<void>;
  isCameraAvailable: boolean;
  cameraPermissionStatus: PermissionStatus;
  isMediaLibraryAvailable: boolean;
  mediaLibraryStatus: PermissionStatus;
  requestCameraPermission: () => void;
  requestMediaLibraryPermission: () => void;
};

const useImagePicker = ({ onPickPhoto }: PickPhotoOptions): UserImagePicker => {
  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  return {
    isCameraAvailable: !!cameraStatus?.granted,
    isMediaLibraryAvailable: !!mediaLibraryStatus?.granted,
    cameraPermissionStatus:
      cameraStatus?.status ?? PermissionStatus.UNDETERMINED,
    mediaLibraryStatus:
      mediaLibraryStatus?.status ?? PermissionStatus.UNDETERMINED,
    // eslint-disable-next-line
    requestCameraPermission,
    // eslint-disable-next-line
    requestMediaLibraryPermission,
    pickPhoto: async () => {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      await onPickPhoto(photo);
    },
  };
};

export default useImagePicker;
