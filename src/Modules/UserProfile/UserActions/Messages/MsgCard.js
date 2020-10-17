import React, { useState } from "react";
import TransparentBtn from "./../../../../Elements/Button/TransparentBtn";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import Modal from "./../../../../Utils/Modal";
import { ListItem, Avatar } from "react-native-elements";
import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
const { width, height } = Dimensions.get("window");
import MsgWrapper from "./../../../../Utils/MsgWrapper";
import { updateKey } from "./../../../../Firebase/FirebaseActions";

const MsgCard = ({ item, index, type }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
    if (type == "received") {
      openMessageDetails(item);
    }
  };
  const openMessageDetails = (item) => {
    if (!item.MessageSeen) {
      updateKey({ MessageSeen: true }, "Messages/" + item.MessageId).then(() => {});
    }
  };
  return (
    <>
      <ListItem onPress={() => toggleOverlay()} key={index} bottomDivider containerStyle={type == "received" ? [!item.MessageSeen ? { backgroundColor: "#ffffff" } : { backgroundColor: "#FFEBEE" }] : [{ backgroundColor: "#ffffff" }]}>
        <Avatar size='medium' containerStyle={{ backgroundColor: "#DD2476", elevation: 6 }} titleStyle={[{ color: "#ffffff" }, cssUtil.iconShadow]} rounded title={type == "received" ? item.SenderName.split(" ")[0][0].toUpperCase() + item.SenderName.split(" ")[item.SenderName.split(" ").length - 1][0].toUpperCase() : item.ReceiverName.split(" ")[0][0].toUpperCase() + item.ReceiverName.split(" ")[item.ReceiverName.split(" ").length - 1][0].toUpperCase()} />
        <ListItem.Content>
          <ListItem.Title style={{ color: "#3e0909", fontSize: 19, fontFamily: "UbuntuCondensed-Regular" }}>
            <TextLabel style={[{ fontWeight: "bold" }, textUtil.capitalize]}>{type == "received" ? item.SenderName : item.ReceiverName}</TextLabel>
            <TextLabel style={[textUtil.passiveTextX]}>{"  " + item.MessageDate.split(" ")[1] + " " + item.MessageDate.split(" ")[2]}</TextLabel>
          </ListItem.Title>
          <View>
            {item.MessageHeader !== "" ? <TextLabel>{item.MessageHeader}</TextLabel> : null}
            <View style={[viewUtil.viewRow]}>
              <TextLabel style={[textUtil.passiveText]} numberOfLines={1}>
                {item.MessageBody}
              </TextLabel>
            </View>
          </View>
        </ListItem.Content>
        <ListItem.Chevron color='#FF512F' />
      </ListItem>
      <Modal visibility={visible} onCloseMethod={() => toggleOverlay()}>
        <View style={{ minWidth: "85%", maxWidth: "85%", height: "80%" }}>
          <View style={{ minHeight: height / 1.4, maxHeight: height / 1.4 }}>
            <ScrollView>
              <View>
                <TextLabel>{type == "received" ? "From :" : "To :"}</TextLabel>
                <View>
                  <TextLabel style={[{ fontSize: 20 }, textUtil.capitalize]}>{type == "received" ? item.SenderName.toLowerCase() : item.ReceiverName.toLowerCase()}</TextLabel>
                </View>
                <View>
                  <TextLabel style={[textUtil.passiveText]}>{item.MessageDate}</TextLabel>
                </View>
                <View>
                  <TextLabel style={[{ fontSize: 20, marginTop: 10 }]}>{item.MessageHeader}</TextLabel>
                </View>
                <View style={{ marginTop: 20 }}>
                  <TextLabel>{item.MessageBody}</TextLabel>
                </View>
              </View>
            </ScrollView>
            {type == "sent" ? null : (
              <MsgWrapper
                label='Reply to message'
                actionStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                iconType='wrapper'
                receiverDetails={{ UserId: item.SenderId, userName: item.SenderName }}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
export default MsgCard;
