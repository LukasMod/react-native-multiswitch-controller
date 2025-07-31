import {
  MultiswitchController,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import ExampleWrapper from './ExampleWrapper';

type ScrollableProps = {
  variant: ControllerVariant;
};

export default function Scrollable({ variant }: ScrollableProps) {
  return (
    <ExampleWrapper title="Scrollable if there is not enough width">
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
        variant={variant}
      />
    </ExampleWrapper>
  );
}
