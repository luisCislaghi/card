uniform sampler2D tDiffuse;
uniform float glitchIntensity; // better between 1 and 2.5 or 3 max 
varying vec2 vUv;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv);    
    float segment = floor(uv.y * 20.0); 
    float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
    vec2 offset = vec2(randomValue * 0.1, 0.0) * glitchIntensity;

    vec4 redGlitch = texture2D(tDiffuse, uv + offset);
    vec4 greenGlitch = texture2D(tDiffuse, uv - offset);

    // Scale the random value to the range [0, 4)
    float maxScale = 20.0;
    float scaledRandomValue = randomValue * maxScale;

    // Create conditions for blending
    float mixedGCondition = step(0.0, scaledRandomValue) * step(scaledRandomValue, 1.0);
    float greenGCondition = step(1.0, scaledRandomValue) * step(scaledRandomValue, 2.0);
    float redGCondition = step(2.0, scaledRandomValue) * step(scaledRandomValue, 3.0);
    float noGCondition = step(3.0, scaledRandomValue) * step(scaledRandomValue, maxScale);

    // Blend between the different cases
    vec4 mixedG = vec4(redGlitch.r, greenGlitch.g, baseState.b, max(redGlitch.a, greenGlitch.a));
    vec4 greenG = vec4(baseState.r, greenGlitch.g, baseState.b, max(greenGlitch.a, baseState.a));
    vec4 redG = vec4(redGlitch.r, baseState.g, baseState.b,  max(redGlitch.a, baseState.a)); 
    vec4 noG = baseState;

    gl_FragColor = mixedG * mixedGCondition + greenG * greenGCondition + redG * redGCondition + noG * noGCondition;

    #ifdef USE_FOG
          #ifdef USE_LOGDEPTHBUF_EXT
              float depth = gl_FragDepthEXT / gl_FragCoord.w;
          #else
              float depth = gl_FragCoord.z / gl_FragCoord.w;
          #endif
          float fogFactor = smoothstep( fogNear, fogFar, depth );
          gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
      #endif
}