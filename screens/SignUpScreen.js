import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, TouchableOpacity } from "react-native";
import { Octicons, Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  Colors,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";

const SignUpScreen = ({ navigation }) => {
  const [isHidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2024, 0, 1));

  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDateTimePicker = () => {
    console.log("Opening the picker");
    setShow(true);
  };

  return (
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Jehan Fernando"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  // editable={false}
                  showDateTimePicker={showDateTimePicker}
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="*****"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={isHidden}
                  isPassword={true}
                  isHidden={isHidden}
                  setHidden={setHidden}
                />
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="*****"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={isHidden}
                  isPassword={true}
                  isHidden={isHidden}
                  setHidden={setHidden}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>SignUp</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                    style={{ paddingLeft: 5 }}
                  >
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyBoardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  isHidden,
  setHidden,
  isDate,
  showDateTimePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDateTimePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidden(!isHidden)}>
          <Entypo
            name={isHidden ? "eye-with-line" : "eye"}
            size={30}
            color={Colors.darklight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUpScreen;
