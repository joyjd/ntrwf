import React from "react";
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from 'expo-document-picker';
import Constants from "expo-constants";
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import IconRenderer from "./../../../../Utils/IconRenderer";
import TextLabel from "./../../../../Elements/TextLabel/TextLabel";

import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";


class UploadDoc extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:""
        }
    }

    pickDoc = async ()=>{
        await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {

            if (response.type == 'success') {
          
              let { name, size, uri } = response;
              let nameParts = name.split('.');
              let fileType = nameParts[nameParts.length - 1];
              var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType
              };
              console.log(fileToUpload, '...............file')
              this.setState({ 
                  file: fileToUpload
                 },()=> this.props.getDocDetails(this.state.file.uri));
            }
          
          
          });
    }

    render(){
        return(
        <View style={[{marginBottom:20,paddingHorizontal:10}]}>
            <TextLabel style={[textUtil.fontBold]}>Verification Document*</TextLabel>
            {this.props.showError ?  
            <TextLabel style={[{color :"#b33939"}]}>! Please select a verification document.</TextLabel>
            :null}
            <View style={[viewUtil.viewRow, { alignItems:'center' }]}>
              <View>{this.state.file !== "" ? <IconRenderer iconFamily='MaterialCommunityIcons' iconName='file-document-box-check' size={60} color='green' style={[cssUtil.iconShadow]} /> : <IconRenderer iconFamily='MaterialCommunityIcons' iconName='file-document-box' size={60} color='#d2dae2' style={[cssUtil.iconShadow]} />}</View>

              <View style={[viewUtil.textWrapperVw]}>
                  {this.state.file !== ""? <View><TextLabel >{this.state.file.name}</TextLabel></View>:null}
              
                <TouchableOpacity onPress={() => this.pickDoc()} style={[viewUtil.viewRow, {width:200,backgroundColor:'#17c0eb', alignItems: "center",borderRadius:5, padding: 5,marginTop:2 }]}>
                  <IconRenderer iconFamily='Entypo' iconName='upload' size={25} color='#ffffff' />
                  <TextLabel style={[{ paddingLeft: 5, color: "#ffffff", fontSize: 18, textDecorationLine: "underline" }]}>Upload Verification Document</TextLabel>
                </TouchableOpacity>
                
              </View>
               
            </View>
            <View>
                  <TextLabel style={[{textDecorationLine: "underline"}]}>NOTE:</TextLabel>
                  <TextLabel>Upload a document verifying your service for authenticaion purposes. ( Example: Any document related to profession,service-related Trade License Certificate or an image of you at your service center)</TextLabel>
                  <TextLabel style={[{paddingTop:10}]}>Once verified by NTRWF, your service will be enlisted as "VERIFIED".</TextLabel>
             </View>
        </View>)

    }
}
const styles = StyleSheet.create({});
export default UploadDoc;