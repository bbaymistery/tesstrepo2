import React from 'react';
import styles from "./styles.module.scss"
import { useSelector } from 'react-redux';
const Steps = ({ steps, activeStep }) => {
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state
    const { appData } = useSelector(state => state.initialReducer)

    return (
        <div className={styles.steps} direction={String(direction === 'rtl')}>
            {steps.map((step, index) => (
                <div key={index} className={`${styles.step} ${index === activeStep ? styles.active : ''} ${index < activeStep ? styles.completed : ''}`}    >
                    {index < activeStep ? (
                        <span className={styles.stepNumber}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                    ) : (<span className={styles.stepNumber}>{index + 1}</span>)}
                    <p className={styles.stepLabel}>{appData?.words[step]}</p>
                    {index !== steps.length - 1 && <span className={styles.stepLine}></span>}
                </div>
            ))}
        </div>
    );
};



export default Steps;
