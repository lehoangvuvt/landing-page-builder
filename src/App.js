import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Banner from "./Components/Banner";
import Video from "./Components/Video";
import ComponentRenderer from "./Components/ComponentRenderer";
import Features from "./Components/Features";
import Panel from "./Components/Panel";

export const types = {
  BANNER: "BANNER",
  VIDEO: "VIDEO",
  IMAGE: "IMAGE",
  FEATURE: "FEATURE",
};

const initData = [];

const App = () => {
  const parentRef = useRef();
  const [isOpen, setOpen] = useState(true);
  const [isMobileMode, setMobileMode] = useState(false);
  const isAdmin = true;
  const [items, setItems] = useState(initData);
  const [bannerImg, setBannerImg] = useState("");
  const [textImg, setTextImg] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      if(event.target.className === 'parent-container'){
        event.preventDefault();
        setAnchorPoint({ x: event.pageX, y: event.pageY });
        setOpenMenu(true);
      }
    },
    [setAnchorPoint, setOpenMenu]
  );

  useEffect(() => {
    if (localStorage.getItem("ITEMS")) {
      const savedItems = JSON.parse(localStorage.getItem("ITEMS"));
      setItems(savedItems);
    }
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener('click', () => {
      setAnchorPoint({ x: 0, y: 0 });
      setOpenMenu(false);
    });
  }, []);

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

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const save = () => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
    alert("saved");
  };

  const onSwitchMode = () => {
    setMobileMode(!isMobileMode);
  };

  const addNewBanner = () => {
    const newBanner = {
      type: types.BANNER,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: 'https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg',
    };
    setItems((oldArr) => [...oldArr, newBanner]);
  };

  const addNewImg = () => {
    const newImage = {
      type: types.IMAGE,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: 'https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg',
    };
    setItems((oldArr) => [...oldArr, newImage]);
  };

  const addNewVideo = () => {
    const newVideo = {
      type: types.VIDEO,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: 'https://testnmb.w3w.app/_next/static/Assets/Video/LandingPage/nmb48.mp4',
    };
    setItems((oldArr) => [...oldArr, newVideo]);
  };

  return (
    <>
      <div className='parent-container' ref={parentRef} style={{ width: isMobileMode ? "768px" : "100%" }}>
      {isOpenMenu && (
        <div
        className='menu'
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
          }}
        >
         <div onClick={() => { addNewBanner() }} className='item'>Add new banner</div>
         <div onClick={() => { addNewImg() }} className='item'>Add new image</div>
         <div onClick={() => { addNewVideo() }} className='item'>Add new video</div>
        </div>
      )}
        {items?.length > 0 &&
          items.map((item) => (
            <ComponentRenderer
              isOpen={isOpen}
              isMobileMode={isMobileMode}
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUp={onUp}
              onDown={onDown}
              isAdmin={isAdmin}
            />
          ))}
        {/* <Features
        title="NMB48"
        subTitle="Sub title"
        text="asd"
        buttonText="Buy now"
        listTitle="Features"
        listItems={[{ text: "1" }, { text: "2" }]}
        overlayBG={'red'}
        featureImg={'https://testnmb.w3w.app/_next/static/images/nft-market-3f641879b5f13b8e92d771f342abf2b6.png'}
        isOpen={isOpen}
        isAdmin={isAdmin}
      /> */}
        <br />
      </div>
      {isAdmin && (
        <button
          className="save-btn"
          onClick={() => {
            save();
          }}
        >
          Save
        </button>
      )}
    </>
  );
};

export default App;
