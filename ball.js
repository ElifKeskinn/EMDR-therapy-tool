const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
const ball = new THREE.Mesh(geometry, material);
ball.castShadow = true;
scene.add(ball);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true; 
scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true; 
light.shadow.mapSize.width = 1024; 
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

let ballSpeed = 0.05;
let ballDirection = 1;
let paused = false;
let soundOn = true;
const ballSound = new Audio('bounce.mp3');

camera.position.z = 5;

function animate() {
    if (!paused) {
        ball.position.x += ballSpeed * ballDirection;
        if (ball.position.x >= 3 || ball.position.x <= -3) {
            ballDirection *= -1;
            if (soundOn) ballSound.play();
        }
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

document.getElementById('color').addEventListener('change', function () {
    const color = this.value;
    material.color.set(color);
});

document.getElementById('speed').addEventListener('input', function () {
    ballSpeed = this.value / 100;
});

document.getElementById('pause').addEventListener('click', function () {
    paused = !paused;
    this.textContent = paused ? 'Resume' : 'Pause';
});

document.getElementById('sound').addEventListener('click', function () {
    soundOn = !soundOn;
    this.textContent = soundOn ? 'Sound Off' : 'Sound On';
});

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
