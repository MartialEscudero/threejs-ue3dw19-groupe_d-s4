import * as THREE from 'three';

import Stats from './stats.module.js';

import { ColladaLoader } from './ColladaLoader.js';

let container, stats, clock;
let camera, scene, renderer, model;

init();
animate();

function init() {

  container = document.getElementById('container');

 // Load collada model
 const loader = new ColladaLoader(loadingManager);
 loader.load('./assets/models/model.dae', function (collada) {
   model = collada.scene;
 });

  renderer.render(scene, camera);

}