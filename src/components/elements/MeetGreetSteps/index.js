import React from 'react';
import styles from "./styles.module.scss"
const MeetGreetSteps = ({ steps, activeStep }) => {

    return (
        <div className={styles.steps} >
            {steps.map((step, index) => (
                <div key={index} className={`${styles.step} ${index === activeStep ? styles.active : ''} ${index < activeStep ? styles.completed : ''}`}    >
                    {index < activeStep ? (
                        <span className={styles.stepNumber}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                    ) : (<span className={styles.stepNumber}>{index + 1}</span>)}
                    <p className={styles.stepLabel}>{step}</p>
                    {index !== steps.length - 1 && <span className={styles.stepLine}></span>}
                </div>
            ))}
        </div>
    );
};



export default MeetGreetSteps;
