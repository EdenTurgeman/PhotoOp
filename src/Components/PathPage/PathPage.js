import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {setDest, setSrc} from "../../Redux/actions/PathActions";
import {PathCard} from "./PathCard";
import styled from "styled-components";
import {ArrowDownward} from "@material-ui/icons";

export const StyledArrow = styled(ArrowDownward)`
    margin: 10px;
`;

const PathPage = props => {
    if (props.path.srcPath && props.path.destPath) {
        props.onComplete();
    }

    return (
        <Fragment>
            <PathCard setPath={props.setSrcPath} path={props.path.srcPath} text='From'/>
            <StyledArrow color='action' fontSize='large'/>
            <PathCard setPath={props.setDestPath} path={props.path.destPath} text='To'/>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        path: state.path
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSrcPath: srcPath => {
            if (srcPath) {
                dispatch(setSrc(srcPath[0]));
            }
        },
        setDestPath: destPath => {
            if (destPath) {
                dispatch(setDest(destPath[0]));
            }
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PathPage);