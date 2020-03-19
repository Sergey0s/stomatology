let questionList3 =
    {
        questionsListName: 'Клиника - Непосредственные сроки (до 7 суток)',
        questions: [{
            id: 1,
            title: 'Клиника',
            question: 'Скорость эпителизации (в днях)',
            answers: [
                {text: '3-4 дня', id: 0, value: 3},
                {text: '5-6 дней', id: 1, value: 2},
                {text: '7-8 дней', id: 2, value: 1},
                {text: 'более 9 дней', id: 3, value: 0}
            ]
        },
            {
                id: 2,
                title: 'Клиника',
                question: 'Востановление функции',
                answers: [
                    {text: 'В полном объеме', id: 0, value: 3},
                    {text: 'Частичное восстановление', id: 1, value: 1},
                    {text: 'Отсутствие восстановления', id: 2, value: 0}
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
            }
            ,
            {
                id: 4,
                title: 'Клиника',
                question: 'Рубец',
                answers: [
                    {text: '0', id: 0, value: 3},
                    {text: '1-10', id: 1, value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 10,
                maxScore: 12,
                conclusion: 'Высокая эффективность'
            },
            {
                minScore: 7,
                maxScore: 9,
                conclusion: 'Средняя эффективность'
            },
            {
                minScore: 4,
                maxScore: 6,
                conclusion: 'Низкая эффективность'
            },
            {
                minScore: 0,
                maxScore: 3,
                conclusion: 'Эффективность отсутствует'
            }
        ]
    };

export default questionList3;