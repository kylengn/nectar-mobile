import React, { createContext, ReactNode } from 'react';
import { ChatMeta } from '../types';

export { ChatMeta };
export const ChatMetaContext = createContext<ChatMeta | null>(null);

export const ChatMetaProvider = ({ value, children }: { value: ChatMeta; children: ReactNode }) => (
  <ChatMetaContext.Provider value={value}>{children}</ChatMetaContext.Provider>
); 