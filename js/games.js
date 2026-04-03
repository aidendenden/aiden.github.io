// 游戏作品数据
const gamesData = [
    {
        id: 1,
        title: "矿灯",
        description: "在黑暗的矿井中，玩家扮演一名矿工，通过手中的矿灯照亮前方，寻找珍贵的矿石，同时避开危险的陷阱和怪物。",
        tags: ["冒险", "探索", "解谜"],
        link: "https://www.gcores.com/games/138770",
        image: "images/game-mine.svg"
    },
    {
        id: 2,
        title: "寿司不服输",
        description: "一款关于寿司制作和配送的休闲游戏，玩家需要快速准确地制作各种寿司，满足不同顾客的需求，挑战高分记录。",
        tags: ["休闲", "模拟", "烹饪"],
        link: "https://www.gcores.com/games/149509",
        image: "images/game-sushi.svg"
    },
    {
        id: 3,
        title: "拼好人",
        description: "一款富有哲理的拼图游戏，玩家需要将散乱的生命碎片重新拼凑，探索人与人之间的连接和生命的意义。",
        tags: ["解谜", "哲理", "叙事"],
        link: "https://www.gcores.com/games/150042",
        image: "images/game-puzzle.svg"
    },
    {
        id: 4,
        title: "热量吸收模拟器",
        description: "模拟物理学中的热量吸收过程，玩家需要管理能量流动，平衡系统中的温度，完成各种科学挑战。",
        tags: ["模拟", "教育", "科学"],
        link: "https://www.gcores.com/games/133587",
        image: "images/game-heat.svg"
    },
    {
        id: 5,
        title: "D6X2",
        description: "一款基于骰子的策略游戏，玩家需要通过掷骰子获得点数，进行战略布局和资源管理，战胜对手。",
        tags: ["策略", "骰子", "桌游"],
        link: "https://www.gcores.com/games/133700",
        image: "images/game-dice.svg"
    },
    {
        id: 6,
        title: "Puzzle",
        description: "经典拼图游戏的现代演绎，提供多种难度和主题的拼图挑战，适合所有年龄段的玩家。",
        tags: ["拼图", "休闲", "经典"],
        link: "https://www.gcores.com/games/105371",
        image: "images/game-puzzle2.svg"
    },
    {
        id: 7,
        title: "维度漂流",
        description: "在多维空间中漂流探险，玩家需要穿越不同维度的世界，解决空间谜题，揭开宇宙的奥秘。",
        tags: ["科幻", "冒险", "解谜"],
        link: "https://www.gcores.com/games/114568",
        image: "images/game-dimension.svg"
    },
    {
        id: 8,
        title: "禁止如厕",
        description: "黑色幽默的模拟游戏，玩家需要在一家不允许如厕的公共场所中生存，通过创意方式解决生理需求。",
        tags: ["模拟", "幽默", "生存"],
        link: "https://www.gcores.com/games/113349",
        image: "images/game-toilet.svg"
    },
    {
        id: 9,
        title: "脑史王",
        description: "历史知识问答游戏，玩家需要回答关于世界历史的各个时期的问题，挑战自己的历史知识储备。",
        tags: ["教育", "问答", "历史"],
        link: "https://www.gcores.com/games/111042",
        image: "images/game-history.svg"
    },
    {
        id: 10,
        title: "MOMOEO",
        description: "一款关于记忆和情感的叙事游戏，玩家通过收集记忆碎片，拼凑出一个完整的感人故事。",
        tags: ["叙事", "情感", "记忆"],
        link: "https://www.gcores.com/games/110289",
        image: "images/game-memory.svg"
    },
    {
        id: 11,
        title: "错位的酒桌边界",
        description: "社交模拟游戏，玩家需要在各种酒局中平衡人际关系，做出正确选择，避免社交尴尬。",
        tags: ["模拟", "社交", "选择"],
        link: "https://www.gcores.com/games/108071",
        image: "images/game-party.svg"
    },
    {
        id: 12,
        title: "开心超人",
        description: "休闲动作游戏，玩家扮演一个拥有超能力的英雄，在城市中解决各种危机，帮助市民。",
        tags: ["动作", "休闲", "英雄"],
        link: "https://www.gcores.com/games/111044",
        image: "images/game-superhero.svg"
    },
    {
        id: 13,
        title: "滑块城",
        description: "益智滑块拼图游戏，玩家需要移动滑块来解开各种机关谜题，建设自己的理想城市。",
        tags: ["益智", "拼图", "城市建设"],
        link: "https://www.gcores.com/games/111043",
        image: "images/game-slider.svg"
    }
];

// 创建游戏卡片
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card fade-in';
    card.style.animationDelay = `${game.id * 0.1}s`;
    
    // 创建标签HTML
    const tagsHtml = game.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-image" onerror="this.src='images/game-placeholder.png'">
        <div class="game-content">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <div class="game-tags">
                    ${tagsHtml}
                </div>
                <a href="${game.link}" target="_blank" class="game-link">
                    查看详情 <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// 渲染所有游戏卡片
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = '';
    
    gamesData.forEach(game => {
        const card = createGameCard(game);
        gamesGrid.appendChild(card);
    });
}

// 滚动动画效果
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察所有可以动画的元素
    document.querySelectorAll('.game-card, .section-header, .about-content').forEach(el => {
        observer.observe(el);
    });
}

// 导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(122, 158, 126, 0.1)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 平滑滚动到锚点
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#home')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    setupScrollAnimations();
    setupNavbarScroll();
    setupSmoothScroll();
    
    // 添加游戏数量统计
    const gameCountElement = document.getElementById('gameCount');
    if (gameCountElement) {
        gameCountElement.textContent = gamesData.length;
    }
});

// 导出数据供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gamesData, createGameCard, renderGames };
}