import React, { useContext, useEffect } from "react";
import DataContext from "./../../Context/DataContext";
import { getLocalstorageObject } from "./../../AyncStorage/LocalAsyncStorage";
import { getDataByIndexLive,getDataLive,getLatestElementLive,getOnceSnapshotOrderByStartAt } from "./../../Firebase/FirebaseActions";


const HiddenContext = () => {
  const { 
    userLogged, 
    userDetails, 
    changeUserStatus, 
    newServices,
    updateReceivedMessages, 
    updateSentMessages, 
    updateMsgCount,
    updateSrvCount,
    updateNewServices,
     } = useContext(DataContext);

    
  useEffect(() => {
    getLocalstorageObject("NTRWF_UserCreds").then((data) => {
      if (data !== null) {
         console.log("useEffect ran....")
        changeUserStatus(true, data);
        //update for notifications
        
        let rcvMailPromise = getDataByIndexLive("Messages", "ReceiverId", data.UserId);
        let sentMailPromise = getDataByIndexLive("Messages", "SenderId", data.UserId);
        let servicePromise;
        getLocalstorageObject("NTRWF_LastUsage_"+data.UserId).then((data) => {
          let lastActiveTime;
          
          if(data !== null){
            lastActiveTime = data.DateTime;
          }else{
            lastActiveTime = new Date().getTime();
          }
          servicePromise = getOnceSnapshotOrderByStartAt("UserServices","ServicePostTime",lastActiveTime);
           //service added,modified or deleted
            //add new srvices
            servicePromise.on('value',(snapshot) => {
              let pt = snapshot.val();
              let srvArr = [];
              if (pt !== null) {
              Object.keys(pt).map((key) => {
                srvArr.push(pt[key]);
              });
             
            }
            updateNewServices(srvArr);
            updateSrvCount(srvArr.length);
            console.log("srv",srvArr)
            });
          
       });
        

        rcvMailPromise.on("value", (snapshot) => {
          let pt = snapshot.val();
          //   /alert("value updates");
          if (pt !== null) {
            let notfCount = 0;
            let newArr = [];
            Object.keys(pt).map((key) => {
              newArr.push(pt[key]);
              if (!pt[key]["MessageSeen"]) {
                notfCount += 1;
              }
            });
            updateReceivedMessages(newArr.reverse());
            updateMsgCount(notfCount);
            
          } else {
          }
        });

        sentMailPromise.on("value", (snapshot) => {
          let pt = snapshot.val();
          if (pt !== null) {
            let sentArr = [];
            Object.keys(pt).map((key) => {
              sentArr.push(pt[key]);
            });
            updateSentMessages(sentArr.reverse());
          } else {
          }
        });

       
      
      }
    });
  }, [userLogged]);
 


  return null;
};

export default HiddenContext;
