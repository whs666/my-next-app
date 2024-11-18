// sendNotificationCron.ts
require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

const appToken = process.env.WXPUSHER_TOKEN;
const uid = process.env.WXPUSHER_UID;

// 定义发送通知的函数
const sendNotification = async () => {
  try {
    const url = 'http://wxpusher.zjiecode.com/api/send/message';

    const request = {
      appToken,
      content: '亲爱的，已经很晚了，请注意休息，早点睡觉对身体好！ 🌙',
      contentType: 1,
      uids: [uid],
    };

    const response = await axios.post(url, request);

    console.log('通知发送成功: ', new Date().toLocaleString());
    console.log('API 响应: ', response.data);
  } catch (error: any) {
    console.error('发送通知失败: ', error.message);
  }
};

// 设置定时任务
cron.schedule('20-59 6 * * *', () => {
  sendNotification();
}, {
  timezone: 'Asia/Shanghai'
});

// 立即执行一次
sendNotification();