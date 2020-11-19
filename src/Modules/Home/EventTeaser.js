import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from "react-native";
import TextLabel from "../../Elements/TextLabel/TextLabel";

import { viewUtil, textUtil } from "../../Styles/GenericStyles";
import { getLatestElement,getDataLive } from "./../../Firebase/FirebaseActions";
import Photoslider from "./../../Utils/PhotoSlider";
import ReadMore from "../../Elements/Button/ReadMore";
import DataContext from "./../../Context/DataContext";

const sendNotification = (message)=>{
 
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
const EventTeaser = ({ navigation }) => {
  const [event, setEvent] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const {pushNotificationToken} = useContext(DataContext);

  useEffect(() => {
    getDataLive("Events").orderByChild('date').limitToLast(1).on("value", (snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        setEvent(newArr.reverse());
        setIsReady(true);

        
      } else {
        setEvent([]);
        setIsReady(true);
      }
    });

    //send push
    getDataLive("Events").startAt(new Date().getTime()).orderByChild('date').limitToLast(1).on("value",(snapshot)=>{
      let ptNot = snapshot.val();
     if(ptNot !== null) {
        let notNotArr = [];
        Object.keys(ptNot).map((key) => {
          notNotArr.push(ptNot[key]);
        });
      //send notification
      if(notNotArr.length !== 0) {
        let pushEventMessage = {
            to: pushNotificationToken,
            sound: 'default',
            title: "NTRWF - New Event announced!",
            body: notNotArr[0].name.toLowerCase(),
            data: { 
              navigationLink: "Events",
            },
        };
        if(pushEventMessage.to !== null){
          sendNotification(pushEventMessage); 
        }
      }
    }
  });
  },[pushNotificationToken]);



  return (
    <>
      <View style={{ paddingLeft: 15 }}>
        <TextLabel style={[textUtil.semiBold]}>UPCOMING/LATEST COMMUNITY EVENTS</TextLabel>
      </View>
      <View style={[styles.eventWrapper, viewUtil.viewCol]}>
        {isReady ? (
          <>
            <View style={styles.photoHolder}>
              <Photoslider photo={event[0].photo} customStyle={{ borderRadius: 5 }} />
            </View>
            <View style={[styles.detailsHolder, viewUtil.textWrapperVw]}>
              <TextLabel numberOfLines={2} style={[textUtil.fontBold]}>
                {event[0].name}
              </TextLabel>
              <TextLabel style={[textUtil.passiveText]}>{new Date(Number(event[0].date)).toDateString()}</TextLabel>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
              <ReadMore onPressMethod={() => navigation.navigate("Events")} />
            </View>
          </>
        ) : (
          <ActivityIndicator size='large' color='#831A2B' />
        )}
      </View>
      <View style={styles.dummyDeck}></View>
    </>
  );
};

export default EventTeaser;
const styles = StyleSheet.create({
  eventWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderColor: "#d2dae2",
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingTop: 15,
    elevation: 1,
  },
  photoHolder: {
    height: 200,
  },
  detailsHolder: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  dummyDeck: {
    height: 5,
    backgroundColor: "#ffffff",
    elevation: 2,
    marginHorizontal: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 10,
    marginTop: 1,
  },
});
