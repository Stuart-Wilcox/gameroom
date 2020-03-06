import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

export default styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 600px;
  }
`;

export {
  DialogTitle,
  DialogContent,
  DialogActions,
};