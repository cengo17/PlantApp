import {hookstate, useHookstate} from '@hookstate/core';

export const UIState = hookstate({
  tabBarHeight: 0,
  dontShowLoading: false,
  testing: 'sdd',
});

export function useUIState() {
  const state = useHookstate(UIState);

  return {
    get tabBarHeight() {
      return state.tabBarHeight.get();
    },
    get dontShowLoading() {
      return state.dontShowLoading.get();
    },
  };
}
