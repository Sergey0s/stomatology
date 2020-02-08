import React, { Component } from "react";
import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answers';
import Results from '../../components/Results/Results';
import Patient from '../../components/Patient/Patient';

class TestCreator extends Component {
    state = {
        patient: [
            {created: false},
            {name: ''}],
        results: [],
        isFinished: false,
        activeQuestion: 0,
        total: 0,
        questions: [
            {
                id: 1,
                question: 'Аллергологический анамнез',
                answers: [
                    {text: 'Отягощен', id: 0, value: 1}, {text: 'Не отягощен', id: 1, value: 0}]
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
            }
        ]
    };

    changeNameHandler = (event) => {
        this.setState(
            {
                patient:
                    [
                        {created: this.state.patient[0].created},
                        {name: event.target.value},
                        ]
            })
    };

    saveNameHandler = () => {
        this.setState(
            {
                patient:
                    [
                        {created: true},
                        {name: this.state.patient[1].name},
                        ]
            })
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


    render() {
        console.log(this.state.patient);

        let testView = null;

        if (!this.state.patient[0].created) {
            testView =
                <div>
                    <Patient
                        onChange={this.changeNameHandler}
                        onClick = {this.saveNameHandler}

                    />
                </div>
        } else if (this.state.isFinished) {
            testView =
                <div>
                    <Results
                        results={this.state.results}
                        totalValue={this.state.total}
                        patientName = {this.state.patient[1].name}
                    />
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

        return (
            <div>
                {testView}
            </div>
        );
    }
}

export default TestCreator;