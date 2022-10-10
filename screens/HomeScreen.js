import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, UserIcon,MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'
import category from '../sanity/schemas/category';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    },[])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
          } `).then(data => 
            {
                setFeaturedCategories(data)
            })
    }, [])

  return (
    <SafeAreaView className='bg-white pt-5' >

    {/* Header */}
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
    <Image 
    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
    source={{
        uri: 'https://links.papareact.com/wru'
    }}
    />

    <View className='flex-1'>
        <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
        <Text className='font-bold text-xl'>Current Location
        <ChevronDownIcon size={20} color='#00CCBB' />
        </Text>
    </View>

    <UserIcon size={35} color='#00CCBB'/>
    </View>

    {/* Search */}
    <View className='flex-row items-center mx-4 space-x-2 pb-3'>
        <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-xl'>
        <MagnifyingGlassIcon color='gray' size={20}/>
        <TextInput 
            placeholder='Restaurants and cuisines'
            keyboardType='default'
        />
        </View>
        <AdjustmentsVerticalIcon  color='#00CCBB'/>
    </View>

    {/* Body */}
    <ScrollView className='bg-gray-100'
    contentContainerStyle={{
        paddingBottom: 100
    }}>
        {/* Categories */}
        <Categories />

        {/* Featured */}

        {featuredCategories?.map((category) => (
            <FeaturedRow 
            id={category._id}
            key={category._id}
            title={category.name}
            description={category.short_description}
        />
        ))}

    </ScrollView>

  </SafeAreaView>
  )
}

export default HomeScreen