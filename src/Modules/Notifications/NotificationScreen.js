import React from "react";
import { StyleSheet, View,ScrollView } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import IconRenderer from "./../../Utils/IconRenderer";
import DataContext from "./../../Context/DataContext";
import { Divider } from "react-native-elements";

class NotificationScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    console.log(this.context.newServices);
  }
  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <ScrollView>
        <View style={[styles.notCard, cssUtil.shadowX]}>
          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center" }]}>
            <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email-alert' size={40} color='red' style={cssUtil.iconShadow} />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Message Notifications</TextLabel>
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center" }]}>{this.context.msgCount !== 0 ? <TextLabel>You have {this.context.msgCount} new messages.</TextLabel> : <TextLabel>You have no new messages</TextLabel>}</View>
        </View>


        <View style={[styles.srvCard, cssUtil.shadowX]}>
         

          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center",paddingTop:15,paddingHorizontal:15 }]}>
            <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={30} color='red' style={cssUtil.iconShadow} />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Service Notifications</TextLabel>
            
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center",paddingBottom:10 }]}>
             <TextLabel>{this.context.newServices.length} new services added.</TextLabel>
            </View>
          


         {this.context.newServices.map((item,index)=>{
           return(
            <View key={index}>
           <Divider />
          <View style={{paddingHorizontal:15,paddingVertical:5}}>
            
             <View style={[viewUtil.viewRow]}>
               <TextLabel style={[textUtil.passiveText]}>{item.ServiceParentName} {">"} {item.ServiceTypeName}</TextLabel>
             </View>
             <View>
               <TextLabel style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.ServiceName.toLowerCase()}</TextLabel>
              
             </View>
             <View style={[viewUtil.viewRow,{alignItems:'center',alignContent:'center'}]}>
             <IconRenderer iconFamily='FontAwesome5' iconName='calendar-alt' size={15} color='#17c0eb' />
             <TextLabel style={[{ marginLeft: 5 }]}>{new Date(Number(item.ServicePostTime)).toDateString()}</TextLabel>
             </View>
             <View style={[viewUtil.viewRow]}>
                        <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                        <TextLabel style={[{ marginLeft: 5 }, textUtil.capitalize]}>{item.ServiceProviderName}</TextLabel>
              </View>
          </View>
          </View>
           )
         })}
          
        </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  notCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 15,
    borderRadius: 6,
  },
  srvCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 6,
  },
});
export default NotificationScreen;
