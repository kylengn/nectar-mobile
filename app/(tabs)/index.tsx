import React, { useState } from 'react';
import HomeScreen from '../../components/HomeScreen';
import ChatScreen from '../../components/ChatScreen';
import CustomTabBar from '@/components/CustomTabBar';
import { TabKey } from '../../types';
import { ChatMetaProvider } from '../../context/ChatMetaContext';
import { CHARACTERS } from '../../constants';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const characters = CHARACTERS;
  const currentCharacter = characters[0];

  let ScreenComponent = activeTab === 'home' ? HomeScreen : () => (
    <ChatMetaProvider value={{ avatar: currentCharacter.profile_pic_url, name: currentCharacter.name }}>
      <ChatScreen setActiveTab={setActiveTab} />
    </ChatMetaProvider>
  );

  return (
    <React.Fragment>
      <ScreenComponent />
      <CustomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </React.Fragment>
  );
}
