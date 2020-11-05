import React from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { Icon } from "react-native-elements";
import IconRenderer from "./../../Utils/IconRenderer";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import { getLatestElement, getDataLive } from "./../../Firebase/FirebaseActions";
import DataContext from "./../../Context/DataContext";
import { addPushTokenListener } from "expo-notifications";

class NoticeBoardTeaser extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      notice: [],
      isReady: false,
    };
  }

  componentDidMount() {
   this.registerForListeningToChanges();
   this.registerForServiceAdd();
  //this.registerForForumChanges();
  // this.registerForMarketChanges();
  }

  
  sendNotification = (message)=>{
    console.log("inside sendNotification");
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  registerForServiceAdd = ()=>{
    let srvPromise = getDataLive("UserServices").startAt(new Date().getTime()).orderByChild('ServicePostTime').limitToLast(1);
    srvPromise.on("child_added", (snapshot) => {
      console.log("inside child aded ===========")
      let pt = snapshot.val();
      let srvArr = [];
      if (pt !== null) {
             /*  Object.keys(pt).map((key) => {
                srvArr.push(pt[key]);
      }); */
      srvArr.push(pt)
    }
    
      if(srvArr.length === 1){
        let pushSrvNotificationMessage = {
          to: this.context.pushNotificationToken,
          sound: 'default',
          title: 'NTRWF - New Service Added !',
          body: srvArr[0].ServiceProviderName.toUpperCase() +' added '+ srvArr[0].ServiceName.toUpperCase() +'  under '+srvArr[0].ServiceParentName +' > '+ srvArr[0].ServiceTypeName,
          data: { 
            navigationLink: 'ServiceDetailList',
            paramNav:{ 
              srvId: srvArr[0].ServiceTypeId, 
              srvName: srvArr[0].ServiceTypeName,
               icon: { 
                 iconName: "", 
                 iconFamily: "" 
                } 
            }
          },
      }; 
      if(pushSrvNotificationMessage.to !== null){
        this.sendNotification(pushSrvNotificationMessage); 
      }
      }
    });
  }

  registerForListeningToChanges = () => {
    let noticePromise = getDataLive("Notice").startAt(new Date().getTime()).orderByChild('Postdate').limitToLast(1);
    let noticePromiseView = getDataLive("Notice").limitToLast(1);
    noticePromiseView.on("value", (snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let notArr = [];
        Object.keys(pt).map((key) => {
          notArr.push(pt[key]);
        });
        this.setState({
          isReady: true,
          notice: notArr.reverse(),
        });

      }
    });


    noticePromise.on("value",(snapshot)=>{
      let ptNot = snapshot.val();
      if(ptNot !== null) {
        let notNotArr = [];
        Object.keys(ptNot).map((key) => {
          notNotArr.push(ptNot[key]);
        });
    
        let pushNoticeMessage = {
            to: this.context.pushNotificationToken,
            sound: 'default',
            title: "NTRWF - New Notice announced!",
            body: notNotArr[0].Title.toLowerCase(),
            data: { 
              navigationLink: "Notice",
             },
        };
        if(pushNoticeMessage.to !== null){
          this.sendNotification(pushNoticeMessage); 
        }
      }
    });
  };






  render() {
    return (
      <TouchableOpacity style={[styles.noticeWrapper, cssUtil.shadowXX]} onPress={() => this.props.navigation.navigate("Notice")}>
        <View style={styles.boardLine}>
          <View>
            <Image style={styles.pinImg} source={require("./../../Assets/Images/pin.png")}></Image>
          </View>
          <View>
            <TextLabel style={[textUtil.semiBold]}>NOTICE BOARD</TextLabel>
          </View>
          <View></View>
        </View>
        {this.state.isReady ? (
          <View style={styles.boardLine}>
            <IconRenderer iconFamily='MaterialCommunityIcons' iconName='clipboard-text' size={25} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#FF512F' wrpRaised={false} wrpSpace={10} />
            <View style={[viewUtil.textWrapperVw, viewUtil.viewCol]}>
              <View style={[viewUtil.textWrapperVw, styles.topMargin]}>
                <TextLabel style={[textUtil.fontBold, textUtil.capitalize]} numberOfLines={1}>
                  {this.state.notice[0].Title.toLowerCase()}
                </TextLabel>
              </View>
              <View style={[viewUtil.textWrapperVw]}>
                <TextLabel numberOfLines={1} style={[{ fontSize: 14 }]}>
                  {this.state.notice[0].Desc}
                </TextLabel>
              </View>
            </View>
          </View>
        ) : (
          <ActivityIndicator size='large' color='#831A2B' />
        )}

        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 20, paddingTop: 10 }}>
          <TextLabel style={[{ color: "#FF512F", textDecorationLine: "underline" }]}>View All</TextLabel>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NoticeBoardTeaser;

const styles = StyleSheet.create({
  boardLine: {
    display: "flex",
    flexDirection: "row",
  },
  noticeWrapper: {
    backgroundColor: "#ffeaa7",
    borderRadius: 20,

    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  pinImg: {
    height: 45,
    width: 50,
    marginLeft: 10,
    marginTop: -25,
  },
  topMargin: {
    marginTop: 10,
  },
});
