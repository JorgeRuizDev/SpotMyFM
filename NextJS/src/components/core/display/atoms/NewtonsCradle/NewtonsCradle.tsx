/**
 * @typedef Props
 * @prop {number} [size]
 * @prop {string} [color]
 * @prop {number} [speed]
 */

/**
 * @param {Props} props
 */
export default function NewtonsCradle({
  size = 40,
  color = "black",
  speed = 1.4,
}) {
  return (
    <div
      className="newtons-cradle"
      style={{
        "--uib-size": `${size}px`,
        "--uib-color": color,
        "--uib-speed": speed + "s",
      }}
    >
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
    </div>
  );
}
