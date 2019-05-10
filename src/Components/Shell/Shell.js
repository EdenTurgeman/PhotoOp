import React, {Component, createElement} from "react";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import StructurePage from "../StructurePage/StructurePage";
import StartPage from "../StartPage/StartPage";
import {Step, StepButton, StepLabel, Stepper, Typography} from "@material-ui/core";
import {
    StyledContent,
    StyledShell,
    StyledPagesContainer,
    StyledStepperContainer,
} from "./StyledComponents";
import ErrorDialog from "../ErrorNotification/ErrorDialog";

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

class Shell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            completed: [false, false],
            errorDialogOpen: false,
            error: {}
        }
    }

    componentWillMount() {
        ipcRenderer.on('error',(event, error) => {
            this.setState({
                ...this.state,
                errorDialogOpen: true,
                error
            })
        })
    }

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleNextStep = () => {
        if (this.state.activeStep < steps.length - 1) {
            this.setState({
                activeStep: this.state.activeStep + 1
            });
        }
    };

    onCompleteStep = stepIndex => {
        if (!steps[stepIndex].completed) {
            steps[stepIndex].completed = true;
        }
    };

    closeErrorDialog = () => {
        this.setState({
            ...this.state,
            errorDialogOpen: false,
            error: {}
        })
    };

    render() {
        return (
            <StyledShell>
                <TitleBar/>
                <StyledContent>
                    <StyledPagesContainer>
                        {createElement(getStepComponent(this.state.activeStep),
                            {
                                onComplete: () => this.onCompleteStep(this.state.activeStep)
                            })}
                    </StyledPagesContainer>
                    <StyledStepperContainer>
                        <Stepper nonLinear
                                 style={{backgroundColor: "transparent"}}
                                 activeStep={this.state.activeStep}>
                            {
                                steps.map((step, index) => {
                                    return <Step key={step.label}>
                                        <StepButton onClick={this.handleStep(index)}
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
                <ErrorDialog open={this.state.errorDialogOpen} onClose={this.closeErrorDialog} error={this.state.error}/>
            </StyledShell>
        )
    }
}

export default Shell;