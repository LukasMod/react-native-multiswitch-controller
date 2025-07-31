import {
  MultiswitchController,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import ExampleWrapper from './ExampleWrapper';
import { StyleSheet } from 'react-native';

type AlignProps = {
  variant: ControllerVariant;
};

export default function Align({ variant }: AlignProps) {
  return (
    <ExampleWrapper title="Align to left, center or right">
      <MultiswitchController<'First' | 'Second'>
        options={[
          { value: 'First', label: 'First' },
          { value: 'Second', label: 'Second' },
        ]}
        defaultOption="First"
        variant={variant}
        align="left"
        containerHeight={52}
        optionHeight={46}
        containerPadding={variant === 'tabs' ? 10 : undefined}
        containerStyle={styles.containerStyle1}
        activeOptionContainerStyle={styles.activeOptionContainerStyle1}
        inactiveTextStyle={styles.inactiveCustomTextStyle1}
        activeTextStyle={
          variant === 'tabs'
            ? styles.activeTextStyleTabs1
            : styles.activeTextStyleSegmentedControl1
        }
      />
      <MultiswitchController<'First' | 'Second'>
        options={[
          { value: 'First', label: 'First' },
          { value: 'Second', label: 'Second' },
        ]}
        defaultOption="First"
        variant={variant}
        align="center"
        containerHeight={28}
        optionHeight={24}
        containerStyle={styles.containerStyle2}
        inactiveOptionContainerStyle={styles.inactiveOptionContainerStyle2}
        activeOptionContainerStyle={styles.activeOptionContainerStyle2}
        inactiveTextStyle={styles.inactiveCustomTextStyle2}
        activeTextStyle={
          variant === 'tabs'
            ? styles.activeTextStyleTabs2
            : styles.activeTextStyleSegmentedControl2
        }
      />
      <MultiswitchController<'First' | 'Second' | 'Third'>
        options={[
          { value: 'First', label: 'First' },
          { value: 'Second', label: 'Second' },
          { value: 'Third', label: 'Third' },
        ]}
        defaultOption="First"
        variant={variant}
        align="right"
        containerHeight={44}
        optionHeight={24}
        containerStyle={styles.containerStyle3}
        inactiveTextStyle={styles.inactiveCustomTextStyle3}
        inactiveOptionContainerStyle={styles.inactiveOptionContainerStyle3}
        activeOptionContainerStyle={styles.activeOptionContainerStyle3}
        activeTextStyle={
          variant === 'tabs'
            ? styles.activeTextStyleTabs3
            : styles.activeTextStyleSegmentedControl3
        }
      />
    </ExampleWrapper>
  );
}

const styles = StyleSheet.create({
  // 1st example
  containerStyle1: {
    backgroundColor: 'rgb(21, 87, 21)',
  },
  activeOptionContainerStyle1: {
    backgroundColor: 'rgb(60, 180, 20)',
  },
  inactiveCustomTextStyle1: {
    color: 'rgb(208, 249, 205)',
  },
  activeTextStyleTabs1: {
    color: 'rgb(60, 180, 20)',
  },
  activeTextStyleSegmentedControl1: {
    color: '#fff',
  },

  // 2nd example
  containerStyle2: {
    borderRadius: 0,
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
  },
  inactiveCustomTextStyle2: {
    color: 'rgba(185, 28, 28, 0.6)',
    fontSize: 10,
  },
  inactiveOptionContainerStyle2: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 0,
  },
  activeOptionContainerStyle2: {
    borderRadius: 0,
    backgroundColor: 'rgb(185, 28, 28)',
  },
  activeTextStyleTabs2: {
    color: 'rgb(185, 28, 28)',
  },
  activeTextStyleSegmentedControl2: {
    color: '#fff',
  },

  // 3rd example
  containerStyle3: {
    backgroundColor: 'rgba(205, 197, 40, 0.4)',
  },
  inactiveCustomTextStyle3: {
    color: 'rgb(180, 170, 20)',
    fontSize: 10,
  },
  inactiveOptionContainerStyle3: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeOptionContainerStyle3: {
    backgroundColor: 'rgb(180, 170, 20)',
  },
  activeTextStyleTabs3: {
    color: 'rgb(180, 170, 20)',
  },
  activeTextStyleSegmentedControl3: {
    color: '#fff',
  },
});
