import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Scene Setup

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)

// Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

function addStar() {
	const geometry = new THREE.SphereGeometry(0.05, 24, 24)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100))

	star.position.set(x, y, z)
	scene.add(star)
}

Array(200).fill().forEach(addStar)

// Bg

const spaceTexture = new THREE.TextureLoader().load(
	"assets/digital-transformation.jpg"
)
scene.background = spaceTexture
// Spheres

const sphere1 = new THREE.TextureLoader().load("assets/19333449.jpg")

const sp1 = new THREE.Mesh(
	new THREE.SphereGeometry(10, 32, 32),
	new THREE.MeshStandardMaterial({
		map: sphere1,
	})
)

scene.add(sp1)

const sphere2 = new THREE.TextureLoader().load("assets/digital-dot-circles.jpg")

const sp2 = new THREE.Mesh(
	new THREE.SphereGeometry(33, 32, 32),
	new THREE.MeshBasicMaterial({
		map: sphere2,
	})
)

scene.add(sp2)

sp1.position.z = 30
sp1.position.setX(-20)

sp2.position.z = 5
sp2.position.x = -330

// Torus object

const geometry = new THREE.TorusGeometry(1, 3, 16, 10)
const material = new THREE.MeshStandardMaterial({
	color: 0xf243a3,
	wireframe: true,
})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// Scroll Animation

function moveCamera() {
	const t = document.body.getBoundingClientRect().top
	sp1.rotation.x += 0.005
	sp1.rotation.y += 0.005
	sp1.rotation.z += 0.005

	sp2.rotation.y += 0.01
	sp2.rotation.z += 0.01

	camera.position.z = t * -0.01
	camera.position.x = t * -0.0002
	camera.rotation.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()

// Animation Loop

function animate() {
	requestAnimationFrame(animate)

	torus.rotation.x += 0.005
	torus.rotation.y += 0.005
	torus.rotation.z += 0.005

	sp1.rotation.x += 0.005

	sp2.rotation.x += 0.01
	sp2.rotation.y += 0.01

	renderer.render(scene, camera)
}

animate()
