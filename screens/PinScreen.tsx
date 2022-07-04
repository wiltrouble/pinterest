import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NotFoundScreen from "./NotFoundScreen";
import React from "react";
import { useNhostClient } from "@nhost/react";

const PinScreen = () => {
  // const pin = pins[3];

  const [ratio, setRatio] = useState(1);
  const [pin, setPin] = useState<any>(null)
  const nhost = useNhostClient();
  const navigation = useNavigation();
  const route = useRoute();

  const insets = useSafeAreaInsets();

  const pinId = route.params?.id;
  

  const fetchPin = async (pinId) => {
    const response = await nhost.graphql.request(`
    query MyQuery ($id: uuid!){
      pins_by_pk(id: $id) {
        id
        image
        title
        created_at
        user_id
      }
      users {
        avatarUrl
        displayName
      }
    }
    `, {id: pinId});
    if (response.error) {
      Alert.alert("Error fetching the pin")
    } else {
      setPin(response.data.pins_by_pk)
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  
  useEffect(() => {
    fetchPin(pinId)
  }, [pinId])
  

  useEffect(() => {
    if (pin?.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin]);

  if (!pin) {
    return <NotFoundScreen />;
  }


  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Text style={styles.title}>{pin.title}</Text>
      </View>
      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: "100%",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },
  backBtn: {
    position: "absolute",
    left: 10,
  },
});
