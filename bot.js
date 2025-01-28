const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    const qrcode = require('qrcode-terminal');
    console.log('Scansiona questo QR code con WhatsApp per connettere il bot:');
    qrcode.generate(qr, { small: true }); // Questo comando mostra il QR code nel terminale
});

client.on('ready', () => {
    console.log('Il bot è pronto!');
});

client.on('message', async (message) => {
    const triggerNumber = '393479569137@c.us'; // Numero specifico con formato WhatsApp
    const sender = message.author || message.from; // Mittente del messaggio (gruppo o privato)

    // Gestione dei messaggi vocali per il numero specifico
    if (sender === triggerNumber && message.type === 'ptt') { // "ptt" indica i messaggi vocali
        message.reply("statt zitt strunz... non fare il minkione");
        return; // Evita altre risposte per lo stesso messaggio
    }

    // Risposta se il messaggio contiene "claudio" (non case sensitive)
    if (message.body && message.body.toLowerCase().includes('claudio')) {
        message.reply("il Minkione");
        return; // Evita altre risposte per lo stesso messaggio
    }

    // Gestione dei messaggi di testo per il numero specifico
    if (sender === triggerNumber && message.body) {
        const risposte = ["accirete", "strunz", "minkione"];
        const risposta = risposte[Math.floor(Math.random() * risposte.length)];
        message.reply(risposta);
        return; // Evita altre risposte per lo stesso messaggio
    }

    // Gestione dei messaggi contenenti immagini
    if (sender === triggerNumber && message.type === 'image') { // "image" indica i messaggi con immagini
        message.reply("Accirete strunz nun romper o cazz");
        return; // Evita altre risposte per lo stesso messaggio
    }

});

client.initialize();
