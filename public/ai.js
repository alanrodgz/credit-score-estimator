
async function queryOpenAI(userInput) {
    try {
        const response = await fetch('/api/credit-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Creditworthiness result:', data.result);

        document.getElementById('result').innerText = data.result;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error occurred while fetching data';
    }
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value; git
    queryOpenAI(userInput);
});