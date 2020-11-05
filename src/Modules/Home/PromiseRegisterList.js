
import React from "react";
import { AppState } from "react-native";
import DataContext from "./../../Context/DataContext";
import { getLocalstorageObject,setLocalstorageObject } from "./../../AyncStorage/LocalAsyncStorage";
import { getDataByIndexLive,getOnceSnapshotOrderByStartAt,getDataLive } from "./../../Firebase/FirebaseActions";

class PromiseRegisterList extends React.Component{
    static contextType = DataContext;
    rcvMailPromise;
    sentMailPromise;
    servicePromise;
    forumPushNot;
    marketPushNot;

    createRcvdMsgNotPushNotFlag = false;
    createSentMsgNotFlag = false;

    pushMsgNotificationMessage = {
        to: null,
        sound: 'default',
        title: "",
        body: "",
        data: {},
    }; 

    constructor(props){
        super(props);
        this.state={
            appState: AppState.currentState,
         }
    }
    componentDidMount(){
        this.changeUserStatus();
        AppState.addEventListener('change', this._handleAppStateChange);
        getLocalstorageObject("NTRWF_LastUsage").then((data) => {
           this.createServiceNotification(data.DateTime);
           this.registerForForumChanges(data.DateTime);
           this.registerForMarketChanges(data.DateTime);
        });
    }
   componentDidUpdate(){
    
     if(this.context.userLogged && Object.keys(this.context.userDetails).length !== 0){
        if(!this.createRcvdMsgNotPushNotFlag){
         this.createRcvdMsgNotPushNot();
        }
        if(!this.createSentMsgNotFlag){
         this.createSentMsgNot()
        }
        
    } else if(!this.context.userLogged){
        if(this.createRcvdMsgNotPushNotFlag || this.createSentMsgNotFlag){
            this.createRcvdMsgNotPushNotFlag = false;
            this.createSentMsgNotFlag =  false;
            this.unhookPromise(this.rcvMailPromise);
            this.unhookPromise(this.sentMailPromise);
        }
        
    }
   }
   componentWillUnmount(){
       console.log("Promise Registe unmounted");
       
       this.unhookPromise(this.rcvMailPromise);
       this.unhookPromise(this.sentMailPromise);
       this.unhookPromise(this.servicePromise);
       this.unhookPromise(this.forumPushNot);
       this.unhookPromise(this.marketPushNot);
   }
   
   _handleAppStateChange = nextAppState  =>{
        if (!(this.state.appState.match(/inactive|background/) && nextAppState === 'active')) {
                 //in back
                 if(this.context.notificationTouched){
                    let timeStamp = new Date().getTime();
            
                    this.unhookPromise(this.servicePromise);
                    this.unhookPromise(this.forumPushNot);
                    this.unhookPromise(this.marketPushNot);

                    this.createServiceNotification(timeStamp);
                    this.registerForForumChanges(timeStamp);
                    this.registerForMarketChanges(timeStamp);
                    setLocalstorageObject("NTRWF_LastUsage", {
                        DateTime: timeStamp
                    });
                 }
              
        }else{
            //in front
         }
        this.setState({ appState: nextAppState });
    }

   changeUserStatus = ()=>{
       if(!this.context.userLogged){
        getLocalstorageObject("NTRWF_UserCreds").then((data) => {
            if (data !== null) {
             this.context.changeUserStatus(true, data);
            }
        });
       }
    }

   createRcvdMsgNotPushNot = ()=>{
    this.createRcvdMsgNotPushNotFlag = true;
    this.rcvMailPromise = getDataByIndexLive("Messages", "ReceiverId", this.context.userDetails.UserId);
    this.rcvMailPromise.on("value", (snapshot) => {
        let pt = snapshot.val();
        if (pt !== null) {
          let notfCount = 0;
          let newArr = [];
          Object.keys(pt).map((key) => {
            newArr.push(pt[key]);
            if (!pt[key]["MessageSeen"]) {
              notfCount += 1;
            }
          });
          this.context.updateReceivedMessages(newArr.reverse());
          this.context.updateMsgCount(notfCount);
          
          //send msg notification
            let tempMsgvArr = newArr;
            let temp = tempMsgvArr[0].SenderName.toUpperCase() +' sent a message to you.';
            if(temp !== this.pushMsgNotificationMessage.body || !tempMsgvArr[0].MessageSeen){
                this.pushMsgNotificationMessage.to =  this.context.pushNotificationToken;
                this.pushMsgNotificationMessage.title = 'NTRWF - New Message Received !';
                this.pushMsgNotificationMessage.body = temp;
                this.pushMsgNotificationMessage.data = { 
                navigationLink: "Profile",
               };
              if(this.pushMsgNotificationMessage.to !== null){
                if(!tempMsgvArr[0].MessageSeen){
                  this.sendNotification(this.pushMsgNotificationMessage); 
                }
               }
            } 
        }
    });
   }

   createSentMsgNot = ()=> {
    this.createSentMsgNotFlag = true;
    this.sentMailPromise = getDataByIndexLive("Messages", "SenderId", this.context.userDetails.UserId);
    this.sentMailPromise.on("value", (snapshot) => {
        let pt = snapshot.val();
        if (pt !== null) {
          let sentArr = [];
          Object.keys(pt).map((key) => {
            sentArr.push(pt[key]);
          });
          this.context.updateSentMessages(sentArr.reverse());
        }
      });
   }

   createServiceNotification = (lastUsage)=>{
        let lastActiveTime;
        
        if(lastUsage !== null){
          lastActiveTime = lastUsage;
        }else{
          lastActiveTime = new Date().getTime();
        }
        this.servicePromise = getOnceSnapshotOrderByStartAt("UserServices","ServicePostTime",lastActiveTime);
           //service added,modified or deleted,add new srvices
          
           this.servicePromise.on('value',(snapshot) => {
            let pt = snapshot.val();
            let srvArr = [];
            if (pt !== null) {
            Object.keys(pt).map((key) => {
              srvArr.push(pt[key]);
            });
           
          }
          this.context.updateNewServices(srvArr);
          this.context.updateSrvCount(srvArr.length);
          
        });
        
     
   }

   registerForForumChanges = (lastUsage)=>{
    let lastActiveTime;
        
    if(lastUsage !== null){
      lastActiveTime = lastUsage;
    }else{
      lastActiveTime = new Date().getTime();
    }
    this.forumPushNot =getOnceSnapshotOrderByStartAt("Forum","DiscDate",lastActiveTime); //getDataLive("Forum").startAt(lastActiveTime).orderByChild('DiscDate');
    this.forumPushNot.on("value",(snapshot)=>{
      let forumNot = snapshot.val();
      let forumNotArr = [];
      if(forumNot !== null) {
        
        Object.keys(forumNot).map((key) => {
          forumNotArr.push(forumNot[key]);
        });

        

        let pushforumMessage = {
            to: this.context.pushNotificationToken,
            sound: 'default',
            title: "NTRWF - "+forumNotArr[0].DiscOwnerName.toUpperCase()+" started a new discussion.",
            body: forumNotArr[0].DiscTitle.toLowerCase(),
            data: { 
              navigationLink: "Forum",
             },
        };
        if(pushforumMessage.to !== null){
          this.sendNotification(pushforumMessage); 
        }
      }
      this.context.updateForumNews(forumNotArr);
      this.context.updateForumCount(forumNotArr.length);
    });

  }


  registerForMarketChanges = (lastUsage)=>{
    let lastActiveTime;
        
    if(lastUsage !== null){
      lastActiveTime = lastUsage;
    }else{
      lastActiveTime = new Date().getTime();
    }
    this.marketPushNot =getOnceSnapshotOrderByStartAt("MarketList","ItemPostDate",lastActiveTime); //getDataLive("MarketList").startAt(lastActiveTime).orderByChild('ItemPostDate');
    this.marketPushNot.on("value",(snapshot)=>{
      let marketNot = snapshot.val();
      let marketNotArr = [];
      if(marketNot !== null) {
        
        Object.keys(marketNot).map((key) => {
          marketNotArr.push(marketNot[key]);
        });
    
        let pushMarketMessage = {
            to: this.context.pushNotificationToken,
            sound: 'default',
            title: "NTRWF - "+marketNotArr[0].ItemOwnerName.toUpperCase()+" posted a new item for "+marketNotArr[0].ItemType.toUpperCase(),
            body: marketNotArr[0].ItemName.toLowerCase(),
            data: { 
              navigationLink: "RentResale",
             },
        };
        if(pushMarketMessage.to !== null){
          this.sendNotification(pushMarketMessage); 
        }
      }
      this.context.updateMarketNews(marketNotArr);
      this.context.updateMarketCount(marketNotArr.length);
    });

  }




   sendNotification = (message)=>{
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }


  unhookPromise = (ref) =>{
    ref.off('value');
  }
  
  render(){
   return null;
  }
}

export default PromiseRegisterList;
