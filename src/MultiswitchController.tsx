import { useEffect } from 'react';
import PillSwitch, { type PillSwitchProps } from './PillSwitch';
import type { ControlListProps, ControlListState } from './useControlListState';
import useControlListState from './useControlListState';

type MultiswitchControllerProps<TValue> = {
  controlListProps: ControlListProps<TValue>;
  onControlListStateChange: (state: ControlListState<TValue>) => void;
  pillSwitchProps?: Omit<PillSwitchProps<TValue>, 'controlListState'>;
};

export default function MultiswitchController<TValue>({
  controlListProps,
  onControlListStateChange,
  pillSwitchProps,
}: MultiswitchControllerProps<TValue>) {
  const controlListState = useControlListState(controlListProps);

  useEffect(() => {
    if (onControlListStateChange) {
      onControlListStateChange(controlListState);
    }
  }, [controlListState, onControlListStateChange]);

  return (
    <PillSwitch controlListState={controlListState} {...pillSwitchProps} />
  );
}
