from flask import Flask, request, jsonify
import paho.mqtt.client as mqtt

app = Flask(__name__)

# MQTT settings
mqtt_broker = "mqtt.eclipseprojects.io"  # Thay bằng broker của bạn
mqtt_port = 1883
mqtt_topic_base = "robot/control/"

client = mqtt.Client()
client.connect(mqtt_broker, mqtt_port)

@app.route('/send', methods=['POST'])
def send_message():
    data = request.json
    topic = mqtt_topic_base + data.get('topic', 'unknown')
    message = data.get('message', '')
    
    if message:
        client.publish(topic, message)
        return jsonify(status="Message sent!"), 200
    else:
        return jsonify(status="Message not sent!"), 400

if __name__ == "__main__":
    app.run(debug=True)
