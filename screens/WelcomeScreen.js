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

const WelcomeScreen = ({ navigation, route }) => {
  const result = route.params;
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle>Welcome!!!</PageTitle>
          <SubTitle>{result.name}</SubTitle>
          <SubTitle>{result.email}</SubTitle>
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
