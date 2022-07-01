import { StyleSheet, ScrollView } from "react-native";
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
  return (
    <ScrollView contentContainerStyle={{width: '100%'}}>
      <View style={styles.container}>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id}/>
            ))}
        </View>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id}/>
            ))}
        </View>
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