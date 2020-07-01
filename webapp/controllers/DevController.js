import axios from "axios";
import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";
import { findConnections, sendMessage } from "../websocket";

/**
 *
 * @param request
 * @param response
 * @returns {Promise<this>}
 */
export const getDevs = async (request, response) => {
  try {
    const devs = await Dev.find();
    return response.status(200).json(devs);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param request
 * @param response
 * @returns {Promise<this>}
 */
export const createDev = async (request, response) => {
  try {
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
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ message: 'Server Error' });
  }
};

/**
 *
 * @param request
 * @param response
 * @returns {Promise<this>}
 */
export const deleteDev = async (request, response) => {
  try {
    await Dev.findByIdAndDelete(request.params.id);
    return response.status(200).json('Dev Deleted');
  } catch (error) {
    return response.status(500).json({ message: 'Server Error' });
  }
}
