import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import SidebarComponent from './SideBar/SideBarComponent';
import EditorComponent from './Editor/Editor';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([])

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



  return (
    <div className="app-container">
      <SidebarComponent></SidebarComponent>
      <EditorComponent></EditorComponent>
    </div>
  )
}

export default App
