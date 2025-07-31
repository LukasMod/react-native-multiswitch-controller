/* eslint-disable react-native/no-inline-styles */
import {
  MultiswitchController,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import ExampleWrapper from './ExampleWrapper';

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
        variant={variant}
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
        variant={variant}
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
    </ExampleWrapper>
  );
}
