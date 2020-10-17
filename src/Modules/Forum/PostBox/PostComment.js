import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View, Dimensions } from "react-native";
import TextLabel from "./../../../Elements/TextLabel/TextLabel";
import Form from "./../../../Elements/Form/Form";
import { Button, Icon } from "react-native-elements";
import { validateContent } from "./../../../Elements/Validator/Validator";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "./../../../Utils/Modal";
const { width, height } = Dimensions.get("window");

const PostComment = ({ visibility, closeMsgBox }) => {
  const commentFormValues = {};
  const getValidatedValues = (DComBody) => {
    commentFormValues["DComBody"] = DComBody;
    return commentFormValues;
  };
  const transmitFormVal = (obj) => {
    closeMsgBox(obj);
  };
  return (
    <>
      <Modal visibility={visibility} onCloseMethod={() => closeMsgBox("")}>
        <View style={{ minWidth: "90%", maxWidth: "90%", height: "80%" }}>
          <View style={{ minHeight: height / 1.4, maxHeight: height / 1.4 }}>
            <ScrollView>
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
                  DComBody: {
                    label: "Your Comment*",
                    validators: [validateContent],
                    inputProps: {
                      returnKeyType: "done",
                      blurOnSubmit: true,
                      keyboardType: "default",
                      multiline: true,
                      numberOfLines: 14,
                    },
                    placeholder: "Type your comment...",
                  },
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PostComment;
