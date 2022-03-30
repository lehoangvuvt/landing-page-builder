import { useEffect, useState } from "react";
import { types } from "../../App";
import "./style.scss";

const Panel = ({ isOpen, onClose, onOpen, items, setItems }) => {
  const [isOpenPanel, setOpenPanel] = useState(false);
  const [bannerImg, setBannerImg] = useState("");
  const [textImg, setTextImg] = useState("");
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ITEMS")) {
      const savedItems = JSON.parse(localStorage.getItem("ITEMS"));
      setItems(savedItems);
    }
  }, []);

  const addNewBanner = () => {
    const newBanner = {
      type: types.BANNER,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: bannerImg,
    };
    setItems((oldArr) => [...oldArr, newBanner]);
    setBannerImg("");
  };

  const addNewTextImg = () => {
    const newBanner = {
      type: types.TEXT_IMAGE,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: textImg,
    };
    setItems((oldArr) => [...oldArr, newBanner]);
    setTextImg("");
  };

  const addNewVideo = () => {
    const newVideo = {
      type: types.VIDEO,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: videoSrc,
    };
    setItems((oldArr) => [...oldArr, newVideo]);
    setVideoSrc("");
  };

  const onRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const close = () => {
    onClose();
  };
  const open = () => {
    onOpen();
  };
  useEffect(() => {
    setOpenPanel(isOpen);
  }, []);
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setOpenPanel(isOpen);
      }, 200);
    } else {
      setOpenPanel(isOpen);
    }
  }, [isOpen]);
  return (
    <>
      <div style={{ left: isOpen ? "0%" : "-16%" }} className="panel-container">
        <div className="panel-container__header">
          <button
            onClick={() => {
              close();
            }}
          >
            <img src="https://t3.ftcdn.net/jpg/03/64/30/82/360_F_364308273_cV9OrZrqUpZ8En9rC8KxBqaxkVg95ZTY.jpg" />
          </button>
        </div>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setBannerImg(e.target.files[0]);
          }}
        />
        <button
          onClick={() => {
            addNewBanner();
          }}
        >
          Add new banner
        </button>
        &nbsp;&nbsp;
        <input
          type="text"
          value={videoSrc}
          onChange={(e) => {
            setVideoSrc(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addNewVideo();
          }}
        >
          Add new video
        </button>
        &nbsp;&nbsp;
        <input
          type="text"
          value={textImg}
          onChange={(e) => {
            setTextImg(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addNewTextImg();
          }}
        >
          Add new text image
        </button>
      </div>

      {!isOpenPanel && (
        <>
        <button
          onClick={() => {
            open();
          }}
          className="open-panel-btn"
        >
          <img src='https://i.pinimg.com/564x/52/0a/d9/520ad9c57901ea2a4f1448b9d18444ec--free-icon-arrow.jpg' />
        </button>
        </>
      )}
    </>
  );
};

export default Panel;
