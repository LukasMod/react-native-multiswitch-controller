import { useCallback, useMemo } from 'react';
import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import type { ControllerVariant, ControlOption } from './types';
import type { ControlListState } from './useControlListState';
import SwitchItem from './SwitchItem';
import { commonColors } from './constants';

type AlignmentOption = 'left' | 'right' | 'center';

export type SwitchListStylingProps = {
  containerStyle?: ViewStyle;
  inactiveOptionContainerStyle?: ViewStyle;
  activeOptionContainerStyle?: ViewStyle;
  inactiveTextStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  containerHeight: number;
  containerPadding?: number;
  optionGap: number;
  optionHeight: number;
  optionPadding: number;
  align: AlignmentOption;
};

export type SwitchListProps<TValue> = ControlListState<TValue> &
  SwitchListStylingProps & {
    onPressItem?: (value: TValue) => void;
    variant: ControllerVariant;
  };

function SwitchList<TValue>(props: SwitchListProps<TValue>) {
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
    variant,

    // Style props
    containerStyle,
    inactiveOptionContainerStyle,
    activeOptionContainerStyle,
    inactiveTextStyle,
    activeTextStyle,
    containerHeight,
    containerPadding,
    optionGap,
    optionHeight,
    align,
  } = props;

  const isSegmentedControlVariant = variant === 'segmentedControl';

  const itemContainerStyle: ViewStyle = useMemo(() => {
    return {
      height: optionHeight,
      ...inactiveOptionContainerStyle,
    };
  }, [optionHeight, inactiveOptionContainerStyle]);

  const renderItem = useCallback(
    ({ item, index }: { item: ControlOption<TValue>; index: number }) => (
      <SwitchItem
        variant={variant}
        item={item}
        isActive={activeOption === item.value}
        index={index}
        onLayout={onLayoutOptionItem}
        onChange={() => {
          onPressItem?.(item.value);
          onAnimationFinish(item.value);
        }}
        animatedActiveOptionIndex={animatedActiveOptionIndex}
        itemContainerStyle={itemContainerStyle}
        inactiveTextStyle={inactiveTextStyle}
        activeTextStyle={activeTextStyle}
      />
    ),
    [
      onLayoutOptionItem,
      activeOption,
      onAnimationFinish,
      animatedActiveOptionIndex,
      onPressItem,
      itemContainerStyle,
      activeTextStyle,
      inactiveTextStyle,
      variant,
    ]
  );

  const containerStyles: ViewStyle = useMemo(() => {
    return {
      height: containerHeight,
      padding: containerPadding,
      marginRight: align !== 'right' ? 'auto' : 0,
      marginLeft: align !== 'left' ? 'auto' : 0,
    };
  }, [containerHeight, containerPadding, align]);

  const defaultActiveOptionStyles: ViewStyle = useMemo(() => {
    const styles: ViewStyle = {
      left: containerPadding,
    };

    if (isSegmentedControlVariant) {
      styles.height = optionHeight;
      styles.top = containerPadding;
    }

    return styles;
  }, [containerPadding, optionHeight, isSegmentedControlVariant]);

  const ItemSeparatorComponent = useMemo(() => {
    if (!optionGap) return null;

    return <ItemSpace gap={optionGap} />;
  }, [optionGap]);

  if (!options.length) return null;

  return (
    <View
      style={[
        styles.container,
        isSegmentedControlVariant
          ? styles.containerSegmentedControl
          : styles.containerTabs,
        containerStyles,
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          styles.activeOption,
          isSegmentedControlVariant
            ? styles.activeOptionSegmentedControl
            : styles.activeOptionTabs,
          defaultActiveOptionStyles,
          activeOptionContainerStyle,
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
        ItemSeparatorComponent={() => ItemSeparatorComponent}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        overScrollMode="never"
        bounces={false}
      />
    </View>
  );
}

function ItemSpace({ gap }: { gap: number }) {
  return <View style={{ width: gap }} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: commonColors.containerBackground,
  },
  containerSegmentedControl: {
    borderRadius: 999,
  },
  containerTabs: {},
  activeOption: {
    position: 'absolute',
    backgroundColor: commonColors.activeOptionBackground,
  },
  activeOptionSegmentedControl: {
    borderRadius: 999,
  },
  activeOptionTabs: {
    bottom: 0,
    left: 0,
    height: 2,
  },
});

export default SwitchList;
