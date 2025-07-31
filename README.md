# React Native Multiswitch Controller

A smooth, animated multiswitch component for React Native with dynamic width support. Perfect for creating segmented controls and tab interfaces with fluid animations.

[[Segmented Control]](https://github.com/user-attachments/assets/f5eacb8e-a525-4295-8ea7-e5d695eab01b)

[[Tabs]](https://github.com/user-attachments/assets/ea1dcc38-0fe4-4263-9155-87dce55def33)

## Why?

In my last project, there were specific design requirements for segmented control buttons and tabs with customized UI.
It was a simple task, but I encountered several problems with the existing solutions I found online:

- Hard to customize styles for my UI requirements
- Same width for all options (no dynamic sizing)
- Based on the old Animated API or no animations at all
- Issues when changing text color for active options - brief moments when text color matches the background
- Issues with setting new values externally, such as based on route parameters
- Issues with language changes - width recalculation was needed
- Instant heavy calculations and screen re-renders (usually these segmented controls were at the top of the screen) mixed with animations - all together when users interact caused FPS drops
- No scrolling if there are multiple options

**Solution:**

- Width calculated based on each item's layout
- Scrolling enabled by FlatList
- `onChangeOption` fired after animation is complete, not simultaneously
- `onPressItem` for instant reaction if needed
- Ref API to get value or force update
- Width recalculation when label is changed

## Features

- 🎯 **Smooth Animations**: Powered by react-native-reanimated for 60fps animations
- 📱 **Two Variants**: Segmented control and tabs styles
- 🎨 **Highly Customizable**: Extensive styling options for every element
- 📏 **Dynamic Width**: Automatically adjusts to content width, when language changes
- 📜 **Scrollable**: Horizontal scrolling for many options
- 🎪 **Flexible Alignment**: Left, center, or right alignment options
- 🎛️ **Imperative API**: Ref-based methods for programmatic control

## Installation

```bash
npm install react-native-multiswitch-controller
# or
yarn add react-native-multiswitch-controller
```

### Peer Dependencies

This library requires:

- `react-native-reanimated` >= 3.0.0

## Quick Start

```tsx
import { MultiswitchController } from 'react-native-multiswitch-controller';

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState('morning');

  return (
    <MultiswitchController
      options={[
        { value: 'morning', label: '🌅 Morning' },
        { value: 'afternoon', label: '☀️ Afternoon' },
        { value: 'evening', label: '🌇 Evening' },
        { value: 'night', label: '🌙 Night' },
      ]}
      defaultOption={selectedOption}
      onChangeOption={setSelectedOption}
    />
  );
}
```

## API Reference

### Props

| Prop             | Type                           | Default              | Description                        |
| ---------------- | ------------------------------ | -------------------- | ---------------------------------- |
| `options`        | `ControlOption<TValue>[]`      | **required**         | Array of options to display        |
| `defaultOption`  | `TValue`                       | **required**         | Initial selected option            |
| `variant`        | `'segmentedControl' \| 'tabs'` | `'segmentedControl'` | Visual style variant               |
| `onChangeOption` | `(value: TValue) => void`      | -                    | Callback after animation completes |
| `onPressItem`    | `(value: TValue) => void`      | -                    | Instant callback on press          |

| `ref` | `Ref<ControlListRef<TValue>>` | - | Ref for imperative API |

### Styling Props

| Prop                           | Type                            | Default    | Description                      |
| ------------------------------ | ------------------------------- | ---------- | -------------------------------- |
| `containerStyle`               | `ViewStyle`                     | -          | Main container styles            |
| `inactiveOptionContainerStyle` | `ViewStyle`                     | -          | Inactive option container styles |
| `activeOptionContainerStyle`   | `ViewStyle`                     | -          | Active option container styles   |
| `inactiveTextStyle`            | `TextStyle`                     | -          | Inactive text styles             |
| `activeTextStyle`              | `TextStyle`                     | -          | Active text styles               |
| `containerHeight`              | `number`                        | `50`       | Height of the main container     |
| `containerPadding`             | `number`                        | `auto`     | Padding around the container     |
| `optionGap`                    | `number`                        | `0`        | Gap between options              |
| `optionHeight`                 | `number`                        | `48`       | Height of individual options     |
| `optionPadding`                | `number`                        | `0`        | Padding inside options           |
| `align`                        | `'left' \| 'center' \| 'right'` | `'center'` | Alignment of options             |

### Types

```tsx
type ControlOption<TValue> = {
  value: TValue;
  label: string;
};

type ControllerVariant = 'segmentedControl' | 'tabs';

type ControlListRef<TValue> = {
  setForcedOption: (value: TValue | null) => void;
  activeOption: TValue;
};
```

## Examples

### Basic Segmented Control

```tsx
<MultiswitchController<TimeOfDay>
  variant="segmentedControl"
  defaultOption="morning"
  options={[
    { value: 'morning', label: '🌅' },
    { value: 'afternoon', label: '☀️' },
    { value: 'evening', label: '🌇' },
    { value: 'night', label: '🌙' },
  ]}
  onChangeOption={onChangeOption}
  optionGap={10}
/>
```

### Alignment Examples

```tsx
// Left alignment
<MultiswitchController<'First' | 'Second'>
  options={[
    { value: 'First', label: 'First' },
    { value: 'Second', label: 'Second' },
  ]}
  defaultOption="First"
  align="left"
/>

// Center alignment
<MultiswitchController<'First' | 'Second'>
  options={[
    { value: 'First', label: 'First' },
    { value: 'Second', label: 'Second' },
  ]}
  defaultOption="First"
  align="center"
/>

// Right alignment
<MultiswitchController<'First' | 'Second' | 'Third'>
  options={[
    { value: 'First', label: 'First' },
    { value: 'Second', label: 'Second' },
    { value: 'Third', label: 'Third' },
  ]}
  defaultOption="First"
  align="right"

/>
```

### Imperative API

For programmatic control without managing state, you can use the imperative ref API:

```tsx
import { useRef } from 'react';
import {
  MultiswitchController,
  type ControlListRef,
} from 'react-native-multiswitch-controller';

function MyComponent() {
  const controllerRef = useRef<ControlListRef<string>>(null);

  const setOption = (option: string) => {
    controllerRef.current?.setForcedOption(option);
  };

  return (
    <>
      <MultiswitchController
        ref={controllerRef}
        options={[
          { value: 'morning', label: 'Morning' },
          { value: 'afternoon', label: 'Afternoon' },
          { value: 'evening', label: 'Evening' },
        ]}
        defaultOption="morning"
        onChangeOption={(value) => console.log('Selected:', value)}
      />
      <Button title="Set Evening" onPress={() => setOption('evening')} />
    </>
  );
}
```

#### Imperative API Methods

| Method            | Type                              | Description                                   |
| ----------------- | --------------------------------- | --------------------------------------------- |
| `setForcedOption` | `(value: TValue \| null) => void` | Programmatically set an option with animation |
| `activeOption`    | `TValue`                          | Read the currently active option              |

**Note**: The imperative API is useful for external control scenarios like changing active option based on route prop

### Scrollable Options

```tsx
<MultiswitchController<
  | 'First'
...
  | 'Sixteenth'
>
  options={[
    { value: 'First', label: 'First' },
...
    { value: 'Sixteenth', label: 'Sixteenth' },
  ]}
  defaultOption="First"
  variant={variant}
/>
```

### Dynamic Width with Different Label Lengths

```tsx
<MultiswitchController<'First' | 'Second'>
  options={[
    { value: 'First', label: 'First is a very long label' },
    { value: 'Second', label: 'Second is short' },
  ]}
  variant={variant}
  defaultOption="First"
/>
```

### Dynamic Labels (Language Changes)

```tsx
const mockLanguages = {
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

const [language, setLanguage] = useState<'en' | 'de'>('en');

<MultiswitchController<'food' | 'drink' | 'dessert'>
  options={[
    { value: 'food', label: mockLanguages[language].food },
    { value: 'drink', label: mockLanguages[language].drink },
    { value: 'dessert', label: mockLanguages[language].dessert },
  ]}
  defaultOption="food"
/>;
```

## Callback Differences

- **`onChangeOption`**: Called after the animation completes
- **`onPressItem`**: Called immediately when an option is pressed

```tsx
<MultiswitchController
  options={options}
  defaultOption="option1"
  onChangeOption={(value) => {
    // Called after animation finishes
    console.log('Animation complete, selected:', value);
  }}
  onPressItem={(value) => {
    // Called immediately on press
    console.log('Pressed:', value);
  }}
/>
```

## To Do

- Allow passing SVG instead of text only

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [LukasMod](https://github.com/LukasMod)

