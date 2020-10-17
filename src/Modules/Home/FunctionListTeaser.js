import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import IconRenderer from "../../Utils/IconRenderer";
import { viewUtil, cssUtil } from "./../../Styles/GenericStyles";
import { useNavigation } from "@react-navigation/native";

const FuntionList = [
  {
    id: "ft_1",
    title: "Local Services",
    navRouteName: "Services",
    icon: "tools",
    iconFamily: "FontAwesome5",
    color: "color1",
    size: 40,
  },
  {
    id: "ft_2",
    title: "Member Directory",
    navRouteName: "MemberDirectory",
    icon: "ios-list-box",
    iconFamily: "Ionicons",
    color: "color2",
    size: 50,
  },

  {
    id: "ft_4",
    title: "Events",
    navRouteName: "Events",
    icon: "event",
    iconFamily: "MaterialIcons",
    color: "color3",
    size: 55,
  },
  {
    id: "ft_5",
    title: "Community Market",
    navRouteName: "RentResale",
    icon: "credit-card",
    iconFamily: "Fontisto",
    color: "color4",
    size: 30,
  },
  {
    id: "ft_6",
    title: "Community Forum",
    navRouteName: "Forum",
    icon: "forum",
    iconFamily: "MaterialCommunityIcons",
    color: "color5",
    size: 50,
  },
  {
    id: "ft_6",
    title: "Local Amenities",
    navRouteName: "LocalAmenities",
    icon: "building-o",
    iconFamily: "FontAwesome",
    color: "color6",
    size: 45,
  },
];

const FunctionListTeaser = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.card, viewUtil.viewRow]}>
      <>
        {FuntionList.map((dataObj, index) => {
          return (
            <TouchableOpacity key={index} style={[styles.btnContainer, viewUtil.viewCol, cssUtil.shadowX, styles[dataObj.color]]} onPress={() => navigation.navigate(dataObj.navRouteName)}>
              <View style={styles.iconWrapper}>
                <IconRenderer iconFamily={dataObj.iconFamily} iconName={dataObj.icon} size={dataObj.size} color='#ffffff' style={[styles.iconDisplay, cssUtil.iconShadow]} />
              </View>
              <View style={styles.textWrapper}>
                <TextLabel style={[styles.textDisplay]}>{dataObj.title}</TextLabel>
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#d2dae2",
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,

    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },

  btnContainer: {
    borderRadius: 6,
    height: 120,
    width: "30%",
    margin: 5,

    alignItems: "center",
    justifyContent: "space-between",
  },
  textWrapper: { minHeight: "40%", maxHeight: "40%", maxWidth: "80%", minWidth: "80%" },
  iconWrapper: { minHeight: "60%", maxHeight: "60%", justifyContent: "center" },
  iconDisplay: { textAlign: "center", width: 45 },
  textDisplay: { color: "#ffffff", fontSize: 17, textAlign: "center" },
  color1: {
    backgroundColor: "#f1c40f",
  },
  color2: {
    backgroundColor: "#f3a683",
  },
  color3: {
    backgroundColor: "#f78fb3",
  },
  color4: {
    backgroundColor: "#22a6b3",
  },
  color5: {
    backgroundColor: "#1dd1a1",
  },
  color6: {
    backgroundColor: "#9980FA",
  },
});

export default FunctionListTeaser;
