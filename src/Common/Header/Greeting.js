import React, { useContext } from "react";
import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import TextLabel from "./../../Elements/TextLabel/TextLabel";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import IconRenderer from "./../../Utils/IconRenderer";

import DataContext from "./../../Context/DataContext";

class Greeting extends React.Component {
  static contextType = DataContext;
  updateGreeting;
  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
      iconFamily: "",
      iconName: "",
      solarColor: "",
      solarStyle: "",
      sunStyle: "",
      ready: false,
    };
  }

  componentDidMount() {
    this.createGreeting();
    this.updateGreeting = setInterval(() => this.createGreeting(), 900000);
  }

  componentWillUnmount() {
    clearInterval(this.updateGreeting);
  }

  createGreeting = () => {
    let hrs = new Date().getHours();
    if (hrs >= 0 && hrs <= 3) {
      this.setState({
        greeting: "Good Night,",
        iconFamily: "Ionicons",
        iconName: "md-moon",
        sunStyle: "sunMorning",
        solarColor: "#487eb0",
        solarStyle: styles.sunMorning,
        ready: true,
      });
    } else if (hrs >= 4 && hrs < 12) {
      this.setState({
        greeting: "Good Morning,",
        iconFamily: "Ionicons",
        iconName: "md-sunny",
        sunStyle: "sunMorning",
        solarColor: "#f9ca24",
        solarStyle: styles.sunMorning,
        ready: true,
      });
    } else if (hrs >= 12 && hrs <= 16) {
      this.setState({
        greeting: "Good Afternoon,",
        iconFamily: "Ionicons",
        iconName: "md-sunny",
        sunStyle: "sunAfternoon",
        solarColor: "#f9ca24",
        solarStyle: styles.sunAfternoon,
        ready: true,
      });
    } else if (hrs >= 17 && hrs <= 20) {
      this.setState({
        greeting: "Good Evening,",
        iconFamily: "MaterialCommunityIcons",
        iconName: "moon-full",
        sunStyle: "sunMorning",
        solarColor: "#f19066",
        solarStyle: styles.sunMorning,
        ready: true,
      });
    } else if (hrs >= 21 && hrs <= 24) {
      this.setState({
        greeting: "Good Night,",
        iconFamily: "Ionicons",
        iconName: "md-moon",
        sunStyle: "sunMorning",
        solarStyle: styles.sunMorning,
        solarColor: "#487eb0",
        ready: true,
      });
    }
  };

  render() {
    return this.state.ready ? (
      <View style={styles.headerContainerRow}>
        <View>
          <View style={styles.cloud}>
            <IconRenderer iconFamily='Entypo' iconName='cloud' size={35} color='#ffffff' />
          </View>
          <View style={this.state.solarStyle}>
            <IconRenderer iconFamily={this.state.iconFamily} iconName={this.state.iconName} size={30} color={this.state.solarColor} />
          </View>
        </View>
        <View style={styles.greetingContainer}>
          <TextLabel adjustsFontSizeToFit style={[styles.salute]}>
            {this.state.greeting}
          </TextLabel>
          <TextLabel adjustsFontSizeToFit style={[styles.nameContainer]}>
            {this.context.userLogged ? this.context.userDetails.Name : "Member"}
          </TextLabel>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    color: "#ffc1bd",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
  },
  salute: {
    color: "#ffc1bd",
    fontSize: 14,
    textTransform: "capitalize",
  },
  sunMorning: {
    marginTop: -40,
    marginLeft: 20,
    zIndex: 1,
  },
  sunAfternoon: {
    marginTop: -53,
    marginLeft: 20,
    zIndex: 1,
  },
  cloud: {
    zIndex: 2,
  },

  headerContainerRow: {
    flexDirection: "row",
  },
  greetingContainer: {
    paddingLeft: 10,
    marginTop: -5,
  },
});
export default Greeting;
