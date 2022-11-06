<template>
  <div class="fs">
    <div id="fly-in">
      <div><span>FINALFANTASY XIV</span>PlayerDetect</div>
      <div><span>made by</span>TsupataProduction</div>
    </div>
  </div>
</template>

<style scoped>
.fs{
  height:100vh;
  width: 100%;
  z-index: 10000;
  position: absolute;
  top: 0px;
  left:0px;
  background-image: radial-gradient(#333, #111);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #fff;
  text-align: center;
  width: 100vw;
  font-weight: 700;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  animation-fill-mode: forwards;
  animation-name: toggle;
  animation-duration: 2s;
  animation-delay:8.5s;

}
#fly-in {
  font-size: 4em;
  margin: 40vh auto;
  height: 20vh;
  text-transform: uppercase;
}

#fly-in span {
  display: block;
  font-size: .4em;
  opacity: .8;
}

#fly-in div {
  position: fixed;
  margin: 2vh 0;
  opacity: 0;
  left: 10vw;
  width: 80vw;
  animation: switch 32s linear;
}

#fly-in div:nth-child(2) {
  animation-delay: 4s
}


@keyframes switch {
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: scale(12)
  }

  3% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1)
  }

  10% {
    opacity: 1;
    filter: blur(0);
    transform: scale(.9)
  }

  13% {
    opacity: 0;
    filter: blur(10px);
    transform: scale(.1)
  }

  80% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}
@keyframes toggle {
  100%{
    opacity: 0;
    background: radial-gradient(rgb(128, 128, 128), #111);
    z-index: -100;
  }
}
</style>  

