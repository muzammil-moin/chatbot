import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { createContext } from "react";
import MyChat from "./screens/MyChat";
import { ROUT_NAME } from "./utils/Constant";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { PaperProvider } from "react-native-paper";
import { theme } from "./utils/theme";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={ROUT_NAME.LOGIN}>
      <Stack.Screen name={ROUT_NAME.LOGIN} component={Login} />
      <Stack.Screen name={ROUT_NAME.SIGN_UP} component={SignUp} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName={ROUT_NAME.HOME}>
      <Stack.Screen name={ROUT_NAME.HOME} component={Home} />
      <Stack.Screen name={ROUT_NAME.CHAT} component={MyChat} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      try {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      } catch (error) {
        console.error("Error during authentication:", error);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavigationContainer>
          {user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <AuthenticatedUserProvider>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default App;
