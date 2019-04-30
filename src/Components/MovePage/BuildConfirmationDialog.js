import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import * as PropTypes from "prop-types";

export class BuildConfirmationDialog extends Component {
    render() {
        return <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to move {this.props.filesInFolder} files? This operation cannot be reversed
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.onClick} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.props.onClick1} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>;
    }
}

BuildConfirmationDialog.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    filesInFolder: PropTypes.number,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};