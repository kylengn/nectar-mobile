import React, { useState, useRef, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Pressable, KeyboardAvoidingView, Platform, Image, StatusBar, Animated } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabKey, Message, ModalAction, Toast } from '../types';
import { ChatMeta, ChatMetaContext } from '../context/ChatMetaContext';
import { INITIAL_MESSAGES } from '../constants';

export const options = { headerShown: false };

export default function ChatScreen({
  setActiveTab,
}: {
  setActiveTab: (tab: TabKey) => void;
}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [input, setInput] = useState('');
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const inputRef = useRef<TextInput>(null);
  const [isMessageEditing, setIsMessageEditing] = useState(false);
  const { avatar, name } = useContext(ChatMetaContext) as ChatMeta;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleLongPress = (msg: Message, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setModalPosition({ x: pageX, y: pageY });
    setSelectedMsg(msg);
    setModalVisible(true);
  };

  const handleCopy = async () => {
    if (selectedMsg) {
      try {
        await Clipboard.setStringAsync(selectedMsg.text);
        showToast('Message copied to clipboard');
      } catch (error) {
        showToast('Failed to copy message', 'error');
      }
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedMsg) {
      setMessages((msgs) => msgs.filter((m) => m.id !== selectedMsg.id));
      showToast('Message deleted');
    }
    setModalVisible(false);
  };

  const handleEdit = () => {
    setIsMessageEditing(true);
    if (selectedMsg) {
      setEditingId(selectedMsg.id);
      setEditText(selectedMsg.text);
    }
    setModalVisible(false);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      setMessages((msgs) => msgs.map((m) => m.id === editingId ? { ...m, text: editText } : m));
      setEditingId(null);
      setEditText('');
      setIsMessageEditing(false);
      showToast('Message updated');
    } else {
      showToast('Message cannot be empty', 'error');
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages((msgs) => [
        ...msgs,
        { id: Date.now().toString(), text: input, sender: 'me' },
      ]);
      setInput('');
    }
  };

  const MODAL_ACTIONS: ModalAction[] = [
    {
      key: 'copy',
      icon: 'copy',
      label: 'Copy',
      color: '#222',
      onPress: handleCopy,
    },
    {
      key: 'edit',
      icon: 'edit-2',
      label: 'Edit',
      color: '#222',
      onPress: handleEdit,
    },
    {
      key: 'delete',
      icon: 'trash-2',
      label: 'Delete',
      color: '#e53935',
      textColor: '#e53935',
      onPress: handleDelete,
    },
  ];

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    const isEditing = editingId === item.id;

    let content: React.ReactNode = item.text;
    if (item.italic) {
      const [first, ...rest] = item.text.split('\n');
      content = <><Text style={styles.italic}>{first}</Text>{'\n'}{rest.join('\n')}</>;
    }
    return (
      <TouchableOpacity
        onLongPress={(event) => handleLongPress(item, event)}
        activeOpacity={0.7}
        style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}
      >
        {isEditing ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={[
                styles.editInput,
                isMe ? styles.bubbleMe : styles.bubbleOther,
                { color: '#fff', backgroundColor: 'transparent', borderWidth: 0, paddingVertical: 0, paddingHorizontal: 0, flex: 1 },
              ]}
              autoFocus
              onSubmitEditing={handleEditSave}
              placeholder="Edit message"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={handleEditSave} style={{ marginLeft: 8 }}>
              <Feather name="check" size={20} color="#4caf50" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.bubbleText}>{content}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent={false} />
      {/* Safe header only for top bar */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'rgba(10,10,10,0.98)' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => setActiveTab('home')}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: avatar }} style={styles.headerAvatar} />
          <Text style={styles.headerTitle}>{name}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionBtn}><Ionicons name="heart-outline" size={22} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn}><Feather name="more-horizontal" size={22} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn}><Feather name="corner-up-left" size={22} color="#fff" /></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {/* Main chat area, flexible to keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-70}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContainer}
          style={{ flex: 1 }}
        />
        {/* Message Input - floating, rounded, above tab bar */}
        {isMessageEditing ? null :
          <View style={styles.inputRowWrap} pointerEvents="box-none">
            <View style={styles.inputRow}>
              <TouchableOpacity style={styles.inputIcon}>
                <Feather name="smile" size={20} color="#aaa" />
              </TouchableOpacity>
              <TextInput
                ref={inputRef}
                value={input}
                onChangeText={setInput}
                style={styles.input}
                placeholder="Write a message"
                placeholderTextColor="#aaa"
                multiline
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                <Feather name="arrow-up" size={22} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        }
        {/* Contextual Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={[
              styles.modalBox,
              {
                position: 'absolute',
                left: Math.max(20, Math.min(modalPosition.x - 90, 300)),
                top: Math.min(modalPosition.y + 20, 600),
              }
            ]}>
              {MODAL_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.key}
                  style={styles.modalAction}
                  onPress={action.onPress}
                >
                  <Feather
                    name={action.icon}
                    size={18}
                    color={action.color}
                  />
                  <Text style={[
                    styles.modalActionText,
                    action.textColor && { color: action.textColor }
                  ]}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
        {/* Toast Container */}
        <View style={styles.toastContainer}>
          {toasts.map((toast) => (
            <View key={toast.id} style={[
              styles.toast,
              toast.type === 'error' ? styles.toastError : styles.toastSuccess
            ]}>
              <Feather
                name={toast.type === 'error' ? 'alert-circle' : 'check-circle'}
                size={16}
                color={toast.type === 'error' ? '#fff' : '#fff'}
              />
              <Text style={styles.toastText}>{toast.message}</Text>
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    height: '100%',
    paddingTop: 16,
    backgroundColor: "hsla(240, 10%, 4%, 0.8)",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(10,10,10,0.98)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    zIndex: 10,
  },
  headerIcon: {
    marginRight: 6,
    padding: 4,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerActionBtn: {
    marginLeft: 6,
    padding: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 16,
    marginBottom: 2,
  },
  bubbleMe: {
    backgroundColor: '#4f46e5',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
    minWidth: '60%',
  },
  bubbleOther: {
    backgroundColor: 'rgba(30,30,32,0.98)',
    minWidth: '60%',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  bubbleText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  italic: {
    fontStyle: 'italic',
    color: '#bcbcbc',
  },
  editInput: {
    backgroundColor: '#fff',
    color: '#222',
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 120,
    flex: 1,
  },
  inputRowWrap: {
    alignItems: 'center',
    paddingBottom: 80, // optional, for spacing above tab bar
    backgroundColor: 'hsla(240, 10%, 4%, 0.8)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,32,0.98)',
    borderRadius: 24,
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(60,60,70,0.18)',
  },
  inputIcon: {
    marginRight: 8,
    padding: 6,
    borderRadius: 999,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    minHeight: 40,
    maxHeight: 90,
  },
  sendBtn: {
    backgroundColor: '#ff3d5a',
    borderRadius: 999,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    minWidth: 180,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  modalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalActionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#222',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toastSuccess: {
    backgroundColor: '#4caf50',
  },
  toastError: {
    backgroundColor: '#f44336',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
}); 