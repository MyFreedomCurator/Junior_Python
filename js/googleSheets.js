/* ============================================================
   ОТПРАВКА ДАННЫХ В GOOGLE SHEETS
   ============================================================ */

/* ===== ОТПРАВКА РЕЗУЛЬТАТА ЗАДАНИЯ ===== */
async function sendTaskResult(userName, taskId, answer, isTest = false) {
    const task = getTaskById(taskId);
    if (!task) return { success: false, error: 'Задание не найдено' };

    const payload = {
        name: userName,
        score: 0,
        answers: JSON.stringify({
            taskId: taskId,
            taskTitle: task.title,
            type: isTest ? 'test' : 'task',
            answer: answer,
            timestamp: new Date().toISOString()
        })
    };

    try {
        // Используем режим 'no-cors' для работы с GitHub Pages
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // При 'no-cors' мы не можем прочитать ответ,
        // поэтому считаем успехом, если нет ошибок сети
        return { success: true };
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return { success: false, error: error.message };
    }
}

/* ===== ОТПРАВКА РЕЗУЛЬТАТОВ ТЕСТА ===== */
async function sendTestResults(userName, testId, questions, answers) {
    const task = getTaskById(testId);
    if (!task) return { success: false, error: 'Тест не найден' };

    // Формируем детальный отчет по тесту
    const testReport = {
        testId: testId,
        testTitle: task.title,
        totalQuestions: questions.length,
        correctAnswers: 0,
        details: []
    };

    questions.forEach((q, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === q.correct;
        if (isCorrect) testReport.correctAnswers++;

        testReport.details.push({
            questionId: q.id,
            questionText: q.text,
            userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Не отвечено',
            correctAnswer: q.options[q.correct],
            isCorrect: isCorrect
        });
    });

    const score = Math.round((testReport.correctAnswers / questions.length) * 100);

    const payload = {
        name: userName,
        score: score,
        answers: JSON.stringify(testReport)
    };

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        return { success: true, score: score };
        
    } catch (error) {
        console.error('Ошибка отправки теста:', error);
        return { success: false, error: error.message };
    }
}
