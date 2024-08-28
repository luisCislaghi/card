import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function getCamera(renderer: THREE.WebGLRenderer) {
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.position.set(2, 2, 2);
  camera.rotation.y = Math.PI / 2;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(4, 0, 4);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  return camera;
}

export { getCamera };
