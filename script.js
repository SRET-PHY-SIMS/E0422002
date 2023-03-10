let scene;
let camera;
let renderer;

function setup() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupParticles();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(70, res, 1, 10000);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupParticles() {
  let geometry = new THREE.Geometry();
  let len = 1000000;
  addLorenzVertices(geometry, len);
  let color = new THREE.Color(0xbb00ff);
  for (let i = 0; i < len; i++) {
    geometry.colors.push(color);
  }
  let material = new THREE.PointsMaterial({ size: 1, vertexColors: THREE.VertexColors, depthTest: false, opacity: 0.3, sizeAttenuation: false, transparent: true });
  let mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function addLorenzVertices(geometry, len) {
  let x0 = 0.1;
  let y0 = 0;
  let z0 = 0;
  let x1, y1, z1;
  let h = 0.001;
  let a = 10.0;
  let b = 28.0;
  let c = 8.0 / 3.0;

  for (let i = 0; i < len; i++) {
    x1 = x0 + h * a * (y0 - x0);
    y1 = y0 + h * (x0 * (b - z0) - y0);
    z1 = z0 + h * (x0 * y0 - c * z0);
    x0 = x1;
    y0 = y1;
    z0 = z1;
    let vertex = new THREE.Vector3(
    x0,
    y0,
    z0 - 24);
    geometry.vertices.push(vertex);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function movePosition(position, phase) {
  let r = 40;
  let θ = new Date() * 0.0005 + 10;
  let φ = new Date() * 0.0005;
  let x = r * Math.sin(φ + phase) * Math.cos(θ + phase);
  let y = r * Math.sin(φ + phase) * Math.sin(θ + phase);
  let z = r * Math.cos(φ + phase);
  position.set(x, y, z);
}

function draw() {
  movePosition(camera.position, 0);
  camera.lookAt(scene.position);
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
}

setup();
draw();