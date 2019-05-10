import styled from 'styled-components';
import {Card, Fab, IconButton, List, ListItem} from '@material-ui/core'
import {ArrowDownward} from '@material-ui/icons'

export const StyledAddFieldFab = styled(Fab)`
    &&{
      position: absolute;
      bottom: ${props => props.theme.spacing.unit * 10}px;
      left: ${props => props.theme.spacing.unit * 3}px;
    }
`;

export const SyledFieldsList = styled(List)`
    height: inherit;
    width: inherit;
    overflow: auto;
`;

export const StyledFieldCard = styled(Card)`
    transition: all .1s ease-in;
    display: flex;
    align-items: center;
    flex-flow: row;
    padding: 0 10px 0 4px;
    text-align: left;
    width: 70%;
    height: 50px;
`;

export const StyledFieldListItem = styled(ListItem)`
    && {
      display: flex;
      justify-content: space-between;
      padding: 0;
      flex-flow: column;
    }
`;

export const StyledArrow = styled(ArrowDownward)`
  margin: 10px;
  font-size: 30px;
`;

export const StyledTrashIconButton = styled(IconButton)`
    && {
      margin-right: 10px;
    }
`;

export const StyledDragHandleContainer = styled.p`
  margin-left: auto;
  font-size: 20px;
`;