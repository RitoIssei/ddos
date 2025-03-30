import net from 'net';

const client = new net.Socket();
client.connect(80, '143.198.196.119', () => {
  console.log('Đã kết nối đến máy chủ TCP');
  // Gửi dữ liệu đến máy chủ
  client.write("GET /main.5b7006bd94a178d1.js HTTP/1.1\r\nHost: 143.198.196.119\r\nConnection: close\r\n\r\n");
});

client.on('data', (data) => {
  console.log('Dữ liệu nhận được từ máy chủ: ' + data);
  // Sau khi nhận dữ liệu, có thể đóng kết nối
  client.destroy();
});

client.on('close', () => {
  console.log('Kết nối đã đóng');
});

client.on('error', (err) => {
  console.error('Lỗi: ', err.message);
});
