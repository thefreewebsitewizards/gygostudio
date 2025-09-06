// Reviews Page Modal Functionality

// Full review data
const reviewData = {
    'superhero-blockbuster': {
        title: 'Latest Superhero Movie Delivers Epic Action',
        category: 'Movie Review',
        date: 'December 15, 2024',
        rating: 8.5,
        image: 'images/movie-poster.svg',
        content: `This latest entry in the superhero genre delivers exactly what fans have been craving: spectacular action sequences, compelling character development, and enough heart to elevate it above typical blockbuster fare. Director Maria Rodriguez has crafted a visual masterpiece that respects the source material while bringing fresh perspectives to familiar characters.

The film's greatest strength lies in its practical effects work, seamlessly blended with cutting-edge CGI to create truly breathtaking sequences. The opening action scene alone is worth the price of admission, featuring a 20-minute sequence that rivals anything we've seen in the genre. The choreography is impeccable, with each punch and explosion feeling weighty and consequential.

Lead actor James Chen brings surprising depth to what could have been a one-dimensional role, exploring the psychological toll of heroism with nuance and authenticity. Supporting actress Sarah Kim steals every scene she's in, delivering a performance that balances strength and vulnerability perfectly.

The film's pacing is nearly perfect, building tension methodically before unleashing spectacular set pieces that feel earned rather than gratuitous. The sound design deserves special mention, creating an immersive experience that makes every impact feel visceral and real.

While the plot follows some familiar beats, the execution is so polished that even predictable moments feel fresh. The film successfully balances multiple storylines without feeling overstuffed, and the emotional payoffs land with genuine impact.

Overall, this is a triumphant addition to the superhero canon, proving that when done right, these films can be both commercially successful and artistically satisfying.`
    },
    'scifi-series': {
        title: 'Sci-Fi Series Pushes Boundaries of Television',
        category: 'TV Review',
        date: 'December 12, 2024',
        rating: 9.2,
        image: 'images/tv-poster.svg',
        content: `This groundbreaking sci-fi series represents a quantum leap forward in television storytelling, combining cinematic production values with the narrative depth that only long-form television can provide. Created by acclaimed writer-director Alex Kim, this series sets a new standard for what science fiction can achieve on the small screen.

From the opening moments of the pilot episode, it's clear that this isn't your typical TV series. The production design is meticulous, creating a fully realized future world that feels both plausible and alien. Every frame is composed with the care of a feature film, yet the pacing allows for character development that would be impossible in a two-hour movie.

The ensemble cast delivers uniformly excellent performances, with particular standouts from veteran actor David Park and newcomer Lisa Chen. Their chemistry drives the central relationship that anchors the series, while the supporting cast creates a rich tapestry of interconnected storylines spanning multiple planets and time periods.

What sets this series apart is its willingness to tackle complex philosophical themes without sacrificing entertainment value. The writing explores questions of consciousness, artificial intelligence, and human identity in ways that feel both timely and timeless. Each episode builds upon the last, creating a narrative momentum that makes binge-watching almost inevitable.

The series also excels in its technical aspects. The cinematography is consistently stunning, using innovative camera work and lighting to enhance the storytelling. The score, composed by rising talent Maya Rodriguez, perfectly complements the on-screen action without overwhelming the dialogue.

Perhaps most impressively, the series manages to balance hard science fiction concepts with emotional storytelling, making complex ideas accessible without dumbing them down. This is television at its finest.`
    },
    'netflix-original': {
        title: 'Netflix Original Sets New Streaming Standards',
        category: 'Streaming Review',
        date: 'December 10, 2024',
        rating: 9.0,
        image: 'images/streaming-poster.svg',
        content: `Netflix has outdone themselves with this latest original series, creating what may be the most compelling streaming content ever produced. Every episode is a masterclass in storytelling, combining innovative narrative techniques with stellar performances that keep viewers engaged from start to finish.

The story follows a diverse ensemble cast through interconnected storylines that span multiple genres and time periods. The attention to detail is extraordinary, from the intricate character development to the sweeping cinematography that brings each location to life with stunning authenticity.

What elevates this series beyond mere entertainment is its emotional core. The writing explores themes of family, identity, and social justice with remarkable depth and sensitivity. The performances, led by breakthrough star Jordan Martinez, bring nuance to every character interaction, making even minor characters feel fully realized.

The production values are consistently impressive, with each episode feeling like a mini-movie. The costume design and set decoration create immersive worlds that feel both contemporary and timeless. The editing is particularly noteworthy, seamlessly weaving together multiple storylines without ever feeling confusing or overwhelming.

The series also benefits from an incredible musical score that perfectly complements each scene. From intimate character moments to sweeping dramatic sequences, the music enhances every emotional beat without ever feeling intrusive.

This series represents the future of streaming content, proving that when given creative freedom and proper resources, storytellers can create truly exceptional television that rivals anything produced for traditional networks.`
    }
};

// Modal functionality
const modal = document.getElementById('reviewModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');
const modalRatingValue = document.getElementById('modalRatingValue');
const modalStars = document.getElementById('modalStars');
const modalImage = document.getElementById('modalImage');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const reviewCards = document.querySelectorAll('.review-card');

// Function to generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Open modal when "Read Full Review" button is clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more-btn')) {
        e.preventDefault();
        const card = e.target.closest('.review-card');
        const reviewId = card.dataset.reviewId;
        const review = reviewData[reviewId];
        
        if (review) {
            modalTitle.textContent = review.title;
            modalCategory.textContent = review.category;
            modalDate.textContent = review.date;
            modalRatingValue.textContent = review.rating;
            modalStars.innerHTML = generateStars(review.rating);
            modalImage.src = review.image;
            modalImage.alt = review.title;
            modalContent.innerHTML = review.content.replace(/\n\n/g, '</p><p>');
            modalContent.innerHTML = '<p>' + modalContent.innerHTML + '</p>';
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll animation for review cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Setup review cards
    const animatedElements = document.querySelectorAll('.review-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        el.style.cursor = 'pointer';
        observer.observe(el);
    });
    
    // Add hover effects for review cards
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(49, 143, 16, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });

    // Rating stars animation
    function animateRatingStars() {
        const ratingBadges = document.querySelectorAll('.rating-badge');
        
        ratingBadges.forEach(badge => {
            const rating = parseFloat(badge.textContent);
            const stars = Math.floor(rating);
            
            // Add visual enhancement for high ratings
            if (rating >= 4.5) {
                badge.style.background = 'linear-gradient(45deg, #318f10, #4CAF50)';
                badge.style.boxShadow = '0 0 10px rgba(49, 143, 16, 0.3)';
            } else if (rating >= 4.0) {
                badge.style.background = 'linear-gradient(45deg, #318f10, #66BB6A)';
            }
        });
    }

    // Initialize rating animations
    animateRatingStars();
});