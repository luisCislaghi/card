import * as THREE from "three";
import { noise, perlinNoise } from "./noise";

function drawTerain(scene: THREE.Scene) {
  // round honeycomb with variable radius, size
  // const perlinNoise = noise2DOctaves(10, 10);
  // console.log(perlinNoise);
  const HEX_RADIUS = 0.5;
  const HEX_HEIGHT = 0.1;
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
  const texture = textureLoader.load("./images/uv.png");
  // const texture = textureLoader.load(
  //   "./images/textures/sand/GroundSand005_COL_1K.jpg"
  // );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // texture.magFilter = THREE.NearestFilter;
  // texture.colorSpace = THREE.SRGBColorSpace;
  console.log(texture);
  let material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  // let material = new THREE.MeshPhysicalMaterial({
  //   metalness: 0.0,
  //   roughness: 0.3,
  //   clearcoat: 1.0,
  //   normalMap: texture,

  //   // clearcoatNormalMap: clearcoatNormalMap,
  //   //// y scale is negated to compensate for normal map handedness.
  //   // clearcoatNormalScale: new THREE.Vector2(2.0, -2.0),
  // });

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
