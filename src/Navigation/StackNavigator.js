import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./../Modules/Home/HomeScreen";
import ServicesScreen from "./../Modules/Services/ServicesScreen";
import ServiceDetailList from "./../Modules/Services/ServiceDetailList";
import MemberDirectory from "./../Modules/MemberDirectory/MemberDirectoryScreen";
import Events from "./../Modules/Events/Events";
import LocalAmenities from "./../Modules/LocalAmenities/LocalAmenities";
import Notice from "./../Modules/Notice/Notice";
import RentResale from "./../Modules/RentResale/RentResaleScreen";
import ExternalProfileView from "./../Modules/UserProfile/ExternalProfileVew";
import ForumScreen from "./../Modules/Forum/ForumScreen";
import ForumThread from "./../Modules/Forum/ForumThread";
import About from "./../Modules/About/About";

import UserProfileScreen from "./../Modules/UserProfile/UserProfileScreen";
import RegisterUserScreen from "./../Modules/UserProfile/RegisterUser/RegisterUserScreen";
import MsgScreen from "./../Modules/UserProfile/UserActions/Messages/MsgScreen";
import SrvScreen from "./../Modules/UserProfile/UserActions/Services/SrvScreen";
import MarketScreen from "./../Modules/UserProfile/UserActions/Market/MarketScreen";

import NotificationScreen from "./../Modules/Notifications/NotificationScreen";

import Header from "./../Common/Header/Header";
import MyBackButton from "../Common/Header/MyBackButton";
import HiddenContext from "./../Modules/Home/HiddenContext";
const Stack = createStackNavigator();

const landingScreens = {
  Home: HomeScreen,
  Services: ServicesScreen,
  ServiceDetailList: ServiceDetailList,
  MemberDirectory: MemberDirectory,
  Events: Events,
  LocalAmenities: LocalAmenities,
  Notice: Notice,
  RentResale: RentResale,
  MemberProfile: ExternalProfileView,
  Forum: ForumScreen,
  Discussion: ForumThread,
  About: About,
};

const profileScreens = {
  Profile: UserProfileScreen,
  RegisterUserScreen: RegisterUserScreen,
  Messages: MsgScreen,
  MemberServices: SrvScreen,
  Market: MarketScreen,
};

const notificationScreens = {
  Notifications: NotificationScreen,
};

const stackCreatorFactory = (screenObj) => {
  return Object.entries({
    ...screenObj,
  }).map(([name, component], index) => <Stack.Screen key={index} name={name} component={component} />);
};

const MainStackNavigator = ({ navigation, route }) => {
  if (route.state !== undefined) {
    if (route.state.index === 0) {
      navigation.setOptions({ tabBarVisible: true });
    } else {
      navigation.setOptions({ tabBarVisible: false });
    }
  }
  return (
    <>
    <HiddenContext />
    <Stack.Navigator
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;
          return <Header title={title} navigation={navigation} leftButton={previous ? <MyBackButton previous={previous} onPress={navigation.goBack} /> : undefined} />;
        },
      }}
    >
      {stackCreatorFactory(landingScreens)}
    </Stack.Navigator>
    </>
  );
};
const ProfileNavigator = ({ navigation, route }) => {
  if (route.state !== undefined) {
    if (route.state.index === 0) {
      navigation.setOptions({ tabBarVisible: true });
    } else {
      navigation.setOptions({ tabBarVisible: false });
    }
  }
  return (
    <Stack.Navigator
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;
          return <Header title={title} navigation={navigation} leftButton={previous ? <MyBackButton previous={previous} onPress={navigation.goBack} /> : undefined} />;
        },
      }}
    >
      {stackCreatorFactory(profileScreens)}
    </Stack.Navigator>
  );
};

const NotificationNavigator = ({ navigation, route }) => {
  if (route.state !== undefined) {
    if (route.state.index === 0) {
      navigation.setOptions({ tabBarVisible: true });
    } else {
      navigation.setOptions({ tabBarVisible: false });
    }
  }
  return (
    <Stack.Navigator
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;
          return <Header title={title} navigation={navigation} leftButton={previous ? <MyBackButton previous={previous} onPress={navigation.goBack} /> : undefined} />;
        },
      }}
    >
      {stackCreatorFactory(notificationScreens)}
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ProfileNavigator, NotificationNavigator };
