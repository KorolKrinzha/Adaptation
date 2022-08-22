import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";


const InstructionsSlider = () => {
    const images = [
        { url: "/instruction_1.jpg" },
        { url: '/instruction_2.jpg' },
        { url: "/instruction_3.jpg" },
        { url: "/instruction_4.jpg" },
    ]

  return ( <div className='home-details'>
     <p>Инструкция по использованию сайта</p>
    <div className='image-slider'>
      <SimpleImageSlider
        width={400}
        height={500}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        bgColor='#000000'
        
        
      />
    </div>
    </div>

  )
}

export default InstructionsSlider