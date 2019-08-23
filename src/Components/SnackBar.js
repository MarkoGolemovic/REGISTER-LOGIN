import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton'; 
import CloseIcon from '@material-ui/icons/Close';


export default class SnackBar extends Component {

    render() {
        return (
            <Snackbar
                open={this.props.isOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                autoHideDuration={5000}
                onClose={this.props.onClose}
            >

            <SnackbarContent
                className="nasa-klasa"
                aria-describedby="client-snackbar"
                message={
                <span id="client-snackbar" className="nasa-klasa-2">
                    <CheckCircleIcon />
                    {this.props.message}
                </span>
                }
                action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={this.props.onClose}>
                    <CloseIcon />
                </IconButton>,
                ]}
            />
            </Snackbar>
        );
    }

}