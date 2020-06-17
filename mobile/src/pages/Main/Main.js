import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Avatar,
  SearchForm,
  SearchInput,
  LoadButton,
  CalloutBox,
  DevName,
  DevBio,
  DevTechs,
} from "./styles";

import api from "../../services/api";
import { connect, disconnect, subscribeToNewDevs } from "../../services/socket";

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      try {
        const { granted } = await requestPermissionsAsync();

        if (granted) {
          const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true,
          });

          const { latitude, longitude } = coords;

          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewDevs((dev) => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    try {
      const { longitude, latitude } = currentRegion;

      const response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          techs,
        },
      });

      setDevs(response.data.devs);

      setupWebsocket();
    } catch (error) {
      console.log(error);
    }
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={{ flex: 1 }}
      >
        {devs.map((dev) => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Avatar source={{ uri: dev.avatar_url }} />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username,
                });
              }}
            >
              <CalloutBox>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(", ")}</DevTechs>
              </CalloutBox>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <SearchForm>
        <SearchInput
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <LoadButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </LoadButton>
      </SearchForm>
    </>
  );
}

export default Main;
