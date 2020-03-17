import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from "../../store/actions";

import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answers';
import classes from './TestCore.css';
import {Redirect} from "react-router-dom";

class TestCore extends Component {
        state = {
            results: [],
            activeQuestion: 0,
            totalScore: 0,
            testCompleted: false,
        };


    setAnswerHandler = (answerId) => {

        let oldTotalValue = this.state.totalScore;
        console.log(this.props.questions.questions[this.state.activeQuestion].answers[answerId].value);
        oldTotalValue += this.props.questions.questions[this.state.activeQuestion].answers[answerId].value;
        this.setState({totalScore: oldTotalValue, activeQuestion: this.state.activeQuestion + 1});

        const newResults = [...this.state.results];
        newResults.push(this.props.questions.questions[this.state.activeQuestion].question + ': ' + this.props.questions.questions[this.state.activeQuestion].answers[answerId].text);
        this.setState({results: newResults});

        if (this.state.activeQuestion + 1 >= this.props.questions.questions.length) {
            this.setState({testCompleted: true});
        }
    };

    sendResultsHandler = () => {
        console.log(this.state.totalScore);
        this.props.onCompleteTest(this.props.patientId,this.props.questions.questionsListName, this.state.totalScore)
    };

    render() {
        console.log(this.props.questions);
        console.log(this.state.totalScore);

        let testView = null;

        if (!this.state.testCompleted) {
            testView =
                <div>
                    <p className={classes.Test__title}> {this.props.questions.questions[this.state.activeQuestion].title}</p>
                    <Questions question={this.props.questions.questions[this.state.activeQuestion].question}/>
                    <Answers
                        answers={this.props.questions.questions[this.state.activeQuestion].answers}
                        onAnswerClick={this.setAnswerHandler}/>
                </div>;
        } else {
            this.sendResultsHandler();
            testView = <Redirect to={'/patients'}/>
        }

        return (
            <div>
                {testView}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompleteTest: (patientId, testName, totalScore) => dispatch(actions.testCompletedSuccess(patientId, testName, totalScore)),
        onTestStarted: () => dispatch(actions.testStarted())
    }
};

export default connect(null, mapDispatchToProps)(TestCore);
//
// class TestCore extends Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//             results: [],
//             activeQuestion: 0,
//             totalScore: 0,
//             redirect: false};
//     }
//
//     handleChange() {
//         this.props.isFinishedChange();
//     }
//
//     setAnswerHandler = (answerId) => {
//
//         if (this.state.activeQuestion + 1 >= this.props.questions.questions.length) {
//             this.props.onCompleteTest(this.props.patientId,this.props.questions.questionsListName, this.state.totalScore);
//             this.handleChange();
//         }
//
//         let oldTotalValue = this.state.totalScore;
//         oldTotalValue += this.props.questions.questions[this.state.activeQuestion].answers[answerId].value;
//         this.setState({totalScore: oldTotalValue, activeQuestion: this.state.activeQuestion + 1});
//
//         const newResults = [...this.state.results];
//         newResults.push(this.props.questions.questions[this.state.activeQuestion].question + ': ' + this.props.questions.questions[this.state.activeQuestion].answers[answerId].text);
//         this.setState({results: newResults});
//     };
//
//     render() {
//         console.log(this.state.totalScore);
//
//         let testView = null;
//
//                 testView =
//                     <div>
//                         <p className={classes.Test__title}> {this.props.questions.questions[this.state.activeQuestion].title}</p>
//                         <Questions question={this.props.questions.questions[this.state.activeQuestion].question}/>
//                         <Answers
//                             answers={this.props.questions.questions[this.state.activeQuestion].answers}
//                             onAnswerClick={this.setAnswerHandler}/>
//                     </div>;
//
//         return (
//             <div>
//                 {testView}
//             </div>
//         );
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onCompleteTest: (patientId, testName, totalScore) => dispatch(actions.testCompletedSuccess(patientId, testName, totalScore))
//     }
// };
//
// export default connect(null, mapDispatchToProps)(TestCore);