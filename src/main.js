document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const elements = {
        generateBtn: document.getElementById('generate-btn'),
        generateBtnText: document.getElementById('generate-btn-text'),
        generateBtnIcon: document.getElementById('generate-btn-icon'),
        generateBtnSpinner: document.getElementById('generate-btn-spinner'),
        promptInput: document.getElementById('prompt-input'),
        clearBtn: document.getElementById('clear-btn'),
        outputContainer: document.getElementById('output-container'),
        messageContent: document.getElementById('message-content'),
        imageOutputBg: document.getElementById('image-output-bg'),
        historyTray: document.getElementById('history-tray'),
        historyItems: document.getElementById('history-items'),
    };

    // --- The rest of your JavaScript is exactly the same as before ---

    // --- State Management ---
    let generationController = null;
    let generationHistory = [];
    const MAX_HISTORY = 5;

    // --- UI State Management ---
    const showMessage = (title, text, icon, isError = false) => {
        const errorColor = isError ? 'text-red-400' : '';
        const errorTitleColor = isError ? 'text-red-300' : 'gradient-text';
        elements.messageContent.innerHTML = `<div class="${errorColor}">${icon}<h3 class="mt-2 text-2xl font-semibold ${errorTitleColor}">${title}</h3><p class="mt-1 text-sm text-muted">${text}</p></div>`;
        elements.imageOutputBg.classList.remove('visible');
        elements.imageOutputBg.style.backgroundImage = '';
    };

    const showInitialMessage = () => showMessage(
        'Create with AI',
        'Describe any image you can imagine, and watch it come to life.',
        `<svg class="mx-auto h-16 w-16 gradient-text" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>`
    );

    const setLoadingState = (isLoading) => {
        elements.generateBtn.disabled = isLoading;
        elements.generateBtnIcon.classList.toggle('hidden', isLoading);
        elements.generateBtnSpinner.classList.toggle('hidden', !isLoading);
        if (isLoading) {
            elements.imageOutputBg.classList.remove('visible');
            elements.messageContent.innerHTML = `<div class="mx-auto w-12 h-12 border-4 border-[var(--accent-start)] border-t-transparent rounded-full animate-spin"></div><p class="mt-4 text-muted">Generating, please wait...</p>`;
        }
    };

    // --- API Call (Imagen) ---
    const generateImageAPI = async (prompt, signal) => {
    const API_URL = `/api/generate`; 
    const payload = { prompt: prompt };

    const response = await fetch(API_URL, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal,
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const result = await response.json();
    if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        return result.predictions[0].bytesBase64Encoded;
    } else {
        throw new Error("Invalid response format from API.");
    }
};

    // --- History Management ---
    // In src/main.js, replace the old renderHistory function with this one:

    const renderHistory = () => {
        elements.historyItems.innerHTML = '';
        if (generationHistory.length > 0) {
            elements.historyTray.classList.add('visible');
        }
        generationHistory.forEach((item, index) => {
            // Container for the image and button
            const container = document.createElement('div');
            container.className = 'history-item-container';

            const img = document.createElement('img');
            img.src = item.url;
            img.className = 'history-item h-14 w-14 object-cover rounded-md cursor-pointer';
            img.alt = item.prompt;
            if (item.selected) {
                img.classList.add('selected');
            }
            img.onclick = () => {
                generationHistory.forEach(h => h.selected = false);
                item.selected = true;
                elements.imageOutputBg.style.backgroundImage = `url(${item.url})`;
                elements.imageOutputBg.classList.add('visible');
                elements.promptInput.value = item.prompt;
                handleInput();
                renderHistory();
            };

            // download button
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn text-[10px] font-semibold h-4 w-14 rounded-sm';
            downloadBtn.textContent = 'Download';


            downloadBtn.onclick = (e) => {
                e.stopPropagation(); 
                const link = document.createElement('a');
                link.href = item.url;
                link.download = `${item.prompt.slice(0, 30).replace(/\s+/g, '_')}_${index}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

 
            container.appendChild(img);
            container.appendChild(downloadBtn);
            elements.historyItems.appendChild(container);
        });
    };

    const addToHistory = (prompt, url) => {
        generationHistory.forEach(item => item.selected = false);
        generationHistory.unshift({ prompt, url, selected: true });
        if (generationHistory.length > MAX_HISTORY) {
            generationHistory.pop();
        }
        renderHistory();
    };

    // --- Main Event Handler ---
    const handleGeneration = async () => {
        if (generationController) generationController.abort();
        generationController = new AbortController();
        const signal = generationController.signal;

        const prompt = elements.promptInput.value.trim();
        if (!prompt) return;

        setLoadingState(true);
        generationHistory.forEach(h => h.selected = false);
        renderHistory();

        try {
            const base64Data = await generateImageAPI(prompt, signal);
            const imageUrl = `data:image/png;base64,${base64Data}`;

            elements.imageOutputBg.style.backgroundImage = `url(${imageUrl})`;
            elements.imageOutputBg.classList.add('visible');
            elements.messageContent.innerHTML = '';
            addToHistory(prompt, imageUrl);

        } catch (error) {
            if (error.name === 'AbortError') return console.log('Request aborted.');
            console.error('Generation Error:', error);
            showMessage('Generation Failed', error.message, `<svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`, true);
        } finally {
            setLoadingState(false);
        }
    };

    // --- Input Field Enhancements ---
    const handleInput = () => {
        autoResizeTextarea();
        toggleClearButton();
    };
    const autoResizeTextarea = () => {
        elements.promptInput.style.height = 'auto';
        elements.promptInput.style.height = `${Math.min(elements.promptInput.scrollHeight, 128)}px`;
    };
    const toggleClearButton = () => elements.clearBtn.style.opacity = elements.promptInput.value.length > 0 ? '1' : '0';
    const clearInput = () => {
        elements.promptInput.value = '';
        elements.promptInput.focus();
        handleInput();
    };

    // --- Setup ---
    const initializeApp = () => {
        elements.generateBtn.addEventListener('click', () => {
            if (!elements.promptInput.value.trim()) {
                showMessage('Input Required', 'Please enter a prompt.', `<svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`, true);
                return;
            }
            handleGeneration();
        });
        elements.promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                elements.generateBtn.click();
            }
        });
        elements.promptInput.addEventListener('input', handleInput);
        elements.clearBtn.addEventListener('click', clearInput);

        toggleClearButton();
        showInitialMessage();
    };

    initializeApp();
});