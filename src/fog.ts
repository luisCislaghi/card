import * as THREE from "three";

const setUpFog = (scene: THREE.Scene) => {
  const FOG_COLOR = new THREE.Color("hsl(291, 97%, 22%)");
  const FOG_NEAR = 20;
  const FOG_FAR = 110;

  scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);
};

export { setUpFog };
