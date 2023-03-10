import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import NoteDetails from '../screens/NoteDetails'

const Stack=createNativeStackNavigator()

const MyStack=()=> {
  return (
      <Stack.Navigator>
          <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ title:'Note App',headerTintColor:"black",headerTitleAlign:"center" }}
          />

          <Stack.Screen
              name='NoteDetails'
              component={NoteDetails}
              options={{
                  headerTitle: "",
                  headerShadowVisible:false
              }}
          />
      </Stack.Navigator>
  )
}
export default MyStack