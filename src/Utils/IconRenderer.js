import React from "react";
import { StyleSheet, View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const IconSkeleton = {
  Ionicons: (iconName, size, color, style) => <Ionicons name={iconName} size={size} color={color} style={style} />,
  Zocial: (iconName, size, color, style) => <Zocial name={iconName} size={size} color={color} style={style} />,
  Feather: (iconName, size, color, style) => <Feather name={iconName} size={size} color={color} style={style} />,
  AntDesign: (iconName, size, color, style) => <AntDesign name={iconName} size={size} color={color} style={style} />,
  Octicons: (iconName, size, color, style) => <Octicons name={iconName} size={size} color={color} style={style} />,
  Foundation: (iconName, size, color, style) => <Foundation name={iconName} size={size} color={color} style={style} />,
  SimpleLineIcons: (iconName, size, color, style) => <SimpleLineIcons name={iconName} size={size} color={color} style={style} />,
  FontAwesome5: (iconName, size, color, style) => <FontAwesome5 name={iconName} size={size} color={color} style={style} />,
  FontAwesome: (iconName, size, color, style) => <FontAwesome name={iconName} size={size} color={color} style={style} />,
  MaterialIcons: (iconName, size, color, style) => <MaterialIcons name={iconName} size={size} color={color} style={style} />,
  MaterialCommunityIcons: (iconName, size, color, style) => <MaterialCommunityIcons name={iconName} size={size} color={color} style={style} />,
  Entypo: (iconName, size, color, style) => <Entypo name={iconName} size={size} color={color} style={style} />,
  Fontisto: (iconName, size, color, style) => <Fontisto name={iconName} size={size} color={color} style={style} />,
};

const IconRenderer = ({ iconFamily, iconName, size, color, style, wrpStyle, wrpColor, wrpRaised, wrpSpace, wrpHeight, wrpWidth }) => {
  if (wrpStyle === undefined) {
    return IconSkeleton[iconFamily](iconName, size, color, style);
  } else {
    return <View style={[styles[wrpStyle], wrpRaised ? styles.raised : null, { height: wrpHeight, width: wrpWidth }, { backgroundColor: wrpColor }, { padding: wrpSpace }]}>{IconSkeleton[iconFamily](iconName, size, color, style)}</View>;
  }
};

const styles = StyleSheet.create({
  round: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  square: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  raised: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default IconRenderer;
