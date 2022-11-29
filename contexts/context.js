import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";

WebBrowser.maybeCompleteAuthSession();

// import * as Google from "expo-google-app-auth";

const config = {
  androidClientId:
    "373673010996-8mton7ofjif41s5oihpc8n6eih31o2ei.apps.googleusercontent.com",
  iosClientId:
    "373673010996-8mton7ofjif41s5oihpc8n6eih31o2ei.apps.googleusercontent.com",
  expoClientId:
    "373673010996-n2civ75lqv8ijf1jhbmt4069jin216cs.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profle", "email", "gender", "location"],
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [request, response, googlePromptLogin] = Google.useAuthRequest(config);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await googlePromptLogin()
      .then(async (response) => {
        if (response.type === "success") {
          // const {idToken, accessToken} = response;
          // const credential = GoogleAuthProvider.credential(idToken, accessToken)
          const credential = GoogleAuthProvider.credential(
            null,
            response.authentication.accessToken
          );
          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const preventRerending = useMemo(() => ({
    user, signInWithGoogle, error, loading, logOut
  }), [user, error, loading]);
  return (
    <AuthContext.Provider
      value={preventRerending}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
