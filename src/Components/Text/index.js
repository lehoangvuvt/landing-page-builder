const Text = ({ item, style }) => {
  return (
    <div
      style={{
        ...item.style,
        width: "100%",
        fontSize: `${parseInt(item.content.fontSize)}px`,
        textAlign: item.content.align,
        fontWeight: parseInt(item.content.fontWeight),
        color: item.content.color,
      }}
    >
      {item.content.text}
    </div>
  );
};

export default Text;
