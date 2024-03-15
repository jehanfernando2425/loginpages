import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ActivityIndicator } from "react-native";
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

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "201770894009-tri1s2aa9q1nkrf092e9n06ciep320ok.apps.googleusercontent.com",
    iosClientId:
      "201770894009-rap1ibfsrb1u407f5mjnt28if2o562kc.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleGoogleSignIn();
  }, [response]);

  async function handleGoogleSignIn() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };

  const [isHidden, setHidden] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSignIn, setGoogleSignIn] = useState(false);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url =
      "https://polar-inlet-39847-1b8c485839ae.herokuapp.com/user/signin";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, data, status } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Welcome", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err.JSON());
        setSubmitting(false);
        handleMessage("An error occured. Check your internet connection");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  // const handleGoogleSignIn = () => {
  //   setGoogleSignIn(true);
  //   const config = {
  //     iOSClientID: `201770894009-0rcjnu1k353old9695ckehcba4cpjd27.apps.googleusercontent.com`,
  //     androidClientID: `201770894009-k8ntpgp8pfc3s0lfbo6gs3gm4g8vdf58.apps.googleusercontent.com`,
  //     scopes: ["profile", "email"],
  //   };

  //   Google.logInAsync(config)
  //     .then((result) => {
  //       const { type, user } = result;

  //       if (type == "success") {
  //         const { email, name, photoUrl } = user;
  //         handleMessage("Google Signin successful", "SUCCESS");
  //         setTimeout(
  //           () => navigation.navigate("Welcome", { email, name, photoUrl }),
  //           1000
  //         );
  //       }
  //       setGoogleSignIn(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       handleMessage(
  //         "An error occured. Check your internet connection and try again"
  //       );
  //       setGoogleSignIn(false);
  //     });
  // };

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
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Please fill all the fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
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
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                  </StyledButton>
                )}
                <Line />
                {!googleSignIn && (
                  <StyledButton
                    style={{
                      backgroundColor: "#138808",
                      flexDirection: "row",
                    }}
                    onPress={() => promptAsync()}
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
                )}
                {googleSignIn && (
                  <ActivityIndicator size="large" color={Colors.primary} />
                )}

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
