import React, {Component} from 'react';
import {connect} from "react-redux";
import {ArrowDownward} from '@material-ui/icons'
import styled, {keyframes} from 'styled-components';
import {setSrc, setDest} from "./pathActions";
import {PathCard} from "./PathCard";
import IconButton from "@material-ui/core/Button";

const {ipcRenderer} = window.require('electron')

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

const StyledPathContainer = styled.div`
    width: 350px;
    height: 175px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
`;

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
            <StyledPathContainer>
                <PathCard setPath={this.props.setSrcPath} path={this.props.path.srcPath} text='Source'/>
                <IconButton onClick={() => ipcRenderer.send('readFile', 'ping')}>
                    <StyledArrow fontSize='large'/>
                </IconButton>
                <PathCard setPath={this.props.setDestPath} path={this.props.path.destPath} text='Destination'/>
            </StyledPathContainer>
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
