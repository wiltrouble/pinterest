import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useNhostClient } from "@nhost/react";

const Pin = (props) => {
  const { id, image, title } = props.pin;

  const [imageUrl, setImageUrl] = useState("")

  const [ratio, setRatio] = useState(1);

  const navigation = useNavigation();

  const nhost = useNhostClient()

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: image
    })
    setImageUrl(result.presignedUrl?.url)
  }

  useEffect(() => {
    fetchImage()
  }, [image])
  

  useEffect(() => {
    if (imageUrl) {
      Image.getSize(imageUrl, (width, height) => setRatio(width / height));
    }
  }, [imageUrl]);

  const onLike = () => {
    console.warn("pressed");
  };

  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable style={styles.pin} onPress={goToPinPage}>
      <View>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Pin;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    margin: 5,
    color: "#181818",
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  pin: {
    width: "100%",
    padding: 4,
  },
  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});
