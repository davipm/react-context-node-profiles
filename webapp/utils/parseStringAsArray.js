/**
 *
 * @param arrayAsString
 * @returns {(*|T|string)[]}
 */
export default function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map((tech) => tech.trim());
}
