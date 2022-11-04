import './index.css';
import * as THREE from 'three';

// new scene
const scene = new THREE.Scene();

// creates camera, fov of 40, aspect ration is window width divided by window height, near and far set what can be seen

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;

// creates renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// setting up renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// add renderer element to HTML
document.body.appendChild( renderer.domElement );

// create and add lights to the scene

{
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    light.position.set(-1, 2, 4);
    scene.add(light);
}



function createMaterial() {
    const material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});

    const hue = Math.random() * (0.99 - 0.01) + 0.01;
    const saturation = Math.random() * (0.9 - 0.1) + 0.1;
    const luminance = Math.random() * (0.9 - 0.1) + 0.1;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

const shape = new THREE.Mesh(new THREE.DodecahedronGeometry(120), createMaterial());
scene.add(shape);

// helper grid, not needed for final website, helpful for building
//const GridHelper = new THREE.GridHelper(200, 50);
//scene.add(GridHelper);

// recursive animate function so that we continue rendering frames
function animate(){
    // function gets called when browser says it is ready
    window.requestAnimationFrame(animate);

    shape.rotation.x += .001;
    shape.rotation.y += .001;

    // update controls so that you can keep moving camera
    // controls.update();

    // render changes
    renderer.render(scene, camera);
}

requestAnimationFrame(animate);

// starting the recursive function
window.requestAnimationFrame(animate);


