import * as THREE from 'three';

import Stats from './stats.module.js';

import { ColladaLoader } from './ColladaLoader.js';

let container, stats, clock;
let camera, scene, renderer, tower, f22;

init();
animate();

function init() {

  container = document.getElementById('container');
  // Camera initialization
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(300, 100, 100);
  camera.lookAt(0, 0, 1);

  // Scene initialization with fog and background image
  scene = new THREE.Scene();

  clock = new THREE.Clock();

  // loading manager
  const loadingManager = new THREE.LoadingManager(function () {

    scene.add(tower);
    scene.add(f22);

  });

  // Load collada tower
  const loader = new ColladaLoader(loadingManager);
  loader.load('./assets/models/tower.dae', function (collada) {

    tower = collada.scene;

  });

  loader.load('./assets/models/f22.dae', function (collada) {

    f22 = collada.scene;

  });

  // Add light to the scene
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 0).normalize();
  scene.add(directionalLight);

  // Render option
  renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Show fps counter
  stats = new Stats();
  container.appendChild(stats.dom);


  // Recalculate width and height en window resize
  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {

  renderer.render(scene, camera);

}