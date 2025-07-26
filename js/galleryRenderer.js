document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // 作品数据
    const artworks = [
        {
            id: 1,
            title: "敦煌月夜",
            author: "李白",
            style: "卷轴",
            theme: "山水",
            date: "2025-03-15"
        },
        {
            id: 2,
            title: "飞天舞袖",
            author: "王维",
            style: "绢本",
            theme: "人物",
            date: "2025-04-02"
        },
        {
            id: 3,
            title: "九色神鹿",
            author: "白居易",
            style: "卷轴",
            theme: "神话",
            date: "2025-04-18"
        },
        {
            id: 4,
            title: "阳关送别",
            author: "王之涣",
            style: "绢本",
            theme: "历史",
            date: "2025-05-03"
        },
        {
            id: 5,
            title: "丝路驼铃",
            author: "李白",
            style: "卷轴",
            theme: "历史",
            date: "2025-05-21"
        },
        {
            id: 6,
            title: "莫高窟韵",
            author: "王维",
            style: "绢本",
            theme: "建筑",
            date: "2025-06-07"
        }
    ];
    
    // 渲染作品网格
    function renderGallery() {
        galleryGrid.innerHTML = '';
        
        artworks.forEach(artwork => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <div class="item-image">作品 ${artwork.id} 预览图</div>
                <div class="item-content">
                    <h3 class="item-title">${artwork.title}</h3>
                    <p class="item-author">作者：${artwork.author}</p>
                    <div class="item-meta">
                        <span>${artwork.style}</span>
                        <span>${artwork.date}</span>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(item);
        });
    }
    
    // 初始化
    renderGallery();
});