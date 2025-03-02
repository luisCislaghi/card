import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const CAMERA_DISTANCE = 100;

function getCamera(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const size = new THREE.Vector2();
  renderer.getSize(size);
  const width = size.width;
  const height = size.height;

  const camera = new THREE.PerspectiveCamera(86, width / height, 0.005, 100);
  camera.position.set(2, 2, 2);
  camera.rotation.y = Math.PI / 2;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  return camera;
}

export { getCamera, CAMERA_DISTANCE };
