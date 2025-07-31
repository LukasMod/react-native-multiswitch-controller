import type { ControllerVariant } from './types';

export const variantColors: Record<
  ControllerVariant,
  { activeText: string; inactiveText: string }
> = {
  segmentedControl: {
    activeText: '#fff',
    inactiveText: 'rgb(124, 58, 237)',
  },
  tabs: {
    activeText: 'rgb(124, 58, 237)',
    inactiveText: 'rgba(124, 58, 237, 0.6)',
  },
};

export const commonColors = {
  containerBackground: 'rgb(232, 221, 250)',
  activeOptionBackground: 'rgb(124, 58, 237)',
};
