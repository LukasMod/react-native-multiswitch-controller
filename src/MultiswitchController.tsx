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
  styleProps?: SwitchListStylingProps;
  onPressItem?: (value: TValue) => void;
  ref?: Ref<ControlListRef<TValue>>;
};

function MultiswitchController<TValue>({
  options,
  defaultOption,
  variant = 'segmentedControl',
  onChangeOption,
  onPressItem,
  styleProps,
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
      variant,
    },
    ref
  );

  useEffect(() => {
    if (onChangeOption) {
      onChangeOption(activeOption);
    }
  }, [activeOption, onChangeOption]);

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
      {...styleProps}
    />
  );
}

export default MultiswitchController;
