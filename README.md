# React Native Multi-Switch Controller

A flexible and performant multi-switch controller for React Native with support for segmented controls and tabs.

## Features

- 🎯 **Zero Re-renders**: Access state outside provider without causing re-renders
- 🎨 **Customizable**: Full control over colors, sizes, and styling
- ⚡ **Performant**: Optimized animations and state management
- 🔄 **Flexible**: Support for segmented controls and tabs
- 📱 **Accessible**: Built-in accessibility support

## Installation

```bash
npm install react-native-multiswitch-controller
```

## Basic Usage

```tsx
import {
  ControlListProvider,
  PillSwitch,
} from 'react-native-multiswitch-controller';

function MyComponent() {
  return (
    <ControlListProvider
      controlListProps={{
        options: [
          { value: 'morning', label: '🌅' },
          { value: 'afternoon', label: '☀️' },
          { value: 'evening', label: '🌇' },
          { value: 'night', label: '🌙' },
        ],
        defaultOption: 'morning',
        variant: 'segmentedControl',
      }}
    >
      <PillSwitch
        inactiveBackgroundColor="rgba(59, 130, 246, 0.08)"
        activeBackgroundColor="rgb(37, 99, 235)"
        inactiveTextColor="rgb(37, 99, 235)"
        activeTextColor="rgb(253, 230, 138)"
      />
    </ControlListProvider>
  );
}
```

## Accessing State Outside Provider

To avoid unnecessary re-renders while still accessing the control state, use one of these approaches:

### Option 1: Ref-based Access (Recommended)

```tsx
import { useControlListStateRef } from 'react-native-multiswitch-controller';

function StateReader() {
  const stateRef = useControlListStateRef<string>();

  const handleGetCurrentValue = () => {
    const currentState = stateRef.current;
    if (currentState) {
      console.log('Current active option:', currentState.activeOption);
      console.log('All options:', currentState.options);
    }
  };

  return (
    <View>
      <Text>
        Current value: {stateRef.current?.activeOption || 'Loading...'}
      </Text>
      <Button title="Log State" onPress={handleGetCurrentValue} />
    </View>
  );
}
```

### Option 2: Event-based Subscription

```tsx
import { useControlListStateSubscription } from 'react-native-multiswitch-controller';

function StateSubscriber() {
  const [lastChange, setLastChange] = useState<string>('None');

  useControlListStateSubscription<string>((state) => {
    setLastChange(state.activeOption);
    console.log('State changed to:', state.activeOption);
  });

  return (
    <View>
      <Text>Last change: {lastChange}</Text>
    </View>
  );
}
```

## API Reference

### ControlListProvider

The provider component that manages the control list state.

```tsx
<ControlListProvider
  controlListProps={{
    options: ControlOption<TValue>[];
    defaultOption: TValue;
    variant?: 'segmentedControl' | 'tabs';
    onPressCallback?: (value: TValue) => void;
    tabConfig?: { gap: number; padding: number };
  }}
>
  {children}
</ControlListProvider>
```

### PillSwitch

The main switch component.

```tsx
<PillSwitch
  align?: 'left' | 'right' | 'center';
  onPressCallback?: (value: TValue) => void;
  inactiveOptionContainerStyle?: ViewStyle;
  containerHeight?: number;
  optionHeight?: number;
  inactiveBackgroundColor?: string;
  activeBackgroundColor?: string;
  inactiveTextColor?: string;
  activeTextColor?: string;
  inactiveTextStyle?: TextStyle;
/>
```

### Hooks

#### useControlListStateRef

Returns a ref to the current state without causing re-renders.

```tsx
const stateRef = useControlListStateRef<TValue>();
// Access state via stateRef.current
```

#### useControlListStateSubscription

Subscribe to state changes without re-renders.

```tsx
useControlListStateSubscription<TValue>((state) => {
  // Handle state changes
});
```

## Performance Benefits

- **Ref-based access**: No re-renders when reading state
- **Event-based subscription**: Only re-renders when you explicitly handle changes
- **Optimized animations**: Smooth transitions with minimal performance impact
- **Memoized callbacks**: Prevents unnecessary re-renders in child components

## Types

```tsx
type ControlOption<TValue> = {
  value: TValue;
  label: string;
};

type ControlListState<TValue> = {
  options: ControlOption<TValue>[];
  activeOption: TValue;
  onChange: (value: TValue, callback?: () => void) => void;
  // ... other properties
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
