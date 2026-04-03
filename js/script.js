// 主脚本文件 - 处理全局交互和特效

// 等待页面完全加载
window.addEventListener('DOMContentLoaded', () => {
    console.log('Aiden Portfolio - 独立游戏开发者网站加载完成');
    
    // 初始化所有功能
    initTheme();
    initMobileMenu();
    initScrollToTop();
    initParallaxEffect();
    initGameFilter();
    
    // 页面加载完成后的动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

// 主题初始化
function initTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            updateThemeIcon(themeToggle);
        });
    }
    
    // 监听系统主题变化
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    });
}

// 更新主题图标
function updateThemeIcon(button) {
    const icon = button.querySelector('i');
    if (icon) {
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// 移动端菜单
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // 切换汉堡菜单图标
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }
}

// 返回顶部按钮
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // 监听滚动显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击返回顶部
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 视差滚动效果
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.backgroundPositionY = `${rate}px`;
        });
    }
}

// 游戏筛选功能
function initGameFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (!filterButtons.length || !gamesGrid) return;
    
    // 获取所有游戏卡片
    const gameCards = Array.from(gamesGrid.children);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除其他按钮的激活状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 激活当前按钮
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // 筛选游戏
            gameCards.forEach(card => {
                const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
                
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 页面加载进度指示器
function initLoadingIndicator() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fafdfa;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #e5f0e5;
        border-top-color: #7a9e7e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
    
    // 页面加载完成后移除加载指示器
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 500);
        }, 1000);
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    // 按ESC关闭所有打开的模态框
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }
    
    // 按空格键或PageDown向下滚动
    if ((e.key === ' ' || e.key === 'PageDown') && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
    
    // 按PageUp向上滚动
    if (e.key === 'PageUp' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy({
            top: -window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
});

// 添加CSS动画定义
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .dark-theme {
        --color-bg: #1a2a1a;
        --color-surface: #2c3e2c;
        --color-text: #f0f7f0;
        --color-text-light: #a0b0a0;
        --color-border: #3c4e3c;
    }
    
    #scrollToTop {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #7a9e7e;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(122, 158, 126, 0.3);
    }
    
    #scrollToTop.visible {
        opacity: 1;
        visibility: visible;
    }
    
    #scrollToTop:hover {
        background-color: #5a7d5d;
        transform: scale(1.1);
    }
    
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-text);
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: var(--color-surface);
            flex-direction: column;
            padding: var(--space-md);
            gap: var(--space-md);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-medium);
        }
        
        .nav-links.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    }
    
    .filter-btn {
        background-color: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        padding: 8px 16px;
        border-radius: var(--radius-pill);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background-color: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }
`;
document.head.appendChild(style);

// 初始化加载指示器
initLoadingIndicator();