import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const ErrorDialog = props => {
    const getErrorText = () => {
        return props.error.text ? props.error.text : JSON.stringify(props.error)
    };

    return (<Dialog
            open={props.open}
            onClose={props.onClose}>
            <DialogTitle>{"Warning, a problem was detected in one of the files"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {getErrorText()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    )
};


export default ErrorDialog;