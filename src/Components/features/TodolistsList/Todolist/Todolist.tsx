import {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../AddItemForm/AddItemForm'
import {EditableSpan} from '../../../EditableSpan/EditableSpan'

import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from "../../../../api/todoapi";
import {FilterValuesType} from "../../../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {fetchTaskTC} from "../../../../state/tasks-reducer";
import {AppRootStateType, useAppDispatch} from "../../../../state/store";
import {StatusType} from "../../../App/app-reducer";
import * as React from "react";
import {Button, TouchableOpacity, View} from "react-native";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: StatusType
}

export const Todolist = React.memo(function (props: PropsType) {

    const status = useSelector<AppRootStateType, string>(state => state.app.status)

    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(fetchTaskTC(props.id))
    }, [])

    return <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <View>
                <TouchableOpacity onPress={removeTodolist} style={{marginLeft: 25}}>
                    <MaterialCommunityIcons name="delete" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>

        {/*disabled={props.entityStatus === 'loading'*/}
        {/*<IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>*/}
        {/*    <Delete/>*/}
        {/*</IconButton>*/}

        <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
        <View>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </View>
        <View style={{paddingTop: '10px', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
                title="All"
            />
            <Button
                title="Completed"
            />
            <Button
                title="Active"
            />
        </View>
    </View>
})


