import React from "react";
import { ActivityIndicator, StyleSheet, Image, View, Dimensions, FlatList, TouchableOpacity } from "react-native";

import { getImageRef, updateKey } from "./../../Firebase/FirebaseActions";
import { setLocalstorageObject, clearAll } from "./../../AyncStorage/LocalAsyncStorage";
import PhotoUploader from "./../../Utils/PhotoUploader";
import DataContext from "./../../Context/DataContext";
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

class PhotoUploadUserWrapper extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  updateProfilePic = () => {
    this.state = {
      loading: true,
    };
    getImageRef("images/ProfilePic/" + this.context.userDetails.UserId)
      .getDownloadURL()
      .then((url) => {
        updateKey({ ProfilePic: url }, "/UserDetails/" + this.context.userDetails.UserId).then((data) => {
          this.context.changeUserStatus(true, {
            UserId: this.context.userDetails.UserId,
            Name: this.context.userDetails.Name,
            Password: this.context.userDetails.Password,
            Email: this.context.userDetails.Email,
            Phone: this.context.userDetails.Phone,
            Address: this.context.userDetails.Address,
            ProfilePic: url,
          });
          setLocalstorageObject("NTRWF_UserCreds", {
            UserId: this.context.userDetails.UserId,
            Name: this.context.userDetails.Name,
            Password: this.context.userDetails.Password,
            Email: this.context.userDetails.Email,
            Phone: this.context.userDetails.Phone,
            Address: this.context.userDetails.Address,
            ProfilePic: url,
          });
          this.state = {
            loading: false,
          };
        });
      });
  };

  render() {
    return <View style={[styles.uploadPic, cssUtil.shadowXX]}>{!this.state.loading ? <PhotoUploader uploadImagePath={"ProfilePic/" + this.context.userDetails.UserId} updatePic={() => this.updateProfilePic()} /> : <ActivityIndicator size='large' color='#ffffff' />}</View>;
  }
}

const styles = StyleSheet.create({
  uploadPic: {
    backgroundColor: "#880E4F",
    marginRight: 90,

    marginTop: -20,
    borderRadius: 10,
  },
});

export default PhotoUploadUserWrapper;
