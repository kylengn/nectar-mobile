import { TabConfig } from '../types';

export const TAB_CONFIG: TabConfig[] = [
  { key: 'home', icon: 'home', label: 'Home', size: 26, isEnabled: true },
  { key: 'search', icon: 'search', label: 'Search', size: 24, isEnabled: false },
  { key: 'create', icon: 'plus-circle', label: 'Create', size: 28, isEnabled: false },
  { key: 'chat', icon: 'message-circle', label: 'Messages', size: 24, isEnabled: true },
  { key: 'profile', icon: 'user', label: 'Profile', size: 24, isEnabled: false },
]; 