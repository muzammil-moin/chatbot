import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import sushi from "../assets/sushi.png";
import { ROUT_NAME } from "../utils/Constant";
import colors from "../utils/colors";

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.primaryLight}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={sushi}
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUT_NAME.CHAT)}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.mediumGray} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Profile</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Image
            source={sushi}
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});

export default Home;
