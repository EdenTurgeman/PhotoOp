import React, {createElement, useState} from "react";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import StructurePage from "../StructurePage/StructurePage";
import StartPage from "../StartPage/StartPage";
import {Step, StepButton, StepLabel, Stepper, Typography} from "@material-ui/core";
import {StyledContent, StyledPagesContainer, StyledShell, StyledStepperContainer,} from "./StyledComponents";
import ErrorDialog from "../ErrorDialog/ErrorDialog";

const {ipcRenderer} = window;

const steps = [
    {
        label: 'Location',
        component: PathPage,
        completed: false
    },
    {
        label: 'Folders',
        component: StructurePage,
        subText: 'Optional',
        completed: false
    },
    {
        label: 'Start',
        component: StartPage,
        completed: false
    }
];

const getStepComponent = step => {
    return steps[step].component;
};

const Shell = props => {
    const [activeStep, setActiveStep] = useState(0);
    const [errorDialog, setError] = useState({
        open: false,
        error: {}
    });

    ipcRenderer.on('error', (event, error) => {
        setError({
            open: true,
            error
        })
    });

    const handleStep = step => () => {
        setActiveStep(step);
    };

    const onCompleteStep = stepIndex => {
        if (!steps[stepIndex].completed) {
            steps[stepIndex].completed = true;
        }
    };

    const onCancelStep = stepIndex => {
        if (steps[stepIndex].completed) {
            steps[stepIndex].completed = false;
        }
    };

    const closeErrorDialog = () => {
        setError({
            open: false,
            error: {}
        });
    };

    return (
        <StyledShell>
            <TitleBar/>
            <StyledContent>
                <StyledPagesContainer>
                    {createElement(getStepComponent(activeStep),
                        {
                            onComplete: () => onCompleteStep(activeStep),
                            onCancel: () => onCancelStep(activeStep)
                        })}
                </StyledPagesContainer>
                <StyledStepperContainer>
                    <Stepper nonLinear
                             style={{backgroundColor: "transparent"}}
                             activeStep={activeStep}>
                        {
                            steps.map((step, index) => {
                                return <Step key={step.label}>
                                    <StepButton onClick={handleStep(index)}
                                                optional={<Typography variant="caption">{step.subText}</Typography>}
                                                completed={steps[index].completed}>
                                        <StepLabel>{step.label}</StepLabel>
                                    </StepButton>
                                </Step>
                            })
                        }
                    </Stepper>
                </StyledStepperContainer>
            </StyledContent>
            <ErrorDialog open={errorDialog.open} onClose={closeErrorDialog}
                         error={errorDialog.error}/>
        </StyledShell>
    )
};

export default Shell;