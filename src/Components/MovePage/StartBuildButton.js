import React from "react";
import {CircularProgress, Fab, withStyles} from "@material-ui/core";
import {Check, Save} from "@material-ui/icons";
import * as PropTypes from "prop-types";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
    wrapper: {
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

const StartBuildButton = props => {
    return (
        <div className={props.classes.wrapper}>
            <Fab color="primary" className={props.classes.buttonSuccess} onClick={props.onClick}>
                {props.success ? <Check/> : <Save/>}
            </Fab>
            {props.loading && <CircularProgress size={68} className={props.classes.fabProgress}/>}
        </div>
    )
};

StartBuildButton.propTypes = {
    onClick: PropTypes.func,
    success: PropTypes.any,
    loading: PropTypes.bool
};

export default withStyles(styles)(StartBuildButton);