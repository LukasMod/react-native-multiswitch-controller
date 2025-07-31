import { useEffect, type Ref } from 'react';
import SwitchList, { type SwitchListStylingProps } from './SwitchList';
import type { ControlOption, ControllerVariant } from './types';
import useControlListState, {
  type ControlListRef,
} from './useControlListState';

type MultiswitchControllerProps<TValue> = {
  options: ControlOption<TValue>[];
  defaultOption: TValue;
  variant?: ControllerVariant;
  onChangeOption?: (value: TValue) => void;
  onPressItem?: (value: TValue) => void;
  ref?: Ref<ControlListRef<TValue>>;
} & Partial<SwitchListStylingProps>;

function MultiswitchController<TValue>({
  options,
  defaultOption,
  variant = 'segmentedControl',
  onChangeOption,
  onPressItem,

  // Style props
  containerStyle,
  inactiveOptionContainerStyle,
  activeOptionContainerStyle,
  inactiveTextStyle,
  activeTextStyle,
  containerHeight = 50,
  containerPadding,
  optionGap = 0,
  optionHeight = 48,
  optionPadding = 0,
  align = 'center',

  ref,
}: MultiswitchControllerProps<TValue>) {
  const {
    activeOption,
    onLayoutOptionItem,
    onAnimationFinish,
    animatedActiveOptionIndex,
    animatedActiveOptionStyle,
    scrollHandler,
    controlListRef,
  } = useControlListState(
    {
      options,
      defaultOption,
      optionGap,
      optionPadding,
    },
    ref
  );

  useEffect(() => {
    if (onChangeOption) {
      onChangeOption(activeOption);
    }
  }, [activeOption, onChangeOption]);

  const containerPaddingCalculated =
    containerPadding ?? (containerHeight - optionHeight) / 2;

  return (
    <SwitchList
      options={options}
      activeOption={activeOption}
      onLayoutOptionItem={onLayoutOptionItem}
      onAnimationFinish={onAnimationFinish}
      animatedActiveOptionIndex={animatedActiveOptionIndex}
      animatedActiveOptionStyle={animatedActiveOptionStyle}
      scrollHandler={scrollHandler}
      controlListRef={controlListRef}
      onPressItem={onPressItem}
      variant={variant}
      containerStyle={containerStyle}
      inactiveOptionContainerStyle={inactiveOptionContainerStyle}
      activeOptionContainerStyle={activeOptionContainerStyle}
      inactiveTextStyle={inactiveTextStyle}
      activeTextStyle={activeTextStyle}
      containerHeight={containerHeight}
      containerPadding={containerPaddingCalculated}
      optionGap={optionGap}
      optionHeight={optionHeight}
      optionPadding={optionPadding}
      align={align}
    />
  );
}

export default MultiswitchController;
