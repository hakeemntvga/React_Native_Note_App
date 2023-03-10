import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconBtn from '../components/IconBtn'

const AddNoteScreen = ({ visible, onclose, onSubmit, note, isEdit }) => {

  const [title, setTittle] = useState('')
  const [description, setDescription] = useState('')

  const handleModelHideKeybord = () => {
    Keyboard.dismiss();
  }

  const handleOnchangeText = (txt, valueFor) => {
    if (valueFor === 'tittle') setTittle(txt)
    if (valueFor === 'description') setDescription(txt)
  }
  console.log(title, description)

  const handleOnSubmit = () => {
    if (!title==='' && !description==='') return onclose()

    if (isEdit) {
      //for edit
      onSubmit(title,description)
    } else {
      onSubmit(title, description)
      setTittle('')
      setDescription('')
    }
  
    onclose()
  }

  const handleCloseModel = () => {
    if (!isEdit) {
      setTittle('')
      setDescription('')
    }
    onclose()
  }
  useEffect(() => {
    if (isEdit) {
      setTittle(note.tittle)
      setDescription(note.description)
    }
  }, [isEdit])

  return (
    <>
      {/* <StatusBar hidden/> */}
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            style={[styles.textInput, styles.tittle]}
            placeholder='Tittle'
            onChangeText={(txt) => handleOnchangeText(txt, 'tittle')}
            value={title} />

          <TextInput
            multiline
            style={[styles.textInput, styles.desc]}
            placeholder='Description'
            onChangeText={(txt) => handleOnchangeText(txt, 'description')}
            value={description} />
          <View style={styles.btnContainer}>
            {title==='' || description==='' ?
              <IconBtn iconName='close' style={{ marginRight: 10 }} onPress={handleCloseModel} /> : null}
            <IconBtn iconName='check' size={26} onPress={handleOnSubmit} />
          </View>
        </View>

        <TouchableWithoutFeedback onPress={handleModelHideKeybord}>
          <View style={[styles.modelBG, StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>

      </Modal>
    </>
  )
}

export default AddNoteScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  textInput: {
    borderBottomWidth: 1,

  },
  tittle: {
    marginBottom: 20,
    height: 40,

  },
  desc: {
    height: 100,

  },
  modelBG: {
    flex: 1,
    zIndex: -1
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 15
  }
})