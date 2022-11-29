import { View, Text } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
    console.log(message)
  return (
    <View className='bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-3 self-start ml-auto'>
      <Text className='text-white'>{message.message}</Text>
    </View>
  )
}

export default SenderMessage