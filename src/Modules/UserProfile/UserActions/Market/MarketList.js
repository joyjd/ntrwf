import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking, Alert, Image } from "react-native";
import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../Utils/IconRenderer";
import { getDataByIndex, deleteData } from "./../../../../Firebase/FirebaseActions";
import DataContext from "./../../../../Context/DataContext";

class MarketList extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      viewList: [],
      isReady: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: "My Market" });
    this.getMarketList();
  }

  getMarketList = () => {
    getDataByIndex("MarketList", "ItemOwnerId", this.context.userDetails.UserId).then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });

        this.setState({
          isReady: true,
          viewList: newArr.reverse(),
        });
      } else {
        this.setState({
          isReady: true,
          viewList: [],
        });
      }
    });
  };
  selectDeleteFunc = (id) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => this.submitDeletePost(id),
        },
      ],
      { cancelable: true }
    );
  };

  submitDeletePost = (id) => {
    this.setState({
      isReady: false,
    });
    deleteData("MarketList/" + this.state.viewList[id]["ItemId"]).then((data) => {
      this.getMarketList();
    });
  };
  render() {
    return (
      <>
        <FlatList
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          ListFooterComponent={<View style={{ marginVertical: 20 }} />}
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
                    <TextLabel style={[{ paddingLeft: 5 }]}>{new Date(Number(item.ItemPostDate)).toDateString()}</TextLabel>
                  </View>
                </View>
                <View style={[styles.paddingH_15, { paddingTop: 5 }]}>
                  <TextLabel style={[{ fontWeight: "bold" }]}>{item.ItemName}</TextLabel>
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
                    <TextLabel numberOfLines={2} style={[textUtil.passiveText]}>
                      {item.ItemDesc}
                    </TextLabel>
                  </View>
                ) : null}

                <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }]}>
                  <TouchableOpacity onPress={() => this.selectDeleteFunc(index)} style={[styles.paddingV_5, styles.actionWrapper, viewUtil.viewRow]}>
                    <IconRenderer iconFamily='MaterialIcons' iconName='delete' size={20} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#27ae60' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />

                    <TextLabel style={[{ color: "#27ae60", textDecorationLine: "underline" }]}>Delete Post</TextLabel>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </>
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
    width: "100%",
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

export default MarketList;
