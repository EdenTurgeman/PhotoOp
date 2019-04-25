import React from 'react';
import styled from 'styled-components';
import {Card, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const {dialog} = window.require('electron').remote;

const StyledPathCard = styled(Card)`
    width: 300px;
    height: 50px;  
    padding: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
`;

const StyledPathText = styled(Typography)`
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const PathCard = props => {
    const selectDirectory = setSrcPath => {
        dialog.showOpenDialog(
            {properties: ['openDirectory', 'multiSelections']}, setSrcPath);
    };
    return (
        <StyledPathCard>
            <Button onClick={() => selectDirectory(props.setPath)}>{props.text}</Button>
            <StyledPathText>{props.path}</StyledPathText>
        </StyledPathCard>
    );
};

