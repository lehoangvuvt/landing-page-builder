import { Upload } from "antd";
import "./style.scss";

const Banner = ({ item, style }) => {
  return (
    <div
      style={{
        ...item.style,
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img alt="banner" style={{ width: "100%" }} src={item.content} />
    </div>
  );
};

export default Banner;
