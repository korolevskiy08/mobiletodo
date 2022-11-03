import {useEffect} from 'react'
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// import {Login} from "../Login/Login";
import {Text, View} from 'react-native'
import {TaskType} from "../../api/todoapi";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {initializeAppTC, StatusType} from "./app-reducer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {RootStackParamList} from "../../utils/NavigationType";
import {Login} from "../Login/Login";
import {Todolists} from "../features/TodolistsList/TodolistsList";
import {ProgressBar, MD3Colors} from "react-native-paper";
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MainApp() {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const Stack = createNativeStackNavigator<RootStackParamList>();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <View>

        </View>
    }

    return (
        <>
            {status === 'loading' && <ProgressBar progress={0.5} color={MD3Colors.error50}/>}
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"TODO_LISTS"}>
                    {isLoggedIn
                        ? <Stack.Screen name="TODO_LISTS" component={Todolists}/>
                        : <Stack.Screen name={"LOGIN"} component={Login}/>}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}


export default MainApp;
