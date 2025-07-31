import { Button } from 'react-native';
import { MultiswitchController } from 'react-native-multiswitch-controller';

import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import ExampleWrapper from '../examples/ExampleWrapper';
import type { FavoriteDrink } from '../types';

type ExampleInitialSetScreenProps = StaticScreenProps<{
  favoriteDrink: FavoriteDrink;
}>;

export default function ExampleInitialSetScreen({
  route,
}: ExampleInitialSetScreenProps) {
  const { favoriteDrink } = route.params;

  const navigation = useNavigation();

  return (
    <ExampleWrapper title={`Preselected option: ${favoriteDrink}`}>
      <MultiswitchController<FavoriteDrink>
        variant="tabs"
        defaultOption={favoriteDrink}
        options={[
          { value: 'water', label: '💧' },
          { value: 'coffee', label: '☕️' },
          { value: 'tea', label: '🍵' },
          { value: 'juice', label: '🍹' },
          { value: 'soda', label: '🥤' },
        ]}
        optionGap={10}
      />
      <Button
        title="Back with new value for first example: 'evening'"
        onPress={() => {
          navigation.navigate(
            'Examples',
            {
              timeOfDay: 'evening',
            },
            { pop: true }
          );
        }}
      />
    </ExampleWrapper>
  );
}
