document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    // Generic Typing Effect Function
    // This function applies a typewriter effect to a specified element ID.
    // It dynamically creates and manages a blinking cursor at the end of the typed text.,

    function initializeFormHandler() {
        const form = document.querySelector("form[action^='https://formspree.io/f/']");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // normal yönlendirmeyi engelle
            
            const statusEl = document.createElement("p");
            statusEl.classList.add("mt-2", "text-sm");
            form.appendChild(statusEl);

            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusEl.textContent = "✅ Mesajınız başarıyla gönderildi!";
                    statusEl.classList.add("text-green-400");
                    form.reset();
                } else {
                    statusEl.textContent = "❌ Bir hata oluştu. Tekrar deneyin.";
                    statusEl.classList.add("text-red-400");
                }
            } catch (error) {
                statusEl.textContent = "⚠️ Sunucuya ulaşılamadı.";
                statusEl.classList.add("text-yellow-400");
            }
        });
    }
    function applyTypingEffect(elementId, textToType, speed = 50) { // Speed increased to 100ms for slower typing
        const textElement = document.getElementById(elementId);
        if (!textElement) return; // If the element does not exist, exit the function.

        // Clear previous content and any existing cursor within the textElement.
        textElement.innerHTML = ''; 
        
        let charIndex = 0;

        // Create and append the cursor span once.
        // This span will be dynamically moved as text is typed.
        let cursorSpan = document.createElement('span');
        cursorSpan.classList.add('typing-cursor'); // Apply CSS class for cursor styling and blinking.
        textElement.appendChild(cursorSpan); // Append to the textElement (the span with the ID).

        function typeWriter() {
            if (charIndex < textToType.length) {
                // Create a new text node for the character
                const charNode = document.createTextNode(textToType.charAt(charIndex));
                // Insert the new character right before the cursorSpan
                textElement.insertBefore(charNode, cursorSpan);
                charIndex++;
                setTimeout(typeWriter, speed);
            } else {
                // Typing finished. The cursor remains visible and continues to blink via CSS.
            }
        }
        typeWriter(); // Start the typing animation.
    }

    // Function to load content with animation for smooth page transitions.
    const loadContent = async (url) => {
        if (contentArea) {
            contentArea.classList.add('is-fading-out'); // Apply fade-out effect.
        }

        // Allow time for fade-out animation before fetching new content.
        setTimeout(async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();

                // Parse the fetched HTML to extract only the #content-area.
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContentElement = doc.getElementById('content-area');

                if (contentArea && newContentElement) {
                    // --- START: MODIFIED CODE ---
                    // Replace content more safely to prevent issues with form elements.
                    // Clear existing content
                    while (contentArea.firstChild) {
                        contentArea.removeChild(contentArea.lastChild);
                    }
                    // Append new content node by node
                    while (newContentElement.firstChild) {
                        contentArea.appendChild(newContentElement.firstChild);
                    }
                    // --- END: MODIFIED CODE ---
                } else if (contentArea) {
                    console.warn('Could not find #content-area in the fetched HTML. Loading full body content.');
                     // --- START: MODIFIED CODE ---
                    const newBody = doc.body;
                    // Clear existing content
                    while (contentArea.firstChild) {
                        contentArea.removeChild(contentArea.lastChild);
                    }
                    // Append new content node by node from the body
                    while (newBody.firstChild) {
                        contentArea.appendChild(newBody.firstChild);
                    }
                    // --- END: MODIFIED CODE ---
                }
                
                // Remove fade-out and add fade-in class for the new content.
                if (contentArea) {
                    contentArea.classList.remove('is-fading-out');
                    contentArea.classList.add('is-fading-in');

                    // Remove fade-in class after animation completes.
                    contentArea.addEventListener('animationend', () => {
                        contentArea.classList.remove('is-fading-in');
                    }, { once: true });
                }

                // Apply typing effect based on the loaded page's URL.
                // This ensures the correct title gets the typewriter effect.
                if (url.includes('index.html') || url === '/') {
                    applyTypingEffect('typing-text', "Yapay Zeka ile Geleceği Kodluyoruz");
                } else if (url.includes('about.html')) {
                    applyTypingEffect('typing-text-about', "Hakkımızda: Yapay Zeka Dünyasındaki Yolculuğumuz");
                } else if (url.includes('egitim-cozumleri.html')) {
                    applyTypingEffect('typing-text-egitim', "Eğitimde Yenilikçi Çözümler: Yapay Zeka Destekli Öğrenme Uygulaması");
                } else if (url.includes('beyin-mri-detay.html')) {
                    applyTypingEffect('typing-text-beyin-mri', "Beyin MRI Görüntülerine Göre Hastalık Tespiti ve Kişiselleştirilmiş Tedavi");
                } else if (url.includes('teknofest-detay.html')) {
                    applyTypingEffect('typing-text-teknofest', "Teknofest Yapay Zeka Projeleri");
                } else if (url.includes('teknofest-yarismalar-detay.html')) {
                    applyTypingEffect('typing-text-teknofest-yarismalar', "Teknofest Yarışma Detayları: Başarı Hikayemiz");
                } else if (url.includes('mersin-arge.html')) {
                    applyTypingEffect('typing-text-teknofest-ideathon', "Teknofest Travelx Ideathon: Rötar Süresi Tahmini");
                } else if (url.includes('istinye-hackathon-detay.html')) {
                    applyTypingEffect('typing-text-istinye-hackathon', "İstinye Üniversitesi DataMedX: Metin Tabanlı Kanser Türü Tespiti");
                } else if (url.includes('itu-hackathon-detay.html')) {
                    applyTypingEffect('typing-text-itu-hackathon', "İTÜ Mostra Hackathon: Kişiselleştirilmiş Reklamcılık");
                } else if (url.includes('yemek-tarifi-detay.html')) { // Yeni eklenen proje
                    applyTypingEffect('typing-text-yemek-tarifi', "Yapay Zeka Destekli Yemek Tarifi Projesi");
                } else if (url.includes('akciger-pnonomoni-detay.html')) { // Yeni eklenen proje
                    applyTypingEffect('typing-text-akciger-pnonomoni', "Akciğer X-Ray Görüntülerine Göre Pnömoni Tespiti");
                } else if (url.includes('genetik-diyabet-detay.html')) { // Yeni eklenen proje
                    applyTypingEffect('typing-text-genetik-diyabet', "Genetik Dizilimlere Göre Mutasyon Tespiti");
                } else if (url.includes('join-us.html')) { // Bize Katılın sayfası için eklenen yeni başlık
                    applyTypingEffect('typing-text-join-us', "Bize Katılın: Geleceği Birlikte İnşa Edelim");
                } else if (url.includes('events.html')) { // Etkinlikler sayfası yüklendiğinde slayt gösterisini başlat
                    initializeEventSlider();
                }
                else if (url.includes('air-pollution-detay.html')) {
                    applyTypingEffect('typing-text-air-pollution', "Hava Kirliliği Tahmini Yarışması");
                } else if (url.includes('cmi-yarismasi-detay.html')) {
                    applyTypingEffect('typing-text-cmi', "Tekrarlayan Davranış Tespiti");
                } else if (url.includes('landslide-detay.html')) {
                    applyTypingEffect('typing-text-landslide', "Heyelan Tespiti Yarışması");
                } else if (url.includes('libribrain-detay.html')) {
                    applyTypingEffect('typing-text-libribrain', "Felçli Beyin Analizi");
                } else if (url.includes('epilepsi.html')) { 
                    applyTypingEffect('typing-text-epilepsi', "Epilepsi Projemiz");
                } else if (url.includes('genetikprojesii.html')) { 
                    applyTypingEffect('typing-text-genetik', "Genetik Projemiz");
                } else if (url.includes('ultrasonprojesi.html')) { // Yeni eklenen ultrason projesi
                    applyTypingEffect('typing-text-ultrason', "Ultrason projemiz");
                }

                else if (url.includes('rotar-detay.html')) { // Yeni eklenen ultrason projesi
                    applyTypingEffect('typing-text-teknofest-ideathon', "Rötar Süresi Tahmini Projemiz");
                }


                else if (url.includes('fire.html')) { // Yeni eklenen ultrason projesi
                    applyTypingEffect('typing-text-yangin-tespiti', "Yangın Tespiti Projemiz");
                }

            } catch (error) {
                console.error('Error loading page content:', error);
                if (contentArea) {
                    contentArea.classList.remove('is-fading-out'); // Remove fade-out if an error occurs.
                }
            }
        }, 300); // Matching the CSS transition duration.
    };

    // Event listener for all elements with the 'page-link' class.
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.page-link'); // Find the closest ancestor with 'page-link' class.
        if (link) {
            e.preventDefault(); // Prevent default link behavior.
            const targetUrl = link.href;

            // Close mobile menu if open.
            if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('flex')) {
                mobileMenuOverlay.classList.remove('flex');
                mobileMenuOverlay.classList.add('hidden');
            }

            history.pushState(null, '', targetUrl); // Update browser history.
            loadContent(targetUrl); // Load new content.
        }
    });

    // Handle back/forward browser buttons to ensure content loads correctly.
    window.addEventListener('popstate', () => {
        loadContent(window.location.href);
    });

    // Mobile menu toggle functionality.
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('hidden');
                mobileMenuOverlay.classList.add('flex');
            }
        });
    }

    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', () => {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('flex');
                mobileMenuOverlay.classList.add('hidden');
            }
        });
    }

    // Etkinlik slayt gösterisi işlevselliği
    function initializeEventSlider() {
        const slider = document.getElementById('event-slider');
        const prevButton = document.getElementById('prev-event');
        const nextButton = document.getElementById('next-event');
        const eventDescriptionArea = document.getElementById('event-description');

        if (!slider || !prevButton || !nextButton || !eventDescriptionArea) {
            return; // Gerekli elementler yoksa fonksiyonu çalıştırma
        }

        const slides = Array.from(slider.children);
        let currentIndex = 0;

        const eventDetails = [
            {
                title: "Ataköy Gençlik Merkezindeyiz",
                description: "Ataköy Gençlik Merkezi'nde, üniversiteye yeni başlayan gençlere yönelik bir yapay zeka dersi verdik ve takımımızı tanıttık. Bu etkinlik sayesinde yapay zekanın sunduğu fırsatları gençlere aktarma şansı bulduk."
            },
            {
                title: "YTÜ Savunma Sanayi Zirvesindeyiz",
                description: "Yıldız Teknik Üniversitesi Savunma Sanayi Zirvesi'ne katılarak sektördeki son gelişmeleri yakından takip ettik. Bu zirve, gelecekteki projelerimiz için bize önemli bir vizyon kazandırdı."
            },
            {
                title: "Bilişim Vadisi Etkinliğindeyiz",
                description: "Bilişim Vadisi'nde düzenlenen etkinliğe katılarak teknoloji ve inovasyon dünyasının önde gelen isimleriyle bir araya geldik. Yeni fikirler ve potansiyel iş birlikleri için harika bir platform oldu."
            },
            {
                title: "İstinye Üniversitesi DatamedX Etkinliğindeyiz",
                description: "İstinye Üniversitesi'nin DatamedX etkinliğine katıldık ve burada birincilik elde etmenin gururunu yaşadık. Bu başarı, medikal alanda yapay zeka çözümlerine olan hakimiyetimizi bir kez daha kanıtladı."
            },
            {
                title: "Geleceğimiz Türkiye Etkinliğindeyiz",
                description: "Geleceğimiz Türkiye etkinliğinde, teknoloji ve geleceğe dair vizyonumuzu paylaştık. Bu etkinlik, toplumun farklı kesimleriyle etkileşim kurarak farkındalık yaratmamız için önemli bir fırsattı."
            },
            {
                title: "İstanbul Teknik Üniversitesindeyiz",
                description: "İstanbul Teknik Üniversitesi'nde düzenlenen derslere katılarak üniversite öğrencileriyle bir araya geldik. Bu deneyim, akademik bilgi ve pratik tecrübeyi birleştirerek öğrenci arkadaşlara ilham vermemizi sağladı."
            },
            {
                title: "İTÜ Mostra Hackathonundayız",
                description: "İTÜ Mostra Hackathonu'na katıldık ve jüri özel ödülü kazanarak yeteneklerimizi gösterdik. Bu ödül, inovatif yaklaşımımızın ve ekip çalışmamızın bir göstergesi oldu."
            },
            {
                title: "Dr. Sadi Konuk Eğitim ve Araştırma Hastanesindeyiz",
                description: "Mentörümüzle Dr. Sadi Konuk Eğitim ve Araştırma Hastanesi'nde buluşarak projelerimiz hakkında geri bildirimler aldık. Bu buluşma, sağlık teknolojileri alanındaki çalışmalarımızı daha da ileriye taşımamız için yol gösterici oldu."
            },
            {
                title: "Neuronauts Yapay Zeka Söyleşisi",
                description: "Neuronauts olarak bir yapay zeka söyleşisi düzenleyerek bilgi birikimimizi paylaştık. Katılımcılarla interaktif bir ortamda yapay zekanın geleceğini tartıştık."
            }
        ];


        function updateSlider() {
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
            updateEventDescription();
        }

        function updateEventDescription() {
            const currentEvent = eventDetails[currentIndex];
            
            // Metni değiştirmeden önce fade-out animasyonunu başlat
            eventDescriptionArea.classList.add('is-fading-out-text');

            // Fade-out tamamlandıktan sonra metni değiştir ve fade-in başlat
            setTimeout(() => {
                eventDescriptionArea.innerHTML = `
                    <h2>${currentEvent.title}</h2>
                    <p>${currentEvent.description}</p>
                `;
                eventDescriptionArea.classList.remove('is-fading-out-text');
                eventDescriptionArea.classList.add('is-fading-in-text');

                // Fade-in animasyonu bittikten sonra sınıfı kaldır
                eventDescriptionArea.addEventListener('animationend', () => {
                    eventDescriptionArea.classList.remove('is-fading-in-text');
                }, { once: true });
            }, 300); // CSS geçiş süresiyle eşleşmeli
        }

        // Önceki olay dinleyicilerini kaldır (eğer varsa)
        // Bu, aynı butonlara birden fazla dinleyici eklenmesini önler
        prevButton.removeEventListener('click', handlePrevClick);
        nextButton.removeEventListener('click', handleNextClick);

        function handlePrevClick() {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateSlider();
        }

        function handleNextClick() {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }

        // Yeni olay dinleyicilerini ekle
        prevButton.addEventListener('click', handlePrevClick);
        nextButton.addEventListener('click', handleNextClick);

        // Sayfa yüklendiğinde ilk etkinliği göster
        updateSlider();
    }

    // Initial load for the typing effects based on the current page's URL.
    // This ensures the effect runs when the page is first loaded directly (not via internal navigation).
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        applyTypingEffect('typing-text', "Yapay Zeka ile Geleceği Kodluyoruz");
    } else if (window.location.pathname.includes('about.html')) {
        applyTypingEffect('typing-text-about', "Hakkımızda: Yapay Zeka Dünyasındaki Yolculuğumuz");
    } else if (window.location.pathname.includes('egitim-cozumleri.html')) {
        applyTypingEffect('typing-text-egitim', "Eğitimde Yenilikçi Çözümler: Yapay Zeka Destekli Öğrenme Uygulaması");
    } else if (window.location.pathname.includes('beyin-mri-detay.html')) {
        applyTypingEffect('typing-text-beyin-mri', "Beyin MRI Görüntülerine Göre Hastalık Tespiti ve Kişiselleştirilmiş Tedavi");
    } else if (window.location.pathname.includes('teknofest-detay.html')) {
        applyTypingEffect('typing-text-teknofest', "Teknofest Yapay Zeka Projeleri");
    } else if (window.location.pathname.includes('teknofest-yarismalar-detay.html')) {
        applyTypingEffect('typing-text-teknofest-yarismalar', "Teknofest Yarışma Detayları: Başarı Hikayemiz");
    } else if (window.location.pathname.includes('mersin-arge.html')) {
        applyTypingEffect('typing-text-teknofest-ideathon', "Kardiyomegali Tespiti: Mersin Ar-Ge Yarışması");
    } else if (window.location.pathname.includes('istinye-hackathon-detay.html')) {
        applyTypingEffect('typing-text-istinye-hackathon', "İstinye Üniversitesi DataMedX: Metin Tabanlı Kanser Türü Tespiti");
    } else if (window.location.pathname.includes('itu-hackathon-detay.html')) {
        applyTypingEffect('typing-text-itu-hackathon', "İTÜ Mostra Hackathon: Kişiselleştirilmiş Reklamcılık");
    } else if (window.location.pathname.includes('yemek-tarifi-detay.html')) {
        applyTypingEffect('typing-text-yemek-tarifi', "Yapay Zeka Destekli Yemek Tarifi Projesi");
    } else if (window.location.pathname.includes('akciger-pnonomoni-detay.html')) {
        applyTypingEffect('typing-text-akciger-pnonomoni', "Akciğer X-Ray Görüntülerine Göre Pnömoni Tespiti");
    } else if (window.location.pathname.includes('genetik-diyabet-detay.html')) {
        applyTypingEffect('typing-text-genetik-diyabet', "Genetik Dizilimlere Göre Mutasyon Tespiti");
    } else if (window.location.pathname.includes('join-us.html')) {
        applyTypingEffect('typing-text-join-us', "Bize Katılın: Geleceği Birlikte İnşa Edelim");
    } else if (window.location.pathname.includes('air-pollution-detay.html')) {
        applyTypingEffect('typing-text-air-pollution', "Hava Kirliliği Tahmini Yarışması");
    } else if (window.location.pathname.includes('cmi-yarismasi-detay.html')) {
        applyTypingEffect('typing-text-cmi', "Tekrarlayan Davranış Tespiti");
    } else if (window.location.pathname.includes('landslide-detay.html')) {
        applyTypingEffect('typing-text-landslide', "Heyelan Tespiti Yarışması");
    } else if (window.location.pathname.includes('libribrain-detay.html')) {
        applyTypingEffect('typing-text-libribrain', "Felçli Beyin Analizi");
    } else if (window.location.pathname.includes('epilepsi.html')) {
        applyTypingEffect('typing-text-epilepsi', "Epilepsi Projemiz");
    } else if (window.location.pathname.includes('genetikprojesii.html')) {
        applyTypingEffect('typing-text-genetik', "Genetik Projemiz");
    } else if (window.location.pathname.includes('ultrasonprojesi.html')) {
        applyTypingEffect('typing-text-ultrason', "Ultrason projemiz");
    }
    else if (window.location.pathname.includes('rotar-detay.html')) {
        applyTypingEffect('typing-text-teknofest-ideathon', "Rötar Süresi Tahmini Projemiz");
    } 
    else if (window.location.pathname.includes('fire.html')) {
        applyTypingEffect('typing-text-yangin-tespiti', "Yangın Tespiti Projemiz");
    } 
    else if (window.location.pathname.includes('events.html')) {
        initializeEventSlider();
    }
    
    
initializeFormHandler();
});