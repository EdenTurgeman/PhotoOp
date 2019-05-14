import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import StartBuildButton from "./StartBuildButton";
import BuildConfirmationDialog from "./BuildConfirmationDialog";
import {setProcessEnded, setProcessStarted, setProcessSuccess,} from "../../Redux/actions/MoveActions";
import ProcessLoading from "./ProcessLoading";

const {ipcRenderer} = window;

const toolTipMessages = {
    path: 'Please set a path',
    field: 'Project name is not filled'
};

const StartPage = props => {
    const [filesInFolder, setFilesInFolder] = useState(0);
    const [filedDone, setFilesDone] = useState(0);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [toolTipMessage, setToolTipMessage] = useState('');

    const subscribeToUpdates = () => {
        ipcRenderer.on('moveFiles-reply', () => {
            props.setProcessEnded();
            props.setProcessSuccess();
            props.onComplete();
        });

        ipcRenderer.on('progress-report', (event, progressUpdate) => {
            if(progressUpdate > filedDone){
                setFilesDone(progressUpdate);
            }
        });
    };

    const unsubscribeFromUpdates = () => {
        ipcRenderer.removeAllListeners("moveFiles-reply");
        ipcRenderer.removeAllListeners("progress-report");
    };

    useEffect(() => {
        subscribeToUpdates();
        setFilesInFolder(ipcRenderer.sendSync('filesInFolder', props.path.srcPath));

        return () => {
            unsubscribeFromUpdates();
        }
    }, []);

    const handleToggleDialog = () => {
        setConfirmationOpen(!confirmationOpen);
    };

    const handleStartBuild = () => {
        if (!props.move.processRunning) {
            handleToggleDialog();

            ipcRenderer.send('moveFiles', {
                    usedFields: props.path.usedFields,
                    srcPath: props.path.srcPath,
                    destPath: props.path.destPath
                },
            );

            props.setProcessStarted();
        }
    };

    const isPathSet = () => {
        return (props.path.srcPath && props.path.destPath);
    };

    const areUserFieldsFull = () => {
        return props.path.usedFields.every(field => {
            return !field.userInput || field.fieldValue !== undefined;
        });
    };

    useEffect(() => {
        setToolTipMessage(!isPathSet() ? toolTipMessages.path : '');
        setToolTipMessage(!areUserFieldsFull() ? toolTipMessages.field: '');
    }, [props.path]);

    return (
        <Fragment>
            <StartBuildButton toolTipMessage={toolTipMessage}
                              disabled={() => !(isPathSet() && areUserFieldsFull())} classes={props.classes}
                              onClick={handleToggleDialog}
                              success={props.move.processSuccess}
                              loading={props.move.processRunning}/>
            {
                (props.move.processSuccess || props.move.processRunning) &&
                <ProcessLoading processSuccess={props.move.processSuccess}
                                filesDone={filedDone}
                                filesInFolder={filesInFolder}/>

            }
            <BuildConfirmationDialog open={confirmationOpen} onClose={handleToggleDialog}
                                     filesInFolder={filesInFolder}
                                     onClick={handleToggleDialog}
                                     onConfirm={handleStartBuild}/>
        </Fragment>
    );
};

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