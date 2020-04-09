let questionList4 =
    {
        questionsListName: 'Лабораторные анализы',
        questions: [
            {
                id: 1,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Фактор некроза опухоли-α',
                answers: [
                    {text: 'менее 7.6', id: 0, value: 1.5},
                    {text: '7.7-8.2', id: 1, value: 1},
                    {text: '8.3-9.1', id: 2, value: 0.5},
                    {text: 'свыше 9.2', id: 3, value: 0}
                ]
            },
            {
                id: 2,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Интерлейкин-2',
                answers: [
                    {text: 'менее 11.4', id: 0, value: 3},
                    {text: '11.5-13.4', id: 1, value: 2},
                    {text: '13.5-14.2', id: 2, value: 1},
                    {text: 'свыше 11.4', id: 3, value: 0}
                ]
            },
            {
                id: 3,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Интерлейкин-10',
                answers: [
                    {text: 'свыше 10.0', id: 0, value: 3},
                    {text: '7.25-9.99', id: 1, value: 2},
                    {text: '4.01-7.24', id: 2, value: 1},
                    {text: 'менее 4.00', id: 3, value: 0}
                ]
            },
            {
                id: 4,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'I max',
                answers: [
                    {text: 'менее 481.9', id: 0, value: 3},
                    {text: '482.0-609.7', id: 1, value: 2},
                    {text: '609.8-737.4', id: 2, value: 1},
                    {text: 'более 737.5', id: 3, value: 0}
                ]
            },
            {
                id: 5,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'S',
                answers: [
                    {text: 'менее 1697.4', id: 0, value: 3},
                    {text: '1697.5-2107.5', id: 1, value: 2},
                    {text: '2107.6-2517.6', id: 2, value: 1},
                    {text: 'более 2517.7', id: 3, value: 0}
                ]
            },
            {
                id: 6,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Триеновые конъюгаты',
                answers: [
                    {text: 'менее 0.1359', id: 0, value: 3},
                    {text: '0.1360-0.1498', id: 1, value: 2},
                    {text: '0.1499-0.1635', id: 2, value: 1},
                    {text: 'более 0.1636', id: 3, value: 0}
                ]
            },
            {
                id: 7,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Основания Шиффа',
                answers: [
                    {text: 'менее 9.44', id: 0, value: 3},
                    {text: '9.45-11.53', id: 1, value: 2},
                    {text: '11.54-13.61', id: 2, value: 1},
                    {text: 'более 13.62', id: 3, value: 0}
                ]
            },
            {
                id: 8,
                title: 'Лабораторные анализы - Непосредственные сроки (до 7 суток)',
                question: 'Коэффициент липопероксидации',
                answers: [
                    {text: 'менее 26.9', id: 0, value: 3},
                    {text: '27.0-32.2', id: 1, value: 2},
                    {text: '32.3-37.4', id: 2, value: 1},
                    {text: 'более 37.5', id: 3, value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 18,
                maxScore: 22.5,
                conclusion: 'Высокая'
            },
            {
                minScore: 12,
                maxScore: 17,
                conclusion: 'Средняя'
            },
            {
                minScore: 6,
                maxScore: 11.5,
                conclusion: 'Низкая'
            },
            {
                minScore: 0,
                maxScore: 5,
                conclusion: 'отсутствует'
            }
        ]
    };

export default questionList4;