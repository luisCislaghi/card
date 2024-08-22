import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100
);
camera.position.set(5, 2, 8);

const sphere = new THREE.SphereGeometry(0.1, 16, 8);
// const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(1, 1, 1).normalize();
// scene.add(light);

//lights

let light1 = new THREE.PointLight(0xffffff, 1, 300);
light1.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }))
);
light1.position.set(5, 5, 5).normalize();
scene.add(light1);

// fractal perlin noise
//https://www.youtube.com/watch?v=gsJHzBTPG0Y

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const cardGeometry = new THREE.BoxGeometry(0.4, 0.05, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
const cube = new THREE.Mesh(cardGeometry, material);

const planeSize = 40;

const loader = new THREE.TextureLoader();
const texture = loader.load("./images/checker.png");
console.log(texture);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -0.5;
scene.add(mesh);

// camera.position.z = 300;

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
