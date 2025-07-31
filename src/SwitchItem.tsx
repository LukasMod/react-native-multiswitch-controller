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
import { variantColors } from './constants';

const AnimatedText = Animated.createAnimatedComponent(Text);

function SwitchItem<TValue>(props: {
  item: ControlOption<TValue>;
  isActive: boolean;
  index: number;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  onChange: (value: TValue) => void;
  variant: ControllerVariant;

  inactiveTextStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  itemContainerStyle?: ViewStyle;

  animatedActiveOptionIndex?: SharedValue<number | null>;
}) {
  const {
    item,
    isActive,
    onChange,
    onLayout,
    index,
    variant,

    inactiveTextStyle,
    activeTextStyle,
    itemContainerStyle,

    animatedActiveOptionIndex,
  } = props;

  const textColorActive =
    (activeTextStyle?.color as string) || variantColors[variant].activeText;

  const textColorInactive =
    (inactiveTextStyle?.color as string) || variantColors[variant].inactiveText;

  const animatedColor = useAnimatedStyle<TextStyle>(() => {
    if (!animatedActiveOptionIndex || textColorActive === textColorInactive) {
      return {};
    }

    return {
      color: withTiming(
        animatedActiveOptionIndex?.value === index
          ? textColorActive
          : textColorInactive,
        { duration: 200 }
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
        style={[
          styles.textDefault,
          inactiveTextStyle,
          isActive && activeTextStyle,
          animatedColor,
        ]}
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
    paddingHorizontal: 12,
  },
  containerSegmentedControl: {
    borderRadius: 999,
    alignSelf: 'center',
  },
  containerTabs: {},
  textDefault: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(SwitchItem);
