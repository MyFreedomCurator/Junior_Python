/* ============================================================
   ЛИЧНЫЙ КАБИНЕТ
   ============================================================ */

/* ===== ПОКАЗАТЬ ЛИЧНЫЙ КАБИНЕТ ===== */
function showDashboard(userName) {
    // Скрываем регистрацию, показываем дашборд
    document.getElementById('registrationPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    document.getElementById('taskPage').classList.remove('active');

    // Устанавливаем имя пользователя
    document.getElementById('userNameDisplay').textContent = userName;

    // Обновляем список заданий и прогресс
    updateDashboard();
}

/* ===== ОБНОВЛЕНИЕ ДАШБОРДА ===== */
function updateDashboard() {
    // Получаем выполненные задания из localStorage
    const completed = getCompletedTasks();

    // Обновляем список заданий
    renderTasksList(completed);

    // Обновляем прогресс-бары
    updateProgressBars(completed);

    // Обновляем аватарку
    updateAvatar(completed);

    // Очищаем поле ввода кода
    document.getElementById('codeInput').value = '';
    document.getElementById('codeError').classList.remove('show');
    document.getElementById('codeInput').classList.remove('error');
}

/* ===== ПОЛУЧИТЬ ВЫПОЛНЕННЫЕ ЗАДАНИЯ ===== */
function getCompletedTasks() {
    try {
        const data = localStorage.getItem('completedTasks');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

/* ===== СОХРАНИТЬ ВЫПОЛНЕННЫЕ ЗАДАНИЯ ===== */
function saveCompletedTasks(completed) {
    localStorage.setItem('completedTasks', JSON.stringify(completed));
}

/* ===== ОТМЕТИТЬ ЗАДАНИЕ КАК ВЫПОЛНЕННОЕ ===== */
function markTaskCompleted(taskId) {
    const completed = getCompletedTasks();
    if (!completed.includes(taskId)) {
        completed.push(taskId);
        saveCompletedTasks(completed);
        updateDashboard();
    }
}

/* ===== ПРОВЕРИТЬ, ВЫПОЛНЕНО ЛИ ЗАДАНИЕ ===== */
function isTaskCompleted(taskId) {
    const completed = getCompletedTasks();
    return completed.includes(taskId);
}

/* ===== ОТОБРАЗИТЬ СПИСОК ЗАДАНИЙ ===== */
function renderTasksList(completed) {
    const grid = document.getElementById('tasksGrid');
    const allTasks = getAllTasks();

    grid.innerHTML = '';

    allTasks.forEach(taskInfo => {
        const task = getTaskById(taskInfo.id);
        const isDone = completed.includes(taskInfo.id);

        const card = document.createElement('div');
        card.className = `task-card ${isDone ? 'done' : ''}`;

        // Определяем тип задания
        const typeLabel = taskInfo.type === 'test' ? 'Тест' : 'Задание';

        card.innerHTML = `
            <div class="task-title">${taskInfo.title}</div>
            <div class="task-desc">${taskInfo.description}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <span style="font-size:12px; color:#a0aec0;">${typeLabel}</span>
                <span class="task-status ${isDone ? 'done' : 'pending'}">
                    ${isDone ? 'Выполнено' : 'Не выполнено'}
                </span>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* ===== ОБНОВЛЕНИЕ ПРОГРЕСС-БАРОВ ===== */
/* РЕДАКТИРУЙТЕ ЭТУ ФУНКЦИЮ ДЛЯ ИЗМЕНЕНИЯ ПРОГРЕСС-БАРОВ */
function updateProgressBars(completed) {
    const totalTasks = Object.keys(TASK_CODES).length;
    const completedCount = completed.length;

    // ===== ОБЩИЙ ПРОГРЕСС (в процентах) =====
    const totalPercent = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    document.getElementById('totalProgress').style.width = totalPercent + '%';
    document.getElementById('totalProgress').textContent = totalPercent + '%';

    // ===== ЗАДАНИЙ ВЫПОЛНЕНО =====
    document.getElementById('tasksProgress').style.width = (completedCount / totalTasks * 100) + '%';
    document.getElementById('tasksProgress').textContent = completedCount + '/' + totalTasks;

    // ===== ДОБАВЛЯЙТЕ НОВЫЕ ПРОГРЕСС-БАРЫ ЗДЕСЬ =====
    // Пример: прогресс по весу заданий
    // const weightedProgress = calculateWeightedProgress(completed);
    // document.getElementById('customProgress').style.width = weightedProgress + '%';
    // document.getElementById('customProgress').textContent = weightedProgress + '%';
}

/* ===== ОБНОВЛЕНИЕ АВАТАРКИ ===== */
/* РЕДАКТИРУЙТЕ ЭТУ ФУНКЦИЮ ДЛЯ ИЗМЕНЕНИЯ УСЛОВИЙ СМЕНЫ АВАТАРКИ */
function updateAvatar(completed) {
    const totalTasks = Object.keys(TASK_CODES).length;
    const completedCount = completed.length;
    const avatarContainer = document.getElementById('avatarAnimation');

    // Убираем предыдущие классы
    avatarContainer.classList.remove('done');

    // ===== УСЛОВИЯ СМЕНЫ АВАТАРКИ =====
    // РЕДАКТИРУЙТЕ ЭТИ УСЛОВИЯ ДЛЯ ИЗМЕНЕНИЯ МОМЕНТА СМЕНЫ ФОТО
    if (completedCount >= totalTasks) {
        // ВСЕ ЗАДАНИЯ ВЫПОЛНЕНЫ → меняем на "финишный" набор фото
        avatarContainer.classList.add('done');
    } else if (completedCount >= totalTasks * 0.5) {
        // ВЫПОЛНЕНО ПОЛОВИНА → можно добавить промежуточный класс
        // avatarContainer.classList.add('half');
    } else {
        // Обычная анимация
    }
}
