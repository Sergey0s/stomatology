import React, {Component} from "react";
import FAKEtestCore from "../TestCore/FAKEtestCore";
import Questions from "../../components/Questions/Questions";
import Answers from "../../components/Answers/Answers";
import classes from '../Test/Test.css';

class Test extends Component {
    state = {
        isFinished: false,
        stomatit: false,
        stomatitNow: false,
        activeQuestion: 0,
        questions: [
            {
                id: 1,
                question: 'Есть ли в анамнезе рецидивирующий афтозный стоматит?',
                answers: [
                    {text: 'Да', id: '1'},
                    {text: 'Нет', id: '0'}
                ]
            },
            {
                id: 2,
                question: 'Есть ли в настоящее время клинические проявления рецидивирующего афтозного стоматита?',
                answers: [
                    {text: 'Да', id: '1'},
                    {text: 'Нет', id: '0'}
                ]
            }
        ]
    };

    setAnswerHandler = (answerId) => {
        if (this.state.activeQuestion+1 >=2) {
            this.setState({isFinished: true})
        }

        if (this.state.activeQuestion === 0 && answerId === '1') {
            this.setState({stomatit: true})
        }

        if (this.state.activeQuestion === 1 && answerId === '1') {
            this.setState({stomatitNow: true})
        }

        this.setState({activeQuestion: this.state.activeQuestion + 1});
    };

    render() {
        let test = null;

        if (!this.state.isFinished) {
            test =
                <div className={classes.Test}>
                    <Questions question={this.state.questions[this.state.activeQuestion].question}/>
                    <Answers
                        answers={this.state.questions[this.state.activeQuestion].answers}
                        onAnswerClick={this.setAnswerHandler}/>
                </div>
        } else {
            test = (<FAKEtestCore
                stomatit = {this.state.stomatit}
                stomatitNow = {this.state.stomatitNow}/>)
        }
        return (
            <div>
                {test}
            </div>)
    }
}

export default Test;