import * as THREE from "three";

// https://codesandbox.io/s/iridescent-shader-material-l1vdv?file=/src/App.js

function drawCard(scene: THREE.Scene) {
  const cardGeometry = new THREE.BoxGeometry(0.4, 0.05, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00aa00 });

  const material = getShaderMaterial();

  const cube = new THREE.Mesh(cardGeometry, material);
  cube.position.x = 3;
  cube.position.y = 1;
  cube.position.z = 3;
  scene.add(cube);
}

function getShaderMaterial() {
  const textureLoader = new THREE.TextureLoader();

  const opts = {
    red: {
      min: -1,
      max: 1,
      value: 0.3,
    },
    green: {
      min: -1,
      max: 0.1,
      value: 0.2,
    },
    blue: {
      min: -1,
      max: 1,
      value: -0.2,
    },
    shade: {
      min: 3,
      max: 30,
      value: 20,
    },
    // animate: true
  };

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: {
        value: new THREE.Vector3(
          opts.red.value,
          opts.green.value,
          opts.blue.value
        ),
      }, // Color Correction
      uShade: { value: opts.shade.value },
    },
    vertexShader: /*glsl*/ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    } 
  `,
    fragmentShader: /*glsl*/ `
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uShade;
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(vNormal * (sin(vNormal.z * uShade + uTime * 3.) * .5 + .5) + uColor, 1.);
    } 
  `,
  });
  return material;
}
function getMaterial() {
  const textureLoader = new THREE.TextureLoader();

  const clearcoatNormalMap = textureLoader.load("./images/textures/normal.png");

  const diffuse = textureLoader.load("./images/textures/carbon/Carbon.png");
  diffuse.colorSpace = THREE.SRGBColorSpace;
  diffuse.wrapS = THREE.RepeatWrapping;
  diffuse.wrapT = THREE.RepeatWrapping;
  diffuse.repeat.x = 10;
  diffuse.repeat.y = 10;

  const normalMap = textureLoader.load(
    "./images/textures/carbon/Carbon_Normal.png"
  );
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.x = 10;
  normalMap.repeat.y = 10;

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    map: diffuse,
    normalMap: normalMap,
    clearcoatMap: clearcoatNormalMap,
    clearcoatNormalScale: new THREE.Vector2(2.0, -2.0),
  });
  return material;
}

export { drawCard };
