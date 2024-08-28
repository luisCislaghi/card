import * as THREE from "three";
import { noise, perlinNoise } from "./noise";

function drawTerain(scene: THREE.Scene) {
  // round honeycomb with variable radius, size
  // const perlinNoise = noise2DOctaves(10, 10);
  // console.log(perlinNoise);
  const HEX_RADIUS = 0.2;
  const HEX_HEIGHT = 0.04;
  const HEX_SEGMENTS = 6;
  const HEX_GEOMETRY = new THREE.CylinderGeometry(
    HEX_RADIUS,
    HEX_RADIUS,
    HEX_HEIGHT,
    HEX_SEGMENTS
  );

  const COMB_MATRIX = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const normalize = (x: number, minX: number, maxX: number) =>
    (x - minX) / (maxX - minX);

  const group = new THREE.Group();
  scene.add(group);

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load(
    "./images/textures/sand/GroundSand005_COL_1K.jpg"
  );
  const aoMap = textureLoader.load(
    "./images/textures/sand/GroundSand005_AO_1K.jpg"
  );
  const normalMap = textureLoader.load(
    "./images/textures/sand/GroundSand005_NRM_1K.jpg"
  );
  const bumpMap = textureLoader.load(
    "./images/textures/sand/GroundSand005_BUMP_1K.jpg"
  );
  const glossMap = textureLoader.load(
    "./images/textures/sand/GroundSand005_GLOSS_1K.jpg"
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  aoMap.colorSpace = THREE.SRGBColorSpace;
  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;
  normalMap.colorSpace = THREE.SRGBColorSpace;
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  bumpMap.colorSpace = THREE.SRGBColorSpace;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  glossMap.colorSpace = THREE.SRGBColorSpace;
  glossMap.wrapS = THREE.RepeatWrapping;
  glossMap.wrapT = THREE.RepeatWrapping;

  let material = new THREE.MeshPhysicalMaterial({
    // metalness: 0.2,
    // roughness: 0.5,
    map: texture,
    normalMap: normalMap,
    aoMap: aoMap,
    aoMapIntensity: 1,
    bumpMap: bumpMap,
    bumpScale: 1,
    clearcoatMap: glossMap,
    // clearcoat: 0.1,
  });

  //
  //
  // TESTE CARBON TEXTURE
  //
  //

  // const clearcoatNormalMap = textureLoader.load("./images/textures/normal.png");

  // const diffuse = textureLoader.load("./images/textures/carbon/Carbon.png");
  // diffuse.colorSpace = THREE.SRGBColorSpace;
  // diffuse.wrapS = THREE.RepeatWrapping;
  // diffuse.wrapT = THREE.RepeatWrapping;
  // diffuse.repeat.x = 10;
  // diffuse.repeat.y = 10;

  // const normalMap = textureLoader.load(
  //   "./images/textures/carbon/Carbon_Normal.png"
  // );
  // normalMap.wrapS = THREE.RepeatWrapping;
  // normalMap.wrapT = THREE.RepeatWrapping;
  // normalMap.repeat.x = 10;
  // normalMap.repeat.y = 10;

  // const material = new THREE.MeshPhysicalMaterial({
  //   roughness: 0.5,
  //   clearcoat: 1.0,
  //   clearcoatRoughness: 0.1,
  //   map: diffuse,
  //   normalMap: normalMap,
  //   clearcoatMap: clearcoatNormalMap,
  //   clearcoatNormalScale: new THREE.Vector2(2.0, -2.0),
  // });

  //
  //
  // TESTE CARBON TEXTURE
  //
  //

  // if is odd row, offset by half a hexagon
  // if is even row, offset by 0
  // use red material if comb_matrix is 1 else use green material
  for (let i = 0; i < COMB_MATRIX.length; i++) {
    for (let j = 0; j < COMB_MATRIX[i].length; j++) {
      const noiseValue = noise([
        normalize(i, 0, COMB_MATRIX.length),
        normalize(j, 0, COMB_MATRIX[i].length),
      ]);
      const normalizedNoiseValue = normalize(
        noise([
          normalize(i, 0, COMB_MATRIX.length),
          normalize(j, 0, COMB_MATRIX[i].length),
        ]),
        -1,
        1
      );
      const perlinNoiseValue = perlinNoise([
        normalize(i, 0, COMB_MATRIX.length),
        normalize(j, 0, COMB_MATRIX[i].length),
      ]);

      // const noiseAsLuminosity = 50 + Math.floor(perlinNoiseValue * 100);

      // const HEX_MATERIAL = new THREE.MeshPhongMaterial({
      //   color: new THREE.Color(`hsl(142, 72%, ${noiseAsLuminosity}%)`),
      // });
      // const HEX_MATERIAL_RED = new THREE.MeshPhongMaterial({
      //   color: new THREE.Color(`hsl(0, 75%, ${noiseAsLuminosity}%)`),
      // });

      let hex = new THREE.Mesh(HEX_GEOMETRY, material);

      hex.position.x =
        j * (HEX_RADIUS * Math.sqrt(3)) +
        (i % 2) * (HEX_RADIUS * (Math.sqrt(3) / 2));
      hex.position.z = i * HEX_RADIUS * 1.5;
      // set height based on perlin noise

      // console.log(noiseValue, " - ", perlinNoiseValue);
      hex.scale.y = perlinNoiseValue * 100 + 10;
      group.add(hex);
    }
  }
}

export { drawTerain };
