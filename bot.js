const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

// 🔹 Stringa di connessione a MongoDB (SOSTITUISCI SE NECESSARIO)
const MONGO_URI = "mongodb://mongo:SFKLadxgZETzjtakyaUNGjlJKEeHgTbL@roundhouse.proxy.rlwy.net:44625";

// ✅ Funzione per connettersi a MongoDB
async function connectMongoDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connesso a MongoDB');

        // 🔹 Inizializza il MongoStore dopo che la connessione è attiva
        const store = new MongoStore({ mongoose });

        // 🔹 Avvia il bot di WhatsApp
        startWhatsAppBot(store);
    } catch (error) {
        console.error('❌ Errore nella connessione a MongoDB:', error);
    }
}

// ✅ Funzione per avviare il bot
function startWhatsAppBot(store) {
    const client = new Client({
        authStrategy: new RemoteAuth({ store: store, backupSyncIntervalMs: 300000 }), // Salva la sessione ogni 5 minuti
        puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    });

    // 🔹 Mostra il QR code per la connessione
    client.on('qr', (qr) => {
        console.log('Scansiona questo QR code con WhatsApp per connettere il bot:');
        qrcode.generate(qr, { small: true });
        console.log('\nStringa alfanumerica per generare il QR code manualmente:');
        console.log(qr);
    });

    // 🔹 Il bot è pronto
    client.on('ready', () => {
        console.log('✅ Il bot è connesso a WhatsApp!');
    });

    // ✅ Gestione dei messaggi
    client.on('message', async (message) => {
        const triggerNumber = '393479569137@c.us'; // Numero specifico con formato WhatsApp
        const sender = message.author || message.from; // Mittente del messaggio (gruppo o privato)

        // 🔹 Gestione messaggi vocali
        if (sender === triggerNumber && message.type === 'ptt') { // "ptt" indica i messaggi vocali
            message.reply("statt zitt strunz... non fare il minkione");
            return;
        }

        // 🔹 Risposta se il messaggio contiene "claudio" (non case sensitive)
        if (message.body && message.body.toLowerCase().includes('claudio')) {
            message.reply("il Minkione");
            return;
        }

        // 🔹 Risposta casuale ai messaggi di testo del numero specifico
        if (sender === triggerNumber && message.body) {
            const risposte = ["accirete", "strunz", "minkione"];
            const risposta = risposte[Math.floor(Math.random() * risposte.length)];
            message.reply(risposta);
            return;
        }

        // 🔹 Gestione dei messaggi contenenti immagini
        if (sender === triggerNumber && message.type === 'image') { // "image" indica i messaggi con immagini
            message.reply("Accirete strunz nun romper o cazz");
            return;
        }
    });

    client.initialize();
}

// 🔄 Avvia la connessione a MongoDB e poi il bot
connectMongoDB();
