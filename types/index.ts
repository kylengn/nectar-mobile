// Chat and Message Types
export interface Message {
  id: string;
  text: string;
  sender: string;
  italic?: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export interface ChatMeta {
  avatar: string;
  name: string;
}

// Character Types
export interface Character {
  id: string;
  name: string;
  greeting: string;
  profile_pic_url: string;
  likes: number;
  comments: number;
  message: string;
}

// Tab Navigation Types
export type TabKey = 'home' | 'chat' | 'search' | 'create' | 'profile';

export interface TabConfig {
  key: TabKey;
  icon: keyof typeof import('@expo/vector-icons').Feather.glyphMap;
  label: string;
  size?: number;
  isEnabled?: boolean;
}

export interface CustomTabBarProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

export interface TabItemProps {
  tab: TabConfig;
  isActive: boolean;
  onPress: () => void;
}

// Modal Types
export interface ModalAction {
  key: string;
  icon: keyof typeof import('@expo/vector-icons').Feather.glyphMap;
  label: string;
  color: string;
  textColor?: string;
  onPress: () => void;
}

// Theme Types
export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & import('react-native').TextProps;
export type ViewProps = ThemeProps & import('react-native').ViewProps;

export type ColorName = keyof typeof import('@/constants/Colors').default.light & keyof typeof import('@/constants/Colors').default.dark; 