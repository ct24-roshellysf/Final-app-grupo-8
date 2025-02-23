
//conexión de thingSpeak con la app 
const channelId = '1468268'; // ESTE ID SOLO SE UTILIZA SI SU THINGSPREAK ES PRIVADO Y EL ID ES DIFERENTE PARA CADA PROYECTO 
const apiKey = 'HNTC2KF80L2RE9X5';

async function fetchThingSpeakData() {
    try {
        console.log('Intentando obtener datos de ThingSpeak...');
        const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=20`;  //URL DE LA PÁGINA DE THINGSPEAK DONDE CREARON LA CONEXIÓN CON SUS SENSORES
        console.log('URL de la petición:', url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (!data.feeds || data.feeds.length === 0) {
            throw new Error('No se recibieron datos de ThingSpeak');
        }
        
        return data.feeds;
    } catch (error) {
        console.error('Error al obtener datos de ThingSpeak:', error);
        // Mostrar el error en la página
        document.getElementById('error-message').textContent = 
            `Error: ${error.message}. Por favor, revisa la consola para más detalles.`;
        throw error;
    }
}