import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";

import Preload from "./../../Common/PreLoader/Preload";
import MemberDirectorySkeleton from "./Skeletons/MemberDirectorySkeleton";

import SearchBox from "./../../Common/SearchBox/SearchBox";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-elements";

import DataContext from "./../../Context/DataContext";

class MemberDirectory extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      userDetails: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Members' Directory" });
    this.getMemberList();
  }

  getMemberList = () => {
    getOnceSnapshot("UserDetails").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        this.setState({
          isReady: true,
          userDetails: newArr,
        });
      } else {
        this.setState({
          isReady: true,
        });
      }
    });
  };
  navigateProfile = (item) => {
    if (this.context.userLogged) {
      if (item.UserId !== this.context.userDetails.UserId) {
        this.props.navigation.navigate("MemberProfile", { UserId: item.UserId, userPic: item.ProfilePic, userFirstName: item.FirstName, userLastName: item.LastName, userAddress: item.Address });
      } else {
        this.props.navigation.navigate("Profile");
      }
    } else {
      this.props.navigation.navigate("MemberProfile", { UserId: item.UserId, userPic: item.ProfilePic, userFirstName: item.FirstName, userLastName: item.LastName, userAddress: item.Address });
    }
  };
  render() {
    return (
      <Preload isLoading={!this.state.isReady} divArr={MemberDirectorySkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <SearchBox placeholder='Search by Member name...' />

          <FlatList
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.UserId}
            data={this.state.userDetails}
            renderItem={({ item, index }) => {
              return (
                <LinearGradient colors={["transparent", "#ff929226"]}>
                  <TouchableOpacity onPress={() => this.navigateProfile(item)} style={[viewUtil.viewRow, styles.memberCard]}>
                    <View style={styles.avatarWrapper}>
                      {item.ProfilePic !== "" ? (
                        <Avatar
                          rounded
                          raised
                          size='large'
                          source={{
                            uri: item.ProfilePic,
                          }}
                        />
                      ) : (
                        <IconRenderer iconFamily='Entypo' iconName='user' size={75} color='#fab1a0' style={[cssUtil.iconShadow]} />
                      )}
                    </View>
                    <View style={[styles.memberDetailsWrapper, viewUtil.textWrapperVw]}>
                      <TextLabel style={[textUtil.fontBold, textUtil.capitalize]}>{item.FirstName.toLowerCase() + " " + item.LastName.toLowerCase()}</TextLabel>
                      <TextLabel style={[textUtil.capitalize]} numberOfLines={2}>
                        {item.Address.toLowerCase()}
                      </TextLabel>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              );
            }}
          ></FlatList>
        </View>
      </Preload>
    );
  }
}

const styles = StyleSheet.create({
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  memberCard: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  memberDetailsWrapper: {
    paddingLeft: 10,
  },
});

export default MemberDirectory;
