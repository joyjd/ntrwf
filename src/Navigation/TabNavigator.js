import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ProfileNavigator, NotificationNavigator } from "./StackNavigator";
import NotificationScreen from "./../Modules/Notifications/NotificationScreen";

import IconRenderer from "./../Utils/IconRenderer";
import { viewUtil, cssUtil, textUtil } from "../Styles/GenericStyles";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import DataContext from "./../Context/DataContext";


const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { 
    userLogged,
    msgCount,
    forumCount,
    marketCount,
    setNotificationTouched,
    srvCount } = useContext(DataContext);
  return (
    
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: "#B53471",
        inactiveTintColor: "#808e9b",
        tabStyle: { paddingVertical: 5 },
        labelStyle: { fontFamily: "UbuntuCondensed-Regular", fontSize: 14 },
        style: { height: 60, borderTopColor: "#d2dae2", borderLeftColor: "#d2dae2", borderRightColor: "#d2dae2", borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 2, elevation: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: -10 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = <IconRenderer iconFamily={focused ? "Fontisto" : "SimpleLineIcons"} iconName='home' size={focused ? 26 : 23} color={focused ? "#B53471" : "#808e9b"} style={cssUtil.iconShadow} />;
          } else if (route.name === "NOTIFICATIONS") {
            iconName = <IconRenderer iconFamily='Fontisto' iconName={focused ? "bell-alt" : "bell"} size={focused ? 26 : 23} color={focused ? "#B53471" : "#808e9b"} style={cssUtil.iconShadow} />;
          } else if (route.name === "PROFILE") {
            iconName = <IconRenderer iconFamily='FontAwesome5' iconName={focused ? "user-alt" : "user"} size={focused ? 26 : 23} color={focused ? "#B53471" : "#808e9b"} style={cssUtil.iconShadow} />;
          }
          return iconName;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#B53471" } : { fontSize: 14, color: "#808e9b" }]}>HOME</TextLabel>;
          } else if (route.name === "NOTIFICATIONS") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#B53471" } : { fontSize: 14, color: "#808e9b" }]}>NOTIFICATIONS</TextLabel>;
          } else if (route.name === "PROFILE") {
            iconName = <TextLabel style={[focused ? { fontSize: 16, color: "#B53471" } : { fontSize: 14, color: "#808e9b" }]}>PROFILE</TextLabel>;
          }

          return iconName;
        },
      })}
    >
      <Tab.Screen name='HOME' component={MainStackNavigator} />
      {userLogged ? <Tab.Screen name='NOTIFICATIONS' listeners={{    tabPress: e => { setNotificationTouched(true)}}} component={NotificationNavigator} options={(msgCount+srvCount+forumCount+marketCount) > 0 ? { tabBarBadge: (msgCount+srvCount+forumCount+marketCount) } : null} /> : null}

      <Tab.Screen name='PROFILE' component={ProfileNavigator} />
    </Tab.Navigator>
   
  );
};

export default TabNavigator;
