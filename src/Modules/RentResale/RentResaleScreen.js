import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Alert, Linking, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import IconRenderer from "./../../Utils/IconRenderer";
import Preload from "./../../Common/PreLoader/Preload";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";
import MsgWrapper from "./../../Utils/MsgWrapper";
import ReadMoreToggle from "./../../Utils/ReadMoreToggle";
import DataContext from "./../../Context/DataContext";

class RentResale extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "rent", //rent,resale
      rentList: [],
      resaleList: [],
      viewList: [],
      isReady: false,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({ title: "Community Market" });
    this.getMarketList();
  }

  getMarketList = () => {
    getOnceSnapshot("MarketList")
      .then((snapshot) => {
        let pt = snapshot.val();
        if (pt !== null) {
          let newArr = [];
          Object.keys(pt).map((key) => {
            newArr.push(pt[key]);
          });
          //newArr = newArr.concat(newArr);
          newArr = newArr.reverse();
          let rentArr = [];
          let resaleArr = [];
          newArr.forEach((item) => {
            if (item.ItemType === "Rent") {
              rentArr.push(item);
            } else {
              resaleArr.push(item);
            }
          });

          this.setState(
            {
              isReady: true,
              rentList: rentArr,
              resaleList: resaleArr,
              viewList: rentArr,
            },
            () => {
              if (!this.context.userLogged) {
                Alert.alert("You are not logged in !", "Please log in to view/access the details of the owners.");
              }
            }
          );
        } else {
          this.setState({
            isReady: true,
          });
        }
      })
      .catch((er) => {
        this.setState(
          {
            isReady: true,
          },
          () => Alert.alert("Market posts could not be fetched !", er.message)
        );
      });
  };

  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <View style={[viewUtil.subHeader, viewUtil.viewRow]}>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "rent", viewList: this.state.rentList })} style={[viewUtil.header, this.state.viewMode === "rent" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "rent" ? null : textUtil.passiveTextX]}>Items For Rent</TextLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "resale", viewList: this.state.resaleList })} style={[viewUtil.header, this.state.viewMode === "resale" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "resale" ? null : textUtil.passiveTextX]}>Items For Resale</TextLabel>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <FlatList
            ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
            ListFooterComponent={<View style={{ marginVertical: 30 }} />}
            ListEmptyComponent={
              this.state.isReady ? (
                <TextLabel style={[{ flex: 1, justifyContent: "center", alignItems: "center", fontSize: 20, marginLeft: 30, marginTop: 50 }]}>No post registered yet.</TextLabel>
              ) : (
                <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
                  <TextLabel>Please wait...</TextLabel>
                </View>
              )
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.ItemId}
            data={this.state.viewList}
            renderItem={({ item, index }) => {
              return (
                <View style={[styles.itemCard, cssUtil.shadowX]}>
                  <View style={[styles.paddingH_10, viewUtil.viewRow, { justifyContent: "space-between" }]}>
                    <View style={[styles.identifier, viewUtil.viewRow, { justifyContent: "center", alignItems: "center" }]}>
                      <IconRenderer iconFamily={item.ItemType === "Rent" ? "FontAwesome5" : "Fontisto"} iconName={item.ItemType === "Rent" ? "rocketchat" : "shopping-bag-1"} size={18} color='#ffffff' style={cssUtil.iconShadow} />
                      <TextLabel style={[{ paddingLeft: 5, color: "#ffffff", fontSize: 18 }]}>{item.ItemType}</TextLabel>
                    </View>
                    <View style={[viewUtil.viewRow]}>
                      <IconRenderer iconFamily='Fontisto' iconName='date' size={18} color='#17c0eb' />
                      <TextLabel style={[{ paddingLeft: 5 }]}>{item.ItemPostDate}</TextLabel>
                    </View>
                  </View>
                  <View style={[styles.paddingH_15, { paddingTop: 5 }]}>
                    <TextLabel style={[{ fontWeight: "bold" }]}>{item.ItemName}</TextLabel>
                    <View style={[viewUtil.viewRow, { paddingTop: 5 }]}>
                      <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={18} color='#17c0eb' />
                      <TextLabel style={[{ paddingLeft: 5 }, textUtil.capitalize]}>{item.ItemOwnerName.toLowerCase()}</TextLabel>
                    </View>
                  </View>
                  <View style={[viewUtil.viewRow]}>
                    <View style={[styles.imageContainer]}>{item.ItemPhotoUrl !== "" ? <Image style={styles.imageProfile} source={{ uri: item.ItemPhotoUrl }}></Image> : <IconRenderer iconFamily='FontAwesome' iconName='picture-o' size={140} color='#d2dae2' style={[cssUtil.iconShadow]} />}</View>
                    <View style={[viewUtil.textWrapperVw]}>
                      <View style={[viewUtil.viewRow]}>
                        <IconRenderer iconFamily='Entypo' iconName='price-tag' size={18} color='#17c0eb' />
                        <TextLabel>{item.ItemType === "Rent" ? "Rent Amount" : "Price"}</TextLabel>
                      </View>
                      <View style={[viewUtil.viewRow, { justifyContent: "flex-start", alignItems: "center" }]}>
                        <TextLabel style={[styles.priceTag]}>
                          {"\u20B9"} {item.ItemPrice}
                        </TextLabel>
                        {item.ItemType === "Rent" ? <TextLabel> /{item.ItemUnit}</TextLabel> : null}
                      </View>
                      <View style={[viewUtil.viewRow, { marginTop: 5 }]}>
                        <IconRenderer iconFamily='MaterialIcons' iconName='location-on' size={20} color='#17c0eb' />
                        <TextLabel>Availability</TextLabel>
                      </View>
                      <View style={[{ paddingLeft: 20 }]}>
                        <TextLabel style={[textUtil.passiveText]}>{item.ItemLocation}</TextLabel>
                      </View>
                    </View>
                  </View>
                  {item.ItemDesc !== "" ? (
                    <View style={{ marginLeft: 15, marginTop: 5, marginRight: 5 }}>
                      <ReadMoreToggle style={[textUtil.passiveText]} text={item.ItemDesc} numberOfLines={1} />
                    </View>
                  ) : null}

                  {this.context.userDetails.UserId !== item.ItemOwnerId ? (
                    <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }, this.context.userLogged ? null : viewUtil.disableView]}>
                      <MsgWrapper
                        key={index}
                        label='Message'
                        actionStyle={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "33.3%",
                          borderRightWidth: 1,
                          borderRightColor: "#d2dae2",
                          paddingVertical: 5,
                          display: "flex",
                          flexDirection: "row",
                        }}
                        iconType='solo'
                        receiverDetails={{ UserId: item.ItemOwnerId, userName: item.ItemOwnerName }}
                      />
                      <TouchableOpacity
                        disabled={!this.context.userLogged}
                        onPress={() => {
                          Linking.openURL("mailto:" + item.ItemOwnerMail);
                        }}
                        style={[styles.paddingV_5, styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}
                      >
                        <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email-edit' size={30} color='#27ae60' />
                        <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Write Mail</TextLabel>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!this.context.userLogged}
                        onPress={() => {
                          Linking.openURL("tel:" + item.ItemOwnerContact);
                        }}
                        style={[styles.paddingV_5, styles.actionWrapper, viewUtil.viewRow]}
                      >
                        <IconRenderer iconFamily='FontAwesome' iconName='phone' size={30} color='#27ae60' />
                        <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Contact</TextLabel>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageProfile: {
    flex: 1,
    resizeMode: "contain",
    height: 160,
    width: 160,
  },
  paddingV_5: {
    paddingVertical: 5,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#d2dae2",
  },
  actionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "33.3%",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
  },
  priceTag: {
    fontSize: 18,
    backgroundColor: "#fab1a0",
    borderRadius: 6,

    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 20,
    marginTop: 5,
  },
  imageContainer: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 5,
    marginTop: 5,
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 10,
    paddingTop: 5,
  },
  paddingH_10: {
    paddingHorizontal: 10,
  },
  paddingH_15: {
    paddingHorizontal: 15,
  },
  identifier: {
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#22a6b3",
    marginTop: -25,
  },
});

export default RentResale;
