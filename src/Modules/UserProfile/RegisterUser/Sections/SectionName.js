import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import Form from "./../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail } from "./../../../../Elements/Validator/Validator";
class SectionName extends React.Component {
  sectionFormVal = {};
  constructor(props) {
    super(props);
  }

  getValidatedValues = (Firstname, Lastname, Password) => {
    this.sectionFormVal["Firstname"] = Firstname.trim();
    this.sectionFormVal["Lastname"] = Lastname.trim();
    this.sectionFormVal["Password"] = Password;
    return this.sectionFormVal;
  };

  transmitFormVal = (datObj) => {
    this.props.transmitData(datObj);
  };
  render() {
    return (
      <View style={[styles.regCard, cssUtil.shadowXX, this.props.type === "hide" ? { display: "none" } : null]}>
        <Form
          action={this.getValidatedValues}
          afterSubmit={this.transmitFormVal}
          buttonText='Next'
          buttonOrientation='right'
          btnType='solid'
          theme='dark'
          btnLeftEnable={false}
          fields={{
            Firstname: {
              label: "First Name*",
              validators: [validateContent],
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              inputProps: {
                keyboardType: "email-address",
              },
              placeholder: "Enter your first name..",
            },
            Lastname: {
              label: "Last Name*",
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              validators: [validateContent],
              inputProps: {
                keyboardType: "email-address",
              },
              placeholder: "Enter your last name..",
            },
            Password: {
              label: "Password*",
              icon: { name: "more", color: "#17c0eb" },
              validators: [validateContent, validateLength],
              inputProps: {
                secureTextEntry: true,
              },
              placeholder: "Set a password..",
            },
          }}
        />
        <TextLabel>* Fields cannot be blank.</TextLabel>
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

export default SectionName;
