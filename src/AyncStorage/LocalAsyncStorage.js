import React from "react";

import AsyncStorage from "@react-native-community/async-storage";

export const getLocalstorageString = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const getLocalstorageObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

export const setLocalstorageString = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    return "error";
  }
};

export const setLocalstorageObject = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return "error";
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};
