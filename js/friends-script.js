// 当页面加载完成时执行
document.addEventListener('DOMContentLoaded', function () {
    // 滚动时隐藏/显示头部导航
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');

        // 向下滚动超过100px时隐藏头部
        if (currentScrollTop > 100 && currentScrollTop > lastScrollTop) {
            header.classList.add('hidden-header');
        } else {
            header.classList.remove('hidden-header');
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

        // 显示/隐藏回到顶部按钮
        const toTopBtn = document.querySelector('.to-top');
        if (currentScrollTop > 300) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    });

    // 滚动动画效果
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-card, .friend-card');

        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    }

    // 初始加载时检查可见元素
    animateOnScroll();

    // 滚动时检查可见元素
    window.addEventListener('scroll', animateOnScroll);

    // 回到顶部按钮点击事件
    const toTopBtn = document.querySelector('.to-top');
    toTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 移除所有链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 为当前点击的链接添加active类
            this.classList.add('active');
        });
    });

    // 主题切换功能 - 全局同步
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 更新主题按钮图标
    const updateThemeIcon = (theme) => {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    };

    // 应用主题
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
    };

    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});