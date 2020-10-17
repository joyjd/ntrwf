import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, FlatList, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-community/picker";
import TextLabel from "../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import DataContext from "./../../../../Context/DataContext";
import { getOnceSnapshot } from "./../../../../Firebase/FirebaseActions";
import IconRenderer from "./../../../../Utils/IconRenderer";

class SrvCategoryPicker extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      ServiceCategory: "- Select -",
      ServiceType: "- Select -",
      ServiceTypeName: "",
      ServiceParentName: "",
    };
  }

  componentDidMount() {
    if (this.context.serviceCatalogue.length === 0) {
      this.getServiceCatalugue();
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
        this.context.updateServiceCatalogue(newArr);
      }
    });
  };

  srvCategoryValueChange = (itemValue, itemIndex) => {
    if (itemIndex > 0) {
      this.setState(
        {
          ServiceCategory: itemValue,
          ServiceParentName: this.context.serviceCatalogue[Object.keys(this.context.serviceCatalogue)[itemIndex - 1]].name,
        },
        () => {
          this.props.getSrvCat(this.state.ServiceCategory, this.state.ServiceParentName);
        }
      );
    } else {
      this.setState(
        {
          ServiceCategory: "- Select -",
        },
        () => this.props.getSrvCat("", "")
      );
    }
  };

  srvTypeValueChange = (itemValue, itemIndex) => {
    if (itemIndex > 0) {
      this.setState(
        {
          ServiceType: itemValue,
          ServiceTypeName: this.context.serviceCatalogue[this.state.ServiceCategory]["children"][itemIndex - 1].name,
        },
        () => {
          this.props.getSrvType(this.state.ServiceType, this.state.ServiceTypeName);
        }
      );
    } else {
      this.setState(
        {
          ServiceCategory: "- Select -",
        },
        () => this.props.getSrvType("", "")
      );
    }
  };

  render() {
    return (
      <View style={[{ paddingHorizontal: 10 }]}>
        <View style={styles.pickerWrapper}>
          <View style={[viewUtil.viewRow]}>
            <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={18} color='#17c0eb' />
            <TextLabel style={[{ fontWeight: "bold", color: "#3e0909d6", paddingLeft: 5 }]}>Select Service Category*</TextLabel>
          </View>

          <Picker style={styles.customPicker} selectedValue={this.state.ServiceCategory} onValueChange={(itemValue, itemIndex) => this.srvCategoryValueChange(itemValue, itemIndex)}>
            <Picker.Item label='- Select -' value='- Select -' />

            {Object.keys(this.context.serviceCatalogue).map((key, index) => {
              return <Picker.Item key={index} label={this.context.serviceCatalogue[key].name} value={key} />;
            })}
          </Picker>
          <TextLabel style={[{ color: "#b33939", paddingLeft: 5 }]}>{this.props.errorText ? "! Select a type" : null}</TextLabel>
        </View>
        {this.state.ServiceCategory !== "- Select -" ? (
          <View>
            <View style={[viewUtil.viewRow]}>
              <IconRenderer iconFamily='MaterialCommunityIcons' iconName='worker' size={20} color='#17c0eb' />
              <TextLabel style={[{ fontWeight: "bold", color: "#3e0909d6", paddingLeft: 5 }]}>Select Service Type*</TextLabel>
            </View>
            <Picker enabled={this.state.ServiceCategory !== "- Select -"} style={styles.customPicker} selectedValue={this.state.ServiceType} onValueChange={(itemValue, itemIndex) => this.srvTypeValueChange(itemValue, itemIndex)}>
              <Picker.Item label='- Select -' value='- Select -' />
              {this.context.serviceCatalogue[this.state.ServiceCategory]["children"].map((item, index) => {
                return <Picker.Item key={index} label={item.name} value={item.id} />;
              })}
            </Picker>
            <TextLabel style={[{ color: "#b33939", paddingLeft: 5 }]}>{this.props.errorText ? "! Select a type" : null}</TextLabel>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  customPicker: {
    backgroundColor: "#fff5f5",
    elevation: 2,

    marginTop: 10,
    height: 40,
  },

  pickerWrapper: {
    marginBottom: 10,
  },
});
export default SrvCategoryPicker;
