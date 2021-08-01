import React, { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../util/helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Editor-styles';


const Editor = (props) => {
    const { classes, noteUpdate, selectedNote } = props;

    const [text, setText] = useState(selectedNote.body || "")
    const [title, setTitle] = useState(selectedNote.title || "")

    useEffect(()=>{
        setText(selectedNote.body)
        setTitle(selectedNote.title)
    },[selectedNote])
    const editorChangeHandler = (textValue) => {
        setText(textValue)
        updateDatabase(textValue);

    }
    const updateDatabase = useCallback(
        debounce((textValue) => {
            console.log("textValue: ",textValue)
            noteUpdate(selectedNote.id, {
                body: textValue,
                title:title
            });

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