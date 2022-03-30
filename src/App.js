import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Banner from "./Components/Banner";
import Video from "./Components/Video";
import ComponentRenderer from "./Components/ComponentRenderer";
import Features from "./Components/Features";

export const types = {
  BANNER: "BANNER",
  VIDEO: "VIDEO",
  TEXT_IMAGE: "TEXT_IMAGE",
};

const initData = [];

const App = () => {
  const isAdmin = true;
  const [items, setItems] = useState(initData);
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

  const onUp = (id) => {
    let newOrderItems = [...items];
    for (let i = 0; i < newOrderItems.length; i++) {
      if (newOrderItems[i].id === id) {
        if (i === 0) return;
        const temp = newOrderItems[i - 1];
        newOrderItems[i - 1] = newOrderItems[i];
        newOrderItems[i] = temp;
      }
    }
    setItems(newOrderItems);
  };

  const onDown = (id) => {
    let newOrderItems = [...items];
    for (let i = newOrderItems.length - 1; i > -1; i--) {
      if (newOrderItems[i].id === id) {
        if (i === newOrderItems.length - 1) return;
        const temp = newOrderItems[i + 1];
        newOrderItems[i + 1] = newOrderItems[i];
        newOrderItems[i] = temp;
      }
    }
    setItems(newOrderItems);
  };

  const save = () => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
  };

  return (
    <>
    {isAdmin &&
      <>
        <input
          type="text"
          value={bannerImg}
          onChange={(e) => {
            setBannerImg(e.target.value);
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
        <br />
        <br />
      </>}
      {items?.length > 0 &&
        items.map((item) => (
          <ComponentRenderer
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUp={onUp}
            onDown={onDown}
            isAdmin={isAdmin}
          />
        ))}
        <Features />
      <br />
      {isAdmin && (
        <button
          onClick={() => {
            save();
          }}
        >
          Save
        </button>
      )}]
    </>
  );
};

export default App;
