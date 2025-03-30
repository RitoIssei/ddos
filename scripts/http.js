import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// // Mảng các proxy URL (chứa xác thực nếu cần)
// const proxies = [
//   'http://fplpyeee:q11chxki47ru@38.154.227.167:5868',
//   'http://fplpyeee:q11chxki47ru@38.153.152.244:9594',
//   'http://fplpyeee:q11chxki47ru@86.38.234.176:6630',
//   'http://fplpyeee:q11chxki47ru@173.211.0.148:6641',
//   'http://fplpyeee:q11chxki47ru@161.123.152.115:6360',
//   'http://fplpyeee:q11chxki47ru@216.10.27.159:6837',
//   'http://fplpyeee:q11chxki47ru@154.36.110.199:6853',
//   'http://fplpyeee:q11chxki47ru@45.151.162.198:6600',
//   'http://fplpyeee:q11chxki47ru@185.199.229.156:7492',
//   'http://fplpyeee:q11chxki47ru@185.199.228.220:7300'
// ];


// Mảng các proxy URL (chứa xác thực nếu cần)
const proxies = [
  'http://grvrbzcf:gitytu3rh9fc@38.154.227.167:5868',
  'http://grvrbzcf:gitytu3rh9fc@38.153.152.244:9594',
  'http://grvrbzcf:gitytu3rh9fc@86.38.234.176:6630',
  'http://grvrbzcf:gitytu3rh9fc@173.211.0.148:6641',
  'http://grvrbzcf:gitytu3rh9fc@161.123.152.115:6360',
  'http://grvrbzcf:gitytu3rh9fc@216.10.27.159:6837',
  'http://grvrbzcf:gitytu3rh9fc@154.36.110.199:6853',
  'http://grvrbzcf:gitytu3rh9fc@45.151.162.198:6600',
  'http://grvrbzcf:gitytu3rh9fc@185.199.229.156:7492',
  'http://grvrbzcf:gitytu3rh9fc@185.199.228.220:7300'
];

// Mảng các path cần truy cập
const paths = [
  '/main.5b7006bd94a178d1.js',
  '/styles.31c53bd6dcd6696c.css',
  '/4052.cd508436862493fe.js'
];

// Chọn ngẫu nhiên một proxy và một path từ các mảng
const randomProxyUrl = proxies[Math.floor(Math.random() * proxies.length)];
const randomPath = paths[Math.floor(Math.random() * paths.length)];

// console.log(`Sử dụng proxy: ${randomProxyUrl}`);
// console.log(`Sử dụng path: ${randomPath}`);

// Tạo agent cho proxy đã chọn
const agent = new HttpsProxyAgent(randomProxyUrl);

// Cấu hình các options cho request
const options = {
  hostname: 'smax.ai', // Host có thể là IP hoặc domain
  path: randomPath,
  method: 'GET',
  // agent: agent,
};

const req = http.request(options, (res) => {
  console.log(`Mã trạng thái: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    // Xử lý dữ liệu nhận được từ server nếu cần
    // console.log(`Dữ liệu nhận được: ${chunk}`);
  });
  res.on('end', () => {
    // console.log('Đã nhận hết dữ liệu phản hồi.');
  });
});

req.on('error', (e) => {
  console.error(`Lỗi khi gửi yêu cầu: ${e.message}`);
});

// Kết thúc yêu cầu
req.end();
