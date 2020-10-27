import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, FlatList, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-community/picker";
import TextLabel from "../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../Utils/IconRenderer";
import TransparentBtn from "./../../../../Elements/Button/TransparentBtn";
import DataContext from "./../../../../Context/DataContext";

import { setData } from "./../../../../Firebase/FirebaseActions";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";
import EditForm from "./../../../../Elements/Form/EditForm";
import Loader from "./../../../../Utils/Loader";

import SrvCategoryPicker from "./SrvCategoryPicker";

class RegisterSrv extends React.Component {
  static contextType = DataContext;
  registerServiceForm = {
    ServiceType: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      pickerError: false,
      isLoading: false,
    };
  }

  getValidatedValues = (Title, Email, Phone, Address) => {
    this.registerServiceForm["Title"] = Title;
    this.registerServiceForm["Email"] = Email;
    this.registerServiceForm["Phone"] = Phone;
    this.registerServiceForm["Address"] = Address;
    if (this.registerServiceForm["ServiceType"] === "") {
      this.setState({
        pickerError: true,
      });
    }
    return this.registerServiceForm;
  };
  submitServiceValues = () => {
    console.log("error");
    if (this.registerServiceForm["ServiceType"] !== "") {
      if (!this.state.pickerError) {
        this.setState({
          pickerError: false,
          isLoading: true,
        });
      } else {
        this.setState({
          isLoading: true,
        });
      }

      let loc_timeStamp = new Date().getTime();
      let loc_Date = new Date().toDateString();

      setData("UserServices/" + this.context.userDetails.UserId + "_srv_" + loc_timeStamp, {
        ServiceId: this.context.userDetails.UserId + "_srv_" + loc_timeStamp,
        ServiceTypeId: this.registerServiceForm["ServiceType"],
        ServiceName: this.registerServiceForm["Title"],
        ServiceProviderId: this.context.userDetails.UserId,
        ServiceProviderName: this.context.userDetails.Name,
        ServiceProviderPhone: this.registerServiceForm["Phone"],
        ServiceProviderEmail: this.registerServiceForm["Email"],
        ServiceAddress: this.registerServiceForm["Address"],
        ServicePostTime: loc_Date,
        ServiceTypeName: this.registerServiceForm["ServiceTypeName"],
        ServiceParentName: this.registerServiceForm["ServiceParentName"],
      })
        .then((data) => {
          this.context.updateUserServices([
            {
              ServiceId: this.context.userDetails.UserId + "_srv_" + loc_timeStamp,
              ServiceTypeId: this.registerServiceForm["ServiceType"],
              ServiceName: this.registerServiceForm["Title"],
              ServiceProviderId: this.context.userDetails.UserId,
              ServiceProviderName: this.context.userDetails.Name,
              ServiceProviderPhone: this.registerServiceForm["Phone"],
              ServiceProviderEmail: this.registerServiceForm["Email"],
              ServiceAddress: this.registerServiceForm["Address"],
              ServicePostTime: loc_Date,
              ServiceTypeName: this.registerServiceForm["ServiceTypeName"],
              ServiceParentName: this.registerServiceForm["ServiceParentName"],
            },
          ]);
          this.setState(
            {
              isLoading: false,
            },
            () => this.props.viewChange()
          );
        })
        .catch((err) => {
          () => {
            this.setState({
              isLoading: false,
            });
            Alert.alert("Service Registration Failed !", err.message);
          };
        });
    }
  };

  render() {
    return (
      <ScrollView>
        {this.state.isLoading ? <Loader /> : null}
        <View style={styles.regCard}>
          <SrvCategoryPicker
            errorText={this.state.pickerError}
            getSrvCat={(dataId, dataName) => {
              this.registerServiceForm["ServiceParentName"] = dataName;
            }}
            getSrvType={(dataId, dataName) => {
              this.registerServiceForm["ServiceType"] = dataId;
              this.registerServiceForm["ServiceTypeName"] = dataName;
            }}
          />
          <EditForm
            action={this.getValidatedValues}
            afterSubmit={this.submitServiceValues}
            buttonText='Register Service'
            buttonOrientation='right'
            btnType='solid'
            theme='dark'
            fields={{
              Title: {
                label: "Service Title*",
                value: "",
                validators: [validateContent],
                icon: { name: "work", color: "#17c0eb" },
                inputProps: {
                  keyboardType: "email-address",
                },
                placeholder: "Enter a title for your service..",
              },
              Email: {
                label: "Service Email*",
                value: this.context.userDetails.Email,
                icon: { type: "materialicons", name: "mail", color: "#17c0eb" },
                validators: [validateContent, validateEmail],
                inputProps: {
                  keyboardType: "email-address",
                },
                placeholder: "Enter your last name..",
              },

              Phone: {
                label: "Service Phone Number*",
                value: this.context.userDetails.Phone,
                icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                validators: [validateContent, validatePhone],
                inputProps: {
                  keyboardType: "phone-pad",
                },
                placeholder: "Mobile number..",
              },
              Address: {
                label: "Service Address",
                value: "",
                icon: { name: "add-location", color: "#17c0eb" },
                validators: [],
                inputProps: {
                  returnKeyType: "done",
                  blurOnSubmit: true,
                  keyboardType: "default",
                  multiline: true,
                  numberOfLines: 3,
                },
                placeholder: "Location address of offered service (optional)",
              },
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  regCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
});
export default RegisterSrv;
