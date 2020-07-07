import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";

/**
 *
 * @param request
 * @param response
 * @returns {Promise<any>}
 */
export const searchDev = async (request, response) => {
  try {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.status(200).json({ devs });
  } catch (error) {
    return response.status(500).json({ message: 'Server Error' });
  }
};
