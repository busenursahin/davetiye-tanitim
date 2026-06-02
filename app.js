/**
 * Invitify Dynamic Application JS Core logic
 * Light Mode Cheerful Customization
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Menu Controls (Mobile Hamburger) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            // Toggle icon classes
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close mobile nav when link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // --- 2. Active Navigation Class Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- 3. Interactive Simulator Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // --- 4. Yapay Zeka (AI) Customizer Simulator ---
    const generateAiBtn = document.getElementById('generate-ai-btn');
    const aiPromptInput = document.getElementById('ai-prompt');
    const dynamicCard = document.getElementById('dynamic-card');
    const previewNames = document.getElementById('preview-names');
    const previewDesc = document.getElementById('preview-desc');
    const previewDate = document.getElementById('preview-date');
    const previewTime = document.getElementById('preview-time');
    const previewLoc = document.getElementById('preview-loc');

    // Preset configurations matching Light Theme, minimalist and happy tone
    const promptPresets = {
        'Romantik Gül Kurusu & Altın Varaklı Kır Düğünü': {
            background: 'linear-gradient(135deg, #fff5f6 0%, #ffe4e6 100%)',
            textColor: '#4c0519',
            accentColor: '#db2777',
            names: 'Zeynep & Mert',
            desc: 'Güllerin kokusu eşliğinde, hayatımızı birleştireceğimiz bu mutlu bahar gününde yanımızda olmanız dileğiyle.',
            decorColor: 'rgba(219, 39, 119, 0.2)',
            btnAcceptBg: '#db2777',
            date: '24 Mayıs 2026',
            time: '18:00',
            loc: 'Fuat Paşa Yalısı Bahçesi, Sarıyer'
        },
        'Sade Şeftali Tonları & Minimalist Çizgiler': {
            background: 'linear-gradient(135deg, #fffaf5 0%, #ffedd5 100%)',
            textColor: '#431407',
            accentColor: '#ea580c',
            names: 'Ece & Can',
            desc: 'Sadelik içinde kurduğumuz dünyamızın kapılarını, aşkımızı ve mutluluğumuzu paylaşmak üzere size açıyoruz.',
            decorColor: 'rgba(234, 88, 12, 0.2)',
            btnAcceptBg: '#ea580c',
            date: '14 Haziran 2026',
            time: '19:00',
            loc: 'Divan Kuruçeşme, Beşiktaş'
        },
        'Zeytin Yaprağı Detaylı & Okaliptüslü Doğal Nişan': {
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            textColor: '#14532d',
            accentColor: '#16a34a',
            names: 'Selin & Burak',
            desc: 'Zeytin yapraklarının bereketi, taze başlangıçların huzuru ile gerçekleştireceğimiz nişan merasimimize davetlisiniz.',
            decorColor: 'rgba(22, 163, 74, 0.3)',
            btnAcceptBg: '#16a34a',
            date: '05 Eylül 2026',
            time: '16:30',
            loc: 'Beykoz Kundura Fabrikası, Beykoz'
        },
        'Parıltılı Şampanya & Klasik Yaz Düğünü': {
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            textColor: '#451a03',
            accentColor: '#ca8a04',
            names: 'Melis & Kaan',
            desc: 'Altın gün ışığının altında, dans ve kahkahalar eşliğinde hayatımızı birleştireceğimiz bu harika günde birlikte olalım.',
            decorColor: 'rgba(202, 138, 4, 0.3)',
            btnAcceptBg: '#ca8a04',
            date: '12 Eylül 2026',
            time: '19:30',
            loc: 'Çırağan Sarayı Bahçesi, Ortaköy'
        }
    };

    // Make usePreset globally accessible
    window.usePreset = function(presetText) {
        if (aiPromptInput) {
            aiPromptInput.value = presetText;
        }
    };

    if (generateAiBtn) {
        generateAiBtn.addEventListener('click', () => {
            const promptValue = aiPromptInput.value.trim();
            if (!promptValue) {
                alert('Lütfen önce bir konsept veya stil tarifi girin!');
                return;
            }

            // Enter loading state
            generateAiBtn.classList.add('loading');
            
            setTimeout(() => {
                generateAiBtn.classList.remove('loading');

                // Determine matched style configuration
                let config = promptPresets[promptValue] || {
                    background: 'linear-gradient(135deg, #fffafb 0%, #fff1f2 100%)',
                    textColor: '#431407',
                    accentColor: '#be123c',
                    names: 'Rüya & Alp',
                    desc: `İlettiğiniz "${promptValue}" tarifiyle yapay zekamız tarafından özel olarak tasarlanmış mutlu gün davetiyesi.`,
                    decorColor: 'rgba(190, 18, 60, 0.2)',
                    btnAcceptBg: '#db2777',
                    date: '05 Eylül 2026',
                    time: '19:30',
                    loc: 'Esma Sultan Yalısı, Ortaköy'
                };

                // Apply style properties to simulator phone
                if (dynamicCard) {
                    dynamicCard.style.background = config.background;
                    dynamicCard.style.color = config.textColor;
                    
                    // Direct node styles
                    const textElements = dynamicCard.querySelectorAll('.inv-live-header, .inv-live-desc, .inv-live-names, .detail-row span, .detail-row i');
                    textElements.forEach(elem => {
                        if (elem.classList.contains('inv-live-names')) {
                            elem.style.color = config.textColor;
                            elem.style.background = 'none';
                            elem.style.webkitTextFillColor = 'initial';
                        } else if (elem.tagName === 'I') {
                            elem.style.color = config.accentColor;
                        } else {
                            elem.style.color = config.textColor;
                        }
                    });

                    // Update contents
                    if (previewNames) previewNames.textContent = config.names;
                    if (previewDesc) previewDesc.textContent = config.desc;
                    if (previewDate) previewDate.textContent = config.date;
                    if (previewTime) previewTime.textContent = config.time;
                    if (previewLoc) previewLoc.textContent = config.loc;

                    // Apply decorations
                    const decLeafs = dynamicCard.querySelectorAll('.inv-decorations i');
                    decLeafs.forEach(leaf => {
                        leaf.style.color = config.decorColor;
                    });

                    // Update action buttons inside phone
                    const acceptBtn = dynamicCard.querySelector('.live-action-btn.accept');
                    if (acceptBtn) {
                        acceptBtn.style.background = config.btnAcceptBg;
                        acceptBtn.style.color = '#ffffff';
                    }
                    
                    // Simple shake preview animation
                    dynamicCard.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        dynamicCard.style.transform = 'scale(1)';
                    }, 200);
                }

            }, 1800); // Simulated delay for AI model processing
        });
    }

    // --- 5. Canlı LCV (RSVP) Simülasyonu ---
    const simulateAcceptBtn = document.getElementById('simulate-accept');
    const simulateDeclineBtn = document.getElementById('simulate-decline');
    const rsvpGuestName = document.getElementById('rsvp-guest-name');
    const countAccept = document.getElementById('count-accept');
    const countDecline = document.getElementById('count-decline');
    const barAccept = document.getElementById('bar-accept');
    const barDecline = document.getElementById('bar-decline');
    const repliesList = document.getElementById('replies-list');

    let currentAccept = 24;
    let currentDecline = 6;

    function updateRsvpStats() {
        const total = currentAccept + currentDecline;
        if (countAccept) countAccept.textContent = currentAccept;
        if (countDecline) countDecline.textContent = currentDecline;

        if (barAccept && barDecline && total > 0) {
            const acceptPct = (currentAccept / total) * 100;
            const declinePct = (currentDecline / total) * 100;
            barAccept.style.width = `${acceptPct}%`;
            barDecline.style.width = `${declinePct}%`;
        }
    }

    function addReplyToList(name, isAttending) {
        if (!repliesList) return;
        const newLi = document.createElement('li');
        newLi.style.opacity = '0';
        newLi.style.transform = 'translateX(-10px)';
        newLi.style.transition = 'all 0.3s ease';

        const statusClass = isAttending ? 'status-accept' : 'status-decline';
        const statusText = isAttending ? 'Katılıyor' : 'Katılamıyor';

        newLi.innerHTML = `<span class="name">${name}</span> <span class="status ${statusClass}">${statusText}</span>`;
        
        // Insert at top of list
        repliesList.insertBefore(newLi, repliesList.firstChild);

        // Limit lists to 3 items
        if (repliesList.children.length > 3) {
            repliesList.removeChild(repliesList.lastChild);
        }

        // Trigger animation
        setTimeout(() => {
            newLi.style.opacity = '1';
            newLi.style.transform = 'translateX(0)';
        }, 50);
    }

    if (simulateAcceptBtn && simulateDeclineBtn) {
        simulateAcceptBtn.addEventListener('click', () => {
            const guestName = rsvpGuestName.value.trim() || 'Gizemli Misafir';
            currentAccept++;
            updateRsvpStats();
            addReplyToList(guestName, true);
            rsvpGuestName.value = '';
        });

        simulateDeclineBtn.addEventListener('click', () => {
            const guestName = rsvpGuestName.value.trim() || 'Gizemli Misafir';
            currentDecline++;
            updateRsvpStats();
            addReplyToList(guestName, false);
            rsvpGuestName.value = '';
        });
    }

    // --- 6. Ortak Albüm Simülatörü ---
    const fileDropArea = document.getElementById('file-drop-area');
    const albumGrid = document.getElementById('album-grid');

    // Preset nice photos from Unsplash to load dynamically
    const presetAlbumPhotos = [
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=150&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=150&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=150&auto=format&fit=crop'
    ];

    // Load initial pictures
    if (albumGrid) {
        presetAlbumPhotos.forEach(src => {
            const newPhoto = document.createElement('div');
            newPhoto.className = 'demo-photo';
            newPhoto.style.backgroundImage = `url('${src}')`;
            albumGrid.appendChild(newPhoto);
        });
    }

    if (fileDropArea) {
        fileDropArea.addEventListener('click', () => {
            // Simply load a new beautiful wedding/party image from Unsplash to simulate photo insertion
            const mockPhotos = [
                'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1519225495810-7517c319b53b?q=80&w=200&auto=format&fit=crop'
            ];

            const randomIndex = Math.floor(Math.random() * mockPhotos.length);
            const chosenPhoto = mockPhotos[randomIndex];

            const newPhotoDiv = document.createElement('div');
            newPhotoDiv.className = 'demo-photo';
            newPhotoDiv.style.backgroundImage = `url('${chosenPhoto}')`;
            
            // Insert inside album grid
            if (albumGrid) {
                albumGrid.insertBefore(newPhotoDiv, albumGrid.firstChild);
                
                // Limit to 8 images total
                if (albumGrid.children.length > 8) {
                    albumGrid.removeChild(albumGrid.lastChild);
                }
            }
        });
    }

    // --- 7. Template Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards with smooth fade transition
            templateCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 8. Selection in Showcase Linked directly to Simulator ---
    window.selectTemplate = function(names, themeText, category) {
        // Find inputs and views
        const promptInput = document.getElementById('ai-prompt');
        const activeTabBtn = document.querySelector('.tab-btn[data-tab="ai-tab"]');
        
        if (promptInput) {
            promptInput.value = `${themeText} tarzında ${category === 'wedding' ? 'Düğün' : 'Etkinlik'} Davetiyesi: ${names}`;
        }
        
        // Set tab to AI Creator
        if (activeTabBtn) {
            activeTabBtn.click();
        }

        // Scroll to simulator section
        const simulatorSection = document.getElementById('interactive-demo');
        if (simulatorSection) {
            simulatorSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Auto trigger builder click to show styling inside mobile
        setTimeout(() => {
            const generateBtn = document.getElementById('generate-ai-btn');
            if (generateBtn) {
                generateBtn.click();
            }
        }, 600);
    };

});

// --- 9. İletişim Formu Form submit logic (Real Formspree Integration) ---
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('main-contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const responseBox = document.getElementById('form-response');

    if (!form || !submitBtn || !responseBox) return;

    // Loading status
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Gather Form Data
    const data = new FormData(form);

    fetch('https://formspree.io/f/xnjrelgd', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        if (response.ok) {
            // Display beautiful glass success response
            responseBox.className = 'form-response-message success animate-pulse';
            responseBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Harika! Mesajınız Formspree üzerinden başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.';
            
            // Clear form
            form.reset();
        } else {
            // Display error if Formspree returns non-ok status
            responseBox.className = 'form-response-message error';
            responseBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Hata! Mesaj gönderilirken bir sorun oluştu. Lütfen bilgileri kontrol edip tekrar deneyin.';
        }

        // Clear response message after 6 seconds
        setTimeout(() => {
            responseBox.style.opacity = '0';
            setTimeout(() => {
                responseBox.className = 'form-response-message';
                responseBox.innerHTML = '';
                responseBox.style.opacity = '1';
            }, 300);
        }, 6000);
    })
    .catch(error => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Display network error response
        responseBox.className = 'form-response-message error';
        responseBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Hata! Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.';
    });
}
