const TASKS_DATA = {
    'task_1': {
        id: 'task_1',
        title: 'Задание №1: Библиотеки',
        description: 'Что запомнилось?',
        text: 'Какая команда используется для добавления библиотеки в файл с кодом?\n\n',
        type: 'task'
    },
    'task_2': {
        id: 'task_2',
        title: 'Переменные',
        description: 'Проверка знаний',
        text: 'Посмотрим, что вы запомнили?',
        type: 'test',
        questions: [
            {
                id: 1,
                text: 'Что такое переменная?',
                options: [
                    'Контейнер для хранения данных',
                    'Функция для вывода данных',
                    'Цикл для повторения операций',
                    'Условный оператор'
                ],
                correct: 0
            },
            {
                id: 2,
                text: 'Как нельзя создавать переменную?',
                options: [
                    'n = 1',
                    'number = 1',
                    '1number = 1',
                    'number1 = 1'
                ],
                correct: 2
            },
            {
                id: 3,
                text: 'Что может храниться в переменной button?',
                options: [
                    'цифра',
                    'текст',
                    'число',
                    'кнопка'
                ],
                correct: 3
            },
            {
                id: 4,
                text: 'Какая переменная создана верно?',
                options: [
                    'n u m b e r = 2',
                    '123array = 2',
                    'num = 2',
                    '44 = 2'
                ],
                correct: 2
            }
        ]
    },
    'task_3': {
        id: 'task_3',
        title: 'Функции',
        description: 'Проверка знаний',
        text: 'Посмотрим, что вы запомнили?',
        type: 'test',
        questions: [
            {
                id: 1,
                text: 'Что такое функция?',
                options: [
                    'Контейнер для хранения данных',
                    'Часть кода, которая выполняется в определенный момент',
                    'Цикл для повторения операций',
                    'Условный оператор'
                ],
                correct: 1
            },
            {
                id: 2,
                text: 'Какая команда создает функцию?',
                options: [
                    'd',
                    'function',
                    'def',
                    'defunction'
                ],
                correct: 2
            },
            {
                id: 3,
                text: 'Что нужно поставить в конфе функции?',
                options: [
                    '())',
                    ';',
                    '!',
                    ':'
                ],
                correct: 3
            }
        ]
    },
    'task_4': {
        id: 'task_4',
        title: 'Задание №4: Новое окно',
        description: 'Самостоятельное задание',
        text: 'Создайте в новом окне надпись "Вы вошли в аккаунт"\n'+
        'Создайте также надпись: "Ваш пароль" и пароль, который ввел пользователь\n\n'+
        'Скопируйте получившийся код в ответ к этому заданию!',
        type: 'task'
    },
    'test_final': {
        id: 'test_final',
        title: 'Финальный тест',
        description: 'Проверка знаний',
        text: 'Ответьте на вопросы теста.',
        type: 'test',
        questions: [
            {
                id: 1,
                text: 'Какой метод используется для создания нового окна при нажатии на кнопку?',
                options: [
                    'tkinter.Toplevel()',
                    'tkinter.Label()',
                    'tkinter.Button()',
                    'tkinter.Entry()'
                ],
                correct: 0
            },
            {
                id: 2,
                text: 'Благодаря какому параметру скрывается звездочками поле ввода пароля?',
                options: [
                    'Параметр width=*',
                    'Параметр placeholder="*"',
                    'Параметр show="*"',
                    'Все варианты неверные'
                ],
                correct: 2
            },
            {
                id: 3,
                text: 'Что создает команда tkinter.Entry()',
                options: [
                    'Ничего',
                    'Поле для ввода',
                    'Логотип',
                    'Вход в аккаунт'
                ],
                correct: 1
            },
            {
                id: 4,
                text: 'Каким типом задается цвет фона у главного окна?',
                options: [
                    'Текстом',
                    'HEX',
                    'RGB',
                    'Цифрами'
                ],
                correct: 1
            },
            {
                id: 5,
                text: 'Что делает строка window.resizable(False, False)?',
                options: [
                    'Меняет размеры окна',
                    'Создает новое окно',
                    'Запрещает пользователю менять размер окна',
                    'Создает переменные'
                ],
                correct: 2
            },
            {
                id: 6,
                text: 'В чем разница между tkinter.Label и tkinter.Entry?',
                options: [
                    'tkinter.Label создает поле для ввода, а tkinter.Entry - надпись',
                    'tkinter.Label создает надпись,а tkinter.Entry - поле для ввода',
                    'tkinter.Label создает кнопку, а tkinter.Entry - надпись',
                    'tkinter.Label создает надпись, а tkinter.Entry - кнопку'
                ],
                correct: 1
            }
            ,
            {
                id: 7,
                text: 'Какая команда создает кнопку?',
                options: [
                    'tkinter.Toplevel()',
                    'tkinter.Label()',
                    'tkinter.Button()',
                    'tkinter.Entry()'
                ],
                correct: 2
            },
            {
                id: 8,
                text: 'Какая команда создает надпись?',
                options: [
                    'tkinter.Toplevel()',
                    'tkinter.Label()',
                    'tkinter.Button()',
                    'tkinter.Entry()'
                ],
                correct: 1
            }
        ]
    }
};

/* ===== ПОЛУЧИТЬ ЗАДАНИЕ ПО ID ===== */
function getTaskById(taskId) {
    return TASKS_DATA[taskId] || null;
}

/* ===== ПОЛУЧИТЬ ВСЕ ЗАДАНИЯ (для списка) ===== */
function getAllTasks() {
    const taskIds = Object.keys(TASK_CODES);
    return taskIds.map(code => {
        const taskId = TASK_CODES[code];
        const task = TASKS_DATA[taskId];
        return {
            code: code,
            id: taskId,
            title: task ? task.title : 'Неизвестное задание',
            description: task ? task.description : '',
            type: task ? task.type : 'unknown'
        };
    });
}
