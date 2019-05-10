import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {LinearProgress, Typography} from '@material-ui/core'

const StyledLinearProgress = styled(LinearProgress)`
    width: 80%;
`;

const StyledProgressContainer = styled.div`
    height: 100px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    width: 100%;
`;

const ProcessLoading = (props) => {
    const normalise = () => props.processSuccess ? 100 : (props.filesDone) * 100 / (props.filesInFolder);
    return (
        <StyledProgressContainer>
            <Typography color='textPrimary'>
                {
                    ((!props.processSuccess ? props.filesDone : props.filesInFolder) + " of " + props.filesInFolder)
                }
            </Typography>
            <StyledLinearProgress color="primary" variant="determinate" value={normalise()}/>
        </StyledProgressContainer>
    )
};

ProcessLoading.propTypes = {
    move: PropTypes.any,
    filesDone: PropTypes.any,
    filesInFolder: PropTypes.any,
    value: PropTypes.number
};

export default ProcessLoading;