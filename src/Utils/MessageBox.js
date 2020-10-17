import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import EditForm from "./../Elements/Form/EditForm";
import { Button, Icon } from "react-native-elements";
import { validateContent } from "./../Elements/Validator/Validator";
import { ScrollView } from "react-native-gesture-handler";

const MessageBox = ({ name, visibility, closeMsgBox }) => {
  const msgFormValues = {};
  const getValidatedValues = (MessageReceiver, MessageHeader, MessageBody) => {
    msgFormValues["MessageReceiver"] = MessageReceiver;
    msgFormValues["MessageHeader"] = MessageHeader;
    msgFormValues["MessageBody"] = MessageBody;
    return msgFormValues;
  };
  const transmitFormVal = (obj) => {
    closeMsgBox(obj);
  };
  return (
    <Overlay fullScreen={true} backdropStyle={{ opacity: 0.8, backgroundColor: "#000000" }} isVisible={visibility} onBackdropPress={() => closeMsgBox()}>
      <>
        <View style={{ alignSelf: "flex-end" }}>
          <Button icon={<Icon name='close' size={40} color='#000000' />} onPress={() => closeMsgBox("")} type='clear' />
        </View>
        <>
          <ScrollView>
            <View style={{ width: "100%" }}>
              <EditForm
                action={getValidatedValues}
                afterSubmit={transmitFormVal}
                buttonText='Send'
                buttonOrientation='right'
                btnType='solid'
                theme='dark'
                btnLeftEnable={true}
                btnLeft={{
                  title: "Cancel",
                  onPressMethod: () => {
                    closeMsgBox("");
                  },
                  btnStyle: { fontSize: 18 },
                }}
                fields={{
                  MessageReceiver: {
                    label: "To",
                    icon: { name: "person", color: "#17c0eb" },
                    validators: [],
                    value: name.toUpperCase(),
                    inputProps: {
                      disabled: true,
                    },
                  },
                  MessageHeader: {
                    label: "Message Topic",
                    validators: [],
                    value: "",
                    inputProps: {
                      returnKeyType: "done",
                      blurOnSubmit: true,
                      keyboardType: "default",
                      multiline: true,
                      numberOfLines: 3,
                    },
                    placeholder: "Type subject of your message...",
                  },
                  MessageBody: {
                    label: "Message Body*",
                    validators: [validateContent],
                    value: "",
                    inputProps: {
                      returnKeyType: "done",
                      blurOnSubmit: true,
                      keyboardType: "default",
                      multiline: true,
                      numberOfLines: 10,
                    },
                    placeholder: "Type your message...",
                  },
                }}
              />
            </View>
            <View style={{ marginVertical: 30 }}></View>
          </ScrollView>
        </>
      </>
    </Overlay>
  );
};
const styles = StyleSheet.create({});
export default MessageBox;
