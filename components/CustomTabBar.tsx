import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TabKey, CustomTabBarProps, TabItemProps, TabConfig } from '../types';
import { TAB_CONFIG } from '../constants';

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onPress }) => {
  const iconColor = isActive ? '#ff3d5a' : 'hsla(0, 0%, 69%, 1)';
  const textStyle = [styles.navLabel, isActive && styles.navLabelActive];

  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      disabled={!tab.isEnabled}
    >
      <Feather
        name={tab.icon}
        size={tab.size}
        color={iconColor}
      />
      <Text style={textStyle}>{tab.label}</Text>
    </TouchableOpacity>
  );
};

export default function CustomTabBar({ activeTab, onTabPress }: CustomTabBarProps) {
  const handleTabPress = (tabKey: TabKey) => {
    const tab = TAB_CONFIG.find(t => t.key === tabKey);
    if (tab?.isEnabled) {
      onTabPress(tabKey);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(10,10,10,0.7)', 'rgba(10,10,10,0.98)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.bottomNav}
    >
      {TAB_CONFIG.map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onPress={() => handleTabPress(tab.key)}
        />
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#222',
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  navLabel: {
    color: 'hsla(0, 0%, 69%, 1)',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
  navLabelActive: {
    color: '#ff3d5a',
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'bold',
  },
}); 