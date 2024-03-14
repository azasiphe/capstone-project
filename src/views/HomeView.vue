
<template>
  <div class="page-container">
    <h1 font-size="50">Turbo Thrust Autos</h1>
    <h1 class="h1">Welcome to Turbo Thrust Autos your<br> destination for high-performance sports cars<br> curated with precision and passion.
      <br> Embark on an exhilarating journey today.</h1>
    <div class="content">
     
      <div class="car-icon"  alt="car icon">
        <img src="https://i.postimg.cc/FHQryB1t/th-3-removebg-preview.png">
        </div>
    </div>
    <div class="bottom-container">
      <div class="bottom-item">
        <div class="content-container">
          <i id="ico"  class="bi bi-speedometer2"></i>
          <span>Top Speed</span>
          <p>+250 <br>km/h</p>
        </div>
      </div>
      <div class="bottom-item">
        <div class="content-container">
          <i id="ico"  class="bi bi-gear-fill"></i> 
          <span>Engine</span>
          <p>3.0L <br>V6</p>
        </div>
      </div>
      <div class="bottom-item">
        <div class="content-container">
          <i  id="ico" class="bi bi-arrow-up-left-circle-fill"></i>
          <span>Transmission</span>
          <p>8-speed <br> Automatic</p>
        </div>
      </div>
    </div>
    </div>
 
    <div>
      
      <h2>*features we have*</h2>
      <video controls width="1500" height="520">
      <source src="https://streamable.com/aeg559" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    </div>
  
</template>

<style scoped>
.page-container {
  position: relative;
}
img{
  width: 160%;
  position: relative;
  bottom: 250px;
}
.content {
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 35%;

}

.car-icon {
  width: 300px;
  animation: rotateCar 10s linear infinite; 
}

@keyframes rotateCar {
  0% {
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(5deg);
  }
}
h1{
  text-align: left;
  font-weight: bolder;
position: relative;
top: 90px;

  color: aliceblue;

  text-shadow: blue 3px 4px 2px;

  margin: 0 0 0 3%;
  
}
h2{
  text-align: center;
  text-decoration: underline;
  font-weight: bolder;
position: relative;
bottom: 80px;
font-size: 80px;
  color: aliceblue;

  text-shadow: red 3px 4px 15px;

  margin: 0 0 0 3%;
  
}

.h1{
  text-align: left;
  font-weight: lighter;
position: relative;
top: 120px;
  color: white;
  margin: 0 0 0 4%;
  
}
.bottom-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  bottom: 130px;
  width:80%;
  margin: 0 0 0 10%;
}

span {
  color: lightskyblue;
  font-size: 23px;
}
p{
  font-size: large;
font-weight: bolder;
}
.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  background-color: gray;
  padding: 10px;
  width: 80%;
  border-radius: 50px;
}

.bottom-item i {
  font-size: 45px; 
  color: blue;
  
  background-color: gray;
}
i{
  margin-right: 20px;

}
.content-container {
  text-align: center;
}
</style>

