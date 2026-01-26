/**
 * Vercel Serverless Function для webhook Tilda
 * 
 * Деплой:
 * 1. Установите Vercel CLI: npm i -g vercel
 * 2. Запустите: vercel
 * 3. Добавьте переменные окружения: vercel env add TILDA_PUBLIC_KEY
 * 4. Укажите URL в Tilda: https://ваш-проект.vercel.app/tilda-webhook
 */

const axios = require('axios');

// Загружаем переменные окружения из Vercel
const TILDA_PUBLIC_KEY = process.env.TILDA_PUBLIC_KEY;
const TILDA_SECRET_KEY = process.env.TILDA_SECRET_KEY;
const TILDA_API_BASE = 'https://api.tildacdn.info/v1';

/**
 * Обработчик webhook
 * Vercel Serverless Function
 */
module.exports = async (req, res) => {
  // Tilda отправляет GET запрос
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Получаем параметры из запроса
  const { pageid, projectid, published, publickey } = req.query;

  console.log('🔔 Webhook получен от Tilda:', { 
    pageid, 
    projectid, 
    published, 
    publickey,
    timestamp: new Date().toISOString()
  });

  // Проверяем ключи
  if (!TILDA_PUBLIC_KEY || !TILDA_SECRET_KEY) {
    console.error('❌ Не указаны API ключи в переменных окружения');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Отвечаем Tilda сразу (в течение 5 секунд)
  res.status(200).send('ok');

  // Запускаем синхронизацию через GitHub Actions
  if (pageid && projectid) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // формат: owner/repo
    
    if (GITHUB_TOKEN && GITHUB_REPO) {
      // Триггерим GitHub Actions через repository_dispatch
      axios.post(
        `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
        {
          event_type: 'tilda-sync',
          client_payload: {
            pageid,
            projectid
          }
        },
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }
      )
      .then(() => {
        console.log(`✅ GitHub Actions запущен для синхронизации`);
      })
      .catch(error => {
        console.error(`❌ Ошибка запуска GitHub Actions:`, error.message);
      });
    } else {
      console.log(`ℹ️ GitHub Actions не настроен, синхронизация пропущена`);
    }
  }

  return;
};
