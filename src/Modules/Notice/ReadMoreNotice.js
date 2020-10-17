import React, { useState } from "react";
import TransparentBtn from "./../../Elements/Button/TransparentBtn";
import { StyleSheet, View } from "react-native";

import Modal from "./../../Utils/Modal";

const ReadMoreNotice = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        <TransparentBtn onPressMethod={() => toggleOverlay()} title='Read more..' />
      </View>
      <Modal visibility={visible} onCloseMethod={() => toggleOverlay()}>
        {children}
      </Modal>
    </>
  );
};

export default ReadMoreNotice;
