import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import { Icon } from "react-native-elements";

import { getDataByIndex } from "./../../Firebase/FirebaseActions";
import IconRenderer from "./../../Utils/IconRenderer";
import Preload from "./../../Common/PreLoader/Preload";
import pageSkeleton from "./Skeletons/ServiceProviderListSkeleton";

import SearchBox from "./../../Common/SearchBox/SearchBox";
import MsgWrapper from "./../../Utils/MsgWrapper";

class ServiceDetailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      totalServices: [],
      blankMessage: "No provider has been registered yet for this service.",
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.srvName });
    this.getServiceProviderList();
  }

  getServiceProviderList = () => {
    getDataByIndex("UserServices", "ServiceTypeId", this.props.route.params.srvId).then((snapshot) => {
      let pt = snapshot.val();
      if (pt != null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        this.setState({
          isReady: true,
          totalServices: Object.assign([], newArr.reverse()),
        });
      } else {
        this.setState({
          isReady: true,
          totalServices: [],
        });
      }
    });
  };

  render() {
    return (
      <Preload isLoading={!this.state.isReady} divArr={pageSkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <SearchBox placeholder='Search by Service/Provider name...' />
          <FlatList
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            ListEmptyComponent={<TextLabel style={[{ flex: 1, justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 20, marginLeft: 30 }]}>{this.state.blankMessage}</TextLabel>}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.ServiceId}
            data={this.state.totalServices}
            renderItem={({ item, index }) => {
              return (
                <View style={[styles.genreCard, viewUtil.viewCol, cssUtil.shadowXX]}>
                  <View style={[viewUtil.viewRow, { paddingHorizontal: 10, paddingVertical: 5 }]}>
                    <View style={styles.iconPicHolder}>
                      <IconRenderer iconFamily={this.props.route.params.icon.iconFamily} iconName={this.props.route.params.icon.iconName} size={35} color='#e67e22' style={cssUtil.iconShadow} />
                    </View>
                    <View style={[viewUtil.viewCol, viewUtil.textWrapperVw]}>
                      <TextLabel style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.ServiceName.toLowerCase()} </TextLabel>
                      <TextLabel style={[{ marginTop: -5 }]}>{item.ServicePostTime}</TextLabel>
                      <View style={[viewUtil.viewRow, { marginTop: 7 }]}>
                        <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={16} color='#17c0eb' />
                        <TextLabel style={[{ marginLeft: 5 }, textUtil.capitalize]}>{item.ServiceProviderName}</TextLabel>
                      </View>
                    </View>
                  </View>
                  {item.ServiceAddress !== "" ? (
                    <View style={[viewUtil.viewCol, { paddingHorizontal: 10 }]}>
                      <View style={[viewUtil.viewRow]}>
                        <IconRenderer iconFamily='FontAwesome' iconName='address-card' size={18} color='#17c0eb' />
                        <TextLabel style={[textUtil.fontBold, { paddingLeft: 5 }]}>Service Location Address</TextLabel>
                      </View>
                      <View>
                        <TextLabel style={[textUtil.capitalize]}>{item.ServiceAddress.toLowerCase()}</TextLabel>
                      </View>
                    </View>
                  ) : null}

                  <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }]}>
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
                      receiverDetails={{ UserId: item.ServiceProviderId, userName: item.ServiceProviderName }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL("mailto:" + item.ServiceProviderEmail);
                      }}
                      style={[styles.paddingV_5, styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}
                    >
                      <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email-edit' size={30} color='#27ae60' />
                      <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Write Mail</TextLabel>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL("tel:" + item.ServiceProviderPhone);
                      }}
                      style={[styles.paddingV_5, styles.actionWrapper, viewUtil.viewRow]}
                    >
                      <IconRenderer iconFamily='FontAwesome' iconName='phone' size={30} color='#27ae60' />
                      <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Contact</TextLabel>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Preload>
    );
  }
}

const styles = StyleSheet.create({
  paddingV_5: {
    paddingVertical: 5,
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
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
  genreCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  iconPicHolder: {
    backgroundColor: "#f1c40f",
    marginTop: 5,
    marginRight: 10,
    borderRadius: 5,
    maxWidth: 70,
    minWidth: 70,

    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceDetailList;
