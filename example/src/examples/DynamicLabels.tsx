import {
  MultiswitchController,
  type ControllerVariant,
} from 'react-native-multiswitch-controller';
import ExampleWrapper from './ExampleWrapper';
import { Button, StyleSheet, View } from 'react-native';
import { useState } from 'react';

const mockLanguages: Record<
  'en' | 'de',
  { food: string; drink: string; dessert: string }
> = {
  en: {
    food: 'Butterfly',
    drink: 'Cheese',
    dessert: 'Lettuce',
  },
  de: {
    food: 'Schmetterling',
    drink: 'Käse',
    dessert: 'Salat',
  },
};

type DynamicLabelsProps = {
  variant: ControllerVariant;
};

export default function DynamicLabels({ variant }: DynamicLabelsProps) {
  const [language, setLanguage] = useState<keyof typeof mockLanguages>('en');

  return (
    <ExampleWrapper title="Adjust labels width dynamically">
      <MultiswitchController<'food' | 'drink' | 'dessert'>
        options={[
          { value: 'food', label: mockLanguages[language].food },
          { value: 'drink', label: mockLanguages[language].drink },
          { value: 'dessert', label: mockLanguages[language].dessert },
        ]}
        variant={variant}
        defaultOption="food"
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
      <View style={styles.buttonsContainer}>
        <Button
          title="Toggle language"
          onPress={() => {
            setLanguage(language === 'en' ? 'de' : 'en');
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
