import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../util/helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Editor-styles';


const Editor = () => {
    return (
        <div>
            <h1>this is Editor </h1>
        </div>
    )
}

export default withStyles(styles)(Editor);