import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Foundation, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

const Header = ({title, callEnabled}) => {
    const navigation = useNavigation()
  return (
    <View className='justify-between items-center p-2 flex-row'>
      <View className='flex flex-row items-center'>
        <TouchableOpacity className='p-2' onPress={()=> navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={34} color='#FF5864'/>
        </TouchableOpacity>
        <Text className='text-2xl pl-2 font-bold'>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className='p-3 mr-4 bg-red-200 rounded-full'>
            <Foundation name='telephone' size={20} className=''  color='#FF5864'/>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Header