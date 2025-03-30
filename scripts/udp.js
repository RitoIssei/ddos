const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const message = Buffer.from('Xin chào, UDP server!');

// Gửi message tới máy chủ tại cổng 41234 và địa chỉ localhost
client.send(message, 0, message.length, 41234, 'localhost', (err) => {
  if (err) {
    console.error('Lỗi khi gửi UDP:', err);
  } else {
    console.log('Gói UDP đã được gửi');
  }
  client.close();
});
