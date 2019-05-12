import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import BuildConfirmationDialog from "./BuildConfirmationDialog";
import StartBuildButton from "./StartBuildButton";
import {setProcessEnded, setProcessStarted, setProcessSuccess,} from "../../Redux/actions/MoveActions";
import ProcessLoading from "./ProcessLoading";

const {ipcRenderer} = window;

const StartPage = props => {
    const [filesInFolder, setFilesInFolder] = useState(0);
    const [filedDone, setFilesDone] = useState(0);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const subscribeToUpdates = () => {
        ipcRenderer.on('moveFiles-reply', () => {
            props.setProcessEnded();
            props.setProcessSuccess();
            props.onComplete();
        });

        ipcRenderer.on('progress-report', (event, filesDone) => {
            setFilesDone(filesDone);
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
        return !(props.path.srcPath && props.path.destPath);
    };

    return (
        <Fragment>
            <StartBuildButton disabled={isPathSet} classes={props.classes}
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