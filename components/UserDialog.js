import { View, Text, Dialog } from "react-native";
import React from "react";
import { Portal } from "react-native-paper";

const UserDialog = ({ title, description, onPress }) => {
  return (
    <Portal>
      <Dialog
        visible={errorDialogVisible}
        onDismiss={() => setErrorDialogVisible(false)}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPress}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default UserDialog;
