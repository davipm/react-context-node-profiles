/**
 *
 * @param arrayAsString
 * @returns {*[]|(*|T|string)[]}
 */
export default function parseStringAsArray(arrayAsString) {
  if (!arrayAsString) return [];
  return arrayAsString.split(",").map((tech) => tech.trim());
}
