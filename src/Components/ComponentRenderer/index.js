import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { types } from "../../App";
import Banner from "../Banner";
import TextImage from "../TextImage";
import Video from "../Video";
import "./style.scss";
import Features from "../Features";
import Text from "../Text";

const ComponentRenderer = ({
  item,
  onRemove,
  onUp,
  onDown,
  isAdmin,
  saveData,
  index,
}) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState(null);
  const [editableFields, setEditableFields] = useState([]);
  const componentRef = useRef();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.offsetX, y: event.offsetY });
      setOpenMenu(true);
    },
    [setAnchorPoint, setOpenMenu]
  );

  useEffect(() => {
    setContent(item.content);
  }, []);

  useEffect(() => {
    getEditableFields();
  },[item.content])

  useEffect(() => {
    if (isAdmin) {
      if (componentRef && componentRef.current) {
        componentRef.current.addEventListener("contextmenu", handleContextMenu);
      }
      document.addEventListener("click", () => {
        setAnchorPoint({ x: 0, y: 0 });
        setOpenMenu(false);
      });
    }
  }, [handleContextMenu, componentRef, isAdmin]);

  const remove = () => {
    onRemove(index);
  };
  const handleUp = () => {
    onUp(item.id);
  };
  const handleDown = () => {
    onDown(item.id);
  };

  const handleOk = () => {
    let savedItem = { ...item };
    savedItem.content = content;
    saveData(savedItem, index);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getEditableFields = () => {
    let fields = [];
    if (typeof item.content === "object") {
      for (const property in item.content) {
        fields.push({ property, value: item.content[property] });
      }
      setEditableFields(fields);
    }
  };

  const handleSetNewContent = (value, property) => {
    let newContent = { ...content };
    newContent[property] = value;
    setContent(newContent);
  };

  const editableSection = () => {
    return (
      <div>
        {editableFields.length > 0 &&
          editableFields.map((field, i) => (
            <div style={{ marginBottom: "10px" }}>
              {field.property}
              <input
                key={i}
                style={{ width: "100%" }}
                value={content[field.property]}
                onChange={(e) => {
                  handleSetNewContent(e.target.value, field.property);
                }}
              />
            </div>
          ))}
      </div>
    );
  };

  const getRenderType = () => {
    let renderedComponent;
    switch (item.type) {
      case types.BANNER:
        renderedComponent = <Banner item={item} />;
        break;
      case types.IMAGE:
        renderedComponent = <TextImage item={item} />;
        break;
      case types.VIDEO:
        renderedComponent = <Video item={item} />;
        break;
      case types.FEATURE:
        renderedComponent = <Features item={item} />;
        break;
      case types.TEXT:
        renderedComponent = <Text item={item} />;
        break;
      default:
        renderedComponent = null;
    }
    return renderedComponent;
  };

  return (
    <div
      ref={componentRef}
      style={{
        width: "100%",
        border: isAdmin ? "2px dashed rgba(0,0,0,0.5)" : "none",
      }}
      className="component-container"
    >
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
              setIsModalVisible(true);
            }}
            className="item"
          >
            Edit
          </div>{" "}
          <div
            onClick={() => {
              handleUp();
            }}
            className="item"
          >
            Move up
          </div>
          <div
            onClick={() => {
              handleDown();
            }}
            className="item"
          >
            Move down
          </div>
          <div
            onClick={() => {
              remove();
            }}
            className="item"
          >
            Remove this component
          </div>
        </div>
      )}
      {getRenderType()}
      <Modal
        title="Edit data"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {editableSection()}
      </Modal>
    </div>
  );
};

export default ComponentRenderer;
