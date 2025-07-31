import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExampleInitialSetScreen from './screens/ExampleInitialSet';
import ExamplesScreen from './screens/Examples';

export const RootStack = createNativeStackNavigator({
  initialRouteName: 'Examples',
  screens: {
    Examples: {
      screen: ExamplesScreen,
      options: () => ({
        title: 'Examples',
      }),
    },
    ExampleInitialSet: {
      screen: ExampleInitialSetScreen,
      options: () => ({
        title: 'Preselected option',
      }),
    },
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

export default function Navigation() {
  return <StaticNavigation />;
}
