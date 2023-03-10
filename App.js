import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/MyStack'
import NoteProvider from './context/NoteProvider'


const App = () => {
  return (
    <NavigationContainer>
      <NoteProvider>
        <MyStack />
      </NoteProvider>
        
      </NavigationContainer>
  )
}
export default App