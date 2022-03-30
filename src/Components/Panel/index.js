import { useEffect, useState } from "react";
import { getBase64 } from '../Common/functions'
import { uploadFile } from '../Common/api'
import { types } from "../../App";
import "./style.scss";

const initVideos = [
  {
    name: "video1",
    url: "https://testnmb.w3w.app/_next/static/Assets/Video/LandingPage/nmb48.mp4",
  },
];

const Panel = ({ isOpen, onClose, onOpen, items, setItems }) => {
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState(initVideos);
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(initVideos[0].url)
  const [selectedTextImage, setSelectedTextImage] = useState(null)
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

  useEffect(() => {
    if(uploadedImages.length > 0){
      setSelectedImage(uploadedImages[0].url);
    }
  }, [uploadedImages])

  const addNewBanner = () => {
    const newBanner = {
      type: types.BANNER,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: selectedImage,
    };
    setItems((oldArr) => [...oldArr, newBanner]);
  };

  const addNewTextImg = () => {
    const newBanner = {
      type: types.TEXT_IMAGE,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: selectedTextImage,
    };
    setItems((oldArr) => [...oldArr, newBanner]);
  };

  const addNewVideo = () => {
    const newVideo = {
      type: types.VIDEO,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      content: selectedVideo,
    };
    setItems((oldArr) => [...oldArr, newVideo]);
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
  const handleUploadImage = async () => {
    const base64 = await getBase64(imageFile);
    const response = await uploadFile(base64);
    if(response && response.url){
      const newImage = { name: imageFile.name, url: response.url}
      setUploadedImages(arr => [...arr, newImage]);
      alert('Uploaded success');
    }
  }
  return (
    <>
      <div style={{ left: isOpen ? "0%" : "-15%" }} className="panel-container">
        <div className="panel-container__header">
          <button
            onClick={() => {
              close();
            }}
          >
            <img src="https://t3.ftcdn.net/jpg/03/64/30/82/360_F_364308273_cV9OrZrqUpZ8En9rC8KxBqaxkVg95ZTY.jpg" />
          </button>
        </div>
        <input type='file' onChange={(e) => {
          setImageFile(e.target.files[0]);
        }} />
        <button onClick={() => { handleUploadImage() }}>Upload image</button>
        <br/> 

        <select value={selectedImage} onChange={(e)=> {
          setSelectedImage(e.target.value)
        }}>
          {uploadedImages.map((image, i) => (
            <option value={image.url}>{image.name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            addNewBanner();
          }}
        >
          Add new banner
        </button>
        &nbsp;&nbsp;
        <select value={selectedVideo} onChange={(e)=> {
          setSelectedVideo(e.target.value)
        }}>
          {uploadedVideos.map((video, i) => (
            <option value={video.url}>{video.name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            addNewVideo();
          }}
        >
          Add new video
        </button>
        &nbsp;&nbsp;
        <select value={selectedTextImage} onChange={(e)=> {
          setSelectedTextImage(e.target.value)
        }}>
          {uploadedImages.map((image, i) => (
            <option value={image.url}>{image.name}</option>
          ))}
        </select>
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihDdFuA5zbIScKWC3hXDQEbC-sRZR-dlKOg&usqp=CAU" />
          </button>
        </>
      )}
    </>
  );
};

export default Panel;
