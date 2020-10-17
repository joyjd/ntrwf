import React from "react";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

import IconRenderer from "./IconRenderer";

class PhotoUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  selectImage = () => {
    this.setState(
      {
        loading: true,
      },
      () => this._pickImage()
    );
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.4,
      });
      if (!result.cancelled) {
        this.uploadImage(result.uri, this.props.uploadImagePath)
          .then((data) => {
            this.setState(
              {
                loading: false,
              },
              () => this.props.updatePic()
            );
          })
          .catch((er) => alert(er));
      }
      if (result.cancelled) {
        this.setState({
          loading: false,
        });
      }

      console.log(result);
    } catch (E) {
      this.setState({
        loading: false,
      });
      console.log(E);
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  render() {
    return (
      <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 15 }} onPress={() => this.selectImage()}>
        {this.state.loading ? <ActivityIndicator size='large' color='#ffffff' /> : <IconRenderer iconFamily='Entypo' iconName='camera' size={20} color='#ffffff' />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
export default PhotoUploader;
