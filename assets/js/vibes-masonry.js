document.addEventListener('DOMContentLoaded', function() {
    // 图片数据 - 添加有意义的标题
    const images = [
        { src: '/images/vibes/thinking-writing.jpg', caption: '' },
        { src: '/images/vibes/do-it-do-it-right-do-it-better.png', caption: '' },
        { src: '/images/vibes/willpower-habits.jpg', caption: '' },
        { src: '/images/vibes/Andrej-Karpathy.png', caption: '' },
        { src: '/images/vibes/how-to-create-luck.png', caption: '@swyx' },
        { src: '/images/vibes/simple.jpeg', caption: '' },
        { src: '/images/vibes/paulgraham.jpeg', caption: '@paulgraham' },
        { src: '/images/vibes/steve-jobs.jpg', caption: '' }
        // 可以根据需要添加更多图片
    ];

    // 创建瀑布流布局
    const grid = document.getElementById('vibes-grid');
    const columnCount = window.innerWidth > 1200 ? 2 : 1; // 减少列数，使图片显示更大
    
    // 创建列
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'masonry-column';
        grid.appendChild(column);
        columns.push(column);
    }
    
    // 将图片添加到列中
    images.forEach((image, index) => {
        const columnIndex = index % columnCount;
        const column = columns[columnIndex];
        
        const item = document.createElement('div');
        item.className = 'vibe-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption || '';
        img.loading = 'lazy'; // 懒加载
        
        // 点击图片打开灯箱
        img.addEventListener('click', function() {
            openLightbox(image.src, image.caption);
        });
        
        item.appendChild(img);
        
        if (image.caption) {
            const caption = document.createElement('div');
            caption.className = 'vibe-caption';
            caption.textContent = image.caption;
            item.appendChild(caption);
        }
        
        column.appendChild(item);
    });
    
    // 灯箱功能
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    
    function openLightbox(src, caption) {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption || '';
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // 按ESC键关闭灯箱
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        // 如果需要在窗口大小变化时重新排列，可以在这里添加代码
        // 但这需要重新加载页面或重新排列元素
    });
});