declare module "react-native-config" {
  export interface NativeConfig {
    ENCRYPTION_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
