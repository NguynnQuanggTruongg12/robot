document.getElementById('enable').addEventListener('change', function() {
    sendMQTTMessage('enable', this.checked ? '1' : '0');
});

document.getElementById('up').addEventListener('click', function() {
    sendMQTTMessage('direction', 'up');
});

document.getElementById('down').addEventListener('click', function() {
    sendMQTTMessage('direction', 'down');
});

document.getElementById('left').addEventListener('click', function() {
    sendMQTTMessage('direction', 'left');
});

document.getElementById('right').addEventListener('click', function() {
    sendMQTTMessage('direction', 'right');
});

document.getElementById('stop').addEventListener('click', function() {
    sendMQTTMessage('direction', 'stop');
});

document.getElementById('straightSpeedSlider').addEventListener('input', function() {
    document.getElementById('straightSpeed').textContent = this.value;
    sendMQTTMessage('straightSpeed', this.value);
});

document.getElementById('rotationSpeedSlider').addEventListener('input', function() {
    document.getElementById('rotationSpeed').textContent = this.value;
    sendMQTTMessage('rotationSpeed', this.value);
});

function sendMQTTMessage(topic, message) {
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic, message: message }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
