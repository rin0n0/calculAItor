# Интерактивный калькулятор с AI-функциями

Проект представляет собой продвинутый калькулятор с поддержкой стандартных вычислений, AI-ассистента и возможностью создания пользовательских кнопок.

## Основные возможности

### Базовые функции
- Выполнение стандартных математических операций:
  - Сложение, вычитание, умножение, деление
  - Работа со скобками и приоритетами операций
- Интуитивно понятная обработка ошибок
- Автоматическое форматирование результатов (округление дробных чисел)

### AI-функции
- Решение сложных математических выражений
- Интеллектуальная обработка некорректных выражений с пояснениями
- Визуальный индикатор процесса вычислений

### Пользовательские функции
- Создание собственных кнопок с часто используемыми значениями
- Сохранение пользовательских кнопок между сеансами работы

## Как использовать

1. **Базовые вычисления**:
   - Введите выражение в поле ввода
   - Результат отобразится автоматически

2. **AI-режим**:
   - Для сложных выражений нажмите кнопку "Подумать"
   (рекомендованно использование VPN для стабильной работы)
   - Дождитесь обработки запроса AI
   (ответы могут содержать ошибки)

3. **Пользовательские кнопки**:
    - Введите текст/значение кнопки в специальное поле
    - Нажмите "Добавить кнопку"
    - Новая кнопка появится в интерфейсе

## Безопасность

- Встроенная валидация ввода для предотвращения инъекций
- Ограничение времени ожидания ответа от AI
- Комплексная обработка возможных ошибок выполнения

## API

Проект использует следующие внешние API-эндпоинты:

| Назначение | URL |
|------------|-----|
| Основной AI-эндпоинт | `https://nexra.aryahcr.cc/api/chat/gptweb` |
| Проверка статуса | `https://nexra.aryahcr.cc/api/chat/task` |
