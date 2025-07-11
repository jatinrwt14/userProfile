import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "../screens/UserList/View/UserListScreen";
import DetailsScreen from "../screens/Details/View/DetailsScreen";

export type RootStackParamList = {
    UserListScreen: undefined
    DetailsScreen: undefined
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
                }}
            />
        </Stack.Navigator>

    )
}

export default StackNavigation;