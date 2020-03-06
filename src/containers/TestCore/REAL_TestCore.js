import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answers';
import classes from './TestCore.css';
import questionList1 from "../../components/DataBase/List1";

class REAL_TestCore extends Component {
    state = {
        results: [],
        isFinished: false,
        activeQuestion: 0,
        total: 0,
        questions: questionList1.questions,
        redirect: false
    };

    setAnswerHandler = (answerId) => {

        if (this.state.activeQuestion + 1 >= this.state.questions.length) {
            this.setState({isFinished: true})}


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
        console.log(this.state.questions);
        console.log(this.props.patientId);
        console.log(this.state.total);
        let testView = null;
        if (!this.state.isFinished) {
            testView =
                <div>
                    <p className={classes.Test__title}> {this.state.questions[this.state.activeQuestion].title}</p>
                    <Questions question={this.state.questions[this.state.activeQuestion].question}/>
                    <Answers
                        answers={this.state.questions[this.state.activeQuestion].answers}
                        onAnswerClick={this.setAnswerHandler}/>
                </div>;
        } else {
            console.log(this.state.total);
            testView = <Redirect to={'/patients'}/>
        }

        return (
            <div>
                {testView}
            </div>
        );
    }
}

export default REAL_TestCore;