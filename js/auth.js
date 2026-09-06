/* ============================================================
   РЕГИСТРАЦИЯ И ВАЛИДАЦИЯ
   ============================================================ */

/* ===== ВАЛИДАЦИЯ ИМЕНИ/ФАМИЛИИ ===== */
function validateName(name) {
    // Проверка длины
    if (name.length < 3 || name.length > 30) {
        return { valid: false, message: 'Длина должна быть от 3 до 30 символов' };
    }

    // Проверка на спецсимволы и цифры (только буквы, пробелы, дефис, апостроф)
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
    if (!regex.test(name)) {
        return { valid: false, message: 'Можно использовать только буквы, пробелы, дефис и апостроф' };
    }

    return { valid: true };
}

/* ===== ОБРАБОТЧИК РЕГИСТРАЦИИ ===== */
function handleRegistration() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');

    // Скрываем старые ошибки
    firstNameError.classList.remove('show');
    lastNameError.classList.remove('show');
    document.getElementById('firstName').classList.remove('error');
    document.getElementById('lastName').classList.remove('error');

    // Валидация имени
    const firstNameValidation = validateName(firstName);
    if (!firstNameValidation.valid) {
        firstNameError.textContent = firstNameValidation.message;
        firstNameError.classList.add('show');
        document.getElementById('firstName').classList.add('error');
        document.getElementById('firstName').focus();
        return;
    }

    // Валидация фамилии
    const lastNameValidation = validateName(lastName);
    if (!lastNameValidation.valid) {
        lastNameError.textContent = lastNameValidation.message;
        lastNameError.classList.add('show');
        document.getElementById('lastName').classList.add('error');
        document.getElementById('lastName').focus();
        return;
    }

    // Успешная регистрация
    const fullName = firstName + ' ' + lastName;
    localStorage.setItem('userName', fullName);

    // Переходим в личный кабинет
    showDashboard(fullName);
}

/* ===== ПРОВЕРКА, ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ ===== */
function checkAuth() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        showDashboard(userName);
        return true;
    }
    return false;
}

/* ===== ВЫХОД ===== */
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('completedTasks');
        location.reload();
    }
}
