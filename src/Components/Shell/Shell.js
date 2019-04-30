import React, {Component} from "react";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import StructurePage from "../StructurePage/StructurePage";
import MovePage from "../MovePage/MovePage";
import {Step, StepButton, StepLabel, Stepper, Typography} from "@material-ui/core";
import {StyledContent, StyledShell, StyledSlidesContainer, StyledStepperContainer} from "./StyledComponents";

const steps = [
    {
        label: 'Location',
        component: <PathPage/>
    },
    {
        label: 'Folders',
        component: <StructurePage/>
    },
    {
        label: 'Move',
        component: <MovePage/>
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
            completed: [false, false]
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
                        <Stepper nonLinear  style={{backgroundColor: "transparent"}}
                                 activeStep={this.state.activeStep}>
                            {
                                steps.map((step, index) => {
                                    return <Step key={step.label}>
                                        <StepButton optional={<Typography variant="caption">{step.subText}</Typography>} onClick={this.handleStep(index)}
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