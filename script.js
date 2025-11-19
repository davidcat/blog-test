// DOM 元素
const mobileMenuBtn = document.createElement('button');
const mobileMenu = document.createElement('div');
const navContainer = document.querySelector('.nav-container');

// 移动端菜单设置
function setupMobileMenu() {
    // 创建移动端菜单按钮
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    mobileMenuBtn.setAttribute('aria-label', '菜单');

    // 创建移动端菜单
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <ul class="mobile-menu-list">
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">商店</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">Mac</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">iPad</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">iPhone</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">Watch</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">AirPods</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">家居</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">娱乐</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">配件</a></li>
            <li class="mobile-menu-item"><a href="#" class="mobile-menu-link">技术支持</a></li>
        </ul>
    `;

    // 添加到 DOM
    navContainer.insertBefore(mobileMenuBtn, navContainer.firstChild);
    navContainer.parentNode.insertBefore(mobileMenu, navContainer.nextSibling);

    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // 汉堡菜单动画
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 点击菜单项关闭菜单
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// 检查是否为移动设备
function isMobileDevice() {
    return window.innerWidth <= 734;
}

// 初始化移动端菜单
function initMobileMenu() {
    if (isMobileDevice() && !document.querySelector('.mobile-menu-btn')) {
        setupMobileMenu();
    } else if (!isMobileDevice() && document.querySelector('.mobile-menu-btn')) {
        // 移除移动端菜单元素
        mobileMenuBtn.remove();
        mobileMenu.remove();
    }
}

// 滚动动画
function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.product-card, .feature-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// 平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(251, 251, 253, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(251, 251, 253, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// 鼠标悬停效果
function setupHoverEffects() {
    // 产品卡片悬停效果
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 导航链接悬停效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 打字机效果（用于标题）
function setupTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let index = 0;
    const typingSpeed = 100;

    function typeChar() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, typingSpeed);
        }
    }

    // 延迟开始打字效果
    setTimeout(typeChar, 500);
}

// 图片懒加载
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 窗口大小变化处理
const handleResize = throttle(() => {
    initMobileMenu();
}, 250);

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    setupScrollAnimations();
    setupSmoothScroll();
    setupNavbarScroll();
    setupHoverEffects();
    setupTypewriterEffect();
    setupLazyLoading();

    // 添加加载完成类
    document.body.classList.add('loaded');

    // 控制台欢迎信息
    console.log('%c仿 Apple 风格官网', 'color: #2997ff; font-size: 20px; font-weight: bold;');
    console.log('%c使用现代 Web 技术构建', 'color: #86868b; font-size: 14px;');
});

// 监听窗口大小变化
window.addEventListener('resize', handleResize);

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误上报逻辑
});

// 性能监控
window.addEventListener('load', function() {
    // 页面加载时间
    const loadTime = performance.now();
    console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);

    // 如果加载时间过长，可以优化提示
    if (loadTime > 3000) {
        console.warn('页面加载时间较长，建议优化');
    }
});

// 添加 CSS 变量支持（为了更好的主题定制）
function setupCSSVariables() {
    const root = document.documentElement;

    // 设置默认主题变量
    root.style.setProperty('--primary-color', '#2997ff');
    root.style.setProperty('--text-color', '#1d1d1f');
    root.style.setProperty('--background-color', '#fbfbfd');
    root.style.setProperty('--secondary-color', '#86868b');
}

// 初始化 CSS 变量
setupCSSVariables();

// 导出函数供外部使用
window.AppleStyleWebsite = {
    initMobileMenu,
    setupScrollAnimations,
    setupSmoothScroll,
    setupNavbarScroll,
    setupHoverEffects,
    setupTypewriterEffect,
    setupLazyLoading
};