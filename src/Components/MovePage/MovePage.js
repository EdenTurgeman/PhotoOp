import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import green from '@material-ui/core/colors/green';
import {
    Button,
    CircularProgress,
    Fab,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    withStyles
} from '@material-ui/core';
import {Check, Save} from '@material-ui/icons';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {BuildConfirmationDialog} from "./BuildConfirmationDialog";

const {ipcRenderer} = window.require('electron');


const styles = theme => ({
    wrapper: {
        marginTop: '40px',
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});



class MovePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filesInFolder: 0,
            loading: false,
            success: false,
            open: false
        };
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("moveFiles-reply");
    }

    componentWillMount() {
        ipcRenderer.on('moveFiles-reply', (event, arg) => {
            console.log(arg)
            this.setState({
                ...this.state,
                loading: false,
                success: true,
            });
        })
    }

    handleToggleDialog = () => {
        this.setState({
            ...this.state,
            filesInFolder: ipcRenderer.sendSync('filesInFolder', this.props.path.destPath),
            open: !this.state.open
        })
    };

    handleStartBuild = () => {
        if (!this.state.loading) {
            this.setState(
                {...this.state, loading: true,},
                () => {
                    this.handleToggleDialog();

                    setTimeout(() => {
                        ipcRenderer.send('moveFiles', {
                            usedFields: this.props.path.usedFields,
                            srcPath: this.props.path.srcPath,
                            destPath: this.props.path.destPath
                        });
                    }, 2000);
                },
            );
        }
    };

    render() {
        const {loading, success} = this.state;
        const {classes} = this.props;

        return (
            <Fragment>
                <div className={classes.wrapper}>
                    <Fab color="primary" className={classes.buttonSuccess} onClick={this.handleToggleDialog}>
                        {success ? <Check/> : <Save/>}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
                </div>
                <BuildConfirmationDialog open={this.state.open} onClose={this.handleClose}
                                         filesInFolder={this.state.filesInFolder}
                                         onClick={this.handleToggleDialog}
                                         onClick1={this.handleStartBuild}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.path
    }
};

export default connect(mapStateToProps)(withStyles(styles)(MovePage));