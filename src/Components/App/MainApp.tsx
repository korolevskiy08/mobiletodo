import {useCallback, useEffect} from 'react'
import {TaskType} from "../../api/todoapi";
import {Todolists} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {initializeAppTC, StatusType} from "./app-reducer";
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// import {Login} from "../Login/Login";
import {logoutTC} from "../Login/authReducer";
import {View, Button} from "react-native";
import {MD3Colors, ProgressBar} from 'react-native-paper';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {addTodolistTC} from "../../state/todolists-reducer";
// import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MainApp() {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <View>

        </View>
    }
    return (
        <View style={{backgroundColor: '#abd1c6', height: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 30}}>
                {isLoggedIn &&
                    <View style={{width: 100}}>
                        <Button color={'#f9bc60'} onPress={logoutHandler} title={'Logout'}/>
                    </View>
                }
                <View>
                    <AddItemForm addItem={addTodolist}/>
                </View>
            </View>

            {status === 'loading' && <ProgressBar progress={0.5} color={MD3Colors.error50}/>}
            <View>
                <Todolists/>
                {/*<BrowserRouter>*/}
                {/*    <Routes>*/}
                {/*        <Route path={'/'} element={<Todolists/>}/>*/}
                {/*        /!*<Route path={'/Login'} element={<Login/>}/>*!/*/}
                {/*        <Route path={'/404'} element={<h1>404. Page not found</h1>}/>*/}
                {/*        <Route path={'*'} element={<Navigate to={'/404'}/>}/>*/}
                {/*    </Routes>*/}
                {/*</BrowserRouter>*/}
            </View>
        </View>
    );
}


export default MainApp;
