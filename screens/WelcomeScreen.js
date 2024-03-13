import React from "react";
import { StatusBar } from "expo-status-bar";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
} from "../components/styles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle>Welcome!!!</PageTitle>
          <SubTitle>Jehan Fernando</SubTitle>
          <SubTitle>jehan.20220786@iit.ac.lk</SubTitle>

          <StyledFormArea>
            <Line />
            <StyledButton
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default WelcomeScreen;
