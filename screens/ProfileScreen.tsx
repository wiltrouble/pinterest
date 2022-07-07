import { StyleSheet, Image, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";

import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";

import pins from "../assets/data/pins";
import { Entypo, Feather } from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";

const GET_USER_QUERY = `
query MyQuery ($id: uuid!){
  user(id: $id) {
    id
    displayName
    avatarUrl
    pins {
      id
      image
      title
      created_at
    }
  }
}
`

export default function ProfileScreen() {
  const [user, setUser] = useState()
  const {signOut} = useSignOut();
  const nhost = useNhostClient()
  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY,
      { id: userId });
    console.log(result);

    if(result.error) {
      Alert.alert("error")
    } else {
      setUser(result.data.user)
    }
    
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  

  if (!user) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather name="share" size={24} color="black" />
          </Pressable>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subTitle}>123 Followers | 456 Following</Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subTitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
