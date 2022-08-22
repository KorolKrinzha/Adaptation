import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";


const InstructionsSlider = () => {
    const images = [
        { url: "IMG/instruction_1.jpg" },
        { url: "IMG/instruction_2.jpg" },
        { url: "IMG/instruction_3.jpg" },
        { url: "IMG/instruction_4.jpg" },
    ]

  return ( <div className='home-details'>
     <p>Инструкция по использованию сайта</p>
    <div>
      <SimpleImageSlider
        width={723}
        height={912}
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