import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CategoryCard = ({title, imgUrl}) => {
  return (
    <TouchableOpacity className='relative mr-2'>
    <Image 
    className='h-20 w-20 rounded'
    source={{
        uri: imgUrl
    }} />
      <Text className='absolute bottom-1 left-1 text-white'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard