import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import { Icon } from "react-native-elements";
import IconRenderer from "./../../Utils/IconRenderer";
import { SearchBar } from "react-native-elements";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  updateSearch = (search) => {
    this.setState({ search: search });
  };
  render() {
    return (
      <View>
        <View style={styles.squreStyle}>
          <ImageBackground source={require("./../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}></ImageBackground>
          <SearchBar leftIconContainerStyle={{ paddingLeft: 5 }} platform='android' placeholderTextColor='#ff92928c' inputStyle={styles.inputStyle} containerStyle={styles.containerStyle} placeholder={this.props.placeholder} onChangeText={this.updateSearch} value={this.state.search} />
        </View>
        <View style={[styles.arcStyle]} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    elevation: 6,
    marginTop: 15,
    backgroundColor: "transparent",
    position: "absolute",
    width: "95%",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRadius: 10,
    marginHorizontal: 10,
  },

  inputStyle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    marginLeft: 0,
    fontFamily: "UbuntuCondensed-Regular",
  },
  image: {
    flex: 1,
  },
  squreStyle: {
    width: "100%",
    height: 75,
    zIndex: 1,
    elevation: 10,
  },
  arcStyle: {
    width: "20%",
    height: 70,
    position: "absolute",
    bottom: -35,
    left: "40%",
    borderRadius: 35,
    backgroundColor: "#880E4F",
    elevation: 10,
    transform: [{ scaleX: 5 }, { scaleY: 1 }],
  },
});

export default SearchBox;
