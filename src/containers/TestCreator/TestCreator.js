import React, {Component} from "react";
import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answers';
import Results from '../../components/Results/Results';
import { Redirect } from 'react-router-dom';

class TestCreator extends Component {
    state = {
        results: [],
        isFinished: false,
        redirect: false,
        activeQuestion: 0,
        total: 0,
        questions: [
            {
                id: 1,
                question: 'Аллергологический анамнез',
                answers: [
                    {text: 'Отягощен', id: 0, value: 1},
                    {text: 'Не отягощен', id: 1, value: 0}]
            },
            {
                id: 2,
                question: 'Гельминты',
                answers: [
                    {text: 'Инвазия есть', id: 0, value: 1},
                    {text: 'Инвазия отсутствует', id: 1, value: 0}
                ]
            },
            {
                id: 3,
                question: 'Наследственность',
                answers: [
                    {text: 'Отягощена патологией ЖКТ', id: 0, value: 2},
                    {text: 'Отягощена др. патологией', id: 1, value: 1},
                    {text: 'Не отягощена', id: 2, value: 0}
                ]
            },
            {
                id: 4,
                question: 'Характер питания',
                answers: [
                    {text: 'Нерегулярный', id: 0, value: 1},
                    {text: 'Регулярный', id: 1, value: 0}
                ]
            },
            {
                id: 5,
                question: 'Соматические заболевания',
                answers: [
                    {
                        text: 'Патология ЖКТ\n' +
                            '- хронический гастродуоденит', id: 0, value: 3
                    },
                    {text: '- др. заболевания ЖКТ', id: 1, value: 2},
                    {text: 'Патология другая', id: 2, value: 1},
                    {text: 'Отсутствует какая-либо патология', id: 3, value: 0},
                ]
            },
            {
                id: 6,
                question: 'Хронический стресс',
                answers: [
                    {text: 'Присутствует', id: 0, value: 1},
                    {text: 'Отсутствует', id: 1, value: 0}
                ]
            },
            {
                id: 7,
                question: 'Вирусная инфекция',
                answers: [
                    {text: 'в. Эпштейн-Барр', id: 0, value: 3},
                    {text: 'ВПГ', id: 1, value: 2},
                    {text: 'Другие', id: 2, value: 1},
                    {text: 'Не выявлено', id: 3, value: 0}
                ]
            },
            {
                id: 8,
                question: 'Гипо- и авитаминозы',
                answers: [
                    {text: 'Присутствуют', id: 0, value: 1},
                    {text: 'Отсутствуют', id: 1, value: 0}
                ]
            },
            {
                id: 9,
                question: 'Неблагоприятные экологические факторы',
                answers: [
                    {text: 'Присутствуют', id: 0, value: 1},
                    {text: 'Отсутствуют', id: 1, value: 0}
                ]
            },
            {
                id: 10,
                question: 'Смена часовых поясов',
                answers: [
                    {text: 'Регулярная', id: 0, value: 2},
                    {text: 'Нерегулярная', id: 1, value: 1},
                    {text: 'Отсутствуют', id: 2, value: 0}
                ]
            },
            {
                id: 11,
                question: 'Гигиена полости рта',
                answers: [
                    {text: 'Нерегулярно', id: 0, value: 2},
                    {text: 'Регулярно 1 раз в день', id: 1, value: 1},
                    {text: 'Регулярно 2 раза в день', id: 2, value: 0}
                ]
            },
            {
                id: 12,
                question: 'КПУз',
                answers: [
                    {text: 'Преобладание константы "У"', id: 0, value: 3},
                    {text: 'Преобладание константы "К"', id: 1, value: 2},
                    {text: 'Преобладание константы "П"', id: 2, value: 1},
                    {text: 'Практически здоров', id: 3, value: 0}
                ]
            },
            {
                id: 13,
                question: 'Гигиенический индекс (ИГР-У)',
                answers: [
                    {text: '> 2.6 Очень высокий (плохая гигиена полости рта)', id: 0, value: 3},
                    {text: '1.7-2.5 Высокий (неудовлетворительная гигиена)', id: 1, value: 2},
                    {text: '0.7-1.6 Средний (удовлетворительная гигиена)', id: 2, value: 1},
                    {text: '< 0.6 Низкий (хорошая гигиена)', id: 3, value: 0}
                ]
            },
            {
                id: 14,
                question: 'Индекс PMA',
                answers: [
                    {text: 'Тяжелая степень (> 61%)', id: 0, value: 3},
                    {text: 'Средняя степень (31-30%)', id: 1, value: 2},
                    {text: 'Легкая степень (< 30%)', id: 2, value: 1},
                    {text: 'Отсутствие воспаления', id: 3, value: 0}
                ]
            },
            {
                id: 15,
                question: 'КПИ',
                answers: [
                    {text: 'Тяжелая степень (3.6-5.0)', id: 0, value: 3},
                    {text: 'Средняя степень (2.1-3.5)', id: 1, value: 2},
                    {text: 'Легкая степень (1.1-2.0)', id: 2, value: 1},
                    {text: 'Риск заболевания (0.1-1.0)', id: 3, value: 0}
                ]
            }
        ]
    };

    setAnswerHandler = (answerId) => {
        if (this.state.activeQuestion + 1 >= this.state.questions.length) {
            this.setState({isFinished: true})
        }

        let oldTotalValue = this.state.total;
        oldTotalValue += this.state.questions[this.state.activeQuestion].answers[answerId].value;

        this.setState({total: oldTotalValue, activeQuestion: this.state.activeQuestion + 1});

        const newResults = [...this.state.results];
        newResults.push(this.state.questions[this.state.activeQuestion].question + ': ' + this.state.questions[this.state.activeQuestion].answers[answerId].text);
        this.setState({results: newResults});
    };

    redirectHandler = () => {
        this.setState({redirect: true})
    };

    render() {
        let testView = null;

        if (!this.state.redirect) {
            if (this.state.isFinished) {
                testView =
                    <div>
                        <Results
                            results={this.state.results}
                            totalValue={this.state.total}
                        />
                        <div onClick={()=>this.redirectHandler()}> Вернуться к списку пациентов </div>
                    </div>
            } else {
                testView =
                    <div>
                        <Questions question={this.state.questions[this.state.activeQuestion].question}/>
                        <Answers
                            answers={this.state.questions[this.state.activeQuestion].answers}
                            onAnswerClick={this.setAnswerHandler}/>
                    </div>
            }
        } else {
            testView = <Redirect to={'/patients'} />
        }
        return (
            <div>
                {testView}
            </div>
        );
    }
}

export default TestCreator;