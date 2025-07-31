import type { RefObject } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  MultiswitchController,
  type ControllerVariant,
  type ControlListRef,
} from 'react-native-multiswitch-controller';
import type { TimeOfDay } from '../types';
import ExampleWrapper from './ExampleWrapper';

type DayOfTimeProps = {
  multiswitchControllerRef: RefObject<ControlListRef<TimeOfDay> | null>;
  onChangeOption: (value: TimeOfDay) => void;
  variant: ControllerVariant;
};

export default function DayOfTime({
  multiswitchControllerRef,
  onChangeOption,
  variant,
}: DayOfTimeProps) {
  return (
    <ExampleWrapper title="Day of Time">
      <MultiswitchController<TimeOfDay>
        variant={variant}
        defaultOption="morning"
        options={[
          { value: 'morning', label: '🌅' },
          { value: 'afternoon', label: '☀️' },
          { value: 'evening', label: '🌇' },
          { value: 'night', label: '🌙' },
        ]}
        ref={multiswitchControllerRef}
        onChangeOption={onChangeOption}
        onPressItem={(_value) => {
          // Instant callback, without waiting for animation to finish
        }}
        optionGap={10}
        containerStyle={styles.containerStyle}
        activeOptionContainerStyle={styles.activeOptionContainerStyle}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Set morning"
          onPress={() => {
            multiswitchControllerRef.current?.setForcedOption('morning');
          }}
        />
        <Button
          title="Set night"
          onPress={() => {
            multiswitchControllerRef.current?.setForcedOption('night');
          }}
        />
      </View>
    </ExampleWrapper>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerStyle: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  activeOptionContainerStyle: {
    backgroundColor: 'rgb(37, 99, 235)',
  },
});
