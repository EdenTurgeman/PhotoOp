import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {setSrc, setDest} from "../../Redux/actions/PathActions";
import {PathCard} from "./PathCard";
import styled from "styled-components";
import {ArrowDownward} from "@material-ui/icons";

export const StyledArrow = styled(ArrowDownward)`
    margin: 10px;
`;

class PathPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: 'tags'
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.path.srcPath && nextProps.path.destPath) {
            this.props.onComplete();
        }
    }

    render() {
        return (
            <Fragment>
                <PathCard setPath={this.props.setSrcPath} path={this.props.path.srcPath} text='From'/>
                <StyledArrow fontSize='large'/>
                <PathCard setPath={this.props.setDestPath} path={this.props.path.destPath} text='To'/>
            </Fragment>
        );
    }
}

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


/*
import {ArrowDownward} from '@material-ui/icons';
import styled, {keyframes} from 'styled-components';

const pulse = keyframes`
    0% {
        : #BDBDBD;
}
    100%{
        color: #F9A825;
       }
`;

const StyledArrow = styled(ArrowDownward)`
    //animation: ${pulse} 2s alternate infinite;
    color: #9E9E9E;
`;
 */