import * as THREE from "three";
import { ambientLight, light1, light2 } from "./light";
import { getCamera } from "./camera";
import { drawTerain } from "./terain";
import Stats from "three/addons/libs/stats.module.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // teste
renderer.toneMappingExposure = 1.25; // teste
document.body.appendChild(renderer.domElement);
const stats = new Stats();
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();

// LIGHTS
// scene.add(light1);
// scene.add(light2);
scene.add(ambientLight);

// CAMERA
const camera = getCamera(renderer);

// TEXTURE
const loader = new THREE.TextureLoader();
const spaceTexture = loader.load("./images/space.jpeg");
scene.background = spaceTexture;

// OBJECTS

// const cardGeometry = new THREE.BoxGeometry(0.4, 0.05, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
// const cube = new THREE.Mesh(cardGeometry, material);
// scene.add(cube);

drawTerain(scene);

// plane
const planeSize = 40;
const texture = loader.load("./images/checker.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const planeTexture = texture.clone();
const repeats = planeSize / 2;
planeTexture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: planeTexture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -0.5;
scene.add(mesh);

//
//
// ANIMATE
//
//

function animate() {
  stats.update();
  renderer.render(scene, camera);
}
