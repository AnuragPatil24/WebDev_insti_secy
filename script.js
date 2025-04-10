document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTab(tabId, this);
        });
    });
    
    function openTab(tabId, button) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
        
        button.classList.add('active');
    }
    
    // Rating functionality
    const stars = document.querySelectorAll('.rating i');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        // Hover effect
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    // Form submission
    const feedbackForm = document.getElementById('feedback-form');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const eventName = document.getElementById('event').value;
        const message = document.getElementById('message').value;
        const rating = ratingInput.value;
        
        // Here you would typically send this data to a server
        console.log('Feedback submitted:', {
            name,
            email,
            event: eventName,
            message,
            rating
        });
        
        // Show success message
        alert('Thank you for your feedback!');
        
        // Reset form
        feedbackForm.reset();
        stars.forEach(star => {
            star.classList.remove('active');
            star.classList.remove('fas');
            star.classList.add('far');
        });
        ratingInput.value = '0';
    });
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
});

    // Organizer Functionality
    const organizerAccessBtn = document.getElementById('organizer-access-btn');
    const organizerLoginModal = document.getElementById('organizer-login');
    const closeModal = document.querySelector('.close');
    const organizerLoginForm = document.getElementById('organizer-login-form');
    const organizerDashboard = document.getElementById('organizer-dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Sample organizer credentials (in real app, this would be server-side)
    const organizerCredentials = {
        email: "organizer@sntiitk.com",
        password: "password123"
    };
    
    // Sample feedback data for organizer
    const sampleFeedback = [
        {
            id: 1,
            name: "SnT IITk",
            email: "snt@iitk.ac.in",
            event: "Takneek",
            message: "Great event with insightful sessions. The workshops were particularly helpful.",
            rating: 4,
            date: "2023-04-10",
            status: "reviewed"
        },
        {
            id: 2,
            name: "Anurag Patil",
            email: "Anurag@iitk.ac.in.com",
            event: "Council Secy Competition",
            message: "The problems were challenging but the time limit was too short.",
            rating: 3,
            date: "2023-04-05",
            status: "pending"
        }
    ];
    
    // Sample FAQ data for organizer
    const sampleFAQs = [
        {
            id: 1,
            question: "How long does it take for feedback to be reviewed?",
            answer: "Typically, feedback is reviewed within 3-5 working days."
        },
        {
            id: 2,
            question: "Can I edit my feedback after submission?",
            answer: "No, once feedback is submitted it cannot be edited."
        }
    ];
    
    // Open organizer login modal
    organizerAccessBtn.addEventListener('click', function() {
        organizerLoginModal.style.display = "block";
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        organizerLoginModal.style.display = "none";
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === organizerLoginModal) {
            organizerLoginModal.style.display = "none";
        }
    });
    
    // Organizer login
    organizerLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('org-email').value;
        const password = document.getElementById('org-password').value;
        
        if (email === "test@gmail.com" && password === "1234") {
            // Successful login
            organizerLoginModal.style.display = "none";
            organizerDashboard.classList.remove('hidden');
            
            // Hide attendee interface
            document.querySelector('.container > header').style.display = 'none';
            document.querySelector('.tabs').style.display = 'none';
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Load organizer data
            loadOrganizerFeedback();
            loadOrganizerFAQs();
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        organizerDashboard.classList.add('hidden');
        
        // Show attendee interface
        document.querySelector('.container > header').style.display = 'block';
        document.querySelector('.tabs').style.display = 'flex';
        document.getElementById('feedback').style.display = 'block';
    });
    
    // Organizer dashboard tabs
    document.querySelectorAll('.dash-tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Hide all tab contents and remove active class from buttons
            document.querySelectorAll('.dash-tab-content, .dash-tab-button').forEach(el => {
                el.classList.remove('active');
            });
            
            // Show selected tab and mark button as active
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Load feedback for organizer
    function loadOrganizerFeedback() {
        const feedbackList = document.querySelector('.organizer-feedback-list');
        feedbackList.innerHTML = '';
        
        sampleFeedback.forEach(feedback => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = `organizer-feedback-item ${feedback.status}`;
            feedbackItem.innerHTML = `
                <h3>${feedback.event}</h3>
                <p><strong>From:</strong> ${feedback.name} (${feedback.email})</p>
                <p>${feedback.message}</p>
                <div class="feedback-meta-organizer">
                    <span>Rating: ${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</span>
                    <span>Date: ${feedback.date}</span>
                    <span class="status ${feedback.status}">${feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}</span>
                </div>
                <div class="feedback-actions">
                    <button class="mark-reviewed" data-id="${feedback.id}">Mark Reviewed</button>
                    <button class="mark-pending" data-id="${feedback.id}">Mark Pending</button>
                </div>
            `;
            feedbackList.appendChild(feedbackItem);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.mark-reviewed').forEach(button => {
            button.addEventListener('click', function() {
                const feedbackId = parseInt(this.dataset.id);
                updateFeedbackStatus(feedbackId, 'reviewed');
            });
        });
        
        document.querySelectorAll('.mark-pending').forEach(button => {
            button.addEventListener('click', function() {
                const feedbackId = parseInt(this.dataset.id);
                updateFeedbackStatus(feedbackId, 'pending');
            });
        });
    }
    
    // Update feedback status
    function updateFeedbackStatus(id, status) {
        const feedback = sampleFeedback.find(f => f.id === id);
        if (feedback) {
            feedback.status = status;
            loadOrganizerFeedback();
        }
    }
    
    // Load FAQs for organizer
    function loadOrganizerFAQs() {
        const faqList = document.querySelector('.editable-faq-list');
        faqList.innerHTML = '';
        
        sampleFAQs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'editable-faq-item';
            faqItem.innerHTML = `
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
                <div class="faq-actions">
                    <button class="edit-faq-btn" data-id="${faq.id}">Edit</button>
                    <button class="delete-faq-btn" data-id="${faq.id}">Delete</button>
                </div>
            `;
            faqList.appendChild(faqItem);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-faq-btn').forEach(button => {
            button.addEventListener('click', function() {
                const faqId = parseInt(this.dataset.id);
                editFAQ(faqId);
            });
        });
        
        document.querySelectorAll('.delete-faq-btn').forEach(button => {
            button.addEventListener('click', function() {
                const faqId = parseInt(this.dataset.id);
                deleteFAQ(faqId);
            });
        });
    }
    
    // Edit FAQ
    function editFAQ(id) {
        const faq = sampleFAQs.find(f => f.id === id);
        if (faq) {
            // In a real app, you would show an edit form
            const newQuestion = prompt("Edit question:", faq.question);
            if (newQuestion !== null) {
                const newAnswer = prompt("Edit answer:", faq.answer);
                if (newAnswer !== null) {
                    faq.question = newQuestion;
                    faq.answer = newAnswer;
                    loadOrganizerFAQs();
                }
            }
        }
    }
    
    // Delete FAQ
    function deleteFAQ(id) {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            const index = sampleFAQs.findIndex(f => f.id === id);
            if (index !== -1) {
                sampleFAQs.splice(index, 1);
                loadOrganizerFAQs();
            }
        }
    }
    
    // Add new FAQ
    document.getElementById('add-faq-btn').addEventListener('click', function() {
        document.getElementById('add-faq-form').classList.remove('hidden');
    });
    
    document.getElementById('cancel-faq').addEventListener('click', function() {
        document.getElementById('add-faq-form').classList.add('hidden');
    });
    
    document.getElementById('new-faq-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = document.getElementById('new-question').value;
        const answer = document.getElementById('new-answer').value;
        
        if (question && answer) {
            const newId = sampleFAQs.length > 0 ? Math.max(...sampleFAQs.map(f => f.id)) + 1 : 1;
            sampleFAQs.push({
                id: newId,
                question,
                answer
            });
            
            document.getElementById('new-faq-form').reset();
            document.getElementById('add-faq-form').classList.add('hidden');
            loadOrganizerFAQs();
        }
    });