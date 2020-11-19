import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import TextLabel from "./../../../Elements/TextLabel/TextLabel";
import Form from "./../../../Elements/Form/Form";
import { Button, Icon } from "react-native-elements";
import { validateContent } from "./../../../Elements/Validator/Validator";
import { ScrollView } from "react-native-gesture-handler";

const PostDiscussion = ({ visibility, closeMsgBox }) => {
  const discFormValues = {};
  const getValidatedValues = (DiscDesc, DiscTitle) => {
    discFormValues["DiscTitle"] = DiscTitle;
    discFormValues["DiscDesc"] = DiscDesc;
    return discFormValues;
  };
  const transmitFormVal = (obj) => {
    closeMsgBox(obj);
  };
  return (
    <Overlay fullScreen={true} backdropStyle={{ opacity: 0.8, backgroundColor: "#000000" }} isVisible={visibility} onBackdropPress={() => closeMsgBox("")}>
      <>
        <View style={{ alignSelf: "flex-end" }}>
          <Button icon={<Icon name='close' size={40} color='#000000' />} onPress={() => closeMsgBox("")} type='clear' />
        </View>
        <>
          <ScrollView>
            <View style={{ width: "100%" }}>
              <Form
                action={getValidatedValues}
                afterSubmit={transmitFormVal}
                buttonText='Post'
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
                  DiscTitle: {
                    label: "Topic Title*",
                    validators: [validateContent],
                    inputProps: {
                      returnKeyType: "done",
                      blurOnSubmit: true,
                      keyboardType: "default",
                      multiline: true,
                      numberOfLines: 3,
                    },
                    placeholder: "Type a title for discussion...",
                  },
                  DiscDesc: {
                    label: "Topic Description*",
                    validators: [validateContent],
                    inputProps: {
                      returnKeyType: "done",
                      blurOnSubmit: true,
                      keyboardType: "default",
                      multiline: true,
                      numberOfLines: 10,
                    },
                    placeholder: "Describe your topic...",
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

export default PostDiscussion;
