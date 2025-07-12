import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "../screens/UserList/View/UserListScreen";
import DetailsScreen from "../screens/Details/View/DetailsScreen";
import { User } from "../networking/ResponseDTO/UserListResponseDTO";

export type RootStackParamList = {
    UserListScreen: undefined
    DetailsScreen: { user: User }
};

const StackNavigation = () => {

    const Stack = createStackNavigator<RootStackParamList>()
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="UserListScreen"
                component={UserListScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "User Info",
                    headerBackTitle: '',
                }}
            />
        </Stack.Navigator>

    )
}

export default StackNavigation;