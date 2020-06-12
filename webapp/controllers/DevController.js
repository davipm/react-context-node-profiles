import axios from "axios";
import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";
import { findConnections, sendMessage } from "../websocket";

/**
 *
 * @param request
 * @param response
 * @returns {Promise<any>}
 */
export const index = async (request, response) => {
  const devs = await Dev.find();
  return response.json(devs);
};

/**
 *
 * @param request
 * @param response
 * @returns {Promise<any>}
 */
export const store = async (request, response) => {
  const { github_username, techs, latitude, longitude } = request.body;
  let dev = await Dev.findOne({ github_username });

  if (!dev) {
    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );
    const { name = login, avatar_url, bio } = apiResponse.data;
    const techsArray = parseStringAsArray(techs);
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    })

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    );
    sendMessage(sendSocketMessageTo, "new-dev", dev);
  }

  return response.json(dev);
};
