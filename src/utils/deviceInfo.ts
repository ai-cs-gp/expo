import { Dimensions, Platform } from 'react-native';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const deviceUidAsync = async (): Promise<string> => {
  if (Platform.OS === 'android') {
    return Application.getAndroidId();
  }

  const id = await Application.getIosIdForVendorAsync();
  return id ?? '';
};

export const deviceBrand = Device.brand;

export const { deviceName } = Device;

export const deviceTypeAsync = async (): Promise<string> => {
  const deviceType = await Device.getDeviceTypeAsync();

  switch (deviceType) {
    case Device.DeviceType.PHONE:
      return 'PHONE';
    case Device.DeviceType.TABLET:
      return 'TABLET';
    case Device.DeviceType.DESKTOP:
      return 'DESKTOP';
    case Device.DeviceType.TV:
      return 'TV';
    case Device.DeviceType.UNKNOWN:
    default:
      return 'UNKNOWN';
  }
};

export const deviceManufacturer = Device.manufacturer;

export const deviceModelName = Device.modelName;

export const deviceOsName = Device.osName;

export const deviceOsVersion = Device.osVersion;
