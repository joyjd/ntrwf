import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, FlatList, Alert,ToastAndroid } from "react-native";

import TextLabel from "../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../Utils/IconRenderer";
import TransparentBtn from "./../../../../Elements/Button/TransparentBtn";
import DataContext from "./../../../../Context/DataContext";

import { getDataByIndex, getOnceSnapshot, deleteData, setData } from "./../../../../Firebase/FirebaseActions";
import { validateContent, validateLength, validateEmail, validatePhone } from "./../../../../Elements/Validator/Validator";
import EditForm from "./../../../../Elements/Form/EditForm";
import Loader from "./../../../../Utils/Loader";
import PhoneOTPVerifier from "./../../../../Utils/PhoneOTPVerifier";

class ViewSrv extends React.Component {
  static contextType = DataContext;
  editServiceValues = {};
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
      isLoading: false,
      editMode: false,
      selectedIndex: null,

      otpViewer:false,
      sendCode:false,
      phoneVerified:false,
    };
  }
  componentDidMount() {
    if (this.context.userServices.length == 0) {
      this.getUserServiceList();
    }
    if (Object.keys(this.context.iconList).length === 0) {
      this.getIconList();
    }
  }
  getIconList = () => {
    getOnceSnapshot("IconCatalogue")
      .then((snap) => {
        let icon = snap.val();
        this.context.updateIconList(icon);
      })
      .catch((er) => {});
  };

  getUserServiceList = () => {
    this.setState({
      isReady: false,
    });
    getDataByIndex("UserServices", "ServiceProviderId", this.context.userDetails.UserId)
      .then((snapshot) => {
        let pt = snapshot.val();
        if (pt !== null) {
          let newArr = [];
          Object.keys(pt).map((key) => {
            newArr.push(pt[key]);
          });
          // console.log(newArr);
          this.context.updateUserServices(newArr.reverse());
          this.setState({
            isReady: true,
          });
        } else {
          this.setState({
            isReady: true,
          });
        }
      })
      .catch((er) => {
        this.setState(
          {
            isReady: true,
          },
          () => Alert.alert("Services could not be fetched !", er.message)
        );
      });
  };
  selectDeleteFunc = (id) => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => this.setState({
            isLoading: true,
          },()=>this.submitDeleteService(id)),
        },
      ],
      { cancelable: true }
    );
  };

  submitDeleteService = (id) => {
    
    deleteData("UserServices/" + this.context.userServices[id]["ServiceId"]).then((data) => {
      this.context.updateUserServicesblob(id);
      this.setState({
        isLoading: false,
      },()=>
      ToastAndroid.showWithGravity(
        "Your service has been deleted !",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        
      )
      );
    });
  };

  getValidatedValues = (ServiceName, ServiceProviderEmail, ServiceProviderPhone, ServiceAddress) => {
    this.editServiceValues["ServiceAddress"] = ServiceAddress;
    this.editServiceValues["ServiceName"] = ServiceName;
    this.editServiceValues["ServiceProviderEmail"] = ServiceProviderEmail;
    ServiceProviderPhone.length === 10? this.editServiceValues["ServiceProviderPhone"] = "+91"+ServiceProviderPhone:this.editServiceValues["ServiceProviderPhone"] = "+91"+ServiceProviderPhone.slice(-10);
    return this.editServiceValues;
  };

  submitEditServiceValues = () => {
    console.log(this.editServiceValues["ServiceProviderPhone"])
    if(this.editServiceValues["ServiceProviderPhone"] === this.context.userDetails.Phone || this.state.phoneVerified){
    this.setState({
      isLoading: true,
    });
    setData("UserServices/" + this.context.userServices[this.state.selectedIndex]["ServiceId"], {
      ServiceName: this.editServiceValues["ServiceName"],
      ServiceProviderPhone: this.editServiceValues["ServiceProviderPhone"],
      ServiceAddress: this.editServiceValues["ServiceAddress"],
      ServiceProviderEmail: this.editServiceValues["ServiceProviderEmail"],

      ServiceId: this.context.userServices[this.state.selectedIndex]["ServiceId"],
      ServiceTypeId: this.context.userServices[this.state.selectedIndex]["ServiceTypeId"],
      ServiceProviderId: this.context.userServices[this.state.selectedIndex]["ServiceProviderId"],
      ServiceProviderName: this.context.userServices[this.state.selectedIndex]["ServiceProviderName"],
      ServicePostTime: this.context.userServices[this.state.selectedIndex]["ServicePostTime"],
      ServiceTypeName: this.context.userServices[this.state.selectedIndex]["ServiceTypeName"],
      ServiceParentName: this.context.userServices[this.state.selectedIndex]["ServiceParentName"],
    })
      .then((data) => {
        this.context.userServices[this.state.selectedIndex] = {
          ServiceName: this.editServiceValues["ServiceName"],
          ServiceProviderPhone: this.editServiceValues["ServiceProviderPhone"],
          ServiceAddress: this.editServiceValues["ServiceAddress"],
          ServiceProviderEmail: this.editServiceValues["ServiceProviderEmail"],

          ServiceId: this.context.userServices[this.state.selectedIndex]["ServiceId"],
          ServiceTypeId: this.context.userServices[this.state.selectedIndex]["ServiceTypeId"],
          ServiceProviderId: this.context.userServices[this.state.selectedIndex]["ServiceProviderId"],
          ServiceProviderName: this.context.userServices[this.state.selectedIndex]["ServiceProviderName"],
          ServicePostTime: this.context.userServices[this.state.selectedIndex]["ServicePostTime"],
          ServiceTypeName: this.context.userServices[this.state.selectedIndex]["ServiceTypeName"],
          ServiceParentName: this.context.userServices[this.state.selectedIndex]["ServiceParentName"],
        };
        this.setState({
          isLoading: false,
          editMode: false,
          otpViewer:false,
          sendCode:false,
          phoneVerified:false
        });
      })
      .catch((er) => {
        this.setState(
          {
            isLoading: false,
          },
          () => Alert.alert("Update failed!", er.message)
        );
      });
    }else{
      
      this.setState({
        otpViewer:true,
        sendCode:true,
       });
    }
  };

  onCompleteOTPVerification = (msg)=>{
    this.setState({
      otpViewer:false,
      sendCode:false,
      phoneVerified:msg === 'success'? true:false,
    },()=>{
       if(msg==='success'){
        this.submitEditServiceValues();
       }else if(msg==='fail'){
        Alert.alert("NTRWF Phone Verification Failed", "The provided phone number is not a verified contact number.Please enter a valid contact number.");
       }
    })
  }

  render() {
    return (
      <>
        {this.state.editMode ? (
          <View style={styles.genreCard}>
            {this.state.isLoading ? <Loader loaderText='Updating values..' /> : null}
            
            {this.state.otpViewer?<PhoneOTPVerifier verificationDone={(msg)=> this.onCompleteOTPVerification(msg)} sendCode={this.state.sendCode} phone={this.editServiceValues["ServiceProviderPhone"]}/>:null}
            <View style={[this.state.otpViewer?{ display: "none" } : null]}>
            <EditForm
              action={this.getValidatedValues}
              afterSubmit={this.submitEditServiceValues}
              buttonText='Save Changes'
              buttonOrientation='right'
              btnType='solid'
              theme='dark'
              btnLeftEnable={true}
              btnLeft={{
                title: "Cancel",
                onPressMethod: () => this.setState({ editMode: false }),
                btnStyle: { fontSize: 20, color: "red" },
              }}
              fields={{
                ServiceName: {
                  label: "Service Title*",
                  value: this.context.userServices[this.state.selectedIndex].ServiceName,
                  validators: [validateContent],
                  icon: { name: "work", color: "#17c0eb" },
                  inputProps: {
                    keyboardType: "email-address",
                  },
                  placeholder: "Enter a title for your service..",
                },
                ServiceProviderEmail: {
                  label: "Service Email*",
                  value: this.context.userServices[this.state.selectedIndex].ServiceProviderEmail,
                  icon: { type: "materialicons", name: "mail", color: "#17c0eb" },
                  validators: [validateContent, validateEmail],
                  inputProps: {
                    keyboardType: "email-address",
                  },
                  placeholder: "Enter mail address..",
                },

                ServiceProviderPhone: {
                  label: "Service Phone Number*",
                  value: this.context.userServices[this.state.selectedIndex].ServiceProviderPhone,
                  icon: { type: "entypo", name: "v-card", color: "#17c0eb" },
                  validators: [validateContent, validatePhone],
                  inputProps: {
                    keyboardType: "phone-pad",
                  },
                  placeholder: "Mobile number..",
                },
                ServiceAddress: {
                  label: "Service Address",
                  value: this.context.userServices[this.state.selectedIndex].ServiceAddress,
                  icon: { name: "add-location", color: "#17c0eb" },
                  validators: [],
                  inputProps: {
                    returnKeyType: "done",
                    blurOnSubmit: true,
                    keyboardType: "default",
                    multiline: true,
                    numberOfLines: 5,
                  },
                  placeholder: "Location address of offered service (optional).Gmap will be enabled as per your provided address..",
                },
              }}
            />
            </View>
          </View>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ marginTop: 40 }} />}
              ListEmptyComponent={
                this.state.isReady ? (
                  <TextLabel style={[{ flex: 1, justifyContent: "center", alignItems: "center", fontSize: 20, marginLeft: 30, marginTop: 50 }]}>You have no registered service yet.</TextLabel>
                ) : (
                  <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
                    <TextLabel>Please wait...</TextLabel>
                  </View>
                )
              }
              keyExtractor={(item) => item.ServiceId}
              data={this.context.userServices}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={[styles.genreCard, viewUtil.viewCol, cssUtil.shadowXX]}>
                    <View style={[viewUtil.viewRow, { paddingHorizontal: 10, paddingVertical: 5 }]}>
                      <View style={styles.iconPicHolder}>{Object.keys(this.context.iconList).length === 0 ? null : <IconRenderer iconFamily={this.context.iconList[item.ServiceTypeId].iconFamily} iconName={this.context.iconList[item.ServiceTypeId].icon} size={40} color='#e67e22' style={cssUtil.iconShadow} />}</View>
                      <View style={[viewUtil.viewCol, viewUtil.textWrapperVw]}>
                        <View>
                          <TextLabel style={[textUtil.passiveText]}>
                            {item.ServiceParentName} {">"} {item.ServiceTypeName}
                          </TextLabel>
                        </View>
                        <TextLabel style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.ServiceName.toLowerCase()}</TextLabel>
                        <TextLabel style={[{ marginTop: -5 }]}>{new Date(Number(item.ServicePostTime)).toDateString()}</TextLabel>
                        {item.ServiceProviderPhone !== "" ? (
                          <View style={[viewUtil.viewRow, { marginTop: 5 }]}>
                            <IconRenderer iconFamily='Entypo' iconName='old-phone' size={18} color='#17c0eb' />
                            <TextLabel style={[{ marginLeft: 5 }]}>{item.ServiceProviderPhone}</TextLabel>
                          </View>
                        ) : null}

                        <View style={[viewUtil.viewRow]}>
                          <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email' size={18} color='#17c0eb' />
                          <TextLabel style={[{ marginLeft: 5 }]}>{item.ServiceProviderEmail}</TextLabel>
                        </View>
                      </View>
                    </View>
                    {item.ServiceAddress !== "" ? (
                      <View style={[viewUtil.viewCol, { paddingHorizontal: 10 }]}>
                        <View style={[viewUtil.viewRow]}>
                          <IconRenderer iconFamily='FontAwesome' iconName='address-card' size={18} color='#17c0eb' />
                          <TextLabel style={[textUtil.fontBold, { paddingLeft: 5 }]}>Service Location Address</TextLabel>
                        </View>
                        <View>
                          <TextLabel style={[textUtil.capitalize]}>{item.ServiceAddress}</TextLabel>
                        </View>
                      </View>
                    ) : null}

                    <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }]}>
                      <TouchableOpacity onPress={() => this.setState({ selectedIndex: index, editMode: true })} style={[styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}>
                        <IconRenderer iconFamily='FontAwesome' iconName='pencil' size={20} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#27ae60' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                        <TextLabel style={[{ color: "#27ae60", textDecorationLine: "underline" }]}>Edit Service</TextLabel>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.selectDeleteFunc(index)} style={[styles.actionWrapper, viewUtil.viewRow]}>
                        <IconRenderer iconFamily='MaterialIcons' iconName='delete' size={20} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#27ae60' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />

                        <TextLabel style={[{ color: "#27ae60", textDecorationLine: "underline" }]}>Delete Service</TextLabel>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#d2dae2",
  },
  actionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
  },
  iconPicHolder: {
    backgroundColor: "#f1c40f",
    marginTop: 5,
    marginRight: 10,
    borderRadius: 5,
    maxWidth: 70,
    minWidth: 70,

    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  genreCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 10,
    marginBottom:50,
    marginHorizontal: 10,
    marginBottom: 15,
    paddingTop: 5,
  },
});
export default ViewSrv;
