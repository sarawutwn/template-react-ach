import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

export default function CustomizedSnackbars(props) {
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        let tempValue = { ...props.values }
        tempValue.status = false
        props.setValues({ ...tempValue })
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={props.values.status} TransitionComponent={TransitionLeft} autoHideDuration={2200} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.values.type} style={{ color: "#FFF" }}>
                    <>{props.values.msg}</>
                </Alert>
            </Snackbar>
        </Stack>
    );
}