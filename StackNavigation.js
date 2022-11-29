import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./contexts/context";
import ModalScreen from "./screens/ModalScreen";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="Message" component={MessageScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
              <Stack.Screen name="Match" component={MatchScreen} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
}
