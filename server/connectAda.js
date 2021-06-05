const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

// =============== MQTT ======================
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://io.adafruit.com', {
    username: 'NguyenDang',
    password: 'aio_lxJO32oydwFmK5J19lU9jpHt2Gbw',
});
