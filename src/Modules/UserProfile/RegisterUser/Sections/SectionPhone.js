import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import Form from "./../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";

class SectionPhone extends React.Component {
  sectionFormVal = {};
  constructor(props) {
    super(props);
  }
  getValidatedValues = (Email, Phone) => {
    this.sectionFormVal["Email"] = Email;
    this.sectionFormVal["Phone"] = Phone;

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
          btnLeftEnable={true}
          btnLeft={{
            title: "Previous",
            onPressMethod: () => {
              this.props.backPressMethod("nameSec");
            },
            btnStyle: { fontSize: 18 },
          }}
          fields={{
            Email: {
              label: "Email Address**",
              validators: [validateContent, validateEmail],
              icon: { type: "materialicons", name: "mail", color: "#17c0eb" },
              inputProps: {
                keyboardType: "email-address",
              },
              placeholder: "Enter your mail id..",
            },
            Phone: {
              label: "Phone Number",
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              validators: [validatePhone],
              inputProps: {
                keyboardType: "phone-pad",
              },
              placeholder: "Mobile number(optional)..",
            },
          }}
        />
        <TextLabel>* Fields cannot be blank.</TextLabel>
        <TextLabel>* Email-Id to be used for password retrieval and account related validation purposes.</TextLabel>
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

export default SectionPhone;
