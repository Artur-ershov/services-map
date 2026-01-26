# Как работает синхронизация с локальными файлами

## Текущая схема работы:

```
Tilda → Webhook (Vercel) → ??? → Локальные файлы
```

## Проблема:

Webhook на Vercel получает уведомление, но не может напрямую обновить ваши локальные файлы.

## Решения:

### Вариант 1: GitHub Actions (Рекомендуется) ⭐

**Схема:**
```
Tilda → Webhook (Vercel) → GitHub Actions → Синхронизация → Коммит в репозиторий → git pull локально
```

**Как работает:**
1. Tilda отправляет webhook на Vercel
2. Vercel триггерит GitHub Actions
3. GitHub Actions синхронизирует файлы через API Tilda
4. Коммитит изменения в репозиторий
5. Вы делаете `git pull` локально

**Настройка:**
1. Добавьте секреты в GitHub:
   - Репозиторий → Settings → Secrets and variables → Actions
   - Добавьте: `TILDA_PUBLIC_KEY` и `TILDA_SECRET_KEY`

2. Добавьте переменные в Vercel:
   ```bash
   node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" vercel env add GITHUB_TOKEN production
   node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" vercel env add GITHUB_REPO production
   # Формат: ваш-username/название-репозитория
   ```

3. GitHub Actions уже настроен (`.github/workflows/tilda-sync.yml`)

**Преимущества:**
- ✅ Полностью автоматически
- ✅ История изменений в Git
- ✅ Работает даже когда компьютер выключен

---

### Вариант 2: Локальный webhook сервер

**Схема:**
```
Tilda → Webhook (Vercel) → Локальный сервер → Синхронизация файлов
```

**Как работает:**
1. Запускаете локальный сервер: `node scripts/tilda-webhook-server.js`
2. Используете ngrok для публичного URL
3. Vercel отправляет запрос на ваш локальный сервер
4. Локальный сервер запускает синхронизацию

**Недостатки:**
- ❌ Нужно держать компьютер включенным
- ❌ Нужен ngrok или публичный IP

---

### Вариант 3: Периодическая синхронизация (Cron)

**Схема:**
```
Локальный скрипт → Периодически проверяет изменения → Синхронизирует
```

**Настройка:**
Создайте задачу в Windows Task Scheduler, которая запускает:
```bash
node scripts/download-tilda-files.js
```

**Недостатки:**
- ❌ Не мгновенная синхронизация
- ❌ Может пропустить изменения

---

## Рекомендация: GitHub Actions

Это самый надежный способ:
1. Автоматическая синхронизация при каждом изменении
2. История в Git
3. Работает всегда, даже когда компьютер выключен
4. Просто обновить локально: `git pull`

## Текущий статус:

✅ Webhook на Vercel настроен
✅ GitHub Actions workflow создан (`.github/workflows/tilda-sync.yml`)
⏳ Нужно добавить GitHub токен в Vercel для автоматического триггера

## Следующие шаги:

1. Создайте GitHub Personal Access Token с правами `repo`
2. Добавьте его в Vercel как `GITHUB_TOKEN`
3. Добавьте `GITHUB_REPO` (формат: `username/repo-name`)
4. После этого синхронизация будет работать автоматически!
