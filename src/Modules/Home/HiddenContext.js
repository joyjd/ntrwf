import React, { useContext, useEffect } from "react";
import DataContext from "./../../Context/DataContext";
import { getLocalstorageObject } from "./../../AyncStorage/LocalAsyncStorage";
import { getDataByIndexLive } from "./../../Firebase/FirebaseActions";

const HiddenContext = () => {
  const { userLogged, userDetails, changeUserStatus, updateReceivedMessages, updateSentMessages, updateNotificationCount } = useContext(DataContext);
  useEffect(() => {
    getLocalstorageObject("NTRWF_UserCreds").then((data) => {
      if (data !== null) {
        changeUserStatus(true, data);
        //update for notifications
        let rcvMailPromise = getDataByIndexLive("Messages", "ReceiverId", data.UserId);
        let sentMailPromise = getDataByIndexLive("Messages", "SenderId", data.UserId);
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
            updateNotificationCount(notfCount);
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

  console.log("hidden executed");

  return null;
};

export default HiddenContext;
