import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import { Icon } from "react-native-elements";
import IconRenderer from "./../../Utils/IconRenderer";
import { SearchBar } from "react-native-elements";
/*
search= member
search = servicelist
search = notice
search = forum
search = amneties
search = events

*/
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  componentDidUpdate() {}
  updateSearch = (search) => {
    this.setState({ search: search }); //this.props.searchData
    if (search.length === 0) {
      this.props.clearText();
    }
    switch (this.props.search) {
      case "member":
        if (search.length > 1) {
          let firstNameArr = this.props.searchData.filter((obj) => obj.FirstName.toLowerCase().includes(search.trim().toLowerCase()));
          let lastNameArr = this.props.searchData.filter((obj) => obj.LastName.toLowerCase().includes(search.trim().toLowerCase()));
          let fullName = this.props.searchData.filter((obj) => (obj.FirstName.toLowerCase() + obj.LastName.toLowerCase()).includes(search.trim().toLowerCase()));
          let searchResult = [...new Set([...firstNameArr, ...lastNameArr, ...fullName])];
          this.props.getSearchResult(searchResult);
        }
        break;
      case "servicelist":
        if (search.length > 1) {
          let serviceName = this.props.searchData.filter((obj) => obj.ServiceName.toLowerCase().includes(search.trim().toLowerCase()));
          let providerName = this.props.searchData.filter((obj) => obj.ServiceProviderName.trim().toLowerCase().includes(search.trim().toLowerCase()));
          let searchResult = [...new Set([...serviceName, ...providerName])];
          this.props.getSearchResult(searchResult);
        }
        break;

      case "notice":
        if (search.length > 1) {
          let noticeName = this.props.searchData.filter((obj) => obj.Title.trim().toLowerCase().includes(search.trim().toLowerCase()));
          this.props.getSearchResult(noticeName);
        }
        break;

      case "forum":
        if (search.length > 1) {
          let forumName = this.props.searchData.filter((obj) => obj.DiscTitle.trim().toLowerCase().includes(search.trim().toLowerCase()));
          this.props.getSearchResult(forumName);
        }
        break;
      case "amneties":
        if (search.length > 1) {
          let amnetiesName = this.props.searchData.filter((obj) => obj.Name.trim().toLowerCase().includes(search.trim().toLowerCase()));
          this.props.getSearchResult(amnetiesName);
        }
        break;
      case "events":
        if (search.length > 1) {
          let eventsName = this.props.searchData.filter((obj) => obj.name.trim().toLowerCase().includes(search.trim().toLowerCase()));
          this.props.getSearchResult(eventsName);
        }
        break;
      default:
        break;
    }
  };
  clearText = () => {
    this.props.clearText();
  };
  render() {
    return (
      <View>
        <View style={styles.squreStyle}>
          <ImageBackground source={require("./../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}></ImageBackground>
          <SearchBar onClear={() => this.clearText()} showLoading={true} clearIcon={true} leftIconContainerStyle={{ paddingLeft: 5 }} platform='android' placeholderTextColor='#ff92928c' inputStyle={styles.inputStyle} containerStyle={styles.containerStyle} placeholder={this.props.placeholder} onChangeText={this.updateSearch} value={this.state.search} />
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
