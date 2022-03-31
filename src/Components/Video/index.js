import ReactPlayer from "react-player";
import './style.scss';

const Video = ({ item }) => {
  return (
    <div className='video-wrapper-container'>
      <ReactPlayer
        loop
        className='video-wrapper'
        url={item.content.src}
        muted
        playing={true}
        controls={false}
      />
    </div>
  );
};

export default Video;
