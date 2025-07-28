import {
  type LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { ControlOption } from './types';

const AnimatedText = Animated.createAnimatedComponent(Text);

export type SegmentedControlVariant = {
  optionsWrapperPadding: number;
  optionHeight: number;
};

function SegmentedControlSwitchItem<TValue>(props: {
  item: ControlOption<TValue>;
  isActive: boolean;
  index: number;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  onChange: (value: TValue) => void;
  animatedActiveOptionIndex: SharedValue<number | null>;
  textColorActive: string;
  textColorInactive: string;
  customTextStyle?: TextStyle;
  itemContainerStyle?: ViewStyle;
}) {
  const {
    item,
    isActive,
    onChange,
    onLayout,
    index,
    animatedActiveOptionIndex,
    textColorActive,
    textColorInactive,
    customTextStyle,
    itemContainerStyle,
  } = props;

  const animatedColor = useAnimatedStyle<TextStyle>(() => ({
    color: withTiming(
      animatedActiveOptionIndex.value === index
        ? textColorActive
        : textColorInactive,
      { duration: 100 }
    ),
  }));

  return (
    <Pressable
      onPress={() => onChange(item.value)}
      onLayout={(event) => onLayout(event, index)}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.label}
      disabled={isActive}
      style={[styles.containerDefault, itemContainerStyle]}
    >
      <AnimatedText
        style={[styles.textDefault, customTextStyle, animatedColor]}
      >
        {item.label}
      </AnimatedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  containerDefault: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textDefault: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SegmentedControlSwitchItem;
