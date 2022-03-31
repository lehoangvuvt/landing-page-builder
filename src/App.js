import React, { useCallback, useEffect, useState } from "react";
import ComponentRenderer from "./Components/ComponentRenderer";
import "antd/dist/antd.css";

export const types = {
  BANNER: "BANNER",
  VIDEO: "VIDEO",
  IMAGE: "IMAGE",
  FEATURE: "FEATURE",
  TEXT: "TEXT",
};

const initData = [];

const App = () => {
  const isAdmin = true;
  const [items, setItems] = useState(initData);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [anchorItemIndex, setAnchorItemIndex] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      if (
        event.target.className === "parent-container" ||
        event.target.className.includes("componentItem")
      ) {
        if (event.target.className.includes("componentItem")) {
          setAnchorItemIndex(parseInt(event.target.className.split("-")[1]));
        }
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
    if (isAdmin) {
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("click", () => {
        setAnchorPoint({ x: 0, y: 0 });
        setOpenMenu(false);
      });
    }
  }, [handleContextMenu, isAdmin]);

  const onRemove = (index) => {
    let itemsAfterRemoved = [...items];
    itemsAfterRemoved.splice(index, 1);
    setItems(itemsAfterRemoved);
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
    alert("saved");
  };

  const addNewBanner = () => {
    const newItem = {
      type: types.BANNER,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: {
        src: "https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg",
      },
    };
    addNewItem(newItem);
  };

  const addNewImg = () => {
    const newItem = {
      type: types.IMAGE,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: {
        src: "https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg",
      },
    };
    addNewItem(newItem);
  };

  const addNewVideo = () => {
    const newItem = {
      type: types.VIDEO,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: {
        src: "https://testnmb.w3w.app/_next/static/Assets/Video/LandingPage/nmb48.mp4",
      },
    };
    addNewItem(newItem);
  };

  const addNewFeature = () => {
    const newItem = {
      type: types.FEATURE,
      content: {
        title: "NMB48",
        subTitle: "Sub title",
        text: "asd",
        buttonText: "Buy now",
        listTitle: "Features",
        listItems: "1;2;3;4;5",
        overlayBG: "red",
        buttonBG: "red",
        buttonTextColor: "white",
        featureImg:
          "https://testnmb.w3w.app/_next/static/images/nft-market-3f641879b5f13b8e92d771f342abf2b6.png",
      },
    };
    addNewItem(newItem);
  };

  const addNewText = () => {
    const newItem = {
      type: types.TEXT,
      content: {
        text: 'Sample text',
        align: 'center',
        fontSize: 15,
        color: 'black',
        fontWeight: 400,
      },
    };
    addNewItem(newItem);
  };  

  const addNewItem = (newItem) => {
    let newItems = [...items];
    if (anchorItemIndex !== null) {
      newItems.splice(anchorItemIndex + 1, 0, newItem);
      setAnchorItemIndex(null);
    } else {
      newItems.push(newItem);
    }
    setItems(newItems);
  };

  const onSaveData = (savedItem, index) => {
    let newItems = JSON.parse(JSON.stringify(items));
    newItems[index] = savedItem;
    setItems(newItems);
  };

  return (
    <>
      <div className="parent-container">
        {isOpenMenu && (
          <div
            className="menu"
            style={{
              top: anchorPoint.y,
              left: anchorPoint.x,
            }}
          >
            <div
              onClick={() => {
                addNewBanner();
              }}
              className="item"
            >
              Add new banner
            </div>
            <div
              onClick={() => {
                addNewImg();
              }}
              className="item"
            >
              Add new image
            </div>
            <div
              onClick={() => {
                addNewVideo();
              }}
              className="item"
            >
              Add new video
            </div>
            <div
              onClick={() => {
                addNewFeature();
              }}
              className="item"
            >
              Add new feature
            </div>
            <div
              onClick={() => {
                addNewText();
              }}
              className="item"
            >
              Add new text
            </div>
          </div>
        )}
        {items?.length > 0 &&
          items.map((item, i) => (
            <div style={{ marginBottom: "1px" }}>
              <ComponentRenderer
                saveData={onSaveData}
                key={i}
                index={i}
                item={item}
                onRemove={onRemove}
                onUp={onUp}
                onDown={onDown}
                isAdmin={isAdmin}
              />
              {isAdmin && (
                <div
                  style={{ width: "100%", height: "20px" }}
                  className={`componentItem-${i}`}
                />
              )}
            </div>
          ))}
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
