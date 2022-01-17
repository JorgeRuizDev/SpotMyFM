interface ITwemojiProps {
  emoji: string;
  type: "hex" | "emoji";
  height?: string;
}

/**
 * Twemoji component to convert an emoji into an image.
 *
 * Only works with simple emojis, complex emojis (that use 2 or more chars)
 * need to be introduced with as hex values (each value separated with an -)
 *
 * Example: "1f1ea-1f1e6" is the Spanish Flag
 * @param param0
 * @returns
 */
function Twemoji({ emoji, type, height = "1em" }: ITwemojiProps) {
  const img = type === "hex" ? emoji : emoji?.codePointAt(0)?.toString(16);

  return (
    <img
      style={{ display: "inline-block", height: height }}
      src={`https://twemoji.maxcdn.com/v/latest/svg/${img}.svg`}
      alt={emoji}
    />
  );
}

export default Twemoji;
