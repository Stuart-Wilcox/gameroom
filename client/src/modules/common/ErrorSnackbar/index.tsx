import * as React from 'react';

import Alert from '../Alert';
import Snackbar from '../Snackbar';


interface IProps {
  message: string;
  autoHideDuration?: number;
}

const ErrorSnackbar: React.FC<IProps> = (props: IProps) => {
  const {
    message,
    autoHideDuration=5000,
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  // when the message changes and exists, show error
  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => setOpen(false)}
    >
      <Alert
        elevation={10}
        severity={'error'}
        variant={'filled'}
      >
        {/* {message} */}
        message
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
