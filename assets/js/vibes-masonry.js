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
        { src: '/images/vibes/steve-jobs.jpg', caption: '' },
        { src: '/images/vibes/ghhardy.jpg', caption: '' },
        { src: '/images/vibes/why-how-what.jpg', caption: '@SimonSinek' },
        { src: '/images/vibes/habit.jpg', caption: '@jamesclear' }
        // 可以根据需要添加更多图片
    ];

    // 创建瀑布流布局
    const grid = document.getElementById('vibes-grid');
    const getColumnCount = () => {
        // 根据屏幕宽度动态计算列数，缩小每列宽度以显示更多列
        const screenWidth = window.innerWidth;
        const minColumnWidth = 300; // 减小每列最小宽度，使图片变小
        const padding = 40; // 总padding
        const availableWidth = screenWidth - padding;
        const calculatedColumns = Math.floor(availableWidth / minColumnWidth);
        
        // 设置最小和最大列数限制，优先显示4列
        if (calculatedColumns >= 4) return 4; // 优先显示4列
        if (calculatedColumns >= 3) return 3;
        if (calculatedColumns >= 2) return 2;
        return 1; // 最少1列
    };
    let columnCount = getColumnCount();
    
    // 创建和管理列的函数
    function createColumns() {
        // 清空现有内容
        grid.innerHTML = '';
        
        const columns = [];
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'masonry-column';
            grid.appendChild(column);
            columns.push(column);
        }
        return columns;
    }
    
    // 加载图片的函数
    function loadImages() {
        const loadingIndicator = document.getElementById('loading-indicator');
        const columns = createColumns();
        let loadedCount = 0;
        
        // 显示加载动画
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
        
        images.forEach((image, index) => {
            const columnIndex = index % columnCount;
            const column = columns[columnIndex];
            
            const item = document.createElement('div');
            item.className = 'vibe-item';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption || '';
            img.loading = 'lazy';
            
            // 图片加载完成后的动画
            img.onload = function() {
                loadedCount++;
                
                // 当所有图片加载完成后隐藏加载动画
                if (loadedCount === images.length && loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100); // 错开动画时间
            };
            
            // 图片加载失败的处理
            img.onerror = function() {
                loadedCount++;
                if (loadedCount === images.length && loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                // 可以在这里添加错误处理逻辑
                console.warn('图片加载失败:', image.src);
            };
            
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
    }
    
    // 初始加载
    loadImages();
    
    // 灯箱功能
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    let currentImageIndex = -1;
    
    function openLightbox(src, caption) {
        // 找到当前图片的索引
        currentImageIndex = images.findIndex(img => img.src === src);
        
        lightboxImage.src = src;
        lightboxCaption.textContent = caption || '';
        lightbox.style.display = 'block';
        lightbox.style.opacity = '0';
        
        // 更新导航按钮状态
        updateNavigationButtons();
        
        // 淡入动画
        setTimeout(() => {
            lightbox.style.transition = 'opacity 0.3s ease';
            lightbox.style.opacity = '1';
        }, 10);
        
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    function closeLightbox() {
        lightbox.style.transition = 'opacity 0.3s ease';
        lightbox.style.opacity = '0';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightbox.style.transition = '';
        }, 300);
        
        document.body.style.overflow = ''; // 恢复滚动
        currentImageIndex = -1;
    }
    
    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            const nextImage = images[currentImageIndex];
            lightboxImage.src = nextImage.src;
            lightboxCaption.textContent = nextImage.caption || '';
            updateNavigationButtons();
        }
    }
    
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const prevImage = images[currentImageIndex];
            lightboxImage.src = prevImage.src;
            lightboxCaption.textContent = prevImage.caption || '';
            updateNavigationButtons();
        }
    }
    
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    function updateNavigationButtons() {
        if (lightboxPrev && lightboxNext) {
            // 更新按钮状态
            if (currentImageIndex <= 0) {
                lightboxPrev.classList.add('disabled');
            } else {
                lightboxPrev.classList.remove('disabled');
            }
            
            if (currentImageIndex >= images.length - 1) {
                lightboxNext.classList.add('disabled');
            } else {
                lightboxNext.classList.remove('disabled');
            }
        }
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // 响应窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newColumnCount = getColumnCount();
            if (newColumnCount !== columnCount) {
                columnCount = newColumnCount;
                loadImages();
            }
        }, 250); // 防抖，避免频繁重新排列
    });
});