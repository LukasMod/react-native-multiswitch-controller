/* eslint-disable react-native/no-inline-styles */
import {
  MultiswitchController,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import ExampleWrapper from './ExampleWrapper';
import { StyleSheet } from 'react-native';

type LongLabelProps = {
  variant: ControllerVariant;
};

export default function LongLabel({ variant }: LongLabelProps) {
  return (
    <ExampleWrapper title="Use different width for labels">
      <MultiswitchController<'First' | 'Second'>
        options={[
          { value: 'First', label: 'First is a very long label' },
          { value: 'Second', label: 'Second is short' },
        ]}
        variant={variant}
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
    </ExampleWrapper>
  );
}

const styles = StyleSheet.create({
  smallText: {
    fontSize: 12,
  },
});
