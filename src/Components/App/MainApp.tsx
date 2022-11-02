import {useCallback, useEffect} from 'react'
import {TaskType} from "../../api/todoapi";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {initializeAppTC, StatusType} from "./app-reducer";
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// import {Login} from "../Login/Login";
import {logoutTC} from "../Login/authReducer";
import {Button, View} from "react-native";
import {MD3Colors, ProgressBar} from 'react-native-paper';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {addTodolistTC} from "../../state/todolists-reducer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login} from "../Login/Login";
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MainApp() {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const Stack = createNativeStackNavigator();

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
            <View>
                <Login/>
                {/*<NavigationContainer>*/}
                {/*    <Stack.Navigator>*/}
                {/*        /!*<Stack.Screen name="Todolists" component={<Todolists/>}/>*!/*/}
                {/*    </Stack.Navigator>*/}
                {/*</NavigationContainer>*/}

                {/*<BrowserRouter>*/}
                {/*    <Routes>*/}
                {/*        <Route path={'/'} element={<Todolists/>}/>*/}
                {/*        /!*<Route path={'/Login'} element={<Login/>}/>*!/*/}
                {/*        <Route path={'/404'} element={<h1>404. Page not found</h1>}/>*/}
                {/*        <Route path={'*'} element={<Navigate to={'/404'}/>}/>*/}
                {/*    </Routes>*/}
                {/*</BrowserRouter>*/}
            </View>
        </>
    )
        ;
}


export default MainApp;
