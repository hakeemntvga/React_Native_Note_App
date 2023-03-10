import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddNoteScreen from './AddNoteScreen'
import { useNote } from '../../context/NoteProvider'



const NoteDetails = (props) => {
  const [note, setNote] = useState(props.route.params.note)

  const [showModel, setShowModel] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { setNotes } = useNote()
  // const [title, setTittle] = useState(note.tittle)
  // const [desc, setDesc] = useState(note.description)

  // console.log("The tittle is :",title)
  // console.log("The desc is :",desc)

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if (result !== null)
      notes = JSON.parse(result)
    const newNotes = notes.filter(n => n.id !== note.id)
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    props.navigation.goBack()
  }

  const deleteAlert = () => {
    Alert.alert('Are You Sure!', 'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancel')
        }
      ],
      {
        cancelable: true
      }
    )
  }

  const handleOnUpdate = async (tittle, description) => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if (result !== null) notes = JSON.parse(result)

    const newNot = notes.filter(n => {
      if (n.id === note.id) {
        n.tittle = tittle
        n.description = description
        n.isUpdated = true
        setNote(n)
      }
      return n;
    })
    setNotes(newNot)
    await AsyncStorage.setItem('notes', JSON.stringify(newNot))
  }

  const handleOnClose = () => setShowModel(false)

  const handleOpenEditModel = () => {
    setIsEdit(true)
    setShowModel(true)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tittle}>{note.tittle}</Text>
      <Text style={styles.desc}>{note.description}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.btn}>
          <Icon name='edit' color='#fff' size={25} onPress={handleOpenEditModel} />
          <Text style={styles.btnText}> Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "red" }]}>
          <Icon name='delete' color='#fff' size={25} onPress={deleteAlert} />
          <Text style={styles.btnText}> Delete</Text>
        </TouchableOpacity>
      </View>
      <AddNoteScreen
        isEdit={isEdit}
        note={note}
        visible={showModel}
        onSubmit={handleOnUpdate}
        onclose={handleOnClose} />
    </ScrollView >
  )
}

export default NoteDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  tittle: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#0000b3',
    opacity: 0.7,

  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
  },
  iconContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0000b3',
    height: 50,
    width: 100,
    borderRadius: 10,
    marginRight: 10
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  }
})