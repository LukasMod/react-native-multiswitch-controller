import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import ExampleInitialSetScreen from './screens/ExampleInitialSet';
import TabsExampleScreen from './screens/TabsExample';
import SegmentedControlExampleScreen from './screens/SegmentedControlExample';

export const RootStack = createNativeStackNavigator({
  initialRouteName: 'SegmentedControlExample',
  screens: {
    SegmentedControlExample: {
      screen: SegmentedControlExampleScreen,
      options: ({ navigation }) => ({
        title: 'Segmeneted Control',
        headerRight: () => (
          <Button
            title="Tabs"
            onPress={() => {
              navigation.navigate('TabsExample');
            }}
          />
        ),
      }),
    },
    TabsExample: {
      screen: TabsExampleScreen,
      options: () => ({
        title: 'Example Tabs',
      }),
    },
    ExampleInitialSet: {
      screen: ExampleInitialSetScreen,
      options: () => ({
        title: 'Example Initial Based on Route',
      }),
    },
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

export default function Navigation() {
  return <StaticNavigation />;
}
