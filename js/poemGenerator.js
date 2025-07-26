document.addEventListener('DOMContentLoaded', function() {
    const canvasContainer = document.getElementById('poem-canvas');
    const poemSelect = document.getElementById('poem-select');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const poemInfo = document.getElementById('poem-info-panel');
    
    let scene, camera, renderer;
    let calligraphyMesh = null;
    
    // 初始化场景
    function initScene() {
        // 创建场景
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0e6d3);
        
        // 创建相机
        camera = new THREE.PerspectiveCamera(
            75, 
            canvasContainer.clientWidth / canvasContainer.clientHeight, 
            0.1, 
            1000
        );
        camera.position.z = 15;
        
        // 创建渲染器
        renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        
        // 清除占位内容
        canvasContainer.innerHTML = '';
        canvasContainer.appendChild(renderer.domElement);
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // 启动动画循环
        animate();
    }
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        if (calligraphyMesh) {
            calligraphyMesh.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
    }
    
    // 生成书法展示
    function generateCalligraphy() {
        // 清除现有书法
        if (calligraphyMesh) {
            scene.remove(calligraphyMesh);
        }
        
        // 创建纹理
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;
        
        // 背景
        ctx.fillStyle = '#f8f3e6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 书法文字
        ctx.fillStyle = '#8a3324';
        ctx.font = 'bold 120px "Noto Serif SC"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const poems = [
            "敦煌月", 
            "飞天赋", 
            "九色鹿", 
            "阳关曲"
        ];
        
        const selectedPoem = poemSelect.value;
        const poemText = selectedPoem ? poems[selectedPoem-1] : "敦煌诗壁";
        
        ctx.fillText(poemText, canvas.width/2, canvas.height/2);
        
        // 添加印章
        ctx.fillStyle = '#8a3324';
        ctx.font = 'bold 24px "Noto Serif SC"';
        ctx.fillText("敦煌", canvas.width/2 + 150, canvas.height/2 + 150);
        ctx.strokeStyle = '#8a3324';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 + 120, canvas.height/2 + 120, 60, 60);
        
        // 创建纹理
        const texture = new THREE.CanvasTexture(canvas);
        
        // 创建书法平面
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshPhongMaterial({ 
            map: texture,
            side: THREE.DoubleSide,
            shininess: 30
        });
        
        calligraphyMesh = new THREE.Mesh(geometry, material);
        scene.add(calligraphyMesh);
        
        // 更新诗歌信息
        updatePoemInfo(selectedPoem);
    }
    
    // 更新诗歌信息
    function updatePoemInfo(poemId) {
        const poems = [
            { 
                title: "敦煌月", 
                author: "李白", 
                content: "敦煌月，照天涯。\n沙海茫茫夜未央。\n驼铃声碎寒星落，\n万里孤城雁影长。\n\n玉门关外风烟起，\n胡杨树下梦魂香。\n今宵且醉葡萄酒，\n明日征途又远方。",
                background: "此诗描绘了敦煌月夜的壮美景象，表达了诗人对丝绸之路的无限遐想和对远方征途的豪情壮志。"
            },
            { 
                title: "飞天赋", 
                author: "王维", 
                content: "飞天舞袖云中仙，\n琵琶反弹月下弦。\n霓裳羽衣随风转，\n佛国净土现人间。\n\n莫高窟里千年梦，\n壁画生辉照大千。\n今朝再续敦煌韵，\n丝路新声万里传。",
                background: "本诗以敦煌飞天为主题，描绘了壁画中飞天的优美姿态，展现了敦煌艺术的永恒魅力。"
            },
            { 
                title: "九色鹿", 
                author: "白居易", 
                content: "九色神鹿出敦煌，\n祥云瑞霭绕山岗。\n慈悲救难传佳话，\n佛光普照世无双。\n\n莫高故事千年颂，\n壁画传奇万古扬。\n今人再绘新图卷，\n丝路文明永流芳。",
                background: "这首诗取材于敦煌壁画中的九色鹿故事，歌颂了善良与慈悲的永恒价值。"
            },
            { 
                title: "阳关曲", 
                author: "王之涣", 
                content: "阳关三叠泪沾巾，\n故友西辞入胡尘。\n大漠孤烟连朔漠，\n长河落日映金轮。\n\n驼铃古道沙如雪，\n羌笛边城月似银。\n劝君再尽一杯酒，\n此去天涯无故人。",
                background: "本诗以阳关送别为主题，描绘了古代丝绸之路上的离别场景，抒发了深沉的离愁别绪。"
            }
        ];
        
        const poem = poems[poemId-1] || {
            title: "敦煌诗壁",
            author: "数字艺术",
            content: "请选择一首诗",
            background: ""
        };
        
        poemInfo.querySelector('.info-content').innerHTML = `
            <h4>${poem.title}</h4>
            <p><strong>作者：</strong>${poem.author}</p>
            <p><strong>创作背景：</strong>${poem.background}</p>
            <div class="poem-text">
                <pre>${poem.content}</pre>
            </div>
        `;
    }
    
    // 下载作品
    function downloadPoem() {
        if (!calligraphyMesh) {
            alert('请先生成诗笺');
            return;
        }
        
        // 创建虚拟链接下载
        const link = document.createElement('a');
        link.href = renderer.domElement.toDataURL('image/png');
        link.download = 'dunhuang-poem.png';
        link.click();
    }
    
    // 重置场景
    function resetScene() {
        // 清除场景
        while(scene.children.length > 0) { 
            scene.remove(scene.children[0]); 
        }
        
        // 重新初始化
        initScene();
        poemSelect.selectedIndex = 0;
        
        // 重置信息面板
        poemInfo.querySelector('.info-content').innerHTML = 
            '<p>选择诗歌后，赏析内容将显示在这里...</p>';
    }
    
    // 填充诗歌选择器
    function populatePoemSelector() {
        const poems = [
            { id: 1, title: "敦煌月", author: "李白" },
            { id: 2, title: "飞天赋", author: "王维" },
            { id: 3, title: "九色鹿", author: "白居易" },
            { id: 4, title: "阳关曲", author: "王之涣" }
        ];
        
        poems.forEach(poem => {
            const option = document.createElement('option');
            option.value = poem.id;
            option.textContent = `${poem.title} - ${poem.author}`;
            poemSelect.appendChild(option);
        });
    }
    
    // 事件监听
    generateBtn.addEventListener('click', generateCalligraphy);
    downloadBtn.addEventListener('click', downloadPoem);
    resetBtn.addEventListener('click', resetScene);
    
    // 初始化
    initScene();
    populatePoemSelector();
});

class EnhancedPoemGenerator extends PoemGenerator {
  constructor() {
    super();
    this.addEnhancedEffects();
  }

  addEnhancedEffects() {
    // 添加环境光遮蔽和更柔和的光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // 添加更自然的主光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // 添加补光
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -5, -5);
    this.scene.add(fillLight);

    // 添加体积光效果
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6);
    this.scene.add(hemiLight);

    // 添加雾效
    this.scene.fog = new THREE.FogExp2(0xf0e6d3, 0.02);
  }

  loadCalligraphyTexture() {
    if (!this.currentPoemData || !this.currentPoemData.calligraphy) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      this.currentPoemData.calligraphy,
      texture => {
        if (this.calligraphyMesh) this.scene.remove(this.calligraphyMesh);

        // 使用更精致的材质
        const geometry = new THREE.PlaneGeometry(8, 6, 32, 32);
        
        // 添加法线贴图增强立体感
        const normalMap = this.generateNormalMap(texture);
        
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          normalMap: normalMap,
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide
        });

        this.calligraphyMesh = new THREE.Mesh(geometry, material);
        this.calligraphyMesh.castShadow = true;
        this.calligraphyMesh.receiveShadow = true;
        this.scene.add(this.calligraphyMesh);

        // 更流畅的入场动画
        this.calligraphyMesh.position.y = -10;
        this.calligraphyMesh.rotation.x = -Math.PI / 4;
        
        new TWEEN.Tween(this.calligraphyMesh.position)
          .to({ y: 0 }, 1800)
          .easing(TWEEN.Easing.Elastic.Out)
          .start();
          
        new TWEEN.Tween(this.calligraphyMesh.rotation)
          .to({ x: 0 }, 1500)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      },
      undefined,
      error => console.error('加载书法纹理失败:', error)
    );
  }

  generateNormalMap(texture) {
    // 创建一个简单的法线贴图增强立体感
    const canvas = document.createElement('canvas');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(texture.image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const normalData = new Uint8Array(imageData.data.length);
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      
      // 简单的高度计算
      const height = (r + g + b) / 765; // 0-1范围
      
      // 转换为法线向量
      normalData[i] = 128 + height * 128;
      normalData[i + 1] = 128 + height * 128;
      normalData[i + 2] = 255;
      normalData[i + 3] = 255;
    }
    
    const normalTexture = new THREE.DataTexture(
      normalData,
      canvas.width,
      canvas.height,
      THREE.RGBAFormat
    );
    normalTexture.needsUpdate = true;
    
    return normalTexture;
  }

  applyFrameStyle() {
    if (this.frameMesh) this.scene.remove(this.frameMesh);

    const style = this.styleSelect.value;
    const color = new THREE.Color(this.frameColor.value);

    let frameGeometry;
    let frameMaterial;

    switch (style) {
      case 'silk':
        frameGeometry = new THREE.BoxGeometry(9, 7, 0.5, 32, 32);
        frameMaterial = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.4,
          metalness: 0.2
        });
        break;
        
      case 'stele':
        frameGeometry = new THREE.BoxGeometry(10, 8, 1, 32, 32);
        // 添加石材质感
        frameMaterial = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.8,
          metalness: 0.05,
          bumpScale: 0.05
        });
        
        // 加载石材质感贴图
        const stoneTexture = new THREE.TextureLoader().load('assets/textures/stone.jpg');
        stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
        stoneTexture.repeat.set(2, 2);
        frameMaterial.bumpMap = stoneTexture;
        break;
        
      default:
        return this.createEnhancedScrollGeometry();
    }

    this.frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    this.frameMesh.castShadow = true;
    this.frameMesh.receiveShadow = true;
    this.frameMesh.position.z = -0.26;
    this.scene.add(this.frameMesh);
    
    // 添加边框动画
    this.frameMesh.scale.set(0.9, 0.9, 0.9);
    new TWEEN.Tween(this.frameMesh.scale)
      .to({ x: 1, y: 1, z: 1 }, 1200)
      .easing(TWEEN.Easing.Elastic.Out)
      .start();
  }

  createEnhancedScrollGeometry() {
    const group = new THREE.Group();

    // 卷轴杆 - 使用圆柱体并添加木纹
    const scrollGeometry = new THREE.CylinderGeometry(0.3, 0.3, 9, 32);
    const woodTexture = new THREE.TextureLoader().load('assets/textures/wood.jpg');
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(4, 1);
    
    const scrollMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.7,
      metalness: 0.1,
      bumpScale: 0.02
    });

    const topScroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    topScroll.position.y = 3.5;
    topScroll.rotation.x = Math.PI / 2;
    topScroll.castShadow = true;
    group.add(topScroll);

    const bottomScroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    bottomScroll.position.y = -3.5;
    bottomScroll.rotation.x = Math.PI / 2;
    bottomScroll.castShadow = true;
    group.add(bottomScroll);

    // 丝绸材质
    const clothGeometry = new THREE.PlaneGeometry(8, 7, 64, 64);
    
    // 添加丝绸波纹效果
    const timeUniform = { time: 0 };
    const clothMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8f3e6,
      side: THREE.DoubleSide,
      roughness: 0.3,
      metalness: 0.05,
      onBeforeCompile: (shader) => {
        shader.uniforms.time = timeUniform;
        
        shader.vertexShader = `
          uniform float time;
          varying vec2 vUv;
          ${shader.vertexShader}
        `.replace(
          `#include <begin_vertex>`,
          `
          #include <begin_vertex>
          vUv = uv;
          float wave = sin(position.x * 2.0 + time * 2.0) * 0.1;
          transformed.z += wave;
          `
        );
        
        shader.fragmentShader = `
          varying vec2 vUv;
          ${shader.fragmentShader}
        `.replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
          float pattern = smoothstep(0.4, 0.6, sin(vUv.x * 30.0) * sin(vUv.y * 30.0));
          vec3 woven = mix(diffuse, diffuse * 1.2, pattern);
          vec4 diffuseColor = vec4( woven, opacity );
          `
        );
      }
    });

    const cloth = new THREE.Mesh(clothGeometry, clothMaterial);
    cloth.receiveShadow = true;
    group.add(cloth);

    // 动画更新
    this.scene.onBeforeRender = () => {
      timeUniform.time += 0.01;
    };

    return group;
  }

  createParticleEffect() {
    if (this.particles) this.scene.remove(this.particles);

    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // 位置 - 形成围绕中心的效果
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // 颜色 - 敦煌风格色彩
      const hue = 0.05 + Math.random() * 0.15; // 红黄色调
      color.setHSL(hue, 0.9, 0.5 + Math.random() * 0.3);
      color.toArray(colors, i * 3);

      // 大小
      sizes[i] = 0.2 + Math.random() * 0.5;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );

    // 创建粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    // 添加粒子动画
    this.animateParticles = () => {
      const positions = particlesGeometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // 向中心缓慢移动
        positions[i3] *= 0.995;
        positions[i3 + 1] *= 0.995;
        positions[i3 + 2] *= 0.995;
        
        // 如果太靠近中心则重置位置
        if (Math.abs(positions[i3]) < 0.1 && 
            Math.abs(positions[i3 + 1]) < 0.1 && 
            Math.abs(positions[i3 + 2]) < 0.1) {
          const radius = 5 + Math.random() * 10;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);
        }
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(this.animateParticles);
    };
    
    this.animateParticles();
  }

  resetScene() {
    super.resetScene();
    
    // 清除粒子动画
    if (this.animateParticles) {
      cancelAnimationFrame(this.animateParticles);
      this.animateParticles = null;
    }
    
    // 重置场景效果
    this.scene.fog = new THREE.FogExp2(0xf0e6d3, 0.02);
  }
}

// 初始化增强版诗笺生成器
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedPoemGenerator();
});