import { useEffect, useState } from "react";
import { getBase64 } from "../Common/functions";

const Banner = ({ item, style }) => {
  const [base64, setBase64] = useState(null);

  const getBase64FromFile = async () => {
     const response =  await getBase64(item.content);
     setBase64(response);
  }

  useEffect(() => {
    if(item.content instanceof File){
      getBase64FromFile();
    }
  }, [])

  return (
    <div style={{ ...item.style, width: "100%", overflow: "hidden", position: 'relative' }}>
      <img alt="banner" style={{ width: "100%" }} src={base64 ? base64 : item.content} />
    </div>
  );
};

export default Banner;
