import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import { Octicons, Entypo, Fontisto } from "@expo/vector-icons";
import axios from "axios";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
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

const LoginScreen = ({ navigation }) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require("../assets/logo.jpg")} />
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
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
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />
                <StyledButton
                  style={{
                    backgroundColor: "#138808",
                    flexDirection: "row",
                  }}
                  onPress={handleSubmit}
                >
                  <Fontisto name="google" color={Colors.primary} size={25} />
                  <ButtonText
                    style={{
                      paddingLeft: 10,
                    }}
                    google={true}
                  >
                    Sign in with Google
                  </ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                    style={{ paddingLeft: 5 }}
                  >
                    <TextLinkContent>Signup</TextLinkContent>
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
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
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

export default LoginScreen;
