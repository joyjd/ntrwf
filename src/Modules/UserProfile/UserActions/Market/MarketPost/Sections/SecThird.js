import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-community/picker";
import TextLabel from "./../../../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../../../Utils/IconRenderer";
import EditForm from "./../../../../../../Elements/Form/EditForm";
import { validateContent, validateLength, validatePhone, validateEmail } from "./../../../../../../Elements/Validator/Validator";
import DataContext from "./../../../../../../Context/DataContext";
import * as ImagePicker from "expo-image-picker";

class SecThird extends React.Component {
  static contextType = DataContext;
  secThirdFormValues = {
    ItemPhotoUrl: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      imgPreview: "",
    };
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.4,
      });
      if (!result.cancelled) {
        this.secThirdFormValues["ItemPhotoUrl"] = result.uri;
        this.setState(
          {
            imgPreview: result.uri,
          },
          () => {}
        );
      }
      if (result.cancelled) {
        this.setState({
          loading: false,
        });
      }
     
    } catch (E) {
      this.setState({
        loading: false,
      });
      
    }
  };
  transmitFormVal = (obj) => {
    this.props.transmitData(obj);
  };
  getValidatedValues = (ItemOwnerContact, ItemOwnerMail) => {
    this.secThirdFormValues["ItemOwnerContact"] = ItemOwnerContact;
    this.secThirdFormValues["ItemOwnerMail"] = ItemOwnerMail;
    return this.secThirdFormValues;
  };
  render() {
    return (
      <View style={[this.props.type === "hide" ? { display: "none" } : null]}>
        <View style={[styles.regCard, cssUtil.shadowXX]}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={[viewUtil.viewRow]}>
              <IconRenderer iconFamily='Entypo' iconName='camera' size={20} color='#17c0eb' />
              <TextLabel style={[{ fontWeight: "bold", color: "#3e0909d6", paddingLeft: 5 }]}>Upload an Item Image(Optional)</TextLabel>
            </View>
            <TextLabel style={[textUtil.passiveText]}>You can preferably upload an image of your item for more views </TextLabel>
            <View style={[viewUtil.viewRow, { alignItems: "center" }]}>
              <View>{this.state.imgPreview !== "" ? <Image source={{ uri: this.state.imgPreview }} style={{ width: 100, height: 100 }} /> : <IconRenderer iconFamily='FontAwesome' iconName='picture-o' size={100} color='#d2dae2' style={[cssUtil.iconShadow]} />}</View>

              <View>
                <TouchableOpacity onPress={() => this._pickImage()} style={[viewUtil.viewRow, { alignItems: "center", padding: 5, marginTop: 5, marginBottom: 15 }]}>
                  <IconRenderer iconFamily='Entypo' iconName='camera' size={25} color='red' />
                  <TextLabel style={[{ paddingLeft: 5, color: "red", fontSize: 18, textDecorationLine: "underline" }]}>Select Picture</TextLabel>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <EditForm
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
                this.props.backPressMethod("secSecond");
              },
              btnStyle: { fontSize: 18 },
            }}
            fields={{
              ItemOwnerContact: {
                label: "Contact Number*",
                icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                validators: [validateContent, validatePhone],
                value: this.context.userDetails.Phone,
                inputProps: {
                  keyboardType: "phone-pad",
                },
                placeholder: "Phone number..",
              },
              ItemOwnerMail: {
                label: "Email Address*",
                icon: { type: "materialicons", name: "mail", color: "#17c0eb" },
                validators: [validateContent, validateEmail],
                value: this.context.userDetails.Email,
                inputProps: {
                  keyboardType: "email-address",
                },
                placeholder: "Email Id for contact...",
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
export default SecThird;
