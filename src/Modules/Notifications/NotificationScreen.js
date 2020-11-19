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
    
  }
  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <ScrollView>
        <View style={[styles.srvCard, cssUtil.shadowX]}>
          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center",paddingTop:15,paddingHorizontal:15 }]}>
            <IconRenderer iconFamily='AntDesign' iconName='wechat' size={30} color='#9980FA'  />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Message Notifications</TextLabel>
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center",paddingBottom:10 }]}>{this.context.msgCount !== 0 ? <TextLabel>You have {this.context.msgCount} new messages.</TextLabel> : <TextLabel>You have no new messages</TextLabel>}</View>
          {this.context.msgCount !== 0?<>
          {this.context.receivedMessages.map((item,index)=>{
            return (!item.MessageSeen? <>
              <View key={item.MessageId}>
              <Divider />
              <View style={[{paddingHorizontal:5,paddingVertical:5},viewUtil.viewRow]}>
                
                <View style={{justifyContent:'center', alignItems:'center',alignContent:'center',width:'20%'}}>
                  <IconRenderer iconFamily="AntDesign" iconName= "wechat" size={30} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#9980FA' wrpRaised={false} wrpSpace={10} />
                </View>
                <View style={{width:'80%'}}>
                 <View>
                  <TextLabel style={[textUtil.passiveTextX]} >{item.MessageDate}</TextLabel>  
                 </View>  
                 <View>
                  <TextLabel style={[textUtil.fontBold]} numberOfLines={1}>{item.MessageHeader}</TextLabel>
                 </View>
                 <View style={[viewUtil.viewRow]}>
                        <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                        <TextLabel style={[{ marginLeft: 5 }, textUtil.capitalize]}>{item.SenderName}</TextLabel>
                 </View>
                
                </View>
              </View>
              </View>

            </>:null)
          })}
          </>:null}
        
        
        
        </View>


        <View style={[styles.srvCard, cssUtil.shadowX]}>
         

          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center",paddingTop:15,paddingHorizontal:15 }]}>
            <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={30} color='#f1c40f'  />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Service Notifications</TextLabel>
            
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center",paddingBottom:10 }]}>
             <TextLabel>{this.context.newServices.length} new service(s) added.</TextLabel>
            </View>
          


         {this.context.newServices.map((item,index)=>{
           return(
          <View key={item.ServiceId}>
           <Divider />
          <View style={[{paddingHorizontal:5,paddingVertical:5},viewUtil.viewRow]}>
            
          <View style={{justifyContent:'center', alignItems:'center',alignContent:'center',width:'20%'}}>
             <IconRenderer iconFamily="MaterialCommunityIcons" iconName= "worker" size={30} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#f1c40f' wrpRaised={false} wrpSpace={10} />
          </View>


           <View style={{width:'80%'}}>
             <View style={[viewUtil.viewRow]}>
               <TextLabel style={[textUtil.passiveText]}>{item.ServiceParentName} {">"} {item.ServiceTypeName}</TextLabel>
             </View>
             <View>
               <TextLabel numberOfLines={1} style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.ServiceName.toLowerCase()}</TextLabel>
              
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
          </View>
           )
         })}
          
        </View>








        <View style={[styles.srvCard, cssUtil.shadowX]}>
         

          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center",paddingTop:15,paddingHorizontal:15 }]}>
            <IconRenderer iconFamily='MaterialCommunityIcons' iconName='forum' size={40} color='#1dd1a1'  />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Forum Notifications</TextLabel>
            
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center",paddingBottom:10 }]}>
             <TextLabel>{this.context.forumNews.length} new topic(s) added.</TextLabel>
          </View>
          


         {this.context.forumNews.map((item,index)=>{
           return(
            <View key={item.DiscId}>
           <Divider />
          <View style={[{paddingHorizontal:5,paddingVertical:5},viewUtil.viewRow]}>
          <View style={{justifyContent:'center', alignItems:'center',alignContent:'center',width:'20%'}}>
             <IconRenderer iconFamily="MaterialCommunityIcons" iconName= "forum" size={30} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#1dd1a1' wrpRaised={false} wrpSpace={10} />
          </View>
          <View style={{width:'80%'}}>
            <View style={[{justifyContent:"space-between"},viewUtil.viewRow]}>
             <View style={[viewUtil.viewRow]}>
               
               <View style={[viewUtil.viewRow]}>
               <IconRenderer iconFamily='FontAwesome5' iconName='calendar-alt' size={15} color='#17c0eb' />
               <TextLabel style={[textUtil.passiveText,{paddingLeft:5}]}>{new Date(item.DiscDate).toDateString()}</TextLabel>
               </View>
             </View>
             <View>
              <TextLabel style={[textUtil.passiveTextX]}>#{item.DiscComments} comments</TextLabel>
             </View>
             </View>
             <View>
               <TextLabel numberOfLines={1} style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.DiscTitle.toLowerCase()}</TextLabel>
             </View>
             
             <View style={[viewUtil.viewRow]}>
                        <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                        <TextLabel style={[{ marginLeft: 5 }, textUtil.capitalize]}>{item.DiscOwnerName.toLowerCase()}</TextLabel>
              </View>

              </View>
              
          </View>
          </View>
           )
         })}
          
        </View>






        <View style={[styles.srvCard, cssUtil.shadowX]}>
          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center",paddingTop:15,paddingHorizontal:15 }]}>
            <IconRenderer iconFamily='Fontisto' iconName='credit-card' size={20} color='#22a6b3'  />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Market Notifications</TextLabel>
            
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center",paddingBottom:10 }]}>
             <TextLabel>{this.context.marketNews.length} new item(s) added.</TextLabel>
          </View>
          

         {this.context.marketNews.map((item,index)=>{
           return(
          <View key={item.ItemId}>
           <Divider />
            <View style={[{paddingHorizontal:5,paddingVertical:5},viewUtil.viewRow]}>
            
            <View style={{justifyContent:'center', alignItems:'center',alignContent:'center',width:'20%'}}>
             <IconRenderer iconFamily={item.ItemType=== "Rent" ? "FontAwesome5" : "Fontisto"} iconName={item.ItemType=== "Rent" ? "rocketchat" : "shopping-bag-1"} size={item.ItemType=== "Rent" ?25:30} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#22a6b3' wrpRaised={false} wrpSpace={10} />
            </View>
            <View style={{width:'80%'}}>
              <View style={[viewUtil.viewRow,{justifyContent:"space-between"}]}>
                  <TextLabel style={[textUtil.passiveText]}>{item.ItemType}</TextLabel> 
                  <View style={[viewUtil.viewRow]}>
                  <IconRenderer iconFamily='FontAwesome5' iconName='calendar-alt' size={15} color='#17c0eb' />
                  <TextLabel style={[textUtil.passiveText,{paddingLeft:5}]}>{new Date(item.ItemPostDate).toDateString()}</TextLabel>
                  </View>
              </View>

              <View>
                <TextLabel numberOfLines={1} style={[textUtil.fontBold, { fontSize: 17 }, textUtil.capitalize]}>{item.ItemName.toLowerCase()}</TextLabel>
              </View>
              
                <View style={[viewUtil.viewRow]}>
                          <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                          <TextLabel style={[{ marginLeft: 5 }, textUtil.capitalize]}>{item.ItemOwnerName.toLowerCase()}</TextLabel>
                </View>
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
