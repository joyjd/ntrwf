import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground,Platform,Alert } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import Form from "./../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";


import PhoneOTPVerifier from "./../../../../Utils/PhoneOTPVerifier";

class SectionPhone extends React.Component {
  
  sectionFormVal = {};
  constructor(props) {
    super(props);
   
    this.state={
      otpViewer:false,
      sendCode:false,
      phoneVerified:false,
      validatedPhone:null
    }
  }
  getValidatedValues = (Email, Phone) => {
    this.sectionFormVal["Email"] = Email;
    this.sectionFormVal["Phone"] = "+91"+Phone;
    if(this.state.validatedPhone !== null && this.state.validatedPhone !== this.sectionFormVal["Phone"]){
      this.setState({
        phoneVerified:false,
      })
    }
    return this.sectionFormVal;
  };

  transmitFormVal = (datObj) => {
   if(this.state.phoneVerified){
    this.props.transmitData(datObj);
   }else{
    this.setState({
      otpViewer:true,
      sendCode:true,
     })
   }
    
   
  };

  onCompleteOTPVerification = (msg)=>{
    this.setState({
      otpViewer:false,
      sendCode:false,
      phoneVerified:msg === 'success'? true:false,
      validatedPhone:msg === 'success'?this.sectionFormVal["Phone"]:null
    },()=>{
       if(msg==='success'){
        this.props.transmitData(this.sectionFormVal);
       }else if(msg==='fail'){
        Alert.alert("NTRWF Phone Verification Failed", "The provided phone number is not a verified contact number.Please enter a valid contact number.");
       }
    })
  }

  render() {
    return (
      
      <View style={[styles.regCard, cssUtil.shadowXX, this.props.type === "hide" ? { display: "none" } : null]}>
        
        {this.state.otpViewer?<PhoneOTPVerifier verificationDone={(msg)=> this.onCompleteOTPVerification(msg)} sendCode={this.state.sendCode} phone={this.sectionFormVal["Phone"]}/>:null}
        <View style={[this.state.otpViewer?{ display: "none" } : null]}>
        <Form
          action={this.getValidatedValues}
          afterSubmit={this.transmitFormVal}
          buttonText={this.state.phoneVerified?'Next':'Verify'}
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
              label: "Phone Number*",
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              validators: [validatePhone],
              inputProps: {
                keyboardType: "phone-pad",
              },
              placeholder: "Enter your contact number..",
            },
          }}
        />
        </View>
        {this.state.otpViewer?null:<>
        <TextLabel>* Fields cannot be blank.</TextLabel>
        <TextLabel>* Email-Id to be used for password retrieval and account related validation purposes.</TextLabel>
      </>}
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
