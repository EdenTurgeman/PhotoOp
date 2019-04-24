import React, {Component} from 'react';
import styled from 'styled-components';
import {Close, CropSquareOutlined, MinimizeOutlined} from '@material-ui/icons'
import {withStyles, IconButton} from "@material-ui/core";

const StyledTitleBar = styled.div`
    position: fixed;
    display: flex;
    justify-content: flex-end;
    flex-flow: row;
    top: 0;
    width: 100%;
    height: 25px;
`;

const styles = theme => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent",
            fontSize: '5px'
        }
    }
});


const TitleBar = props => {
    const {classes} = props;
    return (
        <StyledTitleBar>
            <IconButton className={classes.button} disableFocusRipple={true} disableRipple={true}>
                <MinimizeOutlined/>
            </IconButton>
            <IconButton className={classes.button} disableFocusRipple={true} disableRipple={true}>
                <CropSquareOutlined/>
            </IconButton>
            <IconButton className={classes.button} disableFocusRipple={true} disableRipple={true}>
                <Close/>
            </IconButton>
        </StyledTitleBar>
    );
};

export default withStyles(styles)(TitleBar);
