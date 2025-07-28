/* eslint-disable react-native/no-inline-styles */
import { LinearGradient } from 'expo-linear-gradient';
import { Button, StyleSheet, Text, View, type ColorValue } from 'react-native';
import { MultiswitchController } from 'react-native-multiswitch-controller';
import type { TimeOfDay } from '../types';
import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ControlListRef } from 'react-native-multiswitch-controller';

type SegmentedControlExampleScreenProps = StaticScreenProps<{
  timeOfDay?: TimeOfDay;
}>;

export default function SegmentedControlExampleScreen({
  route,
}: SegmentedControlExampleScreenProps) {
  const navigation = useNavigation();
  const timeOfDayMultiswitchRef = useRef<ControlListRef<TimeOfDay>>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  useEffect(() => {
    if (route.params?.timeOfDay) {
      // Use the ref to set the initial option
      timeOfDayMultiswitchRef.current?.setForcedOption(route.params.timeOfDay);
      navigation.setParams({ timeOfDay: undefined });
    }
  }, [route.params, navigation]);

  const getGradientColors = (
    timeOfDayValue: TimeOfDay
  ): [ColorValue, ColorValue] => {
    switch (timeOfDayValue) {
      case 'morning':
        return ['#FFF5E6', '#FFE4B5'];
      case 'afternoon':
        return ['#E6F3FF', '#B3D9FF'];
      case 'evening':
        return ['#FFE6E0', '#FFD6CC'];
      case 'night':
        return ['#E6E6FA', '#D8D8F6'];
      default:
        return ['#FFFFFF', '#F8F8F8'];
    }
  };

  const onChangeOptionHandler = useCallback((value: TimeOfDay) => {
    console.log('TEST onChangeOptionHandler', value);
    setTimeOfDay(value);
  }, []);

  return (
    <LinearGradient
      colors={getGradientColors(timeOfDay)}
      style={styles.container}
    >
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Dynamically set values</Text>
        <MultiswitchController<TimeOfDay>
          variant="segmentedControl"
          defaultOption="morning"
          options={[
            { value: 'morning', label: '🌅' },
            { value: 'afternoon', label: '☀️' },
            { value: 'evening', label: '🌇' },
            { value: 'night', label: '🌙' },
          ]}
          ref={timeOfDayMultiswitchRef}
          onChangeOption={onChangeOptionHandler}
          onPressItem={(value) => {
            console.log('SegmentedControlExampleScreen onPressItem:', value);
          }}
          styleProps={{
            inactiveBackgroundColor: 'rgba(59, 130, 246, 0.08)',
            activeBackgroundColor: 'rgb(37, 99, 235)',
          }}
        />
        <View style={styles.buttonsContainer}>
          <Button
            title="Set morning"
            onPress={() => {
              timeOfDayMultiswitchRef.current?.setForcedOption('morning');
            }}
          />
          <Button
            title="Set night"
            onPress={() => {
              timeOfDayMultiswitchRef.current?.setForcedOption('night');
            }}
          />
        </View>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Align to left, center or right</Text>
        <MultiswitchController<'First' | 'Second'>
          options={[
            { value: 'First', label: 'First' },
            { value: 'Second', label: 'Second' },
          ]}
          defaultOption="First"
          variant="segmentedControl"
          styleProps={{
            align: 'left',
            inactiveBackgroundColor: 'rgb(21, 87, 21)',
            activeBackgroundColor: 'rgb(60, 180, 20)',
            inactiveTextColor: 'rgb(208, 249, 205)',
            containerHeight: 52,
            itemHeight: 46,
          }}
        />
        <MultiswitchController<'First' | 'Second'>
          options={[
            { value: 'First', label: 'First' },
            { value: 'Second', label: 'Second' },
          ]}
          defaultOption="Second"
          variant="segmentedControl"
          styleProps={{
            align: 'center',
            inactiveBackgroundColor: 'rgba(220, 38, 38, 0.08)',
            activeBackgroundColor: 'rgb(185, 28, 28)',
            inactiveTextColor: 'rgb(185, 28, 28)',
            containerHeight: 28,
            itemHeight: 24,
            customTextStyle: {
              fontSize: 10,
            },
            customItemStyle: {
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 0,
            },
            customActiveOptionStyle: {
              borderRadius: 0,
            },
            customContainerStyle: {
              borderRadius: 0,
            },
          }}
        />
        <MultiswitchController<'First' | 'Second' | 'Third'>
          options={[
            { value: 'First', label: 'First' },
            { value: 'Second', label: 'Second' },
            { value: 'Third', label: 'Third' },
          ]}
          defaultOption="First"
          variant="segmentedControl"
          styleProps={{
            align: 'right',
            inactiveBackgroundColor: 'rgba(205, 197, 40, 0.08)',
            activeBackgroundColor: 'rgb(180, 170, 20)',
            inactiveTextColor: 'rgb(180, 170, 20)',
            containerHeight: 28,
            itemHeight: 24,
            customTextStyle: {
              fontSize: 10,
            },
            customItemStyle: {
              paddingHorizontal: 8,
              paddingVertical: 2,
            },
          }}
        />
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Use different width for labels</Text>
        <MultiswitchController<'First' | 'Second'>
          options={[
            { value: 'First', label: 'First is a very long label' },
            { value: 'Second', label: 'Second is short' },
          ]}
          variant="segmentedControl"
          defaultOption="First"
          styleProps={{
            containerHeight: 48,
            itemHeight: 36,
            inactiveBackgroundColor: 'rgba(30, 64, 175, 0.08)',
            activeBackgroundColor: 'rgb(30, 64, 175)',
            inactiveTextColor: 'rgb(30, 64, 175)',
            customTextStyle: styles.smallText,
          }}
        />
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.title}>
          Scrollable if there is not enough width
        </Text>
        <MultiswitchController<
          | 'First'
          | 'Second'
          | 'Third'
          | 'Fourth'
          | 'Fifth'
          | 'Sixth'
          | 'Seventh'
          | 'Eighth'
          | 'Ninth'
          | 'Tenth'
          | 'Eleventh'
          | 'Twelfth'
          | 'Thirteenth'
          | 'Fourteenth'
          | 'Fifteenth'
          | 'Sixteenth'
        >
          options={[
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
          ]}
          defaultOption="First"
          variant="segmentedControl"
          styleProps={{
            containerHeight: 54,
            itemHeight: 48,
          }}
        />
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
