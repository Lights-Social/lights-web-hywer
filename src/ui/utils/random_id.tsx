export default function generateRandomId() {
    const randomId = 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        
    return randomId
}