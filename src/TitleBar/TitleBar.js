import React, {Component} from 'react';
import styled from 'styled-components';
import {Close, CropSquareOutlined, MinimizeOutlined} from '@material-ui/icons'
import {withStyles, IconButton} from "@material-ui/core";

const {remote} = window.require('electron');

// A bit of a mess style wise because the special electron properties don't always work, same with background-color and Iconbutton
const StyledTitleBar = styled.div`
    position: fixed;
    display: flex;
    justify-content: flex-end;
    flex-flow: row;
    top: 0;
    width: 100%;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    
`;

const StyledIconButton = styled(IconButton)`
    -webkit-app-region: no-drag;
`;

const styles = theme => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    icon: {
        fontSize: "20px"
    }
});


const TitleBar = props => {
    const {classes} = props;

    const minimizeWindow = () => {
        remote.getCurrentWindow().minimize()
    };

    const minMaxWindow = () => {
        const currentWindow = remote.getCurrentWindow();

        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()
    };

    const closeWindow = () => {
        remote.app.quit();
    };

    return (
        <StyledTitleBar className="drag">
            <StyledIconButton className={classes.button} onClick={minimizeWindow} disableFocusRipple={true}
                              disableRipple={true}>
                <MinimizeOutlined className={classes.icon}/>
            </StyledIconButton>
            <StyledIconButton onClick={minMaxWindow} className={classes.button} disableFocusRipple={true}
                              disableRipple={true}>
                <CropSquareOutlined className={classes.icon}/>
            </StyledIconButton>
            <StyledIconButton onClick={closeWindow} className={classes.button} disableFocusRipple={true}
                              disableRipple={true}>
                <Close className={classes.icon}/>
            </StyledIconButton>
        </StyledTitleBar>
    );
};

export default withStyles(styles)(TitleBar);
