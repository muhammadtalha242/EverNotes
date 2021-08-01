import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../util/helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Editor-styles';


const Editor = (props) => {
    const [text, setText] = useState("TEXTINGG")

    const { classes } = props;

    const editorChangeHandler = (textValue) => {
        setText(textValue)
        updateDatabase();

    }
    const updateDatabase = useCallback(
        debounce(() => {
            console.log("UPDATEING DB   ")

            //Update Database 
        }, 1500)
        , [])

    return (
        <div className={classes.editorContainer}>
            <ReactQuill
                value={text}
                onChange={editorChangeHandler}
            />
        </div>
    )
}

export default withStyles(styles)(Editor);