import { Button } from "antd"
import './style.scss'

const Features = ({ title, subTitle, text, buttonText, featureImg, listTitle, listItems, overlayBG, isOpen, isAdmin }) => {
    return(
        <div style={{ width: isOpen && isAdmin ? '85%' : '100%', left: isOpen && isAdmin ? '15%' : '0%' }} className='features-container'>
        <div style={{ background: overlayBG }} className='background-overlay' />
        <div className='left-side'>
            <p className='title'>{title}</p>
            <p className='sub-title'>{subTitle}</p>
            <p className='text'>{text}</p>
          <Button onClick={() => { alert(true) }} className='btn'>{buttonText}</Button>
        </div>
        <div data-aos='fade-left' className='right-side'>
          <div className='phone-nft-market-container'>
            <img src={featureImg} />
            <div className='features'>
              <p style={{ marginLeft: '-15px' }} className='title'>{listTitle}</p>
              <ul>
                {listItems.map((item, i) =>
                  <li key={i}>{item.text}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Features