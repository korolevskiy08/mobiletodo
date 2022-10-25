import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, fetchTodolistsTC,

    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType, TodolistsActionsType,
    updateTodolist
} from "../../../state/todolists-reducer";
import {useCallback, useEffect} from "react";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "../../../state/tasks-reducer";
import {TaskStatuses} from "../../../api/todoapi";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../App/MainApp";
import {Navigate} from "react-router-dom";
import {View, Text} from "react-native";

export const Todolists = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch<TodolistsActionsType>();

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(deleteTaskTC({todolistId, taskId}))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC({title, todolistId}))
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC({
            todolistId, taskId,
            model: {
                status
            }
        }))
    }, []);
    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC({todolistId, taskId, model: {title: newTitle} }))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value});
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id))
    }, []);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(updateTodolist({todolistId: id, title}))
    }, []);


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/Login'}/>

    }

    return (
        <View style={{justifyContent: 'space-between'}}>
            <View>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <View key={tl.id}>
                            <View style={{padding: '10px'}}>
                                <Todolist
                                    entityStatus={tl.entityStatus}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </View>
                        </View>
                    })
                }
            </View>

        </View>
    )
}