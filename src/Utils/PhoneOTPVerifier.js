import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground,Platform,ToastAndroid } from "react-native";
import { Input } from "react-native-elements";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import { viewUtil, cssUtil, textUtil } from "../Styles/GenericStyles";
import Btn from "./../Elements/Button/Btn";

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import FirebaseConfig from "./../Firebase/Config";
import * as firebase from 'firebase';



class PhoneOTPVerifier extends React.Component{
    constructor(props){
    super(props);
    this.firstTextInputRef = React.createRef();
    this.secondTextInputRef = React.createRef();
    this.thirdTextInputRef = React.createRef();
    this.fourthTextInputRef = React.createRef();
    this.fifthTextInputRef = React.createRef();
    this.sixthTextInputRef = React.createRef();
    this.recaptchaVerifier = React.createRef();
    this.state={
        otpArray : ['', '', '', '', '', ''],
        verificationId:null,
        showSubmitCode:false
    }

    }

    componentDidMount(prevProps){
        if(prevProps === undefined){
           this.sendVerificationCode() 
          
       }else if(this.props.sendCode !== prevProps.sendCode && this.props.sendCode!== false){
        this.sendVerificationCode() 
       }
    }


    sendVerificationCode = async () => {
        // The FirebaseRecaptchaVerifierModal ref implements the
        // FirebaseAuthApplicationVerifier interface and can be
        // passed directly to `verifyPhoneNumber`.
        try {
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          const verificationId = await phoneProvider.verifyPhoneNumber(
            this.props.phone,
            this.recaptchaVerifier.current
          );
          console.log(this.props.phone+","+verificationId);
      

          this.setState({
            verificationId:verificationId,
            showSubmitCode:true
          })
          
        } catch (err) {
          console.log(err)
         this.props.verificationDone('fail');
        }
      }

    onOtpChange = index => {
        return value => {
          if (isNaN(Number(value))) {
            // do nothing when a non digit is pressed
            return;
          }
          const otpArrayCopy = this.state.otpArray.concat();
          otpArrayCopy[index] = value;
          this.setState({
            otpArray : otpArrayCopy
          })
        
          // auto focus to next InputText if value is not blank
          if (value !== '') {
            if (index === 0) {
                this.secondTextInputRef.current.focus();
            } else if (index === 1) {
                this.thirdTextInputRef.current.focus();
            } else if (index === 2) {
                this.fourthTextInputRef.current.focus();
            }else if (index === 3) {
                this.fifthTextInputRef.current.focus();
            }else if (index === 4) {
                this.sixthTextInputRef.current.focus();
            }
          }
        };
      };

    onOtpKeyPress = index => {
        
        return ({nativeEvent: {key: keyValue}}) => {
          // auto focus to previous InputText if value is blank and existing value is also blank
          if (keyValue === 'Backspace' && this.state.otpArray[index] === '') {
          
            if (index === 1) {
                this.firstTextInputRef.current.focus();
            } else if (index === 2) {
                this.secondTextInputRef.current.focus();
            } else if (index === 3) {
                this.thirdTextInputRef.current.focus();
            } else if (index === 4) {
                this.fourthTextInputRef.current.focus();
            } else if (index === 5) {
                this.fifthTextInputRef.current.focus();
            }
            
    
           if (index > 0) {
              const otpArrayCopy = this.state.otpArray.concat();
              otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
              this.setState({
                otpArray : otpArrayCopy
              })
            } 
          }
        };
      }; 

    refCallback = textInputRef => node => {
        textInputRef.current = node;
       };
    submitCode  = async () =>{
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          this.state.verificationId,
          this.state.otpArray.concat().join('')
        );
        console.log("Credentials",credential);
        await firebase.auth().signInWithCredential(credential);
        ToastAndroid.showWithGravity("Phone number has been authenticated successfully 👍", ToastAndroid.LONG, ToastAndroid.CENTER);
       
        //unlink the phone number
        await firebase.auth().currentUser.unlink(firebase.auth.PhoneAuthProvider.PROVIDER_ID);
        //delete User
        await firebase.auth().currentUser.delete();
        this.props.verificationDone('success');
      } catch (err) {
        console.log(err)
        this.props.verificationDone('fail');
      }
    }
    render(){
        return(
        <>
        <FirebaseRecaptchaVerifierModal ref={this.recaptchaVerifier} firebaseConfig={FirebaseConfig} />
        {this.state.showSubmitCode?<View>
        <TextLabel>A 6-digit Verification Code has been sent to your provided phone number.</TextLabel>
        <View style={{paddingVertical:30}}>
        <TextLabel>Please confirm your Verification Code.</TextLabel>
        <View style={[viewUtil.viewRow]}>
          { [this.firstTextInputRef,
             this.secondTextInputRef,
             this.thirdTextInputRef,
             this.fourthTextInputRef,
             this.fifthTextInputRef,
             this.sixthTextInputRef].map((textInputRef,index)=>
            <View style={styles.viewStyle}>
             <Input
              onChangeText={this.onOtpChange(index)}
              onKeyPress={this.onOtpKeyPress(index)}
              value={this.state.otpArray[index]}
              maxLength={1}
              keyboardType="phone-pad"
              textAlign="center"
              autoFocus ={index === 0 ? true:undefined}
              ref={this.refCallback(textInputRef)}
              key={index}
              />

             
            </View>
          )}
        </View>
        <Btn title="Submit Code" font={20} buttonStyle={{ borderRadius: 10 }} onPressMethod={()=>this.submitCode()} />
        </View>
        </View>:
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
        <TextLabel>Please wait..</TextLabel></View>}
        </>)
    }
}

const styles = StyleSheet.create({
   inputStyle :{

   },
   viewStyle :{
       width:40
   }
})

export default PhoneOTPVerifier;