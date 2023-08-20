// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { Image, StyleSheet, View } from "react-native";
// import { Button, Text, TextInput } from "react-native-paper";
// import { auth } from "../config/firebase";
// import { ROUT_NAME } from "../utils/Constant";

// import bgImage from "../assets/bg.jpg";
// import colors from "../utils/colors";
// import UserDialog from "../components/UserDialog";

// const SignUp = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorDialogVisible, setErrorDialogVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onHandleSignUp = async () => {
//     if (email !== "" && password !== "") {
//       try {
//         setLoading(true);
//         await createUserWithEmailAndPassword(auth, email, password);
//         console.log("Signup successful");
//       } catch (error) {
//         console.log("Signup failed", error.message);
//         setErrorDialogVisible(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={bgImage} style={styles.backImage} />
//       <View style={styles.whiteSheet} />
//       <View style={styles.form}>
//         <Text style={styles.title}>Sign Up</Text>
//         <TextInput
//           mode="outlined"
//           keyboardType="email-address"
//           textContentType="emailAddress"
//           autoFocus={true}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           placeholder="Enter email"
//         />
//         <TextInput
//           mode="outlined"
//           secureTextEntry={true}
//           textContentType="password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           placeholder="Enter password"
//         />
//         <Button mode="contained" style={styles.button} onPress={onHandleSignUp}>
//           {loading ? "loading..." : "Sign Up"}
//         </Button>
//         <View style={styles.signupTextContainer}>
//           <Text style={styles.signupText}>Already have an account?</Text>
//           <Text
//             style={styles.signupLink}
//             onPress={() => navigation.navigate(ROUT_NAME.LOGIN)}
//           >
//             Sign In
//           </Text>
//         </View>
//       </View>
//       <UserDialog
//         isVisible={errorDialogVisible}
//         onPress={() => setErrorDialogVisible(true)}
//         description={"There was an error during signup. Please try again."}
//         title={"Signup Error"}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   backImage: {
//     width: "100%",
//     height: 340,
//     position: "absolute",
//     top: 0,
//     resizeMode: "cover",
//   },
//   whiteSheet: {
//     width: "100%",
//     height: "75%",
//     position: "absolute",
//     bottom: 0,
//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 12,
//   },

//   form: {
//     flex: 1,
//     justifyContent: "center",
//     marginHorizontal: 30,
//   },
//   button: {
//     backgroundColor: "rgba(128, 0, 128, 0.1)",
//     height: 58,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },

//   title: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: colors.primary,
//     alignSelf: "center",
//     paddingBottom: 24,
//     paddingTop: 50,
//   },
// });

// export default SignUp;

import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ROUT_NAME } from "../utils/Constant";

import bgImage from "../assets/bg.jpg";
import colors from "../utils/colors";
import UserDialog from "../components/UserDialog";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleSignUp = async () => {
    if (email !== "" && password !== "") {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup successful");
      } catch (error) {
        console.log("Signup failed", error.message);
        setErrorDialogVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          mode="flat" // Use flat input style
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter email"
        />
        <TextInput
          mode="flat" // Use flat input style
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Enter password"
        />
        <Button mode="contained" style={styles.button} onPress={onHandleSignUp}>
          {loading ? "loading..." : "Sign Up"}
        </Button>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate(ROUT_NAME.LOGIN)}
          >
            Sign In
          </Text>
        </View>
      </View>
      <UserDialog
        isVisible={errorDialogVisible}
        onPress={() => setErrorDialogVisible(false)}
        description={"There was an error during signup. Please try again."}
        title={"Signup Error"}
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
    borderTopLeftRadius: 12,
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
  signupTextContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  signupText: {
    fontWeight: "600",
    fontSize: 14,
    color: "gray",
  },
  signupLink: {
    fontWeight: "600",
    fontSize: 14,
    color: "rgba(128, 0, 128, 1)",
    marginLeft: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "center",
    paddingBottom: 24,
    paddingTop: 50,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
});

export default SignUp;
