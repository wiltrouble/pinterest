import MasonryList from "../components/MasonryList";
import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";
import { Alert } from "react-native";

export default function HomeScreen(){

  const nhost = useNhostClient();
  const [pins, setPins] = useState([])

  const fetchPins = async () => {
    const response = await nhost.graphql.request(`
      query MyQuery {
        pins {
          created_at
          id
          image
          title
          user_id
        }
      }
    `);
    if (response.error) {
      Alert.alert("Error fetchin pins ")
    } else {
      setPins(response.data.pins)
      console.log(pins);
      
    }
    
  }

  useEffect(() => {
    fetchPins()
  }, [])
  

  return (
    <MasonryList pins={pins}/>
  );
}
