// 首页3D预览
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('preview-canvas');
    if (!container) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0e6d3);
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        75, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // 创建书法平面
    const geometry = new THREE.PlaneGeometry(4, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x8a3324,
        shininess: 30,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    
    // 添加卷轴
    const scrollGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4.5, 32);
    const scrollMaterial = new THREE.MeshPhongMaterial({ color: 0xd4b36a });
    const topScroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    topScroll.position.y = 1.8;
    topScroll.rotation.x = Math.PI/2;
    scene.add(topScroll);
    
    const bottomScroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    bottomScroll.position.y = -1.8;
    bottomScroll.rotation.x = Math.PI/2;
    scene.add(bottomScroll);
    
    // 动画循环
    const animate = function() {
        requestAnimationFrame(animate);
        
        plane.rotation.y += 0.005;
        topScroll.rotation.z += 0.01;
        bottomScroll.rotation.z += 0.01;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // 响应式调整
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});