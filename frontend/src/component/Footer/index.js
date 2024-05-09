import React from 'react'
import SVG from "react-inlinesvg"
import {facebookIcon, twitterIcon} from "../../icons"
import "./style.scss"
const Footer = () => {
  return (
    <div className='footer'>
        <div className='contact-icon'>
        <SVG  className='icon' width={24} height={24} src={facebookIcon}></SVG>   
        <SVG className='icon' width={24} height={24} src={twitterIcon}></SVG>   

        </div>
        <div>© 2035 by Shoe Fetish. Powered and secured by Wix</div>
    </div>
  )
}

export default Footer
