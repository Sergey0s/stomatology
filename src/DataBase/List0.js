let questionList0 =
    {
        questionsListName: 'Наличие стоматита',
        questions: [
            {
                id: 1,
                title: 'Наличие стоматита',
                question: 'Есть ли в анамнезе рецидивирующий афтозный стоматит?',
                answers: [
                    {text: 'Да', id: '0', value: 3},
                    {text: 'Нет', id: '1', value: 0}
                ]
            },
            {
                id: 2,
                title: 'Наличие стоматита',
                question: 'Есть ли в настоящее время клинические проявления рецидивирующего афтозного стоматита?',
                answers: [
                    {text: 'Да', id: '0', value: 2},
                    {text: 'Нет', id: '1', value: 0}
                ]
            }
        ],
        results: [
            {
                minScore: 0,
                maxScore: 3,
                treatment: 'Курс аппликаций геля "Гиалудент" 2 раза в день: 4-5 дней',
            },
            {
                minScore: 4,
                maxScore: 6,
                treatment: 'Курс аппликаций геля "Гиалудент" 3 раза в день: 6-7 дней'
            },
            {
                minScore: 7,
                maxScore: 9,
                treatment: 'Курс аппликаций геля "Гиалудент" 4 раза в день: 8-10 дней'
            },
        ]
    };

export default questionList0;