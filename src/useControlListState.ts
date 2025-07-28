import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  type Ref,
} from 'react';
import { FlatList, type LayoutChangeEvent } from 'react-native';
import {
  Easing,
  type SharedValue,
  type StyleProps,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ControlOption } from './types';

export type ControlListProps<TValue> = {
  options: ControlOption<TValue>[];
  optionPadding?: number;
  optionGap?: number;
  defaultOption: TValue;
  variant?: 'segmentedControl' | 'tabs';
  onPressCallback?: (value: TValue) => void;
  tabConfig?: {
    gap: number;
    padding: number;
  };
};

export type ControlListRef<TValue> = {
  setForcedOption: (value: TValue | null) => void;
  activeOption: TValue;
};

export type ControlListState<TValue> = {
  options: ControlOption<TValue>[];
  activeOption: TValue;
  animatedActiveOptionIndex: SharedValue<number | null>;
  animatedActiveOptionStyle: StyleProps;
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  controlListRef: RefObject<FlatList<ControlOption<TValue>> | null>;
  onLayoutOptionItem: (event: LayoutChangeEvent, index: number) => void;
  onAnimationFinish: (
    newValue: TValue,
    initialAnimationCallback?: () => void
  ) => void;
};

/**
 *  Helps with animation of SegmentedControl and Tabs.
 *  To avoid lags while animating, SegmentedControl/Tabs needs to be animated first, and after that the content may be refreshed.
 * */

function useControlListState<TValue>(
  props: ControlListProps<TValue>,
  ref?: Ref<ControlListRef<TValue>>
): ControlListState<TValue> {
  const {
    options,
    defaultOption,
    variant = 'segmentedControl',
    onPressCallback,
    tabConfig,
  } = props;

  const optionsRef = useRef(options);

  const optionGap = variant === 'tabs' ? tabConfig?.gap || 0 : 0;
  const optionPadding = variant === 'tabs' ? tabConfig?.padding || 0 : 0;

  const [activeOption, setActiveOption] = useState<TValue>(defaultOption);

  const [forcedOption, setForcedOption] = useState<TValue | null>(
    defaultOption
  );

  const [optionLayouts, setOptionLayouts] = useState<{
    [optionIndex: number]: { width: number; label: string };
  }>({});

  const optionsJSON = useMemo(() => JSON.stringify(options), [options]);

  const controlListRef = useRef<FlatList<ControlOption<TValue>>>(null);

  const animatedTranslateX = useSharedValue(0);
  const animatedWidth = useSharedValue(0);
  const animatedScrollX = useSharedValue(0);
  const animatedActiveOptionIndex = useSharedValue<number | null>(null);

  const isFirstRender = useRef(true);

  useImperativeHandle(
    ref,
    () => ({
      setForcedOption,
      activeOption,
    }),
    [activeOption]
  );

  const animatedActiveOptionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: animatedTranslateX.value - animatedScrollX.value },
    ],
    width: animatedWidth.value,
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      animatedScrollX.value = x;
    },
  });

  const onLayoutOptionItem = useCallback(
    ({ nativeEvent }: LayoutChangeEvent, index: number) => {
      const option = options?.[index];
      if (!option) return;

      setOptionLayouts((previous) => ({
        ...previous,
        [index]: {
          width: nativeEvent?.layout.width,
          label: option.label,
        },
      }));
    },
    [options]
  );

  const moveActiveOption = useCallback(
    ({
      activeOptionValue,
      afterAnimationCallback,
      initialAnimationCallback,
    }: {
      activeOptionValue: TValue;
      afterAnimationCallback?: (newValue: TValue) => void;
      initialAnimationCallback?: () => void;
    }) => {
      const activeOptionIndex = options.findIndex(
        (option) => option.value === activeOptionValue
      );
      const activeOptionLayout = optionLayouts[activeOptionIndex];
      if (!activeOptionLayout) return;

      const sumPreviousWidths = Object.values(optionLayouts)
        .slice(0, activeOptionIndex)
        .reduce(
          (totalWidth, currentWidth) => totalWidth + currentWidth.width,
          0
        );

      const sumPreviousPaddingAndGaps =
        optionPadding + optionGap * activeOptionIndex;

      const translateValue = sumPreviousWidths + sumPreviousPaddingAndGaps;

      const textWidthValue = activeOptionLayout.width - optionPadding * 2;

      // Allows to animate based on index e.g. text color inside list items.
      animatedActiveOptionIndex.value = activeOptionIndex;

      // Instant animation only for the first time SegmentedControl/Tabs is rendered.

      if (!!initialAnimationCallback && isFirstRender.current) {
        animatedWidth.value = textWidthValue;
        animatedTranslateX.value = translateValue;

        afterAnimationCallback?.(activeOptionValue);
        initialAnimationCallback();
      } else {
        animatedWidth.value = withTiming(textWidthValue, {
          duration: 200,
          easing: Easing.inOut(Easing.quad),
        });
        animatedTranslateX.value = withTiming(
          translateValue,
          {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
          },
          () => {
            if (afterAnimationCallback)
              runOnJS(afterAnimationCallback)(activeOptionValue);
          }
        );
      }

      controlListRef.current?.scrollToIndex({
        index: activeOptionIndex,
        animated: true,
        viewPosition: 0.5,
      });
    },
    [
      optionLayouts,
      animatedWidth,
      animatedTranslateX,
      animatedActiveOptionIndex,
      optionGap,
      optionPadding,
      options,
    ]
  );

  // Fires after animation is finished.
  const onChange = useCallback(
    (value: TValue, callback?: () => void) => {
      setActiveOption(value);
      setForcedOption(null);
      callback?.();
      onPressCallback?.(value);
    },
    [onPressCallback]
  );

  // Allows to call onChange after animation is finished.
  const onAnimationFinish = useCallback(
    (newValue: TValue, initialAnimationCallback?: () => void) => {
      moveActiveOption({
        activeOptionValue: newValue,
        afterAnimationCallback: onChange,
        initialAnimationCallback,
      });
    },
    [moveActiveOption, onChange]
  );

  // Fires after initial animation is finished to allow future setting of initial value, which will force animation.
  const removeInitialOption = useCallback(() => setForcedOption(null), []);

  // First time animation, based on forcedOption after layout is calculated.
  useEffect(() => {
    if (
      forcedOption &&
      Object.values(optionLayouts).length === options.length
    ) {
      removeInitialOption();
      onAnimationFinish(forcedOption, () => (isFirstRender.current = false));
    }
  }, [
    forcedOption,
    onAnimationFinish,
    removeInitialOption,
    optionLayouts,
    options,
  ]);

  // Handle edge case when option label is changed e.g. in case of language change.
  // optionLayouts is calculated synchronously for each option. We need to start animation only when all of labels are updated.
  useEffect(() => {
    const optionLayoutsValues = Object.values(optionLayouts);
    if (optionLayoutsValues.length !== options.length) return;

    const optionsPropDeepEqual =
      JSON.stringify(optionsRef.current) === optionsJSON;
    if (optionsPropDeepEqual) return;

    const isAllLabelsUpdated = options.every(
      (option, index) => optionLayoutsValues[index]?.label === option.label
    );
    if (!isAllLabelsUpdated) return;

    optionsRef.current = options;
    onAnimationFinish(activeOption);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsJSON, optionLayouts]);

  return {
    options,
    activeOption,
    animatedActiveOptionIndex,
    animatedActiveOptionStyle,
    scrollHandler,
    controlListRef,
    onLayoutOptionItem,
    onAnimationFinish,
  };
}

export default useControlListState;
