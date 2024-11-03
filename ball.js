// Create a new 3D scene
const scene = new THREE.Scene();

// Set up the camera with a field of view of 75 degrees, aspect ratio based on window size, 
// and clipping planes at 0.1 and 1000 units from the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create the WebGL renderer and set its size to the size of the window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement); 

// Create a sphere geometry for the ball
const geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
const ball = new THREE.Mesh(geometry, material);
ball.castShadow = true; 
scene.add(ball); 

// Create a plane to act as the ground
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; 
plane.position.y = -1; 
plane.receiveShadow = true; 
scene.add(plane); 

// Set up a directional light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5); 
light.castShadow = true; 
light.shadow.mapSize.width = 1024; 
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500; 
scene.add(light); 

// Variables for ball speed, direction, pause state, and sound state
let ballSpeed = 0.05;
let ballDirection = 1;
let paused = false;
let soundOn = true;

// Load the sound file for the bouncing sound
const ballSound = new Audio('bounce.mp3');

// Set the camera position
camera.position.z = 5;

// Animation loop
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
animate(); // Start the animation loop

// Event listener for color change
document.getElementById('color').addEventListener('change', function () {
    const color = this.value;
    material.color.set(color);
});

// Event listener for speed change
document.getElementById('speed').addEventListener('input', function () {
    ballSpeed = this.value / 100;
});

// Event listener for pause/resume
document.getElementById('pause').addEventListener('click', function () {
    paused = !paused; // Toggle pause state
    this.textContent = paused ? 'Resume' : 'Pause'; 
});

// Event listener for sound on/off
document.getElementById('sound').addEventListener('click', function () {
    soundOn = !soundOn; // Toggle sound state
    this.textContent = soundOn ? 'Sound Off' : 'Sound On'; 
});

// Event listener for window resize
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(window.innerWidth, window.innerHeight); 
});
