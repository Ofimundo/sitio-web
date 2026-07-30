// Estado del chat
let chatState = {
    step: 0,
    productType: null,
    productLabel: null,
    answers: []
};

// Estado visual del chat
let chatExpanded = false;

// Flujo de conversación por producto
const conversationFlows = {
    initial: {
        message: "¡Hola! 👋 Soy tu asistente de Ofimundo. Estoy aquí para ayudarte a encontrar el producto perfecto para tu negocio. ¿Qué tipo de equipo estás buscando?",
        options: [
            { id: "impresora", label: "🖨️ Impresora", emoji: "🖨️" },
            { id: "notebook", label: "💻 Notebook", emoji: "💻" },
            { id: "scanner", label: "📄 Scanner", emoji: "📄" },
            { id: "monitor", label: "🖥️ Monitor", emoji: "🖥️" }
        ]
    },
    impresora: [
        {
            message: "¡Excelente elección! Las impresoras son fundamentales para cualquier oficina. 🖨️\n\n¿Qué tamaño de papel utilizas principalmente?",
            options: [
                { id: "a4", label: "📄 A4 (Estándar)" },
                { id: "oficio", label: "📋 Oficio/Legal" },
                { id: "a3", label: "📰 A3 (Grande)" },
                { id: "varios", label: "🔄 Varios tamaños" }
            ]
        },
        {
            message: "Perfecto, eso me ayuda a filtrar mejor. 📊\n\n¿Aproximadamente cuántas páginas imprimes al mes?",
            options: [
                { id: "bajo", label: "📉 Menos de 500" },
                { id: "medio", label: "📈 500 - 2,000" },
                { id: "alto", label: "🚀 2,000 - 5,000" },
                { id: "muy-alto", label: "⚡ Más de 5,000" }
            ]
        },
        {
            message: "Una última pregunta: ¿Necesitas funciones adicionales? 🤔",
            options: [
                { id: "solo-impresion", label: "Solo impresión" },
                { id: "multifuncion", label: "Multifunción (copia/scan)" },
                { id: "wifi", label: "Conexión WiFi" },
                { id: "todas", label: "Todas las anteriores" }
            ]
        }
    ],
    notebook: [
        {
            message: "¡Los notebooks son esenciales para el trabajo moderno! 💻\n\n¿Cuál será el uso principal del equipo?",
            options: [
                { id: "oficina", label: "🏢 Trabajo de oficina" },
                { id: "diseño", label: "🎨 Diseño gráfico" },
                { id: "programacion", label: "👨‍💻 Programación" },
                { id: "multimedia", label: "🎬 Edición multimedia" }
            ]
        },
        {
            message: "Entendido. La portabilidad es importante. 🎒\n\n¿Qué tamaño de pantalla prefieres?",
            options: [
                { id: "13", label: "📱 13-14\" (Ultra portátil)" },
                { id: "15", label: "💻 15.6\" (Balance ideal)" },
                { id: "17", label: "🖥️ 17\" (Máximo espacio)" },
                { id: "indif", label: "🤷 Sin preferencia" }
            ]
        },
        {
            message: "¿Qué tan importante es la duración de la batería? 🔋",
            options: [
                { id: "muy", label: "🔋 Muy importante (+8hrs)" },
                { id: "moderado", label: "⚡ Moderado (5-8hrs)" },
                { id: "no-importa", label: "🔌 No importa mucho" },
                { id: "siempre-enchufado", label: "🏠 Siempre enchufado" }
            ]
        }
    ],
    scanner: [
        {
            message: "¡Los scanners son geniales para digitalizar tu oficina! 📄\n\n¿Qué tipo de documentos necesitas escanear principalmente?",
            options: [
                { id: "docs", label: "📋 Documentos y contratos" },
                { id: "fotos", label: "📷 Fotografías" },
                { id: "libros", label: "📚 Libros y revistas" },
                { id: "mixto", label: "🔄 Un poco de todo" }
            ]
        },
        {
            message: "Interesante. El volumen de escaneo es importante. 📊\n\n¿Cuántos documentos escaneas típicamente por sesión?",
            options: [
                { id: "pocos", label: "📄 1-10 páginas" },
                { id: "moderado", label: "📑 10-50 páginas" },
                { id: "muchos", label: "📚 Más de 50 páginas" },
                { id: "continuo", label: "⚡ Flujo continuo" }
            ]
        },
        {
            message: "¿Necesitas que el scanner sea portátil o será de escritorio? 🤔",
            options: [
                { id: "portatil", label: "🎒 Portátil" },
                { id: "escritorio", label: "🏢 De escritorio" },
                { id: "ambos", label: "🔄 Me sirven ambos" }
            ]
        }
    ],
    monitor: [
        {
            message: "¡Un buen monitor hace toda la diferencia! 🖥️\n\n¿Qué resolución necesitas?",
            options: [
                { id: "fhd", label: "📺 Full HD (1080p)" },
                { id: "2k", label: "🖥️ 2K / QHD" },
                { id: "4k", label: "✨ 4K UHD" },
                { id: "ultrawide", label: "📐 Ultra Wide" }
            ]
        },
        {
            message: "Perfecto. ¿Cuál será el uso principal del monitor? 🎯",
            options: [
                { id: "oficina", label: "🏢 Trabajo de oficina" },
                { id: "gaming", label: "🎮 Gaming" },
                { id: "diseño", label: "🎨 Diseño y color" },
                { id: "video", label: "🎬 Edición de video" }
            ]
        },
        {
            message: "¿Qué tamaño de pantalla te interesa? 📏",
            options: [
                { id: "24", label: "📺 24\" (Compacto)" },
                { id: "27", label: "🖥️ 27\" (Popular)" },
                { id: "32", label: "📺 32\" (Grande)" },
                { id: "34plus", label: "🖥️ 34\"+ (Muy grande)" }
            ]
        }
    ]
};

// Productos de ejemplo
const products = [
    { id: 1, name: "HP LaserJet Pro MFP M428", type: "impresora", price: "$489.990", desc: "Multifunción láser para oficinas medianas", tags: ["láser", "wifi", "duplex"], match: 95 },
    { id: 2, name: "Epson EcoTank L3250", type: "impresora", price: "$279.990", desc: "Sistema de tinta continua económico", tags: ["tinta", "wifi", "económica"], match: 88 },
    { id: 3, name: "Canon PIXMA G6020", type: "impresora", price: "$349.990", desc: "Calidad fotográfica con tanque de tinta", tags: ["foto", "tinta", "color"], match: 82 },
    { id: 4, name: "Dell Latitude 5540", type: "notebook", price: "$899.990", desc: "Notebook empresarial Intel i5 13th Gen", tags: ["empresarial", "15.6\"", "i5"], match: 94 },
    { id: 5, name: "HP ProBook 450 G10", type: "notebook", price: "$1.099.990", desc: "Potencia profesional con Intel Core i7", tags: ["profesional", "i7", "16GB"], match: 91 },
    { id: 6, name: "Lenovo ThinkPad E15", type: "notebook", price: "$849.990", desc: "Durabilidad empresarial ThinkPad", tags: ["robusto", "empresarial"], match: 87 },
    { id: 7, name: "Fujitsu ScanSnap iX1600", type: "scanner", price: "$549.990", desc: "Scanner documental de alta velocidad", tags: ["rápido", "wifi", "ADF"], match: 96 },
    { id: 8, name: "Epson WorkForce ES-580W", type: "scanner", price: "$429.990", desc: "Escaneo dúplex automático", tags: ["dúplex", "portátil"], match: 89 },
    { id: 9, name: "Samsung ViewFinity S8 27\"", type: "monitor", price: "$649.990", desc: "Monitor 4K profesional USB-C", tags: ["4K", "USB-C", "IPS"], match: 93 },
    { id: 10, name: "LG UltraGear 27GP850", type: "monitor", price: "$549.990", desc: "Monitor gaming 165Hz Nano IPS", tags: ["gaming", "165Hz", "1ms"], match: 90 },
    { id: 11, name: "Dell UltraSharp U2723QE", type: "monitor", price: "$799.990", desc: "IPS Black para negros profundos", tags: ["4K", "diseño", "USB-C"], match: 88 },
];

function expandChat() {
    if (chatExpanded) return;

    const container = document.getElementById('chatContainer');
    container.classList.remove('chat-compact');
    container.classList.add('chat-expanded');

    chatExpanded = true;
}

// Iniciar chat
function initChat() {
    addAssistantMessage(conversationFlows.initial.message);
    showQuickReplies(conversationFlows.initial.options, handleProductTypeSelection);
}

// Agregar mensaje del asistente
function addAssistantMessage(text, isProducts = false) {
    const chatArea = document.getElementById('chatArea');
    
    // Mostrar indicador de escritura
    const typingDiv = document.createElement('div');
    typingDiv.className = 'flex items-start gap-3';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="w-8 h-8 bg-gradient-to-br from-ofimundo-purple to-ofimundo-magenta rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
        </div>
        <div class="assistant-bubble p-4">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatArea.appendChild(typingDiv);
    scrollToBottom();
    
    // Simular tiempo de escritura y mostrar mensaje
    setTimeout(() => {
        typingDiv.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start gap-3 chat-bubble';
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-ofimundo-purple to-ofimundo-magenta rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
            </div>
            <div class="assistant-bubble p-4 max-w-md">
                <p class="text-ofimundo-navy whitespace-pre-line">${text}</p>
            </div>
        `;
        chatArea.appendChild(messageDiv);
        scrollToBottom();
    }, 800);
}

// Agregar mensaje del usuario
function addUserMessage(text) {
    const chatArea = document.getElementById('chatArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start gap-3 justify-end chat-bubble';
    messageDiv.innerHTML = `
        <div class="user-bubble p-4 max-w-md">
            <p class="whitespace-pre-line">${text}</p>
        </div>
    `;
    chatArea.appendChild(messageDiv);
    scrollToBottom();
}

// Mostrar opciones de respuesta rápida
function showQuickReplies(options, callback) {
    const quickRepliesArea = document.getElementById('quickRepliesArea');
    
    setTimeout(() => {
        quickRepliesArea.innerHTML = `
            <p class="text-xl text-gray-500 mb-3 text-center">Selecciona una opción:</p>
            <div class="flex flex-wrap justify-center gap-2">
                ${options.map(opt => `
                    <button
                        class="quick-reply px-4 py-2 
                                border-2 border-gray-200 
                                rounded-full text-sm font-medium 
                                text-ofimundo-navy 
                                bg-white
                                hover:bg-gradient-to-br 
                                hover:from-[var(--ofimundo-purple)] 
                                hover:to-[var(--ofimundo-magenta)] 
                                hover:text-white 
                                hover:border-transparent 
                                transition-all"
                        data-id="${opt.id}" 
                        data-label="${opt.label}">
                        <span>${opt.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Agregar event listeners
        quickRepliesArea.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const label = btn.dataset.label;
                callback(id, label);
            });
        });
    }, 1200);
}

// Manejar selección de tipo de producto
function handleProductTypeSelection(id, label) {

    expandChat(); // 👈 aquí

    chatState.productType = id;
    chatState.productLabel = label;
    chatState.step = 0;

    addUserMessage(label);
    clearQuickReplies();
    document.getElementById('restartBtn').classList.remove('hidden');

    setTimeout(() => {
        askNextQuestion();
    }, 500);
}

// Preguntar siguiente pregunta
function askNextQuestion() {
    const flow = conversationFlows[chatState.productType];
    
    if (chatState.step < flow.length) {
        const question = flow[chatState.step];
        addAssistantMessage(question.message);
        showQuickReplies(question.options, handleAnswer);
    } else {
        // Mostrar resultados
        showProductResults();
    }
}

// Manejar respuesta
function handleAnswer(id, label) {
    chatState.answers.push({ id, label });
    chatState.step++;
    
    addUserMessage(label);
    clearQuickReplies();
    
    setTimeout(() => {
        askNextQuestion();
    }, 500);
}

// Mostrar resultados de productos
function showProductResults() {
    const filtered = products.filter(p => p.type === chatState.productType);
    
    addAssistantMessage("¡Perfecto! Basado en tus respuestas, he encontrado estas opciones ideales para ti: 🎉");
    
    setTimeout(() => {
        const chatArea = document.getElementById('chatArea');
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'chat-bubble';
        resultsDiv.innerHTML = `
            <div class="grid grid-cols-1 gap-4 ml-11">
                ${filtered.slice(0, 3).map(product => `
                    <div class="product-chat-card bg-white border border-gray-200 rounded-2xl overflow-hidden">
                        <div class="flex">
                            <div class="w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                                <svg class="w-10 h-10 text-ofimundo-purple opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="p-4 flex-1">
                                <div class="flex items-start justify-between mb-1">
                                    <h4 class="font-bold text-ofimundo-navy text-sm">${product.name}</h4>
                                    <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">${product.match}%</span>
                                </div>
                                <p class="text-xs text-gray-500 mb-2">${product.desc}</p>
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-ofimundo-magenta">${product.price}</span>
                                    <a href="02.detalle.html"
                                    class="px-3 py-1 bg-ofimundo-navy text-white text-xs rounded-lg hover:opacity-90 transition">
                                        Ver Detalle
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        chatArea.appendChild(resultsDiv);
        scrollToBottom();
        
        // Mostrar opciones finales
        setTimeout(() => {
            addAssistantMessage("¿Te gustaría ver más opciones o hacer una nueva búsqueda? 🔍");
            showFinalOptions();
        }, 1000);
    }, 1200);
}

// Mostrar opciones finales
function showFinalOptions() {
    const quickRepliesArea = document.getElementById('quickRepliesArea');
    
    setTimeout(() => {
        quickRepliesArea.innerHTML = `
            <div class="flex flex-wrap justify-center gap-3">
                <button class="px-6 py-3 bg-ofimundo-magenta text-white rounded-full text-sm font-medium hover:opacity-90 transition" onclick="restartChat()">
                    🔄 Nueva búsqueda
                </button>
                <button class="px-6 py-3 border-2 border-ofimundo-navy text-ofimundo-navy rounded-full text-sm font-medium hover:bg-ofimundo-navy">
                    📋 Ver catálogo completo
                </button>
                <button class="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:border-ofimundo-magenta hover:text-ofimundo-magenta transition">
                    💬 Hablar con un asesor
                </button>
            </div>
        `;
    }, 1200);
}

// Limpiar opciones de respuesta rápida
function clearQuickReplies() {
    document.getElementById('quickRepliesArea').innerHTML = '';
}

// Scroll al final del chat
function scrollToBottom() {
    const chatArea = document.getElementById('chatArea');
    setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 100);
}

// Reiniciar chat
function restartChat() {
    chatState = {
        step: 0,
        productType: null,
        productLabel: null,
        answers: []
    };
    
    document.getElementById('chatArea').innerHTML = '';
    document.getElementById('restartBtn').classList.add('hidden');
    clearQuickReplies();
    
    initChat();
}

// Iniciar cuando carga la página
document.addEventListener('DOMContentLoaded', initChat);