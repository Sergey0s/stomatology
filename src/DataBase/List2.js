let questionList2 =
    {
        questionsListName: 'Часть 2 - Степень тяжести',
        questions: [{
            id: 1,
            title: 'Часть 2 - Степень тяжести',
            question: 'Частота рецидивов',
            answers: [
                {text: '4 и более раз в год', id: 0, value: 2},
                {text: '2-3 раза в год', id: 1, value: 1},
                {text: '1 раз в год и реже', id: 2, value: 0}
            ]
        },
            {
                id: 2,
                title: 'Часть 2 - Степень тяжести',
                question: 'Количество элементов',
                answers: [
                    {text: 'от 4 элементов', id: 0, value: 2},
                    {text: '3 элемента', id: 1, value: 1},
                    {text: '1-2 элемента', id: 2, value: 0}
                ]
            },
            {
                id: 3,
                title: 'Часть 2 - Степень тяжести',
                question: 'Сроки эпителизации элементов',
                answers: [
                    {text: 'Более 7 суток', id: 0, value: 2},
                    {text: '6-7 суток', id: 1, value: 1},
                    {text: '4-5 суток', id: 2, value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 0,
                maxScore: 3,
                treatment: 'Курс Гиалуроновой кислоты в капсулах для приема внутрь по 1 капсуле в день: 30 дней'
            },
            {
                minScore: 4,
                maxScore: 6,
                treatment: 'Курс Гиалуроновой кислоты в капсулах для приема внутрь по 1 капсуле 2 раза в день: 30 дней'
            },
            {
                minScore: 7,
                maxScore: 9,
                treatment: 'Курс Гиалуроновой кислоты в капсулах для приема внутрь по 2 капсулы 2 раза в день: 30 дней'
            },
        ]
    };

export default questionList2;