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
        containerHeight={48}
        optionHeight={36}
        optionGap={16}
        inactiveTextStyle={styles.inactiveTextStyle}
        containerStyle={styles.containerStyle}
        activeOptionContainerStyle={
          variant === 'tabs'
            ? styles.activeOptionContainerStyleTabs
            : styles.activeOptionContainerStyleSegmentedControl
        }
        activeTextStyle={
          variant === 'tabs'
            ? styles.activeTextStyleTabs
            : styles.activeTextStyleSegmentedControl
        }
      />
    </ExampleWrapper>
  );
}

const styles = StyleSheet.create({
  inactiveTextStyle: {
    fontSize: 12,
    color: 'rgb(30, 64, 175)',
  },
  containerStyle: {
    backgroundColor: 'rgba(30, 64, 175, 0.08)',
  },
  activeOptionContainerStyleTabs: {
    backgroundColor: 'rgb(30, 64, 175)',
    height: 10,
  },
  activeOptionContainerStyleSegmentedControl: {
    backgroundColor: 'rgb(30, 64, 175)',
  },
  activeTextStyleTabs: {
    color: 'rgb(30, 64, 175)',
  },
  activeTextStyleSegmentedControl: {
    color: '#fff',
  },
});
