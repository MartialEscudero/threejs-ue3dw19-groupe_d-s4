import * as THREE from 'three';

import Stats from './stats.module.js';

import { ColladaLoader } from './ColladaLoader.js';

let container, stats, clock, camera, scene, renderer, tower, f22;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

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
    tower.name = 'tower';
    tower.link = 'https://fr.wikipedia.org/wiki/Tower';

  });

  loader.load('./assets/models/f22.dae', function (collada) {

    f22 = collada.scene;
    f22.name = 'f22';
    f22.link = 'https://fr.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor';

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

  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('click', onClick);

}

function onPointerMove(event) {

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y =- (event.clientY / window.innerHeight) * 2 + 1;

}

// Add click on objects
function onClick() {

  raycaster.setFromCamera(pointer, camera);
  
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    if (!intersects[0].object.parent.parent.parent.link) {
      window.open(intersects[0].object.parent.parent.parent.parent.link)
    } else {
      window.open(intersects[0].object.parent.parent.parent.link)
    }
  }
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  f22.rotation.z += 0.012;

  render();
  stats.update();

}

function render() {

  renderer.render(scene, camera);

}