import * as THREE from "three";

export function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export function handleCanvasResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) {
  window.isMobile = window.innerWidth <= 768;
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect =
      renderer.domElement.clientWidth / renderer.domElement.clientHeight;
    camera.updateProjectionMatrix();
    camera.viewport;
  }
}
