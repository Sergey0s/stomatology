import React from "react";
import classes from './Treatment.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const treatment = (props) => {
    let msg1 = '';
    let risk = '';
    if (props.totalValue <= 10) {
        risk = 'Низкий'
    } else if (props.totalValue > 10 && props.totalValue <= 20) {
        risk = 'Умеренный'
    } else if (props.totalValue > 20 && props.totalValue <= 30) {
        risk = 'Высокий'
    }

    msg1 =
        <div className={classes.Treatment}>
            <p className={classes.Treatment__title}>Результат теста:</p>
            <p>{risk} риск развития РАC.</p>
            <p>Рекомендации по питанию.</p>
            <p>Коррекция выявленных нарушений.</p>
            <p>Санация полости рта.</p>
            <p>Профессиональная гигиена полости рта</p>
            { risk === 'Высокий'&& <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
        </div>;

    return (
        <Aux>
            {msg1}
        </Aux>
    )
};

export default treatment;