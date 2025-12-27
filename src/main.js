import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
import vertexShader from "./shaders/fireworks/vertex.glsl";
import fragmentShader from "./shaders/fireworks/fragment.glsl";

/**
 * Base
 */
const gui = new GUI();
const canvas = document.querySelector("#canvas");
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const textures = [
  textureLoader.load("./circle.png"),
  textureLoader.load("../assets/circle_01.png"),
  textureLoader.load("../assets/circle_02.png"),
  textureLoader.load("../assets/light_01.png"),
  textureLoader.load("../assets/magic_02.png"),
  textureLoader.load("../assets/star_05.png"),
  textureLoader.load("../assets/star_07.png"),
  textureLoader.load("../assets/symbol_01.png"),
  textureLoader.load("../assets/symbol_02.png"),
];

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

sizes.resolution = new THREE.Vector2(
  sizes.width * sizes.pixelRatio,
  sizes.height * sizes.pixelRatio
);

//createFirecracker
const createFirework = (count, position, size, texture) => {
  const positionArray = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positionArray[i3 + 0] = Math.random() - 0.5;
    positionArray[i3 + 1] = Math.random() - 0.5;
    positionArray[i3 + 2] = Math.random() - 0.5;
  }
  texture.flipY = false;
  /**
   * Object
   */
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,

    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  scene.add(firework);

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
};

const test = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: "#fff" })
);
scene.add(test);

// Debug
// gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("elevation");

// createFirework calling
createFirework(100, new THREE.Vector3(), 50.0, textures[1]);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.resolution.set(
    sizes.width * sizes.pixelRatio,
    sizes.height * sizes.pixelRatio
  );

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
