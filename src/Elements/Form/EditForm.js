import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Field from "./../Field/Field";
import { hasValidationError, validateFields } from "./../Validator/Validator";
import TextLabel from "./../TextLabel/TextLabel";
import Btn from "./../Button/Btn";
import TransparentBtn from "./../Button/TransparentBtn";
import OutlineBtn from "./../Button/OutlineBtn";

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = "";
  });

  return state;
};
const getDefaultState = (fieldKeys, fields) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = fields[key].value;
  });

  return state;
};

const EditForm = ({ fields, buttonText, action, afterSubmit, btnType, theme, buttonOrientation, btnLeft, btnLeftEnable,externalChild }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getDefaultState(fieldKeys, fields));
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState(getInitialState(fieldKeys));

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);

    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: "" };
      setValidationErrors(newErrors);
    }
  };

  const getValues = () => {
    return fieldKeys.map((key) => values[key]);
  };

  const submit = async () => {
    setErrorMessage("");
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);

    if (hasValidationError(errors)) {
      return setValidationErrors(errors);
    }
    try {
      const result = await action(...getValues());
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View>
      {fieldKeys.map((key) => {
        return <Field key={key} theme={theme} fieldName={key} field={fields[key]} error={validationErrors[key]} onChangeText={onChangeValue} value={values[key]} />;
      })}
      {externalChild !== undefined?
      <>
      {externalChild}
      </>
      :null}
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        {btnLeftEnable ? (
          <View style={[buttonOrientation === "right" ? styles.left : styles.right]}>
            <TransparentBtn title={btnLeft.title} btnStyle={btnLeft.btnStyle} onPressMethod={() => btnLeft.onPressMethod()} />
          </View>
        ) : null}

        <View style={[styles.submitBtnWrapper, buttonOrientation === "right" ? styles.right : styles.left]}>
          {btnType === "outlined" ? <OutlineBtn title={buttonText} font={20} containerStyle={{ marginTop: 10, borderRadius: 10 }} theme='light' buttonStyle={{ backgroundColor: "#eb3b5a96", borderRadius: 10 }} onPressMethod={submit} /> : <Btn title={buttonText} font={20} buttonStyle={{ borderRadius: 10 }} onPressMethod={submit} />}
          <View style={{ marginTop: 10, marginHorizontal: -15, justifyContent: "center", alignItems: "center" }}>
            <TextLabel style={[{ fontSize: 16, color: "#b71540" }]}>{errorMessage}</TextLabel>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitBtnWrapper: {
    paddingHorizontal: 10,
  },
  right: {
    width: "50%",
    alignSelf: "flex-end",
  },
  left: {
    width: "50%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
});

export default EditForm;
