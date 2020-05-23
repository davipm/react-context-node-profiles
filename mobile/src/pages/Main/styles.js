import styled from "styled-components/native";

export const Avatar = styled.Image`
  width: 54px;
  height: 54px;
  border-width: 4px;
  border-color: #ffffff;
  border-radius: 4px;
`;

export const CalloutBox = styled.View`
  width: 260px;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  color: #666666;
  margin-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;

export const SearchForm = styled.View`
  position: absolute;
  flex-direction: row;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
`;

export const SearchInput = styled.TextInput.attrs({
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 4,
    height: 4,
  },
  elevation: 2,
})`
  flex: 1 1 auto;
  padding: 0 20px;
  height: 50px;
  font-size: 16px;
  color: #333333;
  background-color: #ffffff;
  border-radius: 25px;
`;

export const LoadButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #8e4dff;
`;
