import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"; // Import ActivityIndicator
import { TextInput, Button, Portal } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ROUT_NAME } from "../utils/Constant";

import bgImage from "../assets/bg.jpg";
import UserDialog from "../components/UserDialog";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      setLoading(true); // Set loading to true when login starts
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login successful");
        })
        .catch((err) => {
          console.log("Login failed", err.message);
          setErrorDialogVisible(true);
        })
        .finally(() => {
          setLoading(false); // Set loading back to false after login attempt
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          mode="flat"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter email"
          style={styles.input}
        />
        <TextInput
          mode="flat"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter password"
          style={styles.input}
        />
        <Button mode="contained" style={styles.button} onPress={onHandleLogin}>
          {/* {loading ? <ActivityIndicator color="white" /> : "Sign in"} */}
          {loading ? "loading..." : "Sign in"}
        </Button>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: "gray",
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUT_NAME.SIGN_UP)}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: "rgba(128, 0, 128, 1)",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <UserDialog
        isVisible={errorDialogVisible}
        description={"There was an error during login. Please try again."}
        title={"Login Error"}
        onPress={() => setErrorDialogVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
  },

  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    // backgroundColor: "rgba(128, 0, 128, 0.1)",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
  input: {
    backgroundColor: "rgba(128, 0, 128, 0.05)",
    // height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    // padding: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "rgba(128, 0, 128, 1)",
    alignSelf: "center",
    paddingBottom: 24,
    paddingTop: 90,
  },
});

export default Login;
