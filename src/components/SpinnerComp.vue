<template>
    <div class="spinner-container">
      <div class="car-spinner"></div>
    </div>
  </template>
  
  <style>
  .spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .car-spinner {
    width: 50px;
    height: 30px;
    background-color: transparent;
    position: relative;
  }
  
  .car-spinner::before,
  .car-spinner::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #333;
  }
  
  .car-spinner::before {
    left: 0;
    animation: carMove 1s infinite;
  }
  
  .car-spinner::after {
    right: 0;
    animation: carMove 1s infinite reverse;
  }
  
  @keyframes carMove {
    0% {
      transform: translateX(-50px);
    }
    100% {
      transform: translateX(100%);
    }
  }
  </style>