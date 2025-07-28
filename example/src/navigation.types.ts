import type { StaticParamList } from '@react-navigation/native';
import type { RootStack } from './Navigation';

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
