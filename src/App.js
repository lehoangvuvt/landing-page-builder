import React, { Component, useEffect, useState } from "react";
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
  TEXT_IMAGE: "TEXT_IMAGE",
};

const initData = [];

const App = () => {
  const [isOpen, setOpen] = useState(true)
  const [isMobileMode, setMobileMode] = useState(false)
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
    setOpen(false)
  }
  
  const onOpen = () => {
    setOpen(true)
  }

  const save = () => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
    alert('saved');
  };

  const onSwitchMode = () => {
    setMobileMode(!isMobileMode)
  }

  return (
    <div style={{ width: isMobileMode ? '768px': '100%'}}>
    {isAdmin && <Panel isOpen={isOpen} onClose={onClose} onOpen={onOpen} items={items} setItems={setItems} isMobileMode={isMobileMode} onSwitchMode={onSwitchMode} />}
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
        {/* <Features /> */}
      <br />
      {isAdmin && (
        <button className='save-btn'
          onClick={() => {
            save();
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default App;
