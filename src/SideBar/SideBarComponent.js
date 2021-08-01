import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './SideBarComponent-styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from './SideBarItem';

const SideBarComponent = (props) => {
    const [isAddingNotes, setIsAddingNotes] = useState(false)
    const [title, setTitle] = useState(null)
    const { classes } = props;

    const newNotesHandler = () => {
        setIsAddingNotes(!isAddingNotes);
        setTitle(null)

    }

    const titleHandler = (event) => {
        console.log("event.target.value", event.target.value)
        setTitle(event.target.value)
    }

    const newNotesSubmitHandler = ()=>{
        console.log("Title, isAdded", title, isAddingNotes )
        setIsAddingNotes(false)
    }

    return (
        <div className={classes.sidebarContainer}>
            <Button className={classes.newNoteBtn}
                onClick={newNotesHandler}>
                {isAddingNotes ? "Cancle" : "Add New Note"}
            </Button>
            {isAddingNotes ?
                <div>
                <input type="text"
                    placeholder="Enter new title"
                    className={classes.newNoteInput}
                    onKeyUp={titleHandler}
                />
                <Button className={classes.newNoteSubmitBtn} onClick={newNotesSubmitHandler}>Submit</Button>
                </div>
                : null}
        </div>
    )
}

export default withStyles(styles)(SideBarComponent)
