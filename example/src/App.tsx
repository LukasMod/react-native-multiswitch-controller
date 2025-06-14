import { View, StyleSheet, Text } from 'react-native';
import {
  PillSwitch,
  useControlListState,
} from 'react-native-multiswitch-controller';

export default function App() {
  const controlListState1 = useControlListState({
    options: [
      { value: 'First', label: 'First' },
      { value: 'Second', label: 'Second' },
      { value: 'Third', label: 'Third' },
      { value: 'Fourth', label: 'Fourth' },
      { value: 'Fifth', label: 'Fifth' },
      { value: 'Sixth', label: 'Sixth' },
      { value: 'Seventh', label: 'Seventh' },
      { value: 'Eighth', label: 'Eighth' },
      { value: 'Ninth', label: 'Ninth' },
      { value: 'Tenth', label: 'Tenth' },
      { value: 'Eleventh', label: 'Eleventh' },
      { value: 'Twelfth', label: 'Twelfth' },
      { value: 'Thirteenth', label: 'Thirteenth' },
      { value: 'Fourteenth', label: 'Fourteenth' },
      { value: 'Fifteenth', label: 'Fifteenth' },
      { value: 'Sixteenth', label: 'Sixteenth' },
    ],
    defaultOption: 'First',
    variant: 'segmentedControl',
  });
  const controlListState2 = useControlListState({
    options: [
      { value: 'First', label: 'First' },
      { value: 'Second', label: 'Second' },
    ],
    defaultOption: 'First',
    variant: 'segmentedControl',
  });
  const controlListState3 = useControlListState({
    options: [
      { value: 'First', label: 'First' },
      { value: 'Second', label: 'Second' },
    ],
    defaultOption: 'Second',
    variant: 'segmentedControl',
  });
  const controlListState4 = useControlListState({
    options: [
      { value: 'First', label: 'First is a very long label' },
      { value: 'Second', label: 'Second is short' },
    ],
    defaultOption: 'First',
    variant: 'segmentedControl',
  });

  const isTestMode = false;

  return (
    <View style={styles.container}>
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Align to left, center or right</Text>
        <PillSwitch
          controlListState={controlListState2}
          align="left"
          inactiveBackgroundColor="rgb(21, 87, 21)"
          activeBackgroundColor="rgb(60, 180, 20)"
          inactiveTextColor="rgb(208, 249, 205)"
        />
        <PillSwitch
          controlListState={controlListState2}
          align="center"
          inactiveBackgroundColor="rgba(220, 38, 38, 0.08)"
          activeBackgroundColor="rgb(185, 28, 28)"
          inactiveTextColor="rgb(185, 28, 28)"
        />
        <PillSwitch
          controlListState={controlListState2}
          align="right"
          inactiveBackgroundColor="rgba(205, 197, 40, 0.08)"
          activeBackgroundColor="rgb(180, 170, 20)"
          inactiveTextColor="rgb(180, 170, 20)"
        />
        {isTestMode && (
          <Text style={styles.selectedText}>
            Selected: {controlListState2.activeOption}
          </Text>
        )}
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Set initial value</Text>
        <PillSwitch
          controlListState={controlListState3}
          inactiveBackgroundColor="rgba(59, 130, 246, 0.08)"
          activeBackgroundColor="rgb(37, 99, 235)"
          inactiveTextColor="rgb(37, 99, 235)"
          activeTextColor="rgb(253, 230, 138)"
        />
        {isTestMode && (
          <Text style={styles.selectedText}>
            Selected: {controlListState3.activeOption}
          </Text>
        )}
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Use different width for labels</Text>
        <PillSwitch
          controlListState={controlListState4}
          containerHeight={48}
          itemHeight={36}
          inactiveBackgroundColor="rgba(30, 64, 175, 0.08)"
          activeBackgroundColor="rgb(30, 64, 175)"
          inactiveTextColor="rgb(30, 64, 175)"
        />
        {isTestMode && (
          <Text style={styles.selectedText}>
            Selected: {controlListState4.activeOption}
          </Text>
        )}
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>
          Scrollable if there is not enough width
        </Text>
        <PillSwitch
          controlListState={controlListState1}
          customItemStyle={{}}
          containerHeight={54}
          itemHeight={48}
        />
        {isTestMode && (
          <Text style={styles.selectedText}>
            Selected: {controlListState1.activeOption}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 10,
  },
  title: {
    fontSize: 18,
    padding: 10,
  },
  selectedText: {
    fontSize: 16,
    padding: 4,
    alignSelf: 'center',
  },
  bigContainer: {
    width: '100%',
    marginBottom: 20,
  },
  exampleContainer: {},
});
