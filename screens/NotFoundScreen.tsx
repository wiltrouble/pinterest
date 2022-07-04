import { StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons'

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React from 'react';

export default function NotFoundScreen() {

  const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"black"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  backBtn: {
    position: 'absolute',
    left: 50
  }
});
