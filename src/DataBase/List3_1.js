let questionList3_1 =
    {
        questionsListName: 'Клиника',
        questions: [{
            id: 1,
            title: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
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
                title: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
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
                title: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
                question: 'Болевой синдром (в баллах)',
                answers: [
                    {text: '0', id: 0, value: 3},
                    {text: '1-10', id: 1, value: 0}
                ]
            },
            {
                id: 4,
                title: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
                question: 'Рубец',
                answers: [
                    {text: '0', id: 0, value: 3},
                    {text: '1-10', id: 1, value: 0}
                ]
            },
            {
                id: 5,
                title: 'Клиника - Ближайшие и отдаленные сроки (6-12 месяцев)',
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
                conclusion: 'Высокая'
            },
            {
                minScore: 8,
                maxScore: 11,
                conclusion: 'Средняя'
            },
            {
                minScore: 4,
                maxScore: 7,
                conclusion: 'Низкая'
            },
            {
                minScore: 0,
                maxScore: 3,
                conclusion: 'отсутствует'
            }
        ]
    };

export default questionList3_1;