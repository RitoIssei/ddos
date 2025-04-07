import net from 'net';

const client = new net.Socket();
client.connect(80, '143.198.196.119', () => {
  console.log('Đã kết nối đến máy chủ TCP');

  // Tạo payload lớn: 1 MB dữ liệu (1 MB = 1024 * 1024 bytes)
  const largePayload = 'A'.repeat(1024 * 1024 * 100);

  // Gửi HTTP request kèm payload lớn
  const requestData = "GET /main.5b7006bd94a178d1.js HTTP/1.1\r\n" +
                      "Host: 143.198.196.119\r\n" +
                      "Connection: close\r\n\r\n" +
                      largePayload;

  client.write(requestData);
});

client.on('data', (data) => {
  console.log('Dữ liệu nhận được từ máy chủ: ' + data);
  client.destroy();  // Đóng kết nối sau khi nhận dữ liệu
});

client.on('close', () => {
  console.log('Kết nối đã đóng');
});

client.on('error', (err) => {
  console.error('Lỗi: ', err.message);
});
