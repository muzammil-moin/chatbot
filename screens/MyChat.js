// import { useNavigation } from "@react-navigation/native";
// import { signOut } from "firebase/auth";
// import React, { useLayoutEffect, useState } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import { auth, database } from "../config/firebase";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { AntDesign } from "@expo/vector-icons";
// import {
//   addDoc,
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import sushiIcon from "../assets/sushi.png";
// import { theme } from "../utils/theme";

// const MyChat = () => {
//   const [messages, setMessages] = useState([]);

//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       navigation.navigate(ROUT_NAME.LOGIN); // Navigate to the login screen
//     } catch (error) {
//       console.log("Logout error", error);
//     }
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity
//           style={{
//             marginRight: 10,
//           }}
//           onPress={handleLogout}
//         >
//           <AntDesign
//             name="logout"
//             size={24}
//             color={theme.colors.primary}
//             style={{ marginRight: 20 }}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   useLayoutEffect(() => {
//     const collectionRef = collection(database, "chats");
//     const q = query(collectionRef, orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newMessages = snapshot.docs.map((doc) => ({
//         _id: doc.id,
//         createdAt: doc.data().createdAt.toDate(),
//         text: doc.data().text,
//         user: doc.data().user,
//       }));
//     });

//     return () => unsubscribe();
//   }, []);

//   const onSend = (newMessages = []) => {
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//     if (messages.length > 0) {
//       const { _id, createdAt, text, user } = messages[0];

//       addDoc(collection(database, "chats"), {
//         _id,
//         createdAt,
//         text,
//         user,
//       });
//     }
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={{
//         _id: auth.currentUser.email,
//         avatar: sushiIcon,
//       }}
//       messagesContainerStyle={{
//         backgroundColor: theme.colors.primary,
//       }}
//     />
//   );
// };

// export default MyChat;

import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import sushiIcon from "../assets/sushi.png";
import { theme } from "../utils/theme";

const MyChat = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate(ROUT_NAME.LOGIN);
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={handleLogout}
        >
          <AntDesign
            name="logout"
            size={24}
            color={theme.colors.primary}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const { _id, createdAt, text, user } = newMessages[0];

    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: auth.currentUser.email,
        avatar: sushiIcon,
        name: "name",
      }}
      messagesContainerStyle={{
        backgroundColor: theme.colors.primary,
      }}
    />
  );
};

export default MyChat;
