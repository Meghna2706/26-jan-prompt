// Enhanced Voice Commands System with Multilingual Support
// Supports: English, Hindi, Tamil, Telugu, Bengali, Marathi

let currentLanguage = 'en';
let isVoiceActive = false;
let recognitionActive = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

// Language codes for speech recognition
const languageMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'bn': 'bn-IN',
    'mr': 'mr-IN'
};

// Voice command translations for all languages
const voiceCommands = {
    navigation: {
        en: ['dashboard', 'price', 'analytics', 'negotiation', 'profile', 'home'],
        hi: ['डैशबोर्ड', 'कीमत', 'विश्लेषण', 'वार्ता', 'प्रोफाइल', 'होम'],
        ta: ['டாஷ்போர்ட்', 'விலை', 'பகுப்பாய்வு', 'பேச்சுவார்த்தை', 'சுயவிவரம்', 'வீடு'],
        te: ['డ్యాష్‌బోర్డ్', 'ధర', 'విశ్లేషణ', 'చర్చ', 'ప్రొఫైల్', 'హోమ్'],
        bn: ['ড্যাশবোর্ড', 'মূল्य', 'বিশ্লেষণ', 'আলোচনা', 'প্রোফাইল', 'হোম'],
        mr: ['डॅशबोर्ड', 'किंमत', 'विश्लेषण', 'वाटाघाटी', 'प्रोफाइल', 'होम']
    },
    commodities: {
        en: ['wheat', 'rice', 'cotton', 'sugarcane'],
        hi: ['गेहूं', 'चावल', 'कपास', 'गन्ना'],
        ta: ['கோதுமை', 'அரிசி', 'பருத்தி', 'கரும்பு'],
        te: ['గోధుమ', 'బియ్యం', 'పత్తి', 'చెరకు'],
        bn: ['গম', 'চাল', 'তুলা', 'আখ'],
        mr: ['गहू', 'तांदूळ', 'कापूस', 'ऊस']
    },
    regions: {
        en: ['punjab', 'haryana', 'maharashtra', 'karnataka', 'madhya pradesh', 'uttar pradesh', 'bihar', 'west bengal', 'tamil nadu', 'telangana', 'andhra pradesh', 'rajasthan', 'gujarat', 'kerala', 'jharkhand', 'chhattisgarh', 'assam', 'himachal pradesh', 'uttarakhand', 'goa', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'sikkim', 'tripura', 'delhi'],
        hi: ['पंजाब', 'हरियाणा', 'महाराष्ट्र', 'कर्नाटक', 'मध्य प्रदेश', 'उत्तर प्रदेश', 'बिहार', 'पश्चिम बंगाल', 'तमिलनाडु', 'तेलंगाना', 'आंध्र प्रदेश', 'राजस्थान', 'गुजरात', 'केरल', 'झारखंड', 'छत्तीसगढ़', 'असम', 'हिमाचल प्रदेश', 'उत्तराखंड', 'गोवा', 'मणिपुर', 'मेघालय', 'मिजोरम', 'नागालैंड', 'ओडिशा', 'सिक्किम', 'त्रिपुरा', 'दिल्ली'],
        ta: ['பஞ்சாப்', 'ஹரியாணா', 'மகாராஷ்ட்ர', 'கர்நாடக', 'மத்திய பிரதேசம்', 'உத்தர பிரதேசம்', 'பிஹார்', 'மேற்கு வங்கம்', 'தமிழ்நாடு', 'தெலங்கானா', 'ஆந்திர பிரதேசம்', 'ராஜஸ்தான்', 'குஜராத்', 'கேரளா', 'ஜார்கண்ட்', 'சத்தீஸ்கர்', 'அசாம்', 'இமாச்சல் பிரதேசம்', 'உத்தரகாண்ட்', 'கோவா', 'மணிப்பூர்', 'மேகாலயா', 'மிஜோரம்', 'நாகாலாந்த்', 'ஒடிசா', 'சிக்கிம்', 'திரிபுரா', 'டெல்லி'],
        te: ['పంజాబ్', 'హరియాణ', 'మహారాష్ట్ర', 'కర్నాటక', 'మధ్య ప్రదేశ్', 'ఉత్తర ప్రదేశ్', 'బిహార్', 'పశ్చిమ బెంగాల్', 'తమిళనాడు', 'తెలంగాణ', 'ఆంధ్ర ప్రదేశ్', 'రాజస్థాన్', 'గుజరాత్', 'కేరళ', 'జార్కండ్', 'ఛత్తీసగఢ్', 'అసోమ్', 'హిమాచల్ ప్రదేశ్', 'ఉత్తరాఖండ్', 'గోవా', 'మణిపూర్', 'మెఘాలయ', 'మిజోరమ్', 'నాగాలాండ్', 'ఒడిశా', 'సిక్కిమ్', 'త్రిపుర', 'ఢిల్లీ'],
        bn: ['পাঞ্জাব', 'হরিয়ানা', 'মহারাষ্ট্র', 'কর্নাটক', 'মধ্য প্রদেश', 'উত্তর প্রদেश', 'বিহার', 'পশ্চিম বাংলা', 'তামিলনাডু', 'তেলেঙ্গানা', 'আন্ধ্র প্রদেশ', 'রাজস্থান', 'গুজরাত', 'কেরল', 'ঝাড়খণ্ড', 'ছত্তিসগড়', 'আসাম', 'হিমাচল প্রদেশ', 'উত্তরাখণ্ড', 'গোয়া', 'মণিপুর', 'মেঘালয়', 'মিজোরাম', 'নাগাল্যান্ড', 'ওডিশা', 'সিক্কিম', 'ত্রিপুরা', 'ঢাকা'],
        mr: ['पंजाब', 'हरियाणा', 'महाराष्ट्र', 'कर्नाटक', 'मध्य प्रदेश', 'उत्तर प्रदेश', 'बिहार', 'पश्चिम बंगाल', 'तामिळनाडु', 'तेलंगाना', 'आंध्र प्रदेश', 'राजस्थान', 'गुजरात', 'केरळ', 'झारखंड', 'छत्तीसगढ', 'असम', 'हिमाचल प्रदेश', 'उत्तरांचल', 'गोवा', 'मणिपूर', 'मेघालय', 'मिजोरम', 'नागालँड', 'ओडिशा', 'सिक्किम', 'त्रिपुरा', 'दिल्ली']
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
    speak('Language changed');
}

function updatePageLanguage() {
    document.querySelectorAll('[data-' + currentLanguage + ']').forEach(element => {
        const text = element.getAttribute('data-' + currentLanguage);
        if (text) {
            element.textContent = text;
        }
    });
}

function startVoiceRecognition() {
    if (!recognition) {
        alert('Voice recognition not supported. Please use Chrome, Edge, or Safari.');
        return;
    }

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageMap[currentLanguage] || 'en-US';

    recognition.onstart = function() {
        recognitionActive = true;
        speak('Listening for your command');
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript.toLowerCase();
        }
        console.log('Recognized:', transcript, 'Language:', currentLanguage);
        processVoiceCommand(transcript);
    };

    recognition.onerror = function(event) {
        console.error('Recognition error:', event.error);
        speak('Sorry, I did not understand. Please try again.');
    };

    recognition.onend = function() {
        recognitionActive = false;
    };

    recognition.start();
}

function processVoiceCommand(command) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Check navigation commands
    if (checkNavigationCommand(command)) {
        return;
    }

    // Page-specific commands
    if (currentPage.includes('price-discovery')) {
        handlePriceDiscoveryCommands(command);
        return;
    }

    if (currentPage.includes('negotiation')) {
        handleNegotiationCommands(command);
        return;
    }

    speak('Command not recognized');
}

function checkNavigationCommand(command) {
    const navCommands = voiceCommands.navigation[currentLanguage] || voiceCommands.navigation.en;
    
    for (let i = 0; i < navCommands.length; i++) {
        if (command.includes(navCommands[i])) {
            const engCommand = voiceCommands.navigation.en[i];
            
            if (engCommand === 'dashboard') {
                window.location.href = 'dashboard.html';
                speak('Going to dashboard');
                return true;
            }
            if (engCommand === 'price') {
                window.location.href = 'price-discovery.html';
                speak('Going to price discovery');
                return true;
            }
            if (engCommand === 'analytics') {
                window.location.href = 'market-analytics.html';
                speak('Going to market analytics');
                return true;
            }
            if (engCommand === 'negotiation') {
                window.location.href = 'negotiation.html';
                speak('Going to negotiation');
                return true;
            }
            if (engCommand === 'profile') {
                window.location.href = 'profile.html';
                speak('Going to profile');
                return true;
            }
            if (engCommand === 'home') {
                window.location.href = 'index.html';
                speak('Going to home');
                return true;
            }
        }
    }
    return false;
}

function handlePriceDiscoveryCommands(command) {
    const commoditySelect = document.getElementById('commodity');
    const quantityInput = document.getElementById('quantity');
    const regionSelect = document.getElementById('region');

    // Check commodity commands
    const commodities = voiceCommands.commodities[currentLanguage] || voiceCommands.commodities.en;
    const engCommodities = voiceCommands.commodities.en;
    
    for (let i = 0; i < commodities.length; i++) {
        if (command.includes(commodities[i])) {
            const engCommodity = engCommodities[i];
            if (commoditySelect) {
                commoditySelect.value = engCommodity;
                speak('Commodity set to ' + engCommodity);
            }
            return;
        }
    }

    // Check quantity commands
    const quantityMatch = command.match(/(\d+)\s*(kg|kilogram|किग्रा|कि\.ग्रा|கிலோ|కిలో|কেজি|किलो)/i);
    if (quantityMatch && quantityInput) {
        quantityInput.value = quantityMatch[1];
        speak('Quantity set to ' + quantityMatch[1]);
        return;
    }

    // Check region commands
    const regions = voiceCommands.regions[currentLanguage] || voiceCommands.regions.en;
    const engRegions = voiceCommands.regions.en;
    
    for (let i = 0; i < regions.length; i++) {
        if (command.includes(regions[i])) {
            const engRegion = engRegions[i];
            if (regionSelect) {
                regionSelect.value = engRegion.replace(' ', '-');
                speak('Region set to ' + engRegion);
            }
            return;
        }
    }

    // Check discover/search commands
    if (command.includes('discover') || command.includes('search') || command.includes('खोज') || command.includes('தேடல்') || command.includes('శోధన') || command.includes('খুঁজুন') || command.includes('शोध')) {
        const form = document.querySelector('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
            speak('Discovering price');
        }
        return;
    }

    speak('Price discovery command not recognized');
}

function handleNegotiationCommands(command) {
    const commoditySelect = document.getElementById('commodity');
    const buyerOfferInput = document.getElementById('buyerOffer');
    const expectedPriceInput = document.getElementById('expectedPrice');
    const quantityInput = document.getElementById('quantity');

    // Check commodity commands
    const commodities = voiceCommands.commodities[currentLanguage] || voiceCommands.commodities.en;
    const engCommodities = voiceCommands.commodities.en;
    
    for (let i = 0; i < commodities.length; i++) {
        if (command.includes(commodities[i])) {
            const engCommodity = engCommodities[i];
            if (commoditySelect) {
                commoditySelect.value = engCommodity;
                speak('Commodity set to ' + engCommodity);
            }
            return;
        }
    }

    // Check buyer offer commands - look for numbers
    const buyerMatch = command.match(/(\d+)/);
    if (buyerMatch) {
        // Check if it's a buyer offer command
        if (command.includes('buyer') || command.includes('offer') || command.includes('खरीदार') || command.includes('வாங்குபவர்') || command.includes('కొనుగోలుదారు') || command.includes('ক্রেতা') || command.includes('खरेदीदार')) {
            if (buyerOfferInput) {
                buyerOfferInput.value = buyerMatch[1];
                speak('Buyer offer set to ' + buyerMatch[1]);
            }
            return;
        }
        
        // Check if it's an expected price command
        if (command.includes('price') || command.includes('expected') || command.includes('कीमत') || command.includes('விலை') || command.includes('ధర') || command.includes('মূল्य') || command.includes('किंमत')) {
            if (expectedPriceInput) {
                expectedPriceInput.value = buyerMatch[1];
                speak('Expected price set to ' + buyerMatch[1]);
            }
            return;
        }

        // Check if it's a quantity command
        if (command.includes('kg') || command.includes('kilogram') || command.includes('किग्रा') || command.includes('कि\.ग्रा') || command.includes('கிலோ') || command.includes('కిలో') || command.includes('কেজি') || command.includes('किलो') || command.includes('quantity') || command.includes('मात्रा') || command.includes('அளவு') || command.includes('పరిమాణం') || command.includes('পরিমাণ') || command.includes('प्रमाण')) {
            if (quantityInput) {
                quantityInput.value = buyerMatch[1];
                speak('Quantity set to ' + buyerMatch[1]);
            }
            return;
        }
    }

    // Check tips/submit commands
    if (command.includes('tips') || command.includes('submit') || command.includes('सुझाव') || command.includes('குறிப்புகள்') || command.includes('చిట్కాలు') || command.includes('টিপস') || command.includes('सूचना') || command.includes('get') || command.includes('प्राप्त') || command.includes('பெறு') || command.includes('పొందండి') || command.includes('পান') || command.includes('मिळवा')) {
        const form = document.querySelector('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
            speak('Getting negotiation tips');
        }
        return;
    }

    speak('Negotiation command not recognized');
}

function toggleVoice() {
    isVoiceActive = !isVoiceActive;
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (isVoiceActive) {
        voiceBtn.style.backgroundColor = '#dc3545';
        voiceBtn.textContent = '🎤 Listening...';
        startVoiceRecognition();
    } else {
        voiceBtn.style.backgroundColor = '#2c3e50';
        voiceBtn.textContent = '🎤 Voice';
        if (recognition) recognition.stop();
        speak('Voice mode deactivated');
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageMap[currentLanguage] || 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        languageSelect.addEventListener('change', function(e) {
            changeLanguage(e.target.value);
        });
    }
    
    updatePageLanguage();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoice);
    }
});
