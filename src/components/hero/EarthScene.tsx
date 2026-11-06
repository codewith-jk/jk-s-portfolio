"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// EARTH SURFACE SHADER
// ============================================

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const earthFragmentShader = `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 sunDirection = normalize(uSunDirection);

    float sunlight = dot(normal, sunDirection);
    float dayFactor = smoothstep(-0.035, 0.15, sunlight);

    vec3 dayColor = texture2D(uDayMap, vUv).rgb;
    vec3 nightColor = texture2D(uNightMap, vUv).rgb;

    float gray = dot(dayColor, vec3(0.299, 0.587, 0.114));
    dayColor = mix(vec3(gray), dayColor, 0.88);
    dayColor *= 1.07;
    dayColor = pow(max(dayColor, vec3(0.0)), vec3(0.94));

    float lightValue = max(
      max(nightColor.r, nightColor.g),
      nightColor.b
    );

    float cityMask = smoothstep(0.018, 0.10, lightValue);
    vec3 cityLights = nightColor * cityMask * 3.5;

    vec3 finalColor = mix(cityLights, dayColor, dayFactor);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// ============================================
// CLOUD SHADER
// ============================================

const cloudVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const cloudFragmentShader = `
  uniform sampler2D uCloudMap;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 sunDirection = normalize(uSunDirection);

    float sunlight = dot(normal, sunDirection);
    float dayVisibility = smoothstep(-0.025, 0.22, sunlight);

    float cloudValue = texture2D(uCloudMap, vUv).r;
    float cloudMask = smoothstep(0.42, 0.76, cloudValue);

    float alpha = cloudMask * dayVisibility * 0.34;

    gl_FragColor = vec4(vec3(0.90, 0.94, 1.0), alpha);
  }
`;

// ============================================
// EARTH MODEL
// ============================================

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Group>(null);

  const [dayMap, nightMap, cloudMap] = useTexture([
    "/textures/8k_earth_daymap.jpg",
    "/textures/8k_earth_nightmap.jpg",
    "/textures/8k_earth_clouds.jpg",
  ]);

  // Configure textures once
  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
    cloudMap.colorSpace = THREE.NoColorSpace;

    [dayMap, nightMap, cloudMap].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.anisotropy = 2;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
    });

    return true;
  }, [dayMap, nightMap, cloudMap]);

  const sunDirection = useMemo(
    () => new THREE.Vector3(-0.95, 0.04, 0.12).normalize(),
    []
  );

  const earthUniforms = useMemo(
    () => ({
      uDayMap: { value: dayMap },
      uNightMap: { value: nightMap },
      uSunDirection: { value: sunDirection },
    }),
    [dayMap, nightMap, sunDirection]
  );

  const cloudUniforms = useMemo(
    () => ({
      uCloudMap: { value: cloudMap },
      uSunDirection: { value: sunDirection },
    }),
    [cloudMap, sunDirection]
  );

  // Smooth, frame-rate independent rotation
  useFrame((_, delta) => {
    // Prevent large rotation jumps after a delayed frame
    const safeDelta = Math.min(delta, 0.033);

    if (earthRef.current) {
      earthRef.current.rotation.y += safeDelta * 0.030;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y += safeDelta * 0.005;
    }
  });

  return (
    <group
      ref={earthRef}
      scale={1.05}
      position={[-0.05, 0, 0]}
    >
      {/* EARTH SURFACE */}
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />

        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={earthUniforms}
          toneMapped={true}
        />
      </mesh>

      {/* INDEPENDENT CLOUD LAYER */}
      <group ref={cloudRef}>
        <mesh scale={1.006}>
          <sphereGeometry args={[1, 64, 64]} />

          <shaderMaterial
            vertexShader={cloudVertexShader}
            fragmentShader={cloudFragmentShader}
            uniforms={cloudUniforms}
            transparent
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// ============================================
// SPACE BACKGROUND
// ============================================

function SpaceScene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />

      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </>
  );
}

// ============================================
// MAIN EARTH COMPONENT
// ============================================

export default function EarthScene() {
  return (
    <div className="earth-canvas">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        camera={{
          position: [0, 0, 3.25],
          fov: 42,
        }}
      >
        <SpaceScene />
      </Canvas>
    </div>
  );
}