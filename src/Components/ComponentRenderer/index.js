import { useEffect } from "react";
import { types } from "../../App";
import Banner from "../Banner";
import TextImage from "../TextImage";
import Video from "../Video";
import './style.scss';

const ComponentRenderer = ({ item, onRemove, onUp, onDown, isAdmin, isOpen }) => {
    
  const remove = () => {
    onRemove(item.id);
  };
  const handleUp = () => {
    onUp(item.id);
  };
  const handleDown = () => {
    onDown(item.id);
  };
  const getRenderType = () => {
    console.log(item);
    let renderedComponent;
    switch (item.type) {
      case types.BANNER:
        renderedComponent = <Banner onRemove={onRemove} item={item} />;
        break;
      case types.TEXT_IMAGE:
        renderedComponent = <TextImage onRemove={onRemove} item={item} />;
        break;
      case types.VIDEO:
        renderedComponent = <Video item={item} />;
        break;
      default:
        renderedComponent = null;
    }
    return renderedComponent;
  };
  return (
    <div style={{ width: isOpen && isAdmin ? '85%' : '100%', left: isOpen && isAdmin ? '15%' : '0%' }} className='container'>
      {getRenderType()}
      {isAdmin &&
      <div className='tools-container'>
      <button
      className='switch-order-btn'
        onClick={() => {
          handleDown();
        }}
      >
        <img src='https://icons-for-free.com/iconfiles/png/512/arrow+up+chevronupcircle+circle+circle+icon+top+arrow+up+icon-1320185732363546123.png' />
      </button>
      <button
        className='switch-order-btn'
        onClick={() => {
          handleUp();
        }}
      >
    <img src='https://icons-for-free.com/iconfiles/png/512/arrow+up+chevronupcircle+circle+circle+icon+top+arrow+up+icon-1320185732363546123.png' />
      </button>
      <button
        onClick={() => {
          remove();
        }}
      >
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ367bHe9JlngVAEPE9-xahSxKVHLvwkWjyQ&usqp=CAU" />
      </button>
      </div>}
    </div>
  );
};

export default ComponentRenderer;
