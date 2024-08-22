function grad(p: [number, number]): [number, number] {
  // Simple hash function to generate a pseudo-random value based on the input coordinates
  function hash(x: number, y: number): number {
    const seed = x * 374761393 + y * 668265263; // Arbitrary large primes
    const result = (seed ^ (seed >> 13)) * 1274126177;
    return (result ^ (result >> 16)) & 0x7fffffff;
  }

  // Generate a pseudo-random angle
  const angle = (hash(p[0], p[1]) * 2.0 * Math.PI) / 0x7fffffff;

  // Convert the angle to a gradient vector
  const gradient: [number, number] = [Math.cos(angle), Math.sin(angle)];
  return gradient;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function dot(v1: [number, number], v2: [number, number]): number {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

//p is between 0 and 1
function noise(p: [number, number]): number {
  const p0: [number, number] = [Math.floor(p[0]), Math.floor(p[1])];
  const p1: [number, number] = [p0[0] + 1.0, p0[1]];
  const p2: [number, number] = [p0[0], p0[1] + 1.0];
  const p3: [number, number] = [p0[0] + 1.0, p0[1] + 1.0];

  const g0 = grad(p0);
  const g1 = grad(p1);
  const g2 = grad(p2);
  const g3 = grad(p3);

  const t0 = p[0] - p0[0];
  const fade_t0 = fade(t0);

  const t1 = p[1] - p0[1];
  const fade_t1 = fade(t1);

  const p0p1 =
    (1.0 - fade_t0) * dot(g0, [p[0] - p0[0], p[1] - p0[1]]) +
    fade_t0 * dot(g1, [p[0] - p1[0], p[1] - p1[1]]);
  const p2p3 =
    (1.0 - fade_t0) * dot(g2, [p[0] - p2[0], p[1] - p2[1]]) +
    fade_t0 * dot(g3, [p[0] - p3[0], p[1] - p3[1]]);

  return (1.0 - fade_t1) * p0p1 + fade_t1 * p2p3;
}

function perlinNoise(
  p: [number, number],
  octaves: number = 8,
  persistence: number = 0.2
): number {
  let total = 0;
  let frequency = 1.8;
  let amplitude = 2;
  let maxValue = 0; // Used for normalizing result to 0.0 - 1.0

  for (let i = 0; i < octaves; i++) {
    total += noise([p[0] * frequency, p[1] * frequency]) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
}

export { noise, perlinNoise };
