let currentLanguage = 'en';
let isVoiceActive = false;
let recognitionActive = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

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
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        recognitionActive = true;
        speak('Listening for your command');
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript.toLowerCase();
        }
        processVoiceCommand(transcript);
    };

    recognition.onerror = function(event) {
        speak('Sorry, I did not understand. Please try again.');
    };

    recognition.onend = function() {
        recognitionActive = false;
    };

    recognition.start();
}

function processVoiceCommand(command) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (command.includes('dashboard')) {
        window.location.href = 'dashboard.html';
        speak('Going to dashboard');
        return;
    }
    if (command.includes('price')) {
        window.location.href = 'price-discovery.html';
        speak('Going to price discovery');
        return;
    }
    if (command.includes('analytics')) {
        window.location.href = 'market-analytics.html';
        speak('Going to market analytics');
        return;
    }
    if (command.includes('negotiation')) {
        window.location.href = 'negotiation.html';
        speak('Going to negotiation');
        return;
    }
    if (command.includes('profile')) {
        window.location.href = 'profile.html';
        speak('Going to profile');
        return;
    }

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

function handlePriceDiscoveryCommands(command) {
    const commoditySelect = document.getElementById('commodity');
    const quantityInput = document.getElementById('quantity');
    const regionSelect = document.getElementById('region');

    if (command.includes('wheat')) {
        if (commoditySelect) commoditySelect.value = 'wheat';
        speak('Commodity set to wheat');
        return;
    }
    if (command.includes('rice')) {
        if (commoditySelect) commoditySelect.value = 'rice';
        speak('Commodity set to rice');
        return;
    }
    if (command.includes('cotton')) {
        if (commoditySelect) commoditySelect.value = 'cotton';
        speak('Commodity set to cotton');
        return;
    }
    if (command.includes('sugarcane')) {
        if (commoditySelect) commoditySelect.value = 'sugarcane';
        speak('Commodity set to sugarcane');
        return;
    }

    const quantityMatch = command.match(/(\d+)\s*(kg|kilogram)/);
    if (quantityMatch && quantityInput) {
        quantityInput.value = quantityMatch[1];
        speak('Quantity set to ' + quantityMatch[1]);
        return;
    }

    const regions = ['punjab', 'haryana', 'maharashtra', 'karnataka', 'madhya pradesh', 'uttar pradesh', 'bihar', 'west bengal', 'tamil nadu', 'telangana', 'andhra pradesh', 'rajasthan', 'gujarat', 'kerala', 'jharkhand', 'chhattisgarh', 'assam', 'himachal pradesh', 'uttarakhand', 'goa', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'sikkim', 'tripura'];
    
    for (let region of regions) {
        if (command.includes(region)) {
            if (regionSelect) regionSelect.value = region.replace(' ', '-');
            speak('Region set to ' + region);
            return;
        }
    }

    if (command.includes('discover')) {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit'));
        speak('Discovering price');
        return;
    }

    speak('Price discovery command not recognized');
}

function handleNegotiationCommands(command) {
    const buyerOfferInput = document.getElementById('buyerOffer');
    const expectedPriceInput = document.getElementById('expectedPrice');

    const buyerMatch = command.match(/buyer.*?(\d+)/i);
    if (buyerMatch && buyerOfferInput) {
        buyerOfferInput.value = buyerMatch[1];
        speak('Buyer offer set to ' + buyerMatch[1]);
        return;
    }

    const priceMatch = command.match(/price.*?(\d+)/i);
    if (priceMatch && expectedPriceInput) {
        expectedPriceInput.value = priceMatch[1];
        speak('Expected price set to ' + priceMatch[1]);
        return;
    }

    if (command.includes('tips')) {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit'));
        speak('Getting negotiation tips');
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
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'ta': 'ta-IN',
            'te': 'te-IN',
            'bn': 'bn-IN',
            'mr': 'mr-IN'
        };
        utterance.lang = langMap[currentLanguage] || 'en-US';
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
