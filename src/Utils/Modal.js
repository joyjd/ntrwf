import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { Button, Icon } from "react-native-elements";

import { StyleSheet, View } from "react-native";
import TextLabel from "./../Elements/TextLabel/TextLabel";

const Modal = ({ visibility, children, onCloseMethod }) => {
  return (
    <Overlay backdropStyle={{ opacity: 0.8, backgroundColor: "#000000" }} isVisible={visibility} onBackdropPress={() => onCloseMethod()} fullScreen={false}>
      <>
        <View style={styles.closeIcon}>
          <Button icon={<Icon name='close' size={40} color='white' />} onPress={() => onCloseMethod()} type='clear' />
        </View>
        {children}
      </>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",

    marginTop: -55,
    marginLeft: -15,
  },
});
export default Modal;
