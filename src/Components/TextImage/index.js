const TextImage = ({ item, style }) => {
  return (
    <div
      style={{
        ...item.style,
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: '20px 0px 20px 0px'
      }}
    >
      <img alt="banner" style={{ maxWidth: '95%' }} src={item.content.src} />
    </div>
  );
};

export default TextImage;
