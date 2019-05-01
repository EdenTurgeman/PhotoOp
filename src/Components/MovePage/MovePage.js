import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import green from '@material-ui/core/colors/green';
import {withStyles} from '@material-ui/core';
import {connect} from "react-redux";
import BuildConfirmationDialog from "./BuildConfirmationDialog";
import StartBuildButton from "./StartBuildButton";

const {ipcRenderer} = window.require('electron');

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
        this.subscribeToReplies();
    }

    subscribeToReplies = () => {
        ipcRenderer.on('moveFiles-reply', (event, arg) => {
            this.setState({
                ...this.state,
                loading: false,
                success: true,
            });

            this.props.onComplete();
        })
    };

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

                    ipcRenderer.send('moveFiles', {
                        usedFields: this.props.path.usedFields,
                        srcPath: this.props.path.srcPath,
                        destPath: this.props.path.destPath
                    });
                },
            );
        }
    };

    isPathSet = () => {
        return !(this.props.path.srcPath && this.props.path.destPath);
    };

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <StartBuildButton disabled={this.isPathSet} classes={classes}
                                  onClick={this.handleToggleDialog}
                                  success={this.state.success}
                                  loading={this.state.loading}/>
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

export default connect(mapStateToProps)(MovePage);