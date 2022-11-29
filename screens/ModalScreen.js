import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import context from "../contexts/context";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const ModalScreen = () => {
  const { user } = context();
  const navigation = useNavigation();

  const [job, setJob] = useState(null);
  const [pic, setPic] = useState(null);
  const [age, setAge] = useState(null);
  const incompleteForm = !job || !pic || !age;

  const updateProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      job: job,
      photoURL: pic,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      // style={styles.keyboard}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View className="flex-1 items-center pt-1">
          <Image
            source={{
              uri: "https://links.papareact.com/2pf",
            }}
            className="w-full h-20"
            resizeMode="contain"
          />

          <Text className="text-xl text-gray-500 p-2 font-bold">
            Welcome {user.displayName}
          </Text>
          <Text className="text-xl text-center text-red-400 p-4 font-bold">
            Step 1: The Profile Pic
          </Text>
          <TextInput
            value={pic}
            onChangeText={(text) => setPic(text)}
            placeholder="Enter a Profile Pic URL"
            className="text-xl text-center pb-2"
          />
          <Text className="text-xl text-center text-red-400 p-4 font-bold">
            Step 2: The Occupation
          </Text>
          <TextInput
            value={job}
            onChangeText={(text) => setJob(text)}
            placeholder="Enter your occupation"
            className="text-xl text-center pb-2"
          />
          <Text className="text-xl text-center text-red-400 p-4 font-bold">
            Step 3: The Age
          </Text>
          <TextInput
            value={age}
            onChangeText={(text) => setAge(text)}
            placeholder="Enter your age"
            className="text-xl text-center pb-2"
            maxLength={2}
            keyboardType="numeric"
          />

          <TouchableOpacity
            disabled={incompleteForm}
            className={`w-64 rounded-xl p-3 mt-20 ${
              incompleteForm ? "bg-gray-400" : "bg-red-400"
            }`}
            onPress={updateProfile}
          >
            <Text className="text-white text-center text-xl">
              Update profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ModalScreen;
