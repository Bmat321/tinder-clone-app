import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import context from "../contexts/context";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useNavigation } from "@react-navigation/core";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatRow = ({ matchDetails }) => {
  const { user } = context();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    setMatchUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
      className={`bg-white flex-row items-center rounded-lg my-1 mx-3 py-3 px-5 ${styles.shadow}`}
    >
      <Image
        source={{ uri: matchedUserInfo?.photoURL }}
        className="mr-4 rounded-full w-16 h-16"
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
export default ChatRow;
