import React from "react";
import { StyleSheet, View } from "react-native";
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";


export const DocUploader = async (uri,docName)=>{
    const response = await fetch(uri);
    const blob = await response.blob();
   
    var ref = firebase
      .storage()
      .ref()
      .child("documents/" + docName);
    return ref.put(blob);
    
}

export const DocRemover = (docName) =>{
    var ref = firebase
      .storage()
      .ref()
      .child("documents/" + docName);

      return ref.delete();
}

