import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamplePillsScreen from './screens/ExamplePills';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'ExamplePills',
  screens: {
    ExamplePills: {
      screen: ExamplePillsScreen,
      options: {
        title: 'Example Pills',
      },
    },
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

export default function Navigation() {
  return <StaticNavigation />;
}
