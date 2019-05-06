import React from "react";
import {CircularProgress, Fab, withStyles} from "@material-ui/core";
import {Check, Save} from "@material-ui/icons";
import * as PropTypes from "prop-types";

const styles = theme => ({
    wrapper: {
        position: 'relative',
    },
    wrapperLoading:{
        marginTop: '100px'
    },
    buttonSuccess: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    fabProgress: {
        color: theme.palette.secondary.light,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: theme.palette.secondary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

const StartBuildButton = props => {
    return (

        <div className={`${props.classes.wrapper} ${(props.success || props.loading) ? props.classes.wrapperLoading : ''}`}>
            <Fab disabled={props.disabled()} color="primary" className={props.classes.buttonSuccess} onClick={props.onClick}>
                {props.success ? <Check/> : <Save/>}
            </Fab>
            {props.loading && <CircularProgress disableShrink size={68} className={props.classes.fabProgress}/>}
        </div>
    )
};

StartBuildButton.propTypes = {
    onClick: PropTypes.func,
    success: PropTypes.any,
    loading: PropTypes.bool
};

export default withStyles(styles)(StartBuildButton);