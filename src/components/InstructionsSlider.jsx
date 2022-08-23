import React from 'react'


const InstructionsSlider = () => {

  return ( <div className='home-details'>
    
    <div id="carouselInstruction" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/instruction_1.png" className="d-block w-100" alt="Лицей НИУ ВШЭ Адаптация Инструкция 1"/>
    </div>
    <div className="carousel-item">
      <img src="/instruction_2.png" className="d-block w-100" alt="Лицей НИУ ВШЭ Адаптация Инструкция 2"/>
    </div>
    <div className="carousel-item">
      <img src="/instruction_3.png" className="d-block w-100" alt="Лицей НИУ ВШЭ Адаптация Инструкция 3"/>
    </div>
    <div className="carousel-item">
      <img src="/instruction_4.png" className="d-block w-100" alt="Лицей НИУ ВШЭ Адаптация Инструкция 4"/>
    </div>

  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselInstruction" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselInstruction" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>

  )
}

export default InstructionsSlider