import { Button } from "antd"
import './style.scss'

const Features = () => {
    return(
        <div className='features-container'>
        <div className='background-overlay' />
        <div className='left-side'>
            <p className='title'>NMB48</p>
            <p className='sub-title'>Digital Gallery Market</p>
            <p className='text'>Purchase various digital contents such as digital trading cards at the dedicated market!</p>
          <Button onClick={() => { alert(true) }} className='btn'>Buy now</Button>
        </div>
        <div data-aos='fade-left' className='right-side'>
          <div className='phone-nft-market-container'>
            <img src='https://testnmb.w3w.app/_next/static/images/nft-market-3f641879b5f13b8e92d771f342abf2b6.png' />
            <div className='features'>
              <p style={{ marginLeft: '-15px' }} className='title'>Features</p>
              <ul>
                <li>Entry</li>
                <li>Nft shop</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Features