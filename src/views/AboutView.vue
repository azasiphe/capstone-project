<template>
    <div>
      <div :class="{ 'menuopen': isMenuOpen }" id="page">
       
        <section id="vision" class="section" >
          
            <div class="content">
            <h1> Our Vision.</h1>
        </div>
            <p>Our vision at Turbo Thrust is to revolutionize the automotive industry by producing high-performance vehicles that redefine speed and luxury.</p>
         
        </section>
        <section id="knowledge" class="section" >
            <p >Our values are rooted in a commitment to excellence, innovation, and integrity. We prioritize customer satisfaction and strive to exceed expectations in every aspect of our business.</p>
            <div class="content2">
            <h1>Our Values.</h1>
        </div>
        
          
        </section>
        <section id="space" class="section" >
          <div class="content3">
            <h1>Team</h1>
        </div>
            <p>Our team at Turbo Thrust consists of passionate individuals dedicated to pushing the boundaries of automotive engineering. With a diverse range of expertise, we collaborate to create cutting-edge vehicles that set new standards in the industry.</p>
         
        </section>
        <section id="future" class="section">
            <p>In the future, we aim to expand our product line and continue to innovate with advanced technologies and sustainable practices. Our goal is to produce top-quality cars that not only deliver exceptional performance but also prioritize environmental responsibility.</p>
            <div class="content4">
            <h1>Future.</h1>
           
          </div>
        </section>
      </div>
    </div>
  </template>
  
  
  
  <style>
  body {
    line-height: 1.6;
    color: #fff;
    background: #000;
    font-size: 18px;
    font-weight: 400;
    font-family: "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica Neue", sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &.stop {
      overflow: hidden;
    }
  }
  #page {
    position: relative;
    transition: 1s all ease-in-out;
    &.menuopen {
      opacity: .6;
      filter: blur(20px);
      transform: scale(1.2);
    }
  }

  .section {
    display: flex;
    min-height: 100vh;
    position: relative;
  }
  .section .content2 {
    flex: 1;
    padding: 50px;
    color: #fff;
    text-shadow: 1px 1px 2px red; 
    background-image:url(https://assets.codepen.io/214624/knowledge.jpg)

  }
  .section .content {
    flex: 1;
    padding: 50px;
    color: #fff;
    text-shadow: 1px 1px 2px red; 
   
background-image:url(https://assets.codepen.io/214624/vision.jpg);
  }
  .section .content3 {
    flex: 1;
    padding: 50px;
    color: #fff;
    text-shadow: 1px 1px 2px red; 
    background-image:url(https://assets.codepen.io/214624/space.jpg);

  }
  .section .content4 {
    flex: 1;
    padding: 50px;
    color: #fff;
    text-shadow: 1px 1px 2px red; 
    background-image:url(https://assets.codepen.io/214624/future.jpg);

  }
  .section h1 {
    font-size: 120px;
    margin: 0;
    position: relative;
    z-index: 2;
  }
  .section p {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 180px;
    text-align: center;
    font-size: 40px; 
    font-style: italic;
    position: relative;
    top: 15px;
    text-shadow: 1px 1px 2px red;
  }
  @media only screen and (max-width: 768px) {
  .section .content,
  .section .content3
   {
    padding: 100px 1px;
    margin-left: -13px;
  }
  .section .content2,
  .section .content4 {
    padding: 150px 1px;
    margin-left: -5px;
  }
  .section p
  {
    padding: 10px 7%;
  }
}
  </style>

  
  
  
  
  
  
  

  
  
  
  
  
  