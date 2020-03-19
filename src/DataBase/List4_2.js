let questionList4 =
    {
        questionsListName: 'Лабораторные анализы - Отдаленные сроки (до 12 месяцев)',
        questions: [
            {
                id: 1,
                title: 'Лабораторные анализы',
                question: 'ФНО-2 (N)',
                answers: [
                    {text: '6.4 ± 1.2 (5.2-7.6) тут ошибка! ', id: 0, value: 3},
                    {text: 'менее 7.5', id: 1, value: 2},
                    {text: '7.6-8.2', id: 2, value: 1},
                    {text: 'свыше 8.3', id: 3, value: 0}
                ]
            },
            {
                id: 2,
                title: 'Лабораторные анализы',
                question: 'ИЛ-2',
                answers: [
                    {text: '11.4 ± 2.1 (9.3-13.5) тут ошибка! ', id: 0, value: 3},
                    {text: 'менее 11.4', id: 1, value: 2},
                    {text: '11.5-13.5', id: 2, value: 1},
                    {text: 'свыше 13.6', id: 3, value: 0}
                ]
            },
            {
                id: 3,
                title: 'Лабораторные анализы',
                question: 'ИЛ-10',
                answers: [
                    {text: 'отсутствует', id: 0, value: 3},
                    {text: 'свыше 10.0', id: 1, value: 2},
                    {text: '7.25-9.99', id: 2, value: 1},
                    {text: 'менее 7.24', id: 3, value: 0}
                ]
            },
            {
                id: 4,
                title: 'Лабораторные анализы',
                question: 'I max',
                answers: [
                    {text: '449.4-476.2', id: 0, value: 3},
                    {text: 'менее 481.9', id: 1, value: 2},
                    {text: '482.0-609.8', id: 2, value: 1},
                    {text: 'свыше 609.9', id: 3, value: 0}
                ]
            },
            {
                id: 5,
                title: 'Лабораторные анализы',
                question: 'S',
                answers: [
                    {text: 'отсутствует', id: 0, value: 3},
                    {text: 'менее 1697.4', id: 1, value: 2},
                    {text: '1697.5-2107.5', id: 2, value: 1},
                    {text: 'свыше 2107.6', id: 3, value: 0}
                ]
            },
            {
                id: 6,
                title: 'Лабораторные анализы',
                question: 'TK',
                answers: [
                    {text: 'отсутствует', id: 0, value: 3},
                    {text: 'менее 0.1359', id: 1, value: 2},
                    {text: '0.1360-0.1498', id: 2, value: 1},
                    {text: 'свыше 0.1499', id: 3, value: 0}
                ]
            },
            {
                id: 7,
                title: 'Лабораторные анализы',
                question: 'ОШ',
                answers: [
                    {text: 'отсутствует', id: 0, value: 3},
                    {text: 'менее 9.44', id: 1, value: 2},
                    {text: '9.45-11.53', id: 2, value: 1},
                    {text: 'свыше 11.54', id: 3, value: 0}
                ]
            },
            {
                id: 8,
                title: 'Лабораторные анализы',
                question: 'Коэффициент меп',
                answers: [
                    {text: 'отсутствует', id: 0, value: 3},
                    {text: 'менее 26.9', id: 1, value: 2},
                    {text: '27.0-32.2', id: 2, value: 1},
                    {text: 'свыше 32.3', id: 3, value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 18,
                maxScore: 24,
                conclusion: 'Высокая эффективность'
            },
            {
                minScore: 12,
                maxScore: 18,
                conclusion: 'Средняя эффективность'
            },
            {
                minScore: 6,
                maxScore: 11,
                conclusion: 'Низкая эффективность'
            },
            {
                minScore: 0,
                maxScore: 5,
                conclusion: 'Эффективность отсутствует'
            }
        ]
    };

export default questionList4;