import { useState } from "react";
import { StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import Pin from "../components/Pin";
import { View } from "../components/Themed";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string
  }[]
}

const MasonryList = ({pins}: IMasonryList) => {


  // const [numColumns, setNumColumns] = useState(2)

  const width = useWindowDimensions().width
  const numColumns = Math.ceil(width/250)

  

  return (
    <ScrollView contentContainerStyle={{width: '100%'}}>
      <View style={styles.container}>
        {
          Array.from(Array(numColumns)).map((_, colIndex) => (
            <View style={styles.column} key={`column_${colIndex}`}>
          {pins
            .filter((_, index) => index % numColumns === colIndex)
            .map((pin) => (
              <Pin pin={pin} key={pin.id}/>
            ))}
        </View>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default MasonryList

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
});