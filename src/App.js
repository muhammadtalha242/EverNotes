import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import SidebarComponent from './SideBar/SideBarComponent';
import EditorComponent from './Editor/Editor';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([])
  const [selectedNoteIndex, setselectedNoteIndex] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)

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
  const deleteNoteHandler = async (note) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      console.log("deleteNoteHandler", note)
      const noteIndex = notes.indexOf(note);
      setNotes(notes.filter(_note => _note !== note));
      if (selectedNoteIndex === noteIndex) {
        setselectedNoteIndex(null)
        setSelectedNote(null)
      } else {
        notes.length >= 1 ?
          selectNoteHandler(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
          setselectedNoteIndex(null)
        setSelectedNote(null)
      }

      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete();
    }

  }

  const noteUpdateHandler = (id, note) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  const newNote = async (title) => {
    console.log(title)
    const note = {
      title: title,
      body: ""
    }
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    note['id'] = newID
    setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter(n => n.id === newID)[0]);
    setselectedNoteIndex(newNoteIndex)
    setSelectedNote(note)

  }

  return (
    <div className="app-container">
      <SidebarComponent
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNoteHandler={selectNoteHandler}
        deleteNoteHandler={deleteNoteHandler}
        newNote={newNote}
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
