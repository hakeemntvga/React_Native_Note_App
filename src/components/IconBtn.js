import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const IconBtn = ({iconName,size,color,style,onPress}) => {
    return (
      <TouchableOpacity>
            <Icon
                name={iconName}
                size={size || 24}
                color={color || "#fff"}
                style={[styles.icon, { ...style }]}
                onPress={onPress}
            />
      </TouchableOpacity>
    
  )
}
const styles = StyleSheet.create({
    icon: {
        padding: 15,
        backgroundColor: "#0000b3",
        borderRadius:50
    }
})

export default IconBtn