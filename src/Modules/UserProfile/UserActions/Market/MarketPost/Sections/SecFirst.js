import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { Picker } from "@react-native-community/picker";
import TextLabel from "./../../../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../../../Utils/IconRenderer";
import Form from "./../../../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail } from "./../../../../../../Elements/Validator/Validator";

class SecFirst extends React.Component {
  secFirstFormValues = {
    ItemType: "- Select -",
    ItemUnit: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      postCategory: "- Select -",
      postUnit: "Unit",
      errorText: "",
    };
  }

  postCategoryValueChange = (itemValue, itemIndex) => {
    this.setState(
      {
        postCategory: itemValue,
        errorText: "",
      },
      () => (this.secFirstFormValues["ItemType"] = itemValue)
    );
  };
  postUnitValueChange = (itemValue, itemIndex) => {
    this.setState(
      {
        postUnit: itemValue,
      },
      () => (this.secFirstFormValues["ItemUnit"] = itemValue)
    );
  };

  transmitFormVal = (obj) => {
    if (this.secFirstFormValues["ItemType"] === "- Select -") {
      this.setState({
        errorText: "! Type not selected.",
      });
    } else {
      this.props.transmitData(this.secFirstFormValues);
    }
  };
  getValidatedValues = (ItemName, ItemPrice) => {
    this.secFirstFormValues["ItemName"] = ItemName;
    this.secFirstFormValues["ItemPrice"] = ItemPrice;
    return this.secFirstFormValues;
  };

  render() {
    return (
      <View style={[this.props.type === "hide" ? { display: "none" } : null]}>
        <View style={[styles.regCard, cssUtil.shadowXX]}>
          <View style={styles.pickerWrapper}>
            <View style={[viewUtil.viewRow]}>
              <IconRenderer iconFamily='Fontisto' iconName='credit-card' size={18} color='#17c0eb' />
              <TextLabel style={[{ fontWeight: "bold", color: "#3e0909d6", paddingLeft: 5 }]}>Select Item Type Of Your Post*</TextLabel>
            </View>

            <Picker style={styles.customPicker} selectedValue={this.state.postCategory} onValueChange={(itemValue, itemIndex) => this.postCategoryValueChange(itemValue, itemIndex)}>
              <Picker.Item key='1' label='- Select -' value='- Select -' />
              <Picker.Item key='2' label='Item For Rent' value='Rent' />
              <Picker.Item key='3' label='Item For Resale' value='Resale' />
            </Picker>
            <TextLabel style={[{ color: "#b33939", paddingLeft: 5 }]}>{this.state.errorText}</TextLabel>
          </View>
          {this.state.postCategory !== "Rent" ? null : (
            <View style={styles.pickerWrapper}>
              <View style={[viewUtil.viewRow]}>
                <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={18} color='#17c0eb' />
                <TextLabel style={[{ fontWeight: "bold", color: "#3e0909d6", paddingLeft: 5 }]}>Set Rent Unit*</TextLabel>
              </View>

              <Picker style={styles.customPicker} selectedValue={this.state.postUnit} onValueChange={(itemValue, itemIndex) => this.postUnitValueChange(itemValue, itemIndex)}>
                <Picker.Item key='1' label='Unit' value='Unit' />
                <Picker.Item key='2' label='Monthly' value='Monthly' />
                <Picker.Item key='3' label='Yearly' value='Yearly' />
                <Picker.Item key='4' label='Quaterly' value='Quaterly' />
              </Picker>
            </View>
          )}

          <Form
            action={this.getValidatedValues}
            afterSubmit={this.transmitFormVal}
            buttonText='Next'
            buttonOrientation='right'
            btnType='solid'
            theme='dark'
            btnLeftEnable={false}
            fields={{
              ItemName: {
                label: "Name of Item*",
                validators: [validateContent],
                icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                inputProps: {
                  keyboardType: "email-address",
                },
                placeholder: "Enter your item/entity name..",
              },
              ItemPrice: {
                label: "Item Price/Rate (INR)*",
                icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                validators: [validateContent],
                inputProps: {
                  keyboardType: "phone-pad",
                },
                placeholder: "Set a price/rate of item..",
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
  customPicker: {
    backgroundColor: "#fff5f5",
    elevation: 2,

    marginTop: 10,
    height: 40,
  },
  pickerWrapper: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  regCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

export default SecFirst;
