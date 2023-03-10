import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const NoteCard = ({ item,onPress }) => {
  const { tittle, description } = item;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text numberOfLines={2} style={styles.tittleTextStyle}>{tittle}</Text>
      <Text numberOfLines={4} style={styles.descriptionTextStyle}>{description}</Text>
    </TouchableOpacity>
  )
}
const w = Dimensions.get('window').width -20
const h = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b3b3ff',
    width: w / 2,
    marginHorizontal: 5,
    borderRadius: 10,

  },
  tittleTextStyle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginLeft: 10
  },
  descriptionTextStyle: {
    fontSize: 16,
    marginLeft: 10
  }
})

export default NoteCard