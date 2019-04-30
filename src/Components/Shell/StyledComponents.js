import styled from "styled-components";

export const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    flex-flow: column;
    overflow: auto;
`;

export const StyledContent = styled.div`
    display: flex;
    height: calc(100% - 40px);
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    flex-flow: column;
`;

export const StyledSlidesContainer = styled.div`
    width: 100%;
    height: inherit;
    margin-top: 40px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

export const StyledStepperContainer = styled.div`
    width: 90%;
`;