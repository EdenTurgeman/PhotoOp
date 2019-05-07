import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import BuildConfirmationDialog from "./BuildConfirmationDialog";
import StartBuildButton from "./StartBuildButton";
import {setProcessEnded, setProcessStarted, setProcessSuccess,} from "../../Redux/actions/MoveActions";
import ProcessLoading from "./ProcessLoading";

const {ipcRenderer} = window.require('electron');

class StartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filesInFolder: ipcRenderer.sendSync('filesInFolder', this.props.path.srcPath),
            filesDone: 0,
            open: false
        };
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("moveFiles-reply");
        ipcRenderer.removeAllListeners("progress-report");
    }

    componentWillMount() {
        this.subscribeToReplies();
    }

    subscribeToReplies = () => {
        ipcRenderer.on('moveFiles-reply', () => {
            this.props.setProcessEnded();
            this.props.setProcessSuccess();
            this.props.onComplete();
        });

        ipcRenderer.on('progress-report', (event, filesDone) => {
            this.setState({
                ...this.state,
                filesDone: filesDone
            })
        });
    };

    handleToggleDialog = () => {
        this.setState({
            ...this.state,
            open: !this.state.open
        })
    };

    handleStartBuild = () => {
        if (!this.props.move.processRunning) {
            this.handleToggleDialog();
            ipcRenderer.send('moveFiles', {
                    usedFields: this.props.path.usedFields,
                    srcPath: this.props.path.srcPath,
                    destPath: this.props.path.destPath
                },
            );

            this.props.setProcessStarted();
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
                                  success={this.props.move.processSuccess}
                                  loading={this.props.move.processRunning}/>
                {
                    (this.props.move.processSuccess || this.props.move.processRunning) &&
                    <ProcessLoading processSuccess={this.props.move.processSuccess}
                                    filesDone={this.state.filesDone}
                                    filesInFolder={this.state.filesInFolder}/>

                }
                <BuildConfirmationDialog open={this.state.open} onClose={this.handleClose}
                                         filesInFolder={this.state.filesInFolder}
                                         onClick={this.handleToggleDialog}
                                         onConfirm={this.handleStartBuild}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.path,
        move: state.move
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setProcessStarted: () => {
            dispatch(setProcessStarted());
        },
        setProcessSuccess: () => {
            dispatch(setProcessSuccess());
        },
        setProcessEnded: () => {
            dispatch(setProcessEnded());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);