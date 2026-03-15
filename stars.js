// THREE.JS STARFIELD — Raj Gupta Portfolio
(function() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x020617, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 600;

  // --- STARS ---
  const starCount = 2500;
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);
  const colors = new Float32Array(starCount * 3);

  const colorOptions = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xa78bfa),
    new THREE.Color(0x67e8f9),
    new THREE.Color(0x818cf8),
  ];

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 2000;
    positions[i3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i3 + 2] = (Math.random() - 0.5) * 2000;
    sizes[i] = Math.random() * 2 + 0.5;

    const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geo, mat);
  scene.add(stars);

  // --- NEBULA PARTICLES (colored clouds) ---
  function createNebula(color, count, spread) {
    const geo2 = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread * 0.5;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 200;
    }
    geo2.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat2 = new THREE.PointsMaterial({
      size: 2.5,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.12,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo2, mat2);
  }

  scene.add(createNebula(0x7c3aed, 300, 1200));
  scene.add(createNebula(0x06b6d4, 200, 900));

  // --- MOUSE PARALLAX ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // --- RESIZE ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- ANIMATE ---
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.0005;

    targetX += (mouseX - targetX) * 0.03;
    targetY += (mouseY - targetY) * 0.03;

    stars.rotation.y = time + targetX * 0.2;
    stars.rotation.x = targetY * 0.1;
    stars.rotation.z = time * 0.3;

    renderer.render(scene, camera);
  }

  animate();
})();
