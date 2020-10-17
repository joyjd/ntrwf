import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";
import IconRenderer from "./../../Utils/IconRenderer";
import Preload from "./../../Common/PreLoader/Preload";
import pageSkeleton from "./Skeletons/PageSkeleton";
import DataContext from "./../../Context/DataContext";

class ServicesScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      srvCatalogue: [],
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({ title: "Local Services" });
    if (this.context.serviceCatalogue.length === 0) {
      this.getServiceCatalugue();
    } else {
      this.setState({
        isReady: true,
        srvCatalogue: this.context.serviceCatalogue,
      });
    }
  }

  getServiceCatalugue = () => {
    getOnceSnapshot("ServiceCatalogue").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        this.setState(
          {
            isReady: true,
            srvCatalogue: newArr,
          },
          () => this.context.updateServiceCatalogue(newArr)
        );
      } else {
        this.setState({
          isReady: true,
        });
        alert("Server is down.Please try again in some time. Sorry for the inconvenience !");
      }
    });
  };

  render() {
    return (
      <Preload isLoading={!this.state.isReady} divArr={pageSkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={this.state.srvCatalogue}
            ListFooterComponent={<View style={{ marginVertical: 20 }} />}
            renderItem={({ item }) => {
              return (
                <View style={[styles.genreCard, viewUtil.viewCol, cssUtil.shadowXX]}>
                  <View style={[styles.genreDescWrapper, viewUtil.viewRow]}>
                    <View style={styles.iconContainer}>
                      <IconRenderer iconFamily='MaterialCommunityIcons' iconName='worker' size={30} color='#ffffff' style={cssUtil.iconShadow} />
                    </View>
                    <View style={[viewUtil.viewCol, viewUtil.textWrapperVw]}>
                      <TextLabel style={[textUtil.semiBold]}>{item.name}</TextLabel>
                      <TextLabel>{item.desc}</TextLabel>
                    </View>
                  </View>
                  <View style={[styles.serviceItemContainer, viewUtil.viewRow]}>
                    {item["children"].map((ob, index) => {
                      return (
                        <TouchableOpacity key={index} style={[{ width: "33.3%" }, index < 3 ? styles.borderTop : null]} onPress={() => this.props.navigation.navigate("ServiceDetailList", { srvId: ob.id, srvName: ob.name, icon: { iconName: ob.icon, iconFamily: ob.iconFamily } })}>
                          <View style={styles.itemBox}>
                            <View style={styles.iconPicHolder}>
                              <IconRenderer iconFamily={ob.iconFamily} iconName={ob.icon} size={35} color='#e67e22' style={cssUtil.iconShadow} />
                            </View>
                            <TextLabel style={[styles.iconText]}>{ob.name}</TextLabel>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
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
  serviceItemContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    borderLeftColor: "#d2dae2",
    borderLeftWidth: 1,
  },
  genreDescWrapper: {
    paddingBottom: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: "#17c0eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 5,
  },
  genreCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  iconPicHolder: {
    backgroundColor: "#f1c40f",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    borderRadius: 5,
    maxWidth: 90,
    minWidth: 90,
    maxHeight: 60,
    minHeight: 60,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  itemBox: {
    backgroundColor: "#ffffff",
    borderRightColor: "#d2dae2",
    borderRightWidth: 1,
    borderBottomColor: "#d2dae2",
    borderBottomWidth: 1,

    padding: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxHeight: 125,
    minHeight: 125,
  },
  iconText: {
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",

    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  borderTop: {
    borderTopColor: "#d2dae2",
    borderTopWidth: 1,
  },
});
export default ServicesScreen;
