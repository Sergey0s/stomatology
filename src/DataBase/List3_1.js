let questionList3_1 =
    {
        questionsListName: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
        questions: [{
            id: 1,
            title: 'Клиника',
            question: 'Скорость эпителизации (в днях)',
            answers: [
                {text: 'Не потребовалось', id: 0, value: 3},
                {text: '3-4 дня', id: 1, value: 2},
                {text: '5-6 дней', id: 3, value: 1},
                {text: 'более 7 дней', id: 3, value: 0}
            ]
        },
            {
                id: 2,
                title: 'Клиника',
                question: 'Востановление функции',
                answers: [
                    {text: 'Не потребовалось', id: 0, value: 3},
                    {text: 'В полном объеме', id: 1, value: 2},
                    {text: 'Частичное восстановление', id: 2, value: 1},
                    {text: 'Отсутствие восстановления', id: 3, value: 0}
                ]
            },
            {
                id: 3,
                title: 'Клиника',
                question: 'Болевой синдром (в баллах)',
                answers: [
                    {text: '0', id: 0, value: 3},
                    {text: '1-10', id: 1, value: 0}
                ]
            },
            {
                id: 4,
                title: 'Клиника',
                question: 'Рубец',
                answers: [
                    {text: '0', id: 0, value: 3},
                    {text: '1-10', id: 1, value: 0}
                ]
            },
            {
                id: 5,
                title: 'Клиника',
                question: 'Рецидивы',
                answers: [
                    {text: 'Рецидивы отсутствовали', id: 0, value: 3},
                    {text: '1 случай', id: 1, value: 2},
                    {text: '2 случая', id: 2, value: 1},
                    {text: 'Более 3-х случаев', id: 3, value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 12,
                maxScore: 15,
                conclusion: 'Высокая эффективность'
            },
            {
                minScore: 8,
                maxScore: 11,
                conclusion: 'Средняя эффективность'
            },
            {
                minScore: 4,
                maxScore: 7,
                conclusion: 'Низкая эффективность'
            },
            {
                minScore: 0,
                maxScore: 3,
                conclusion: 'Эффективность отсутствует'
            }
        ]
    };

export default questionList3_1;