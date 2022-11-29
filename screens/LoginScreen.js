import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import context from "../contexts/context";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = context();
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          className="absolute bottom-20 w-52 m-[25%] p-4 bg-white rounded-2xl"
          onPress={signInWithGoogle}
        >
          <Text className="text-center font-semibold text-[#FD3A73]">
            Login & swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
