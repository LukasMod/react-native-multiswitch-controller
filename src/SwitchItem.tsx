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
import type { ControllerVariant, ControlOption } from './types';
import { memo } from 'react';

const AnimatedText = Animated.createAnimatedComponent(Text);

function SwitchItem<TValue>(props: {
  item: ControlOption<TValue>;
  isActive: boolean;
  index: number;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  onChange: (value: TValue) => void;
  variant: ControllerVariant;

  customTextStyle?: TextStyle;
  itemContainerStyle?: ViewStyle;

  animatedActiveOptionIndex?: SharedValue<number | null>;
  textColorActive: string;
  textColorInactive: string;
}) {
  const {
    item,
    isActive,
    onChange,
    onLayout,
    index,
    variant,

    customTextStyle,
    itemContainerStyle,

    animatedActiveOptionIndex,
    textColorActive,
    textColorInactive,
  } = props;

  const animatedColor = useAnimatedStyle<TextStyle>(() => {
    if (!animatedActiveOptionIndex) {
      return {};
    }

    return {
      color: withTiming(
        animatedActiveOptionIndex?.value === index
          ? textColorActive
          : textColorInactive,
        { duration: 100 }
      ),
    };
  });

  return (
    <Pressable
      onPress={() => onChange(item.value)}
      onLayout={(event) => onLayout(event, index)}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.label}
      disabled={isActive}
      style={[
        styles.containerDefault,
        variant === 'segmentedControl' && styles.containerSegmentedControl,
        variant === 'tabs' && styles.containerTabs,
        itemContainerStyle,
      ]}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSegmentedControl: {
    borderRadius: 999,
    alignSelf: 'center',
  },
  containerTabs: {
    paddingHorizontal: 10,
  },
  textDefault: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(SwitchItem);
