import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, ScrollView, TouchableOpacity, Alert } from "react-native";
import TextLabel from "./../../../Elements/TextLabel/TextLabel";

const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../Styles/GenericStyles";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../Elements/Validator/Validator";
import { reAuthenticateUser, setUserPassword, setUserEmail, getOnceSnapshot, updateKey, getDataByIndex, updateindividualKey } from "./../../../Firebase/FirebaseActions";
import IconRenderer from "./../../../Utils/IconRenderer";
import DataContext from "./../../../Context/DataContext";
import { setLocalstorageObject, clearAll } from "./../../../AyncStorage/LocalAsyncStorage";
import EditForm from "./../../../Elements/Form/EditForm";
import Loader from "./../../../Utils/Loader";
import PhoneOTPVerifier from "./../../../Utils/PhoneOTPVerifier";

class ProfileEdit extends React.Component {
  static contextType = DataContext;
  loaderMsg = "";
  editFormValues = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      otpViewer:false,
      sendCode:false,
      phoneVerified:false,
    };
  }

  updateLoaderMessage = (msg) => {
    this.loaderMsg = msg;
  };

  getValidatedValues = (Firstname, Lastname, Password, Phone, Address) => {
    this.editFormValues["Firstname"] = Firstname;
    this.editFormValues["Lastname"] = Lastname;
    this.editFormValues["Password"] = Password;
    Phone.length === 10?this.editFormValues["Phone"] = "+91"+Phone:this.editFormValues["Phone"] = "+91"+Phone.slice(-10);
    this.editFormValues["Address"] = Address;
    return this.editFormValues;
  };
  submitEditValues = () => {

    if(this.editFormValues["Phone"] === this.context.userDetails.Phone || this.state.phoneVerified){

    let nameUpdateFlag = false;
    let phoneUpdateFlag = false;
    let passwordFlag = false;

    let updates = {};
    if (this.editFormValues.Firstname !== this.context.userDetails.Name.split(" ")[0]) {
      updates["FirstName"] = this.editFormValues.Firstname;

      nameUpdateFlag = true;
    }
    if (this.editFormValues.Lastname !== this.context.userDetails.Name.split(" ")[1]) {
      updates["LastName"] = this.editFormValues.Lastname;
      nameUpdateFlag = true;
    }
    if (this.editFormValues.Password !== this.context.userDetails.Password) {
      updates["Password"] = this.editFormValues.Password;
      passwordFlag = true;
    }

    if (this.editFormValues.Phone !== this.context.userDetails.Phone) {
      updates["Phone"] = this.editFormValues.Phone;
      phoneUpdateFlag = true;
    }
    if (this.editFormValues.Address !== this.context.userDetails.Address) {
      updates["Address"] = this.editFormValues.Address;
    }

    if (Object.keys(updates).length !== 0) {
      this.updateLoaderMessage("Updating Personal Details ..");
      this.setState({
        isLoading: true,
      });
      updateKey({ ...updates }, "/UserDetails/" + this.context.userDetails.UserId)
        .then((snap) => {
          setLocalstorageObject("NTRWF_UserCreds", {
            UserId: this.context.userDetails.UserId,
            Name: this.editFormValues.Firstname.toLowerCase() + " " + this.editFormValues.Lastname.toLowerCase(),
            Password: this.editFormValues.Password,
            Email: this.context.userDetails.Email,
            Phone: this.editFormValues.Phone,
            Address: this.editFormValues.Address,
            ProfilePic: this.context.userDetails.ProfilePic,
          });
          this.context.changeUserStatus(true, {
            UserId: this.context.userDetails.UserId,
            Name: this.editFormValues.Firstname.toLowerCase() + " " + this.editFormValues.Lastname.toLowerCase(),
            Password: this.editFormValues.Password,
            Email: this.context.userDetails.Email,
            Phone: this.editFormValues.Phone,
            Address: this.editFormValues.Address,
            ProfilePic: this.context.userDetails.ProfilePic,
          });

          var promises = [];
          var childPromises = [];

          if (nameUpdateFlag || phoneUpdateFlag) {
            promises.push(getDataByIndex("UserServices", "ServiceProviderId", this.context.userDetails.UserId));
            if (nameUpdateFlag) {
              promises.push(getDataByIndex("Messages", "SenderId", this.context.userDetails.UserId));
              promises.push(getDataByIndex("Messages", "ReceiverId", this.context.userDetails.UserId));
              promises.push(getDataByIndex("MarketList", "ItemOwnerId", this.context.userDetails.UserId));
              promises.push(getDataByIndex("Forum", "DiscOwnerId", this.context.userDetails.UserId));
              promises.push(getDataByIndex("ForumComments", "DComOwnerId", this.context.userDetails.UserId));
            }
          }

          if (promises.length !== 0) {
            Promise.all(promises)
              .then((res) => {
                this.updateLoaderMessage("Updating Personal attributes ..");
                let resultArr = {};
                if (nameUpdateFlag || phoneUpdateFlag) {
                  resultArr["U_srv_prm"] = res[0];
                  if (nameUpdateFlag) {
                    resultArr["U_msg_send"] = res[1];
                    resultArr["U_msg_rcv"] = res[2];
                    resultArr["U_mrkt_prm"] = res[3];
                    resultArr["U_frm_disc"] = res[4];
                    resultArr["U_frm_discCom"] = res[5];
                  }
                }

                // get results of all promises
                if (resultArr["U_srv_prm"]) {
                  let pt = resultArr["U_srv_prm"].val();
                  if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("UserServices/" + id + "/ServiceProviderName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                      if (phoneUpdateFlag) {
                        childPromises.push(updateindividualKey("UserServices/" + id + "/ServiceProviderPhone", this.editFormValues.Phone));
                      }
                    });
                  }
                }

                if (resultArr["U_msg_send"]) {
                  let pt = resultArr["U_msg_send"].val();
                  if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("Messages/" + id + "/SenderName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                    });
                  }
                }

                if (resultArr["U_mrkt_prm"]) {
                  let pt = resultArr["U_mrkt_prm"].val();
                  if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("MarketList/" + id + "/ItemOwnerName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                    });
                  }
                }

                if (resultArr["U_msg_rcv"]) {
                  let pt = resultArr["U_msg_rcv"].val();
                 if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("Messages/" + id + "/ReceiverName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                    });
                  }
                }
                if (resultArr["U_frm_disc"]) {
                  let pt = resultArr["U_frm_disc"].val();
                  if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("Forum/" + id + "/DiscOwnerName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                    });
                  }
                }
                if (resultArr["U_frm_discCom"]) {
                  let pt = resultArr["U_frm_discCom"].val();
                  if (pt != null) {
                    let idArr = Object.keys(pt);

                    idArr.forEach((id) => {
                      if (nameUpdateFlag) {
                        childPromises.push(updateindividualKey("ForumComments/" + id + "/DComOwnerName", this.editFormValues.Firstname + " " + this.editFormValues.Lastname));
                      }
                    });
                  }
                }

                if (childPromises.length !== 0) {
                  Promise.all(childPromises)
                    .then((childRes) => {
                      if (passwordFlag) {
                        setUserPassword(this.editFormValues.Password).catch((er) => reAuthenticateUser(this.editFormValues.Password));
                      }
                      //close loading..
                      this.setState(
                        {
                          isLoading: false,
                          otpViewer:false,
                          sendCode:false,
                          phoneVerified:false,
                        },
                        () => this.props.onCancel()
                      );
                    })
                    .catch((error) => {
                      this.setState(
                        {
                          isLoading: false,
                          otpViewer:false,
                          sendCode:false,
                          phoneVerified:false,
                        },
                        () => this.props.onCancel()
                      );
                      Alert.alert("Profile-Edit Failed !", error.message);
                    });
                } else {
                  this.setState(
                    {
                      isLoading: false,
                      otpViewer:false,
                      sendCode:false,
                      phoneVerified:false,
                    },
                    () => this.props.onCancel()
                  );
                }
              })
              .catch((error) => {
                this.setState(
                  {
                    isLoading: false,
                    otpViewer:false,
                    sendCode:false,
                    phoneVerified:false,
                  },
                  () => this.props.onCancel()
                );
                Alert.alert("Profile-Edit Failed !", error.message);
              });
          } else {
            //close loading
            this.setState(
              {
                isLoading: false,
                otpViewer:false,
                sendCode:false,
                phoneVerified:false,
              },
              () => this.props.onCancel()
            );
          }
        })
        .catch((er) => {
          this.setState(
            {
              isLoading: false,
              otpViewer:false,
              sendCode:false,
              phoneVerified:false,
            },
            () => this.props.onCancel()
          );
          Alert.alert("Profile-Edit Failed !", er.message);
        });
    }

      }
      else{
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
    },()=>{
       if(msg==='success'){
        this.submitEditValues();
       }else if(msg==='fail'){
        Alert.alert("NTRWF Phone Verification Failed", "The provided phone number is not a verified contact number.Please enter a valid contact number.");
       }
    })
  }
  render() {
    return this.context.userLogged ? (
      <View style={styles.accountDetailsCard}>
        {this.state.isLoading ? <Loader loaderText={this.loaderMsg} /> : null}
        {this.state.otpViewer?<PhoneOTPVerifier verificationDone={(msg)=> this.onCompleteOTPVerification(msg)} sendCode={this.state.sendCode} phone={ this.editFormValues["Phone"]}/>:null}
        <View style={[this.state.otpViewer?{ display: "none" } : null]}>
        <EditForm
          action={this.getValidatedValues}
          afterSubmit={this.submitEditValues}
          buttonText='Save Changes'
          buttonOrientation='right'
          btnType='solid'
          theme='dark'
          btnLeftEnable={true}
          btnLeft={{
            title: "Cancel",
            onPressMethod: () => this.props.onCancel(),
            btnStyle: { fontSize: 20, color: "red" },
          }}
          fields={{
            Firstname: {
              label: "First Name*",
              value: this.context.userDetails.Name.split(" ")[0],
              validators: [validateContent],
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              inputProps: {
                keyboardType: "email-address",
              },
              placeholder: "Enter your first name..",
            },
            Lastname: {
              label: "Last Name*",
              value: this.context.userDetails.Name.split(" ")[1],
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              validators: [validateContent],
              inputProps: {
                keyboardType: "email-address",
              },
              placeholder: "Enter your last name..",
            },
            Password: {
              label: "Password*",
              value: this.context.userDetails.Password,
              icon: { name: "more", color: "#17c0eb" },
              validators: [validateContent, validateLength],
              inputProps: {
                disabled: true,
                secureTextEntry: true,
              },
              placeholder: "Set a password..",
            },
            Phone: {
              label: "Phone Number",
              value: this.context.userDetails.Phone,
              icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
              validators: [validatePhone],
              inputProps: {
                keyboardType: "phone-pad",
              },
              placeholder: "Mobile number(optional)..",
            },
            Address: {
              label: "Address*",
              value: this.context.userDetails.Address,
              icon: { name: "add-location", color: "#17c0eb" },
              validators: [validateContent],
              inputProps: {
                returnKeyType: "done",
                blurOnSubmit: true,
                keyboardType: "default",
                multiline: true,
                numberOfLines: 3,
              },
              placeholder: "Locality/Block address..",
            },
          }}
        />
        </View>
      </View>
    ) : null;
  }
}
const styles = StyleSheet.create({
  accountDetailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal: 10,
    paddingTop: 10,
  },
});
export default ProfileEdit;
