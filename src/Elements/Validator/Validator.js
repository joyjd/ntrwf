import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export const hasValidationError = (errors) => {
  return Object.values(errors).find((error) => error.length > 0);
};
export const validateContent = (text) => {
  if (!text) {
    return "! Can't be blank";
  }
};

export const validateLength = (text) => {
  if (text && text.length < 4) {
    return "! Must be 4 characters or more.";
  }
};
export const NonSelectValue = (text) => {
  if (text === "- Select -") {
    return "! No value selected";
  }
};
export const validatePhone = (text) => {
  if (text.trim().length !== 0) {
    if (text.length != 10) {
      return "! Must be a valid phone number.";
    }
  }
};

export const validateEmail = (text) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
    return "! Must be a valid email id.";
  }
};

export const validateField = (validators, value) => {
  let error = "";
  validators.forEach((validator) => {
    const validationError = validator(value);
    if (validationError) {
      error = validationError;
    }
  });
  return error;
};

export const validateFields = (fields, values) => {
  const errors = {};

  const fieldKeys = Object.keys(fields);
  fieldKeys.forEach((key) => {
    const field = fields[key];
    const validators = field.validators;

    const value = values[key];
    if (validators && validators.length > 0) {
      const error = validateField(validators, value);

      if (error) {
        errors[key] = error;
      }
    }
  });

  return errors;
};
