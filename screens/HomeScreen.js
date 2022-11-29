import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import context from "../contexts/context";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

// const DUMMY = [
//   {
//     firstname: "Byran",
//     lastname: "Bow",
//     job: "Software Developer",
//     photURL: "https://picsum.photos/seed/picsum/200/300",
//     age: 28,
//     id: 123,
//   },
//   {
//     firstname: "Parker",
//     lastname: "Pete ",
//     job: "Software Developer",
//     photURL: "https://picsum.photos/id/237/200/300",
//     age: 38,
//     id: 1234,
//   },
//   {
//     firstname: "Sunny",
//     lastname: "King",
//     job: "Software Developer",
//     photURL: "https://picsum.photos/200/300",
//     age: 42,
//     id: 1235,
//   },
// ];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = context();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  console.log(profiles);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;
    const fetchData = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds], [...swipedUserIds])
        ),

        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id, 
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchData();
    return unsub;
  }, [user, db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    // const userLoggedInProfile = await (
    //   await getDoc(doc(db, "users", user.uid)
    // )).data();

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (await getDoc(doc(db, "users", user.uid))).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you match at them

          console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          // Create the Match

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(`You swiped SWIPE on ${userSwiped.job}`);
          setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
        }
      }
    );

  };

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Header */}
      <View className="flex-row items-center px-5 justify-between">
        <TouchableOpacity onPress={logOut}>
          <Image
            source={{ uri: user?.photoURL }}
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../assets/tinder.png")}
            className="w-14 h-14"
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* Card */}
      <View>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          backgroundColor="FF5864"
          cards={profiles}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                className="relative -mt-3 bg-white h-3/4 rounded-xl"
              >
                <Image
                  source={{ uri: card.photoURL }}
                  className="absolute top-0 w-full h-full rounded-xl"
                />

                <View
                  className={`absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl ${styles.shadow} `}
                >
                  <View>
                    <Text className="text-xl font-bold">
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-2xl font-bold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                className={`bg-white relative justify-center items-center rounded-xl h-3/4 ${styles.shadow}`}
              >
                <Text className="font-bold pb-5">No more profiles</Text>
                <Image
                  source={{
                    uri: "https://links.papareact.com/6gb",
                  }}
                  className="w-full h-20"
                  height={100}
                  width={100}
                  resizeMode="contain"
                />
              </View>
            )
          }
        />
      </View>

      <View className="flex flex-row justify-evenly absolute bottom-8 w-full">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="justify-center items-center rounded-full h-16 w-16 bg-red-200"
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="justify-center items-center rounded-full h-16 w-16 bg-green-200"
        >
          <AntDesign name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

export default HomeScreen;
