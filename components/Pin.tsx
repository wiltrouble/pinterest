import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

const Pin = (props) => {

  const {image, title} = props.pin

  const [ratio, setRatio] = useState(1)

  const onLike = () => {
    console.warn("pressed");
  }

  

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRatio(width/height))    
    }
  }, [image])
  

  return (
    <View style={styles.pin}>
      <View>
      <Image
        source={{
          uri: image,
        }}
        style={[styles.image, {aspectRatio: ratio}]}
      />
      <Pressable onPress={onLike} style={styles.heartBtn}>
        <AntDesign name="hearto" size={16} color="black" />
      </Pressable>
      </View>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Pin;


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  image: {
    width: "100%",
    borderRadius: 25,
  },
  pin: {
    width: '100%',
  },
  heartBtn: {
    backgroundColor: '#D3CFD4',
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  }
});