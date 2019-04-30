import React, {Component} from "react";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import StructurePage from "../StructurePage/StructurePage";
import {Step, StepButton, StepLabel, Stepper} from "@material-ui/core";
import {StyledContent, StyledShell, StyledSlidesContainer, StyledStepperContainer} from "./StyledComponents";

const steps = [
    {
        label: 'Path',
        component: <PathPage/>
    },
    {
        label: 'Structure',
        component: <StructurePage/>
    },
    {
        label: 'Move',
        component: <dix/>
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
            completed: [true, false]
        }
    }

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    render() {
        return (
            <StyledShell>
                <TitleBar/>
                <StyledContent>
                    <StyledSlidesContainer>
                        {getStepComponent(this.state.activeStep)}
                    </StyledSlidesContainer>
                    <StyledStepperContainer>
                        <Stepper style={{backgroundColor: "transparent"}}
                                 activeStep={this.state.activeStep}>
                            {
                                steps.map((step, index) => {
                                    return <Step key={step.label}>
                                        <StepButton onClick={this.handleStep(index)}
                                                    completed={this.state.completed[index]}>
                                            <StepLabel>{step.label}</StepLabel>
                                        </StepButton>
                                    </Step>
                                })
                            }
                        </Stepper>
                    </StyledStepperContainer>
                </StyledContent>
            </StyledShell>
        )
    }
}

export default Shell;