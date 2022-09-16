/*
클릭, 삭제 기능 있는 칩
속성: width(칩 너비), label (칩 내부 내용), color(칩 폰트 컬러), background-color(칩 컬러)
@author 여예원
@since 2022.09.15
*/

import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const ChipDeletable = styled(Chip)`
    && {
        background-color: ${props => props.color || "#E6E8FD"};
        color: ${props => props.color || "#969696"};
        label: ${props => props.label};
        width: ${props => props.width};
    }
`;

export default ChipDeletable;