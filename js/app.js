
/* ============================================================
   ГЛАВНЫЙ СКРИПТ (ИНИЦИАЛИЗАЦИЯ)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // === 1. Регистрация ===
    document.getElementById('registerBtn').addEventListener('click', handleRegistration);

    // Enter на полях регистрации
    document.getElementById('firstName').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('lastName').focus();
        }
    });
    document.getElementById('lastName').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleRegistration();
        }
    });

    // Очистка ошибок валидации при вводе
    document.getElementById('firstName').addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById('firstNameError').classList.remove('show');
    });
    document.getElementById('lastName').addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById('lastNameError').classList.remove('show');
    });

    // === 2. Ввод кода ===
    document.getElementById('startTaskBtn').addEventListener('click', function() {
        const code = document.getElementById('codeInput').value.trim();
        startTaskByCode(code);
    });

    document.getElementById('codeInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('startTaskBtn').click();
        }
    });

    // Очистка ошибки кода при вводе
    document.getElementById('codeInput').addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById('codeError').classList.remove('show');
    });

    // === 3. Задание ===
    document.getElementById('submitTaskBtn').addEventListener('click', submitCurrentTask);
    document.getElementById('backToDashboardBtn').addEventListener('click', goToDashboard);

    // === 4. Проверка авторизации ===
    const isLoggedIn = checkAuth();

    // Если не залогинены — показываем регистрацию
    if (!isLoggedIn) {
        document.getElementById('registrationPage').classList.add('active');
        document.getElementById('firstName').focus();
    }

    // === 5. Выход (добавляем кнопку в дашборд) ===
    // Добавляем кнопку выхода в приветствие
    const userInfo = document.querySelector('.user-info h2');
    if (userInfo) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Выйти';
        logoutBtn.className = 'btn-secondary';
        logoutBtn.style.cssText = 'font-size:14px; padding:6px 16px; margin-left:15px;';
        logoutBtn.addEventListener('click', logout);
        userInfo.appendChild(logoutBtn);
    }
});
