import React,{ useCallback } from "react";
import { StyleSheet, Dimensions, View, ImageBackground,Alert,Linking } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import Form from "./../../../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';
const  OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

class SectionAddress extends React.Component {
  sectionFormVal = {};
  constructor(props) {
    super(props);
    this.state={
      termsCheck:false,
      showCheckError:false
    }
  }
  getValidatedValues = (Email, Phone) => {
    this.sectionFormVal["Building"] = Email;
    this.sectionFormVal["Locality"] = Phone;

    return this.sectionFormVal;
  };
  transmitFormVal = (datObj) => {
    if(this.state.termsCheck){
      this.props.transmitData(datObj);
    }else{
     this.setState({
      showCheckError : true
     })
    }
   
  };
 showTermsConditions = ()=>{
  Alert.alert("NTRWF Terms & Conditions", <TextLabel>test</TextLabel>)

 
 }




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
        <CheckBox
          containerStyle ={[{marginTop:-20},this.state.showCheckError?styles.errorCheck:null]}
          title={<View style={[viewUtil.viewRow]}><TextLabel>I have read </TextLabel><OpenURLButton url={"https://github.com/joyjd/ntrwfPics/blob/main/Terms_and_Conditions.pdf?raw=true"}><TextLabel style={[{textDecorationLine: "underline"}]}>Terms & Conditions</TextLabel></OpenURLButton></View>}
          checked={this.state.termsCheck}
          onIconPress = {()=> this.setState({termsCheck : !this.state.termsCheck,showCheckError:false})}
          
        />
        {this.state.showCheckError? <TextLabel style={[{paddingLeft:10, fontSize: 16, color: "#b71540" }]}>* Please accept terms to register.</TextLabel>:null}
        
        <View style={{marginVertical:15}}>
        <TextLabel>* Fields cannot be blank.</TextLabel>
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  errorCheck:{
   borderColor:'red'
  },
  regCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 15,
    marginBottom:90,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
export default SectionAddress;
