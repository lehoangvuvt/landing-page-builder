import { Upload } from "antd";

const Banner = ({ item, style }) => {
  return (
    <div
      style={{
        ...item.style,
        width: "100%",
        position: "relative",
      }}
    >
      <img alt="banner" style={{ width: "100%" }} src={item.content.src} />
    </div>
  );
};

export default Banner;
