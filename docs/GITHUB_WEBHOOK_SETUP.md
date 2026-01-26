# Настройка GitHub Webhook для Tilda (без Vercel)

## Преимущества:

- ✅ Проще - все в одном месте (GitHub)
- ✅ Надежнее - не зависит от Vercel
- ✅ Бесплатно - GitHub Actions бесплатен для публичных репозиториев
- ✅ Прямая интеграция - Tilda → GitHub → Синхронизация

## Схема работы:

```
Tilda → GitHub Webhook → GitHub Actions → Синхронизация → Коммит → git pull локально
```

## Настройка (3 шага):

### Шаг 1: Добавить секреты в GitHub (уже сделано ✅)

Если еще не добавили:
1. GitHub → Settings → Secrets and variables → Actions
2. New repository secret:
   - `TILDA_PUBLIC_KEY` = `4poxxdn6oxy7vzaltsly`
   - `TILDA_SECRET_KEY` = `d53083d8dee6f3ecbf4a`

### Шаг 2: Создать GitHub Personal Access Token

1. Откройте: https://github.com/settings/tokens
2. Generate new token (classic)
3. Название: `Tilda Webhook`
4. Права: отметьте `repo` (полный доступ)
5. Generate token
6. **Скопируйте токен** (показывается только раз!)

### Шаг 3: Настроить Webhook в Tilda

1. Войдите в Tilda
2. Перейдите: **Настройки сайта → Экспорт → API → Webhook URL**
3. Вставьте URL:
   ```
   https://api.github.com/repos/Artur-ershov/services-map/dispatches
   ```
4. **НО!** Tilda отправляет GET запрос, а GitHub требует POST с токеном

## Проблема: Tilda отправляет GET, GitHub требует POST

**Решение:** Нужен промежуточный сервис, который:
- Принимает GET от Tilda
- Отправляет POST в GitHub

## Варианты решения:

### Вариант A: Использовать Vercel как прокси (уже настроен)

Vercel принимает GET от Tilda и отправляет POST в GitHub.

**Текущая схема:**
```
Tilda → Vercel (GET) → GitHub API (POST) → GitHub Actions → Синхронизация
```

Это уже работает! Просто добавьте GitHub токен в Vercel.

### Вариант B: Использовать готовый сервис-прокси

Можно использовать бесплатные сервисы типа:
- Zapier
- Make (Integromat)
- n8n

Но Vercel уже настроен и работает лучше.

## Рекомендация:

**Оставьте Vercel как прокси** - это самое простое решение:
1. Tilda отправляет GET → Vercel (уже работает)
2. Vercel отправляет POST → GitHub (нужно добавить токен)
3. GitHub Actions → Синхронизация (уже настроено)

## Что нужно сделать:

Добавьте GitHub токен в Vercel:

```bash
# Добавьте GitHub токен
node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" vercel env add GITHUB_TOKEN production
# Вставьте ваш GitHub токен

# Добавьте название репозитория
node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" vercel env add GITHUB_REPO production
# Вставьте: Artur-ershov/services-map
```

После этого все будет работать автоматически!
