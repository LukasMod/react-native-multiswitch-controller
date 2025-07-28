import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { MultiswitchController } from 'react-native-multiswitch-controller';
export default function TabsExampleScreen() {
  return (
    <LinearGradient colors={['#FFF5E6', '#FFE4B5']} style={styles.container}>
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>TABS !!!!</Text>
        <MultiswitchController
          options={[
            { value: 'morning', label: '🌅' },
            { value: 'afternoon', label: '☀️' },
            { value: 'evening', label: '🌇' },
            { value: 'night', label: '🌙' },
          ]}
          defaultOption="morning"
          variant="segmentedControl"
          onControlListStateChange={(value) => {
            console.log('State onControlListStateChange changed:', value);
          }}
          segmentedControlProps={{
            inactiveBackgroundColor: 'rgba(59, 130, 246, 0.08)',
            activeBackgroundColor: 'rgb(37, 99, 235)',
          }}
        />
      </View>
      <Text style={styles.title}>RERENDER TEST</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  smallText: {
    fontSize: 12,
  },
  stateReader: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
