import { FlatList, SafeAreaView, StyleSheet, Text, View,Dimensions} from 'react-native'
import React, { useState } from 'react'
import Fab from '../components/Fab'
import AddNoteScreen from './AddNoteScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteCard from '../components/NoteCard'
import { useFocusEffect } from '@react-navigation/native'
import { useNote } from '../../context/NoteProvider'

const HomeScreen = ({navigation}) => {

    const [isAnimationVisible, setIsAnimationVisible] = useState(true)
    const handleScroll = (e) => {
        const positionY = e.nativeEvent.contentOffset.y;
        if (positionY > 100)
            setIsAnimationVisible(false);
        else
            setIsAnimationVisible(true)
    }

    const [modalVisible, setModalVisible] = useState(false)

   const {notes,setNotes}= useNote()
    

    const handleOnsubmit =async (tittle,description) => {
        const note = { id: Date.now(), tittle: tittle, description: description }
        console.log(note)
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes))
    }
    // const findNotes =async () => {
    //     const result = await AsyncStorage.getItem('notes')
    //     if(result!== null) setNotes(JSON.parse(result))
    // }
    // useState(() => {
      
    // findNotes()
    // }, [])
    // useFocusEffect(
    //     React.useCallback(() => {
    //       findNotes()
    //     }, [])
    // );
    
    const handleOpenNoteDetails = (note) => {
        navigation.navigate('NoteDetails',{note})
        
    }

    return (
        <>
            
            <SafeAreaView style={styles.container}>
                {!notes.length ? <Text style={styles.addNoteTextStyle}>ADD NOTES</Text>:null}
                <FlatList
                    data={notes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <NoteCard
                            item={item}
                            onPress={()=>handleOpenNoteDetails(item)}
                    />}
                    onScroll={handleScroll}
                    numColumns={2}
                    columnWrapperStyle={ {justifyContent:"space-between",marginBottom:15}} />
                <Fab
                    isAnimationVisible={isAnimationVisible}
                    onPress={()=>setModalVisible(true)} />
            </SafeAreaView>
            <AddNoteScreen
                visible={modalVisible}
                onclose={() => setModalVisible(false)}
                onSubmit={handleOnsubmit } />
        </>
    )
}

export default HomeScreen

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    addNoteTextStyle: {
        fontSize: 30,
        alignSelf:"center",
        position: "absolute",
        bottom: h / 2,
        opacity:0.3
      
    }

})