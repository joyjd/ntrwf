import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import Form from "./../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";

class SectionAddress extends React.Component {
  sectionFormVal = {};
  constructor(props) {
    super(props);
  }
  getValidatedValues = (Email, Phone) => {
    this.sectionFormVal["Building"] = Email;
    this.sectionFormVal["Locality"] = Phone;

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
          buttonText='Submit'
          buttonOrientation='right'
          btnType='solid'
          theme='dark'
          btnLeftEnable={true}
          btnLeft={{
            title: "Previous",
            onPressMethod: () => {
              this.props.backPressMethod("phoneSec");
            },
            btnStyle: { fontSize: 18 },
          }}
          fields={{
            Building: {
              label: "FLat/Building/Society name*",
              validators: [validateContent],
              icon: { name: "location-city", color: "#17c0eb" },
              inputProps: {
                returnKeyType: "done",
                blurOnSubmit: true,
                keyboardType: "default",
                multiline: true,
                numberOfLines: 4,
              },
              placeholder: "Flat No./Apartment name..",
            },
            Locality: {
              label: "Street Address*",
              icon: { name: "add-location", color: "#17c0eb" },
              validators: [validateContent],
              inputProps: {
                returnKeyType: "done",
                blurOnSubmit: true,
                keyboardType: "default",
                multiline: true,
                numberOfLines: 6,
              },
              placeholder: "Locality/Block address..",
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
export default SectionAddress;
