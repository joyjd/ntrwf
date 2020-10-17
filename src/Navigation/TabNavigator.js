import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ProfileNavigator } from "./StackNavigator";
import NotificationScreen from "./../Modules/Notifications/NotificationScreen";

import IconRenderer from "./../Utils/IconRenderer";
import { viewUtil, cssUtil, textUtil } from "../Styles/GenericStyles";
import TextLabel from "./../Elements/TextLabel/TextLabel";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: "#FF512F",
        inactiveTintColor: "#808e9b",
        tabStyle: { paddingVertical: 5 },
        labelStyle: { fontFamily: "UbuntuCondensed-Regular", fontSize: 14 },
        style: { height: 60, borderTopColor: "#d2dae2", borderLeftColor: "#d2dae2", borderRightColor: "#d2dae2", borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 2, elevation: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: -10 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = <IconRenderer iconFamily={focused ? "Fontisto" : "SimpleLineIcons"} iconName='home' size={focused ? 26 : 23} color={focused ? "#FF512F" : "#808e9b"} style={cssUtil.iconShadow} />;
          } else if (route.name === "NOTIFICATIONS") {
            iconName = <IconRenderer iconFamily='Fontisto' iconName={focused ? "bell-alt" : "bell"} size={focused ? 26 : 23} color={focused ? "#FF512F" : "#808e9b"} style={cssUtil.iconShadow} />;
          } else if (route.name === "PROFILE") {
            iconName = <IconRenderer iconFamily='FontAwesome5' iconName={focused ? "user-alt" : "user"} size={focused ? 26 : 23} color={focused ? "#FF512F" : "#808e9b"} style={cssUtil.iconShadow} />;
          }
          return iconName;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#FF512F" } : { fontSize: 14, color: "#808e9b" }]}>HOME</TextLabel>;
          } else if (route.name === "NOTIFICATIONS") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#FF512F" } : { fontSize: 14, color: "#808e9b" }]}>NOTIFICATIONS</TextLabel>;
          } else if (route.name === "PROFILE") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#FF512F" } : { fontSize: 14, color: "#808e9b" }]}>PROFILE</TextLabel>;
          }

          return iconName;
        },
      })}
    >
      <Tab.Screen name='HOME' component={MainStackNavigator} />
      <Tab.Screen name='NOTIFICATIONS' component={NotificationScreen} />
      <Tab.Screen name='PROFILE' component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
