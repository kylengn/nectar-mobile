import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, StatusBar, ViewToken } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Character } from '../types';
import { CHARACTERS } from '../constants';

const { height, width } = Dimensions.get('window');

const renderMessageWithItalics = (message: string) => {
  const parts = message.split(/(\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <Text key={idx} style={styles.messageCardAction}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return <Text key={idx}>{part}</Text>;
  });
};

export default function HomeScreen() {
  const characters: Character[] = CHARACTERS;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const onViewableItemsChanged = useRef(({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
      setInfoExpanded(false);
    }
  }).current;
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  const currentCharacter = characters[currentIndex];
  const infoText = currentCharacter.greeting.replaceAll('{char}', currentCharacter.name).replaceAll('{user}', 'Chad');
  const isLongInfo = infoText.length > 120;

  const renderItem = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.profile_pic_url }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      {/* Fixed Top Bar */}
      <View style={styles.fixedTopBar}>
        <View style={{ flex: 1 }}>
          <View style={styles.profileRow}>
            <Image source={{ uri: currentCharacter.profile_pic_url }} style={styles.avatar} />
            <Text style={styles.profileName}>{currentCharacter.name}</Text>
          </View>
          {/* Likes & Comments Row */}
          <View style={styles.statsRow}>
            <Feather name="heart" size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.statsText}>{(currentCharacter.likes / 1000).toFixed(1)}k</Text>
            <Feather name="message-square" size={16} color="#fff" style={{ marginLeft: 8, marginRight: 4 }} />
            <Text style={styles.statsText}>{(currentCharacter.comments / 1000).toFixed(1)}k</Text>
          </View>
        </View>
        <View style={styles.topIcons}>
          <TouchableOpacity>
            <Feather name="phone" size={22} color="#fff" style={styles.topIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-vertical" size={22} color="#fff" style={styles.topIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={characters}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={0.98}
        style={{ flex: 1 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* Fixed Info + Message Card Container */}
      <View style={styles.fixedBottomInfoContainer}>
        <View style={styles.infoBox}>
          <Text
            style={styles.greeting}
            numberOfLines={infoExpanded ? undefined : 3}
          >
            {infoText}
          </Text>
          {isLongInfo && (
            <TouchableOpacity
              style={styles.readMoreBtn}
              onPress={() => setInfoExpanded((v) => !v)}
            >
              <Text style={styles.readMoreText}>{infoExpanded ? 'Show Less' : 'Read More'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.messageCard}>
          <Text style={styles.messageCardText}>{renderMessageWithItalics(currentCharacter.message)}</Text>
        </View>
      </View>
      {/* Fixed Message Box */}
      <View style={styles.fixedMessageBox}>
        <Text style={styles.message} numberOfLines={2}>Write a message</Text>
        <Feather name="grid" size={24} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height,
    width,
    position: 'relative',
    backgroundColor: '#111',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  fixedTopBar: {
    position: 'absolute',
    top: 48,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 30,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    marginRight: 10,
  },
  profileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsRow: {
    backgroundColor: 'hsla(240, 10%, 4%, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 48,
    marginBottom: 2,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '48%',
  },
  statsText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 2,
    opacity: 0.85,
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topIcon: {
    backgroundColor: 'hsla(0, 0%, 43%, 0.6)',
    padding: 10,
    borderRadius: 100,
  },
  fixedBottomInfoContainer: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 140,
    zIndex: 20,
    flexDirection: 'column',
    gap: 10,
  },
  infoBox: {
    backgroundColor: 'hsla(240, 10%, 4%, 0.8)',
    borderWidth: 1,
    borderColor: 'hsla(0, 0%, 43%, 0.6)',
    borderRadius: 16,
    padding: 16,
  },
  messageCard: {
    backgroundColor: 'hsla(240, 8%, 85%, 1)',
    borderRadius: 14,
    borderTopLeftRadius: 0,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  readMoreBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  readMoreText: {
    color: '#ff3d5a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageCardText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  messageCardAction: {
    fontStyle: 'italic',
    color: '#444',
  },
  fixedMessageBox: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 43%, 0.6)',
    borderRadius: 12,
    padding: 12,
    zIndex: 20,
  },
  message: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    opacity: 0.7,
  },
}); 