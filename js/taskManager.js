/* ============================================================
   УПРАВЛЕНИЕ ЗАДАНИЯМИ
   ============================================================ */

let currentTaskId = null;
let currentTestAnswers = [];

/* ===== НАЧАТЬ ЗАДАНИЕ ПО КОДУ ===== */
function startTaskByCode(code) {
    const codeInput = document.getElementById('codeInput');
    const errorDiv = document.getElementById('codeError');

    // Проверяем код
    const taskId = TASK_CODES[code];
    if (!taskId) {
        errorDiv.textContent = '❌ Неверный код. Попробуйте снова.';
        errorDiv.classList.add('show');
        codeInput.classList.add('error');
        codeInput.value = '';
        codeInput.focus();
        return false;
    }

    errorDiv.classList.remove('show');
    codeInput.classList.remove('error');

    // Открываем задание
    openTask(taskId);
    return true;
}

/* ===== ОТКРЫТЬ ЗАДАНИЕ ===== */
function openTask(taskId) {
    const task = getTaskById(taskId);
    if (!task) {
        alert('Задание не найдено!');
        return;
    }

    currentTaskId = taskId;

    // Скрываем дашборд, показываем задание
    document.getElementById('dashboardPage').classList.remove('active');
    document.getElementById('taskPage').classList.add('active');

    // Заполняем информацию о задании
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('taskCode').textContent = 'Код: ' + getCodeByTaskId(taskId);

    // Проверяем, выполнено ли задание
    const isDone = isTaskCompleted(taskId);

    if (task.type === 'test') {
        // === ТЕСТ ===
        document.getElementById('answerArea').style.display = 'none';
        document.getElementById('testContainer').style.display = 'block';
        renderTest(task.questions, isDone);
        document.getElementById('submitTaskBtn').textContent = '📤 Отправить тест';
    } else {
        // === ОБЫЧНОЕ ЗАДАНИЕ ===
        document.getElementById('answerArea').style.display = 'block';
        document.getElementById('testContainer').style.display = 'none';
        document.getElementById('taskDescription').textContent = task.description;
        document.getElementById('taskText').textContent = task.text;

        const textarea = document.getElementById('studentAnswer');
        textarea.value = '';
        textarea.disabled = isDone;
        document.getElementById('submitTaskBtn').textContent = isDone ? '✅ Выполнено' : '📤 Ответить';
        document.getElementById('submitTaskBtn').disabled = isDone;
    }

    // Скрываем статус
    const statusDiv = document.getElementById('taskStatus');
    statusDiv.className = '';
    statusDiv.textContent = '';

    // Прокрутка вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== ПОЛУЧИТЬ КОД ПО ID ЗАДАНИЯ ===== */
function getCodeByTaskId(taskId) {
    for (const [code, id] of Object.entries(TASK_CODES)) {
        if (id === taskId) return code;
    }
    return '****';
}

/* ===== РЕНДЕР ТЕСТА ===== */
function renderTest(questions, isDone) {
    const container = document.getElementById('testContainer');
    container.innerHTML = '';

    // Информация о тесте
    const info = document.createElement('p');
    info.style.marginBottom = '20px';
    info.style.color = '#4a5568';
    info.textContent = `Ответьте на ${questions.length} вопросов. Выберите один вариант из предложенных.`;
    container.appendChild(info);

    // Вопросы
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'test-question';

        const number = document.createElement('div');
        number.className = 'q-number';
        number.textContent = `Вопрос ${index + 1} из ${questions.length}`;
        div.appendChild(number);

        const text = document.createElement('div');
        text.className = 'q-text';
        text.textContent = q.text;
        div.appendChild(text);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'q-options';

        q.options.forEach((option, optIndex) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question_${index}`;
            radio.value = optIndex;
            radio.disabled = isDone;

            const span = document.createElement('span');
            span.textContent = option;

            label.appendChild(radio);
            label.appendChild(span);
            optionsDiv.appendChild(label);
        });

        div.appendChild(optionsDiv);
        container.appendChild(div);
    });

    // Если тест выполнен — блокируем
    if (isDone) {
        const allRadios = container.querySelectorAll('input[type="radio"]');
        allRadios.forEach(r => r.disabled = true);
        document.getElementById('submitTaskBtn').disabled = true;
        document.getElementById('submitTaskBtn').textContent = '✅ Тест пройден';
    } else {
        document.getElementById('submitTaskBtn').disabled = false;
        document.getElementById('submitTaskBtn').textContent = '📤 Отправить тест';
    }
}

/* ===== ОТПРАВИТЬ ЗАДАНИЕ/ТЕСТ ===== */
async function submitCurrentTask() {
    if (!currentTaskId) return;

    const task = getTaskById(currentTaskId);
    if (!task) return;

    // Проверка, не выполнено ли уже
    if (isTaskCompleted(currentTaskId)) {
        showTaskStatus('Это задание уже выполнено!', 'info');
        return;
    }

    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert('Пожалуйста, войдите снова.');
        return;
    }

    let result;

    if (task.type === 'test') {
        // === ОБРАБОТКА ТЕСТА ===
        const questions = task.questions;
        const answers = [];

        // Собираем ответы
        let allAnswered = true;
        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question_${index}"]:checked`);
            if (selected) {
                answers.push(parseInt(selected.value));
            } else {
                allAnswered = false;
                answers.push(undefined);
            }
        });

        if (!allAnswered) {
            showTaskStatus('⚠️ Ответьте на все вопросы теста!', 'error');
            return;
        }

        // Отправляем тест
        const submitBtn = document.getElementById('submitTaskBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Отправка...';

        result = await sendTestResults(userName, currentTaskId, questions, answers);

        if (result.success) {
            markTaskCompleted(currentTaskId);
            showTaskStatus(`✅ Тест пройден! Результат: ${result.score}%`, 'success');
            document.querySelectorAll('.test-question input').forEach(r => r.disabled = true);
            submitBtn.textContent = '✅ Тест пройден';
        } else {
            showTaskStatus('❌ Ошибка отправки теста: ' + (result.error || 'неизвестная ошибка'), 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = '📤 Отправить тест';
        }

    } else {
        // === ОБРАБОТКА ОБЫЧНОГО ЗАДАНИЯ ===
        const answer = document.getElementById('studentAnswer').value.trim();

        if (!answer) {
            showTaskStatus('⚠️ Пожалуйста, введите ответ!', 'error');
            return;
        }

        const submitBtn = document.getElementById('submitTaskBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Отправка...';

        result = await sendTaskResult(userName, currentTaskId, answer, false);

        if (result.success) {
            markTaskCompleted(currentTaskId);
            showTaskStatus('Ответ отправлен! Отличная работа!', 'success');
            document.getElementById('studentAnswer').disabled = true;
            submitBtn.textContent = 'Выполнено';
        } else {
            showTaskStatus('Ошибка отправки: ' + (result.error || 'неизвестная ошибка'), 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Ответить';
        }
    }
}

/* ===== ПОКАЗАТЬ СТАТУС ЗАДАНИЯ ===== */
function showTaskStatus(message, type) {
    const statusDiv = document.getElementById('taskStatus');
    statusDiv.className = type;
    statusDiv.textContent = message;
}

/* ===== ВЕРНУТЬСЯ К СПИСКУ ЗАДАНИЙ ===== */
function goToDashboard() {
    document.getElementById('taskPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    updateDashboard();
}
