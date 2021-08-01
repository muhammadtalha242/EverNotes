
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './SideBarItem-styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../util/helper';

const SideBarItem = (props) => {
    const { classes, note, index, selectedNoteIndex } = props


    return (
        <div key={index}>
            <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                alignItems='flex-start'>
                <div className={classes.textSection}
                    onClick={()=>props.selectNoteHandler(note, index)}>
                    <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}/>
                </div>

                <DeleteIcon className={classes.deleteIcon}
                    onClick={()=> props.deleteNoteHandler(note)}
                ></DeleteIcon>
            </ListItem>
        </div>
    )
}

export default withStyles(styles)(SideBarItem)
