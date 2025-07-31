import { useCallback, useMemo } from 'react';
import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import type { ControllerVariant, ControlOption } from './types';
import type { ControlListState } from './useControlListState';
import SwitchItem from './SwitchItem';

type AlignmentOption = 'left' | 'right' | 'center';

export type SwitchListStylingProps = {
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
      <SwitchItem
        variant="tabs"
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
    const styles: ViewStyle = {
      left: containerPadding,
      backgroundColor: activeBackgroundColor,
    };

    if (variant === 'segmentedControl') {
      styles.height = itemHeight;
      styles.top = containerPadding;
    }

    return styles;
  }, [containerPadding, activeBackgroundColor, itemHeight, variant]);

  const ItemSeparatorComponent = useMemo(() => {
    return variant !== 'segmentedControl' ? ItemSpace : null;
  }, [variant]);

  if (!options.length) return null;

  return (
    <View
      style={[
        styles.container,
        variant === 'segmentedControl'
          ? styles.containerSegmentedControl
          : styles.containerTabs,
        containerStyles,
        customContainerStyle,
      ]}
    >
      <Animated.View
        style={[
          styles.activeOption,
          variant === 'segmentedControl'
            ? styles.activeOptionSegmentedControl
            : styles.activeOptionTabs,
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
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        overScrollMode="never"
        bounces={false}
      />
    </View>
  );
}

function ItemSpace() {
  return <View style={{ width: 20 }} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  containerSegmentedControl: {
    borderRadius: 999,
  },
  containerTabs: {},
  activeOption: {
    position: 'absolute',
  },
  activeOptionSegmentedControl: {
    borderRadius: 999,
  },
  activeOptionTabs: {
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: 'red',
  },
});

export default SwitchList;
