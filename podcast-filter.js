// Podcast Performance Optimization and Filter System
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    // Performance optimization: Replace all iframes with lightweight thumbnails
    const thumbnailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const thumbnail = entry.target;
                const img = thumbnail.querySelector('img');
                if (img && img.dataset.src && !img.src.startsWith('https://img.youtube.com')) {
                    img.src = img.dataset.src;
                }
                thumbnailObserver.unobserve(thumbnail);
            }
        });
    }, { rootMargin: '50px' });

    // Function to handle video click
    function handleVideoClick(element, videoSrc, videoTitle) {
        const newIframe = document.createElement('iframe');
        newIframe.src = videoSrc + '?autoplay=1';
        newIframe.title = videoTitle || 'YouTube Video';
        newIframe.frameBorder = '0';
        newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        newIframe.allowFullscreen = true;
        newIframe.loading = 'lazy';
        element.parentNode.replaceChild(newIframe, element);
    }

    // Replace all iframes with thumbnails
    videoCards.forEach(card => {
        const iframe = card.querySelector('iframe');
        if (iframe) {
            const videoId = iframe.src.match(/embed\/([^?]+)/)?.[1];
            if (videoId) {
                // Create thumbnail container
                const thumbnail = document.createElement('div');
                thumbnail.className = 'video-thumbnail';
                
                // Create image element
                const img = document.createElement('img');
                img.dataset.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                img.alt = 'Video thumbnail';
                img.loading = 'lazy';
                img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'480\' height=\'360\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f0f0f0\'/%3E%3C/svg%3E';
                
                // Handle thumbnail load errors
                img.onerror = function() {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'video-placeholder-fallback';
                    placeholder.innerHTML = `
                        <div style="background: linear-gradient(135deg, #318f10, #4CAF50); display: flex; align-items: center; justify-content: center; height: 100%; cursor: pointer; border-radius: 8px;">
                            <div style="text-align: center; color: white;">
                                <i class="fab fa-youtube" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                <p style="margin: 0; font-weight: 600;">Watch on YouTube</p>
                                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Video Unavailable</p>
                            </div>
                        </div>
                    `;
                    
                    placeholder.addEventListener('click', function() {
                        handleVideoClick(this, iframe.src, iframe.title);
                    });
                    
                    this.parentNode.replaceChild(placeholder, this);
                };
                
                // Create play button
                const playButton = document.createElement('div');
                playButton.className = 'play-button-1';
                playButton.innerHTML = `
                    <svg width="68" height="48" viewBox="0 0 68 48">
                        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                    </svg>
                `;
                
                // Assemble thumbnail
                thumbnail.appendChild(img);
                thumbnail.appendChild(playButton);
                
                // Add click handler
                thumbnail.addEventListener('click', function() {
                    handleVideoClick(this, iframe.src, iframe.title);
                });
                
                // Replace iframe with thumbnail
                iframe.parentNode.replaceChild(thumbnail, iframe);
                
                // Observe for lazy loading
                thumbnailObserver.observe(thumbnail);
            }
        }
    });

    // Add data-year attributes based on video dates
    videoCards.forEach(card => {
        const dateElement = card.querySelector('.video-date');
        if (dateElement && !card.hasAttribute('data-year')) {
            const dateText = dateElement.textContent.trim();
            
            if (dateText.includes('8 years ago')) {
                card.setAttribute('data-year', '2017');
            } else if (dateText.includes('9 years ago')) {
                card.setAttribute('data-year', '2016');
            } else if (dateText.includes('10 years ago')) {
                card.setAttribute('data-year', '2015');
            }
        }
    });

    // Optimized filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedYear = this.getAttribute('data-year');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Use requestAnimationFrame for smooth filtering
            requestAnimationFrame(() => {
                const visibleCards = [];
                const hiddenCards = [];
                
                videoCards.forEach(card => {
                    const cardYear = card.getAttribute('data-year');
                    
                    if (selectedYear === 'all' || cardYear === selectedYear) {
                        visibleCards.push(card);
                    } else {
                        hiddenCards.push(card);
                    }
                });
                
                // Hide cards first
                hiddenCards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                });
                
                // Show visible cards with staggered animation
                visibleCards.forEach((card, index) => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, index * 20);
                });
                
                // Update page title
                const pageTitle = document.querySelector('.page-hero h1');
                if (pageTitle) {
                    if (selectedYear === 'all') {
                        pageTitle.textContent = 'GYGO Network Podcast';
                    } else {
                        pageTitle.textContent = `GYGO Network Podcast - ${selectedYear}`;
                    }
                }
            });
        });
    });

    // Set default filter to 2017
    const defaultButton = document.querySelector('.filter-btn[data-year="2017"]');
    if (defaultButton && defaultButton.classList.contains('active')) {
        defaultButton.click();
    }
});