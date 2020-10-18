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

  const [notificationCount, setNotificationCount] = useState(0); // this is mail notification count

  const [serviceCatalogue, setServiceCatalogue] = useState([]);
  const [iconList, setIconList] = useState({});

  const updateNotificationCount = (count) => {
    setNotificationCount(notificationCount + count);
  };

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
  };

  const updateReceivedMessages = (arr) => {
    setReceivedMessages([...arr, ...receivedMessages]);
  };

  const updateSentMessages = (arr) => {
    setSentMessages([...arr, ...receivedMessages]);
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
    notificationCount,
    changeUserStatus,
    updateUserServices,
    updateUserServicesblob,
    updateServiceCatalogue,
    updateIconList,
    logOutUser,
    updateSentMessages,
    updateReceivedMessages,
    updateNotificationCount,
  };

  return <DataContext.Provider value={actionObjects}>{children}</DataContext.Provider>;
};

export default DataContext;