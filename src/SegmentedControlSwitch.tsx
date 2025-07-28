import { useCallback, useMemo } from 'react';
import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import SegmentedControlSwitchItem from './SegmentedControlSwitchItem';
import type { ControlOption } from './types';
import type { ControlListState } from './useControlListState';

type AlignmentOption = 'left' | 'right' | 'center';

export type SegmentedControlStylingProps = {
  align?: AlignmentOption;
  customItemStyle?: ViewStyle;
  containerHeight?: number;
  itemHeight?: number;
  inactiveBackgroundColor?: string;
  activeBackgroundColor?: string;
  inactiveTextColor?: string;
  activeTextColor?: string;
  customContainerStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  customActiveOptionStyle?: ViewStyle;
};

export type SegmentedControlProps<TValue> = SegmentedControlStylingProps & {
  onPressItem?: (value: TValue) => void;
};

export type SegmentedControlSwitchProps<TValue> = ControlListState<TValue> &
  SegmentedControlProps<TValue>;

function SegmentedControlSwitch<TValue>(
  props: SegmentedControlSwitchProps<TValue>
) {
  const {
    options,
    activeOption,
    onLayoutOptionItem,
    onAnimationFinish,
    animatedActiveOptionIndex,
    animatedActiveOptionStyle,
    scrollHandler,
    controlListRef,
    onPressItem,

    // Style props
    align = 'center',
    customItemStyle,
    containerHeight = 50,
    itemHeight = 48,
    inactiveBackgroundColor = 'rgb(232, 221, 250)',
    activeBackgroundColor = 'rgb(124, 58, 237)',
    inactiveTextColor = 'rgb(124, 58, 237)',
    activeTextColor = '#fff',
    customContainerStyle,
    customTextStyle,
    customActiveOptionStyle,
  } = props;

  const containerPadding = (containerHeight - itemHeight) / 2;

  const defaultItemStyle: ViewStyle = useMemo(
    () => ({
      height: itemHeight || 48,
      paddingVertical: 8,
      paddingHorizontal: 12,
    }),
    [itemHeight]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ControlOption<TValue>; index: number }) => (
      <SegmentedControlSwitchItem
        item={item}
        isActive={activeOption === item.value}
        index={index}
        onLayout={onLayoutOptionItem}
        onChange={() => {
          onPressItem?.(item.value);
          onAnimationFinish(item.value);
        }}
        animatedActiveOptionIndex={animatedActiveOptionIndex}
        textColorActive={activeTextColor}
        textColorInactive={inactiveTextColor}
        itemContainerStyle={{ ...defaultItemStyle, ...customItemStyle }}
        customTextStyle={customTextStyle}
      />
    ),
    [
      onLayoutOptionItem,
      activeOption,
      onAnimationFinish,
      animatedActiveOptionIndex,
      onPressItem,
      defaultItemStyle,
      customItemStyle,
      activeTextColor,
      inactiveTextColor,
      customTextStyle,
    ]
  );

  const containerStyles: ViewStyle = useMemo(() => {
    return {
      height: containerHeight,
      padding: containerPadding,
      marginRight: align !== 'right' ? 'auto' : 0,
      marginLeft: align !== 'left' ? 'auto' : 0,
      backgroundColor: inactiveBackgroundColor,
    };
  }, [containerHeight, containerPadding, align, inactiveBackgroundColor]);

  const defaultActiveOptionStyles: ViewStyle = useMemo(() => {
    return {
      height: itemHeight,
      top: containerPadding,
      left: containerPadding,
      backgroundColor: activeBackgroundColor,
    };
  }, [containerPadding, activeBackgroundColor, itemHeight]);

  if (!options.length) return null;

  return (
    <View style={[styles.container, containerStyles, customContainerStyle]}>
      <Animated.View
        style={[
          styles.activeOption,
          defaultActiveOptionStyles,
          customActiveOptionStyle,
          animatedActiveOptionStyle,
        ]}
      />
      <Animated.FlatList
        ref={controlListRef}
        onScroll={scrollHandler}
        scrollEventThrottle={12}
        accessibilityRole="tablist"
        data={options}
        keyExtractor={(item) => String(item.value)}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        overScrollMode="never"
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  activeOption: {
    borderRadius: 999,
    position: 'absolute',
  },
});

export default SegmentedControlSwitch;
