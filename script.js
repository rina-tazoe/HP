// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const imageContainer = document.querySelector('.image-container');
    const heroImages = document.querySelectorAll('.hero-image');

    // 画像ごとの初期の「待機位置」
    const initialOffsets = [
        { x: '-50%', y: '-50%', r: '-10deg' },
        { x: '0%', y: '20%', r: '0deg' },
        { x: '50%', y: '-30%', r: '10deg' }
    ];

    // 出現間隔 (400ms)
    const APPEAR_INTERVAL = 400; 
    // 画像が出現し終わるタイミング (最後の画像が出現するまでの時間)
    const END_OF_APPEARANCE = APPEAR_INTERVAL * (heroImages.length - 1) + 200; 

    // 広がるアニメーション時間 (CSSに合わせて 1000ms)
    const TRANSITION_DURATION = 1000; 

    // --- ロード画面のアニメーション ---
    setTimeout(() => {
        heroImages.forEach((img, index) => {
            const offset = initialOffsets[index];
            
            setTimeout(() => {
                img.style.opacity = 1;
                img.style.transform = `translate(calc(-50% + ${offset.x}), calc(-50% + ${offset.y})) scale(1) rotate(${offset.r})`;
            }, index * APPEAR_INTERVAL); 
        });

        setTimeout(() => {
            imageContainer.classList.add('active'); 
            
            setTimeout(() => {
                loadingScreen.style.opacity = 0; 
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    mainContent.classList.remove('hidden');

                    // メインコンテンツが表示された後にスクロールアニメーションを初期化
                    initializeScrollAnimation(); 
                }, 500); 
                
            }, TRANSITION_DURATION);
            
        }, END_OF_APPEARANCE); 
        
    }, 500); 

    // --- スクロールアニメーションの関数 ---
    function initializeScrollAnimation() {
        // アニメーションを適用する要素を全て取得 (feature-item, gallery-section, purchase-info)
        const animatedItems = document.querySelectorAll('.feature-item, .gallery-section, .purchase-info');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 要素が表示領域に入ったら
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible'); // is-visibleクラスを追加
                    observer.unobserve(entry.target); // 一度アニメーションしたら監視を停止
                }
            });
        }, {
            // 画面のどのくらい見えたらアニメーションを開始するか (viewportの15%が見えたら発火)
            rootMargin: '0px 0px -15% 0px', 
            threshold: 0.1 // 要素の10%が見えたら発火
        });

        // 各要素を監視対象に追加
        animatedItems.forEach(item => {
            observer.observe(item);
        });
    }

});
