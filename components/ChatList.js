import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import context from "../contexts/context";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = context();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );
 
  return matches.length > 0 ? (
    <FlatList
    className='h-full'
      data={matches}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View className="p-2">
      <Text className="text-center text-lg">No matches at the moment</Text>
    </View>
  );
};

export default ChatList;
