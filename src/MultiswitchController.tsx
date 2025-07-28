import { useEffect, type Ref } from 'react';
import SegmentedControlSwitch, {
  type SegmentedControlProps,
} from './SegmentedControlSwitch';
import useControlListState, {
  type ControlListRef,
} from './useControlListState';
import type { ControlOption } from './types';

type MultiswitchControllerProps<TValue> = {
  options: ControlOption<TValue>[];
  defaultOption: TValue;
  variant?: 'segmentedControl' | 'tabs';
  onChangeOption?: (value: TValue) => void;
  styleProps?: SegmentedControlProps<TValue>;
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
    <SegmentedControlSwitch
      options={options}
      activeOption={activeOption}
      onLayoutOptionItem={onLayoutOptionItem}
      onAnimationFinish={onAnimationFinish}
      animatedActiveOptionIndex={animatedActiveOptionIndex}
      animatedActiveOptionStyle={animatedActiveOptionStyle}
      scrollHandler={scrollHandler}
      controlListRef={controlListRef}
      onPressItem={onPressItem}
      {...styleProps}
    />
  );
}

export default MultiswitchController;
