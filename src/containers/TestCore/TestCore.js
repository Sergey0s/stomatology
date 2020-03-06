import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answers';
import Results from '../../components/Results/Results';
import classes from './TestCore.css';
import questionList1 from "../../components/DataBase/List1";


class TestCore extends Component {
    state = {
        results: [],
        isFinished: false,
        activeQuestion: 0,
        total1: 0,
        total2: 0,
        questions: questionList1,
        redirect: false
    };

    setAnswerHandler = (answerId) => {
        // let numberOfQuestions = null;
        //
        // if (this.props.stomatit) {
        //     numberOfQuestions = 18;
        // } else {
        //     numberOfQuestions = 15;
        // }
        //
        // if (this.state.activeQuestion + 1 >= numberOfQuestions) {
        //     this.setState({isFinished: true})
        // }
        //
        // if (this.state.activeQuestion <= 15) {
        //     let oldTotalValue = this.state.total1;
        //     oldTotalValue += this.state.questions[this.state.activeQuestion].answers[answerId].value;
        //     this.setState({total1: oldTotalValue, activeQuestion: this.state.activeQuestion + 1});
        // } else {
        //     let oldTotalValue = this.state.total2;
        //     oldTotalValue += this.state.questions[this.state.activeQuestion].answers[answerId].value;
        //     this.setState({total2: oldTotalValue, activeQuestion: this.state.activeQuestion + 1});
        // }
        // const newResults = [...this.state.results];
        // newResults.push(this.state.questions[this.state.activeQuestion].question + ': ' + this.state.questions[this.state.activeQuestion].answers[answerId].text);
        // this.setState({results: newResults});
    };

    redirectHandler = () => {
        this.setState({redirect: true})
    };

    render() {
        console.log(this.props.stomatit, this.props.stomatitNow);
        console.log(this.state.total1, this.state.total2);

        let testView = null;

        if (!this.state.redirect) {
            if (this.state.isFinished) {
                testView =
                    <div>
                        {(!this.props.stomatit && !this.props.stomatitNow &&
                            <Results
                                results={this.state.results}
                                firstTestResult={this.state.total1}
                            />)
                        ||
                        (this.props.stomatit && !this.props.stomatitNow &&
                            <Results
                                results={this.state.results}
                                firstTestResult={this.state.total1}
                                secondTestResult={this.state.total2}
                            />) ||
                        (this.props.stomatit && this.props.stomatitNow &&
                            <Results
                                results={this.state.results}
                                firstTestResult={this.state.total1}
                                secondTestResult={this.state.total2}
                                stomatitNow={true}
                            />)
                        }
                        <div className={classes.TestCore__backButton}

                            onClick={() => this.redirectHandler()}> Вернуться к списку пациентов</div>
                    </div>
            } else {
                testView =
                    <div>
                        <p className={classes.Test__title}> {this.state.questions[this.state.activeQuestion].title}</p>
                        <Questions question={this.state.questions[this.state.activeQuestion].question}/>
                        <Answers
                            answers={this.state.questions[this.state.activeQuestion].answers}
                            onAnswerClick={this.setAnswerHandler}/>
                    </div>
            }
        } else {
            testView = <Redirect to={'/patients'}/>
        }

        return (
            <div>
                {testView}
            </div>
        );
    }
}

export default TestCore;