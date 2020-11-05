import React, { useState } from "react";
/**
 *  {
            ServiceId: this.context.userDetails.UserId + "_srv_" + loc_timeStamp,
            ServiceTypeId: this.state.ServiceType,
            ServiceName: this.state.ServiceName,
            ServiceProviderId: this.context.userDetails.UserId,
            ServiceProviderName: this.context.userDetails.Name,
            ServiceProviderPhone: this.context.userDetails.Phone,
            ServiceProviderEmail: this.context.userDetails.Email,
            ServiceAddress: this.state.ServiceLocation,
            ServicePostTime: loc_Date,
            ServiceTypeName: this.state.ServiceTypeName,
            ServiceParentName: this.state.ServiceParentName,
          },

          ===
          {
          Name: this.state.FirstName.toLowerCase() + " " + this.state.LastName.toLowerCase(),
          Password: this.state.password,
          Email: this.state.email,
          Phone: this.state.phone,
          Address: this.state.building + ", " + this.state.locality + ", " + this.state.pin,
          ProfilePic: "",
          UserId: userId,
        }
 */

const DataContext = React.createContext();

export const DataContextProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userServices, setUserServices] = useState([]);

  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  
  const [msgCount, setMsgCount] = useState(0);
  const [srvCount, setSrvCount] = useState(0);
  const [forumCount,setForumCount] = useState(0);
  const [marketCount,setMarketCount] = useState(0);

  const [serviceCatalogue, setServiceCatalogue] = useState([]);
  const [iconList, setIconList] = useState({});

  const [newServices,setNewServices] = useState([]);
  const [pushNotificationToken,setPushNotificationToken] = useState(null);

  const [notificationTouched,setNotificationTouched] = useState(false)

  const [forumNews, setForumNews] = useState([]);
  const [marketNews,setMarketNews] = useState([]);

  const updateNewServices = (srv)=>{
     setNewServices([...srv]) // Fix it
  }
  const updateForumNews = (forum)=>{
    setForumNews([...forum]);
  }

  const updateMarketNews = (market)=>{
    setMarketNews([...market]);
  }

  const updateMsgCount = (count)=>{
    setMsgCount(count);
    
  }
  const updateSrvCount = (count)=>{
    setSrvCount(count);
    setNotificationTouched(false);
  }
  const updateForumCount = (count) =>{
    setForumCount(count);
    setNotificationTouched(false);
  }
  const updateMarketCount = (count) =>{
    setMarketCount(count);
    setNotificationTouched(false);
  }
  

  const changeUserStatus = (flag, userObj) => {
    setUserLogged(flag);
    setUserDetails(userObj);
  };

  const logOutUser = () => {
    setUserLogged(false);
    setUserDetails({});
    setUserServices([]);
    setServiceCatalogue([]);
    setIconList({});
    setReceivedMessages([]);
    setSentMessages([]);
    setMsgCount(0);
    setSrvCount(0);
    setForumCount(0);
    setMarketCount(0);
  };

  const updateReceivedMessages = (arr) => {
    setReceivedMessages([...arr]);
  };

  const updateSentMessages = (arr) => {
    setSentMessages([...arr]);
  };

  const updateUserServices = (obj) => {
    setUserServices([...obj, ...userServices]);
  };

  const updateUserServicesblob = (id) => {
    let obj = Object.assign([], userServices);
    obj.splice(id, 1);
    setUserServices(obj);
  };

  const updateServiceCatalogue = (arr) => {
    setServiceCatalogue(arr);
  };

  const updateIconList = (ob) => {
    setIconList(ob);
  };

  const actionObjects = {
    userLogged,
    userDetails,
    userServices,
    serviceCatalogue,
    iconList,
    receivedMessages,
    sentMessages,
    pushNotificationToken,
    msgCount,
    srvCount,
    newServices,
    notificationTouched,
    forumNews,
    forumCount,
    marketNews,
    marketCount,
    changeUserStatus,
    updateUserServices,
    updateUserServicesblob,
    updateServiceCatalogue,
    updateIconList,
    logOutUser,
    updateSentMessages,
    updateReceivedMessages,
    updateMsgCount,
    updateSrvCount,
    updateNewServices,
    setPushNotificationToken,
    setNotificationTouched,
    updateForumNews,
    updateForumCount,
    updateMarketNews,
    updateMarketCount
  };

  return <DataContext.Provider value={actionObjects}>{children}</DataContext.Provider>;
};

export default DataContext;
