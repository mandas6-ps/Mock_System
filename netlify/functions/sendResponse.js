const fetch = require('isomorphic-fetch');

let previousResponse = null;

function generateMockResponse() {
    const randomNumber = Math.floor(Math.random() * 20);
    return `There are ${randomNumber} iPhones out of stock`;
}

async function triggerNetlifyWebhook() {
    const NETLIFY_WEBHOOK_URL = 'YOUR_NETLIFY_WEBHOOK_URL';
    try {
        const response = await fetch(NETLIFY_WEBHOOK_URL, {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Successfully triggered Netlify webhook');
        } else {
            console.log('Failed to trigger Netlify webhook');
        }
    } catch (error) {
        console.error('Error triggering Netlify webhook:', error);
    }
}

module.exports.handler = async function(event, context){
    const currentResponse = generateMockResponse();

    if (currentResponse !== previousResponse) {
        await triggerNetlifyWebhook();
        previousResponse = currentResponse;
    }

    return {
        statusCode: 200,
        body: 'Response sent to Netlify',
    };
}
