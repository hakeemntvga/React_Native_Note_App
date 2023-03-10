import { Text, Animated,StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'


import Icon from 'react-native-vector-icons/MaterialIcons'

const Fab = ({ isAnimationVisible = true,onPress }) => {
    
    const animationController = useRef (
        new Animated.Value(0)
    ).current;

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const scale = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        
    });

    useEffect(() => {
        Animated.timing(animationController, {
            duration: 200,
            toValue: isAnimationVisible ? 1 : 0,
            useNativeDriver: true,
        }).start();
    }, [isAnimationVisible]);


    return (
     
            <AnimatedPressable
                onPress={onPress} style={[styles.iconContainer, { transform: [{ scale }] }]}>
                <Icon name='add' size={20} color='#fff' ></Icon>
                <Text style={styles.iconTextStyle}> Add Notes </Text>
            </AnimatedPressable>
     
      
  )
}

export default Fab

const styles = StyleSheet.create({
    floatingActionButtonStyle: {
        height: 40,
        width: 80,
        backgroundColor: "blue",
        alignItems: 'center',
        justifyContent:"center"
    },
    iconContainer: {
        width: 115,
        height: 40,
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0000b3",
        position: "absolute",
        bottom: 15,
        right: 15
    },
    iconTextStyle: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold"
    },

})