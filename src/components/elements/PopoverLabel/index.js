import React from 'react'
import style from './style.module.css'


const PopoverLabel = (props)=>{
  let { label , children , placement='top-start' } = props;
  
  if( typeof label === 'string' && label.length > 0 ){
    return (
      <div className={style["cp-popover-label"]}>
        { children || <React.Fragment></React.Fragment> }
        <div className={`${style["cp-popover-label-div"]} ${style[`cp-popover-label-${placement}`]}`}>
          <div></div>
          <p>{label}</p>
        </div>
      </div>
    )
  } else {
    return children || <React.Fragment></React.Fragment> 
  }
}

{/* <PopoverLabel label='this payment is succcess'>
  <p>Success</p>
</PopoverLabel> */}

export default PopoverLabel