import classes from "../../components/EntryProfile/EntryProfile.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import React from "react";
import {EntryProfileForm} from '../../DataBase/EntryProfileForm';

const entryProfile = (props) => {
    let updatedForm = [];
    Object.keys(EntryProfileForm).map(el => {
       return updatedForm.push(EntryProfileForm[el])
    });

    let updatedAnswers = [];
        Object.keys(props.profileData).map(el => {
           return updatedAnswers.push(props.profileData[el])
        });

        let form = (
            (<div className={classes.profileBlock} onClick={props.clicked}>
                <h1 className={classes.profile__title}>Результаты первичного анкетирования</h1>
                <div className={classes.profile__content}>
                    {updatedForm.map((formElement, i) => {
                            return (<Aux key={i}>
                                    <p className={classes.profileBlock__p}> {formElement.text} <span className={classes.profileBlock__answers}>{updatedAnswers[i].value!=='' ? updatedAnswers[i].value : '_____________'}</span></p>
                                </Aux>
                            )
                        }
                    )}
                    <h2 className={classes.profileBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты полости
                        рта</h2>
                </div>
            </div>));

    return (form);
};

export default entryProfile;


