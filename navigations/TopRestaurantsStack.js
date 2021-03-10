import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import TopRestaurantes from '../screens/TopRestaurantes'

const Stack =  createStackNavigator()

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-restaurantes"
                component={TopRestaurantes}
                options={{ title: "Los mejores restaurantes" }}            
            />
        </Stack.Navigator>
    )
}
