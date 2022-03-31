import { Button } from "antd";
import { useEffect, useState } from "react";
import "./style.scss";

const Features = ({ item }) => {
  const {
    title,
    subTitle,
    text,
    buttonText,
    featureImg,
    listTitle,
    listItems,
    overlayBG,
    buttonBG,
    buttonTextColor
  } = item.content;
  const [listOfItems, setListOfItems] = useState([]);
  useEffect(() => {
    const arrItems = listItems.split(";");
    setListOfItems(arrItems);
  }, [listItems]);

  return (
    <div style={{ width: "100%" }} className="features-container">
      <div style={{ background: overlayBG }} className="background-overlay" />
      <div className="left-side">
        <p className="title">{title}</p>
        <p className="sub-title">{subTitle}</p>
        <p className="text">{text}</p>
        <Button
          style={{
            background: buttonBG,
            color: buttonTextColor,
          }}
          onClick={() => {
            alert(true);
          }}
          className="btn"
        >
          {buttonText}
        </Button>
      </div>
      <div data-aos="fade-left" className="right-side">
        <div className="phone-nft-market-container">
          <img alt="feature-img" src={featureImg} />
          <div className="features">
            <p style={{ marginLeft: "-15px" }} className="title">
              {listTitle}
            </p>
            <ul>
              {listOfItems.length > 0 &&
                listOfItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
