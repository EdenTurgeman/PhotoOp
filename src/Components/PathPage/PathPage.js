import React, {Component} from 'react';
import {connect} from "react-redux";
import {setSrc, setDest} from "../../Redux/actions/PathActions";
import {PathCard} from "./PathCard";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/Button";
import {StyledArrow, StyledPathContainer} from "./StyledComponents";
import {StyledSlideContainer} from "../Common/StyledComponents";
import '../SlidingRoute/transitions.css';

const {ipcRenderer} = window.require('electron');

class PathPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: 'tags'
        }
    }

    componentDidMount() {
        ipcRenderer.on('readFile-reply', (event, tags) => {
            this.setState({
                tags: tags
            });
        });
    }

    render() {
        return (
            <StyledSlideContainer className="transition-item from-page">
                <StyledPathContainer>
                    <PathCard setPath={this.props.setSrcPath} path={this.props.path.srcPath} text='Source'/>
                    <IconButton component={Link} to={{pathname: '/tags', state: {prev: false},}}>
                        <StyledArrow fontSize='large'/>
                    </IconButton>
                    <PathCard setPath={this.props.setDestPath} path={this.props.path.destPath} text='Destination'/>
                </StyledPathContainer>
            </StyledSlideContainer>
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
            dispatch(setSrc(srcPath[0]));
        },
        setDestPath: destPath => {
            dispatch(setDest(destPath[0]));
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