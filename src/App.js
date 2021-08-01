import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import SidebarComponent from './SideBar/SideBarComponent';
import EditorComponent from './Editor/Editor';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([])
  const [selectedNoteIndex, setselectedNoteIndex] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [text, setText] = useState("")

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_docs => {
          const data = _docs.data();
          data['id'] = _docs.id
          return data
        });
        console.log(notes)
        setNotes(notes)
      })
  }, [])

  const selectNoteHandler = (note, index) => {
    console.log("selectNoteHandler", note, index)
    setselectedNoteIndex(index)
    setSelectedNote(note);
  }
  const deleteNoteHandler = (note) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      console.log("deleteNoteHandler", note)
    }

  }

  const noteUpdateHandler=(id, note)=>{
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: note.title,
      body:note.body,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return (
    <div className="app-container">
      <SidebarComponent
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNoteHandler={selectNoteHandler}
        deleteNoteHandler={deleteNoteHandler}
      />
      {
        selectedNote ?
          <EditorComponent
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={noteUpdateHandler}
          /> :
          null
      }
    </div>
  )
}

export default App
