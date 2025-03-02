import * as THREE from "three";
import { setUpLight } from "./light";
import { getCamera } from "./camera";
import {
  BAD_TV_DEFAULT_PARAMS,
  BAD_TV_DEFAULT_PARAMS_MOBILE,
  badTvEffect,
} from "./badTv";
import { setUpFog } from "./fog";
import { handleCanvasResize } from "./util";
import { drawTerain } from "./terain";
import { drawCard } from "./card";

declare global {
  interface Window {
    isMobile: boolean;
  }
}

//
// CONSTANTS
//
const FPS = 1000 / 60; // 24 fps for aesthetic reasons
//
// SETUP
//
let canvas = document.querySelector("#c") as Element;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // teste
renderer.toneMappingExposure = 1.25; // teste

const camera = getCamera(renderer);

handleCanvasResize(renderer, camera);

setUpFog(scene);
setUpLight(scene);

// TEXTURE
const loader = new THREE.TextureLoader();
const spaceTexture = loader.load("./images/space.jpeg");
scene.background = spaceTexture;

// OBJECTS

drawCard(scene);

drawTerain(scene);

// ANIMATION
// badTV shaders
const { badTVPass, filmPass, staticPass, composer } = badTvEffect(
  scene,
  camera,
  renderer
);

// timer variables
let [elapsed, now, then] = [0, 0, Date.now()];
let shaderTime = 0.0;

function animate() {
  // calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > FPS) {
    // get ready for next frame by setting then=now, but also adjust for your
    // specified FPS not being a multiple of RAF's interval (16.7ms or 60fps)
    then = now - (elapsed % FPS);

    // update objects
    const deltaTime = 0.15;
    shaderTime += deltaTime;

    if (window.isMobile) {
      // badTVPass.uniforms["distortion"].value =
      //   BAD_TV_DEFAULT_PARAMS_MOBILE.distortion * Math.abs(scrollSpeed);
      // badTVPass.uniforms["distortion2"].value =
      //   BAD_TV_DEFAULT_PARAMS_MOBILE.distortion2 * Math.abs(scrollSpeed);
    } else {
      // badTVPass.uniforms["distortion"].value =
      //   BAD_TV_DEFAULT_PARAMS.distortion * Math.abs(scrollSpeed);
      // badTVPass.uniforms["distortion2"].value =
      //   BAD_TV_DEFAULT_PARAMS.distortion2 * Math.abs(scrollSpeed);
    }
    badTVPass.uniforms["time"].value = shaderTime;
    filmPass.uniforms["time"].value = shaderTime;
    staticPass.uniforms["time"].value = shaderTime;

    if (shaderTime > 2 && shaderTime < 3) {
      shaderTime = 0;
      const random = Math.random() * 2;
      // statue.material.uniforms.glitchIntensity.value = 1 + random;
    }
    // if (statue.material.uniforms.glitchIntensity.value > 0 && shaderTime > 1) {
    //   statue.material.uniforms.glitchIntensity.value = 0;
    // }

    composer.render(deltaTime);
  }

  requestAnimationFrame(animate);
}

animate();
