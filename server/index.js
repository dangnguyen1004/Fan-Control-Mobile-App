const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

// =============== MQTT ======================
const mqtt = require('mqtt');
const { json } = require('express');
const client = mqtt.connect('mqtt://io.adafruit.com', {
    username: 'NguyenDang',
    password: 'aio_eNFM803UDRYwKcCO0Cl57zEsiimE',
});

client.on('connect', () => {
    client.subscribe('NguyenDang/feeds/bk-iotled')
    console.log('Subscribe feeds/bk-iotled')
    client.subscribe('NguyenDang/feeds/bk-iottemp-humid')
    console.log('Subscribe feeds/bk-iottemp-humid')
    client.subscribe('NguyenDang/feeds/fan')
})

client.on('message', function (topic, message, packet) {
    // message is Buffer
    console.log('Receive data from topic: ' + topic.toString())
    console.log('Messages: ' + JSON.parse(message).name.toString())
})


app.get('/', (req, res) => {
    res.send('This is server of Fan Control Mobile App')
});

app.post('/api/:device', (req, res) => {
    const device = req.params.device
    console.log(req.body.data)
    sendControlData(device, req.body)
    res.status(200).json(req.body);
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}...`));



function sendControlData(device, data) {
    let topic = 'NguyenDang/feeds/bk-iotled';

    client.publish(topic, JSON.stringify(data));
}