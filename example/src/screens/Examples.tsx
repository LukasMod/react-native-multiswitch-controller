import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, type ColorValue } from 'react-native';
import {
  type ControlListRef,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import Align from '../examples/Align';
import DayOfTime from '../examples/DayOfTime';
import LongLabel from '../examples/LongLabel';
import Scrollable from '../examples/Scrollable';
import type { TimeOfDay } from '../types';

type ExamplesScreenProps = StaticScreenProps<{
  timeOfDay?: TimeOfDay;
}>;

export default function ExamplesScreen({ route }: ExamplesScreenProps) {
  const navigation = useNavigation();
  const timeOfDayMultiswitchRef = useRef<ControlListRef<TimeOfDay>>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  const [variant, setVariant] = useState<ControllerVariant>('segmentedControl');

  const toggleVariant = useCallback(() => {
    setVariant((prevValue) =>
      prevValue === 'tabs' ? 'segmentedControl' : 'tabs'
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: variant === 'tabs' ? 'Tabs' : 'Segmented Control',
    });
  }, [navigation, variant]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <Button title="switch" onPress={toggleVariant} />,
    });
  }, [navigation, toggleVariant]);

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

  // onChangeOptionHandler - after animation is done
  const onChangeOptionHandler = useCallback((value: TimeOfDay) => {
    console.log('TEST onChangeOptionHandler - after animation is done', value);
    setTimeOfDay(value);
  }, []);

  return (
    <LinearGradient
      colors={getGradientColors(timeOfDay)}
      style={styles.container}
    >
      <DayOfTime
        multiswitchControllerRef={timeOfDayMultiswitchRef}
        onChangeOption={onChangeOptionHandler}
        variant={variant}
        key={`DayOfTime-${variant}`}
      />
      <Align variant={variant} key={`Align-${variant}`} />
      <LongLabel variant={variant} key={`LongLabel-${variant}`} />
      <Scrollable variant={variant} key={`Scrollable-${variant}`} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});
