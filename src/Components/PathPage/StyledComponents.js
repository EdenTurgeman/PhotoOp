import styled from "styled-components";
import {ArrowDownward} from "@material-ui/icons";

export const StyledPathContainer = styled.div`
    width: 350px;
    height: 175px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const StyledArrow = styled(ArrowDownward)`
    color: #9E9E9E;
`;