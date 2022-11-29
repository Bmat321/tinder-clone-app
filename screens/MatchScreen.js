import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { styled } from "nativewind";

const MatchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation()
  const { loggedInProfile, userSwiped } = route.params;
  return (
    <View className="h-full bg-red-500 pt-20 opacity-0.89">
      <View className="justify-center pt-20 px-10">
        <Image source={{ uri: "https://links.papareact.com/mg9" }}  className='h-20 w-full rounded-full'/>
        <Text className="text-white text-center mt-5">
          You and {userSwiped.displayName} have match each other
        </Text>

        <View className="flex-row justify-evenly mt-10">
          <Image
            source={{ uri: userSwiped.photoURL }}
            className="w-32 h-32 rounded-full"
          />
          <Image
            source={{ uri: loggedInProfile.photoURL }}
            className="w-32 h-32 rounded-full"
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-white m-5 py-8 px-10 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center text-[#FD3A73]">Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
