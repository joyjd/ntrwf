import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { Picker } from "@react-native-community/picker";
import TextLabel from "./../../../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../../../Utils/IconRenderer";
import Form from "./../../../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail } from "./../../../../../../Elements/Validator/Validator";

class SecSecond extends React.Component {
  secSecondFormValues = {};

  constructor(props) {
    super(props);
  }
  getValidatedValues = (ItemDesc, ItemLocation) => {
    this.secSecondFormValues["ItemDesc"] = ItemDesc;
    this.secSecondFormValues["ItemLocation"] = ItemLocation;
    return this.secSecondFormValues;
  };
  transmitFormVal = (obj) => {
    this.props.transmitData(this.secSecondFormValues);
  };
  render() {
    return (
      <View style={[this.props.type === "hide" ? { display: "none" } : null]}>
        <View style={[styles.regCard, cssUtil.shadowXX]}>
          <Form
            action={this.getValidatedValues}
            afterSubmit={this.transmitFormVal}
            buttonText='Next'
            buttonOrientation='right'
            btnType='solid'
            theme='dark'
            btnLeftEnable={true}
            btnLeft={{
              title: "Previous",
              onPressMethod: () => {
                this.props.backPressMethod("secFirst");
              },
              btnStyle: { fontSize: 18 },
            }}
            fields={{
              ItemDesc: {
                label: "Describe your Item (optional)",

                icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                inputProps: {
                  returnKeyType: "done",
                  blurOnSubmit: true,
                  keyboardType: "default",
                  multiline: true,
                  numberOfLines: 6,
                },
                placeholder: "Describe your item condition,special features..",
              },
              ItemLocation: {
                label: "Availability of Item*",
                icon: { name: "add-location", color: "#17c0eb" },
                validators: [validateContent],
                inputProps: {
                  returnKeyType: "done",
                  blurOnSubmit: true,
                  keyboardType: "default",
                  multiline: true,
                  numberOfLines: 3,
                },
                placeholder: "Location address of item...",
              },
            }}
          />
        </View>
        <View style={{ marginVertical: 60 }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
export default SecSecond;
