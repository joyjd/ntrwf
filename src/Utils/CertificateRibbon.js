import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { viewUtil } from "../Styles/GenericStyles";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import IconRenderer from "./../Utils/IconRenderer";

const CertificateRibbon = ({verify,date}) =>{

    return(
        <View style={[styles.ribbonWrapper,viewUtil.viewRow]}>
            <View style={[{justifyContent:"center",paddingLeft:10,marginTop:5},viewUtil.viewRow]}>
            <IconRenderer iconFamily='Fontisto' iconName='date' size={20} color='#17c0eb' />
             <TextLabel style={[{paddingLeft:5}]}>{new Date(Number(date)).toDateString()}</TextLabel>
            </View>
            <>
            <View style={[styles.ribbon,viewUtil.viewRow,verify?styles.verified:styles.notverified]}>
            {verify?<IconRenderer iconFamily='MaterialIcons' iconName='verified-user' size={20} color='#ffffff' />:null}
            <TextLabel style={[verify?{color:"#ffffff"}:{color:'#5352ed'}]}>{verify?'Verified':'Not Verified'}</TextLabel>
            </View>
            </>
            
        </View>
    )
}

const styles = StyleSheet.create({
    ribbonWrapper:{
        justifyContent: "space-between",
     },
    ribbon:{
    
     paddingVertical:5,
     paddingHorizontal:10,
     borderTopLeftRadius:8,
     borderBottomLeftRadius:8,
     elevation:4
    },
    verified:{
     backgroundColor:'#5352ed',
    },
    notverified:{
        backgroundColor:'#ffffff',  
        borderTopColor:'#5352ed',
        borderBottomColor:"#5352ed",
        borderLeftColor:'#5352ed',
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1
    }
});
export default CertificateRibbon;