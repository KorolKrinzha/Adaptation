import React from 'react'


const InstructionsSlider = () => {

  return ( <div className='home-details'>
    
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/instruction_1.png" className="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p className='carousel-instruction'>Откройте сайт lycadaptation.ru на телефоне</p>
        </div>
    </div>
    <div className="carousel-item">
      <img src="/instruction_2.png" className="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p className='carousel-instruction'>Откройте  'Мой аккаунт', чтобы увидеть  баллы</p>
        </div>

    </div>
    <div className="carousel-item">
      <img src="/instruction_3.png" className="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p className='carousel-instruction'>Просканируйте QR-код, полученный на Адаптации</p>
        </div>

    </div>

    <div className="carousel-item">
      <img src="/instruction_4.png" className="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p className='carousel-instruction'>Зарегистрируйтесь</p>
        </div>

    </div>

  </div>
</div>
    </div>

  )
}

export default InstructionsSlider