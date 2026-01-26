# Деплой webhook на бесплатный сервер

## Вариант 1: Vercel (Рекомендуется) ⭐

### Преимущества:
- ✅ Полностью бесплатно
- ✅ Автоматический HTTPS
- ✅ Постоянный URL
- ✅ Простая настройка
- ✅ Serverless (не нужно держать сервер включенным)

### Установка:

1. **Установите Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Войдите в Vercel:**
   ```bash
   vercel login
   ```

3. **Добавьте переменные окружения:**
   ```bash
   vercel env add TILDA_PUBLIC_KEY
   vercel env add TILDA_SECRET_KEY
   ```
   Вставьте ваши ключи из `.env`

4. **Деплой:**
   ```bash
   vercel
   ```

5. **Добавьте GitHub токен (опционально, для автоматической синхронизации):**
   ```bash
   vercel env add GITHUB_TOKEN
   vercel env add GITHUB_REPO
   ```
   - `GITHUB_TOKEN`: Personal Access Token с правами `repo`
   - `GITHUB_REPO`: формат `ваш-username/название-репозитория`

6. **Получите URL:**
   После деплоя вы получите URL вида: `https://ваш-проект.vercel.app`
   
7. **Укажите в Tilda:**
   - Настройки сайта → Экспорт → API → Webhook URL
   - Вставьте: `https://ваш-проект.vercel.app/tilda-webhook`

### Обновление:
```bash
vercel --prod
```

---

## Вариант 2: Cloudflare Workers

### Преимущества:
- ✅ Полностью бесплатно
- ✅ Очень быстрый (CDN по всему миру)
- ✅ Постоянный URL
- ✅ Serverless

### Установка:

1. **Установите Wrangler CLI:**
   ```bash
   npm i -g wrangler
   ```

2. **Войдите в Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Создайте файл `wrangler.toml`:**
   ```toml
   name = "tilda-webhook"
   main = "cloudflare-worker.js"
   compatibility_date = "2024-01-01"
   ```

4. **Создайте `cloudflare-worker.js`** (см. пример ниже)

5. **Добавьте секреты:**
   ```bash
   wrangler secret put TILDA_PUBLIC_KEY
   wrangler secret put TILDA_SECRET_KEY
   ```

6. **Деплой:**
   ```bash
   wrangler publish
   ```

7. **URL будет:** `https://tilda-webhook.ваш-username.workers.dev`

---

## Вариант 3: Railway

### Преимущества:
- ✅ Бесплатный тариф ($5 кредитов в месяц)
- ✅ Простой деплой
- ✅ Автоматический HTTPS

### Установка:

1. Зарегистрируйтесь на https://railway.app
2. Создайте новый проект
3. Подключите GitHub репозиторий
4. Добавьте переменные окружения в настройках проекта
5. Railway автоматически определит Node.js и запустит сервер

---

## Вариант 4: Render

### Преимущества:
- ✅ Бесплатный тариф (с ограничениями)
- ✅ Автоматический HTTPS
- ✅ Простой деплой

### Установка:

1. Зарегистрируйтесь на https://render.com
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Укажите:
   - **Build Command:** `npm install`
   - **Start Command:** `node scripts/tilda-webhook-server.js`
5. Добавьте переменные окружения

---

## Рекомендация

**Используйте Vercel** - это самый простой и надежный вариант для webhook:
- Не нужно настраивать сервер
- Автоматический HTTPS
- Постоянный URL
- Полностью бесплатно
- Работает даже когда ваш компьютер выключен

## Сравнение

| Сервис | Бесплатно | Постоянный URL | Простота | Рекомендация |
|--------|-----------|----------------|----------|--------------|
| Vercel | ✅ | ✅ | ⭐⭐⭐⭐⭐ | ⭐ Рекомендуется |
| Cloudflare Workers | ✅ | ✅ | ⭐⭐⭐⭐ | ✅ Хорошо |
| Railway | ✅* | ✅ | ⭐⭐⭐ | ✅ Хорошо |
| Render | ✅* | ✅ | ⭐⭐⭐ | ✅ Хорошо |

*С ограничениями бесплатного тарифа
