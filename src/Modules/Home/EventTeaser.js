import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import TextLabel from "../../Elements/TextLabel/TextLabel";

import { viewUtil, textUtil } from "../../Styles/GenericStyles";
import { getLatestElement } from "./../../Firebase/FirebaseActions";
import Photoslider from "./../../Utils/PhotoSlider";
import ReadMore from "../../Elements/Button/ReadMore";

const EventTeaser = ({ navigation }) => {
  const [event, setEvent] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getLatestElement("Events").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        setEvent(newArr);
        setIsReady(true);
      } else {
        setEvent([]);
        setIsReady(true);
      }
    });
  });

  return isReady ? (
    <>
      <View style={{ paddingLeft: 15 }}>
        <TextLabel style={[textUtil.semiBold]}>UPCOMING/LATEST COMMUNITY EVENTS</TextLabel>
      </View>
      <View style={[styles.eventWrapper, viewUtil.viewCol]}>
        <View style={styles.photoHolder}>
          <Photoslider photo={event[0].photo} customStyle={{ borderRadius: 5 }} />
        </View>
        <View style={[styles.detailsHolder, viewUtil.textWrapperVw]}>
          <TextLabel numberOfLines={2} style={[textUtil.fontBold]}>
            {event[0].name}
          </TextLabel>
          <TextLabel style={[textUtil.passiveText]}>{event[0].dateRange}</TextLabel>
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <ReadMore onPressMethod={() => navigation.navigate("Events")} />
        </View>
      </View>
      <View style={styles.dummyDeck}></View>
    </>
  ) : null;
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
