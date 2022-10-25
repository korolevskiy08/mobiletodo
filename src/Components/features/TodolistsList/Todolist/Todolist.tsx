import {useCallback, useEffect, useState} from 'react'
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
import {AntDesign} from '@expo/vector-icons';

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
    const [showTodolists, setShowTodoList] = useState(true)

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

    const showTodolist = () => {
        setShowTodoList(!showTodolists)
    }

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

    return <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{paddingHorizontal: 20}}>
                    <AntDesign name="downcircle" size={24} color="black" onPress={showTodolist}/>
                </TouchableOpacity>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <TouchableOpacity onPress={removeTodolist} style={{marginLeft: 25}}>
                    <MaterialCommunityIcons name="delete" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            {showTodolists && <View>
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
                <View style={{paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button
                        title="All"
                        color={'#f9bc60'}
                    />
                    <Button
                        title="Completed"
                        color={'#f9bc60'}
                    />
                    <Button
                        title="Active"
                        color={'#f9bc60'}
                    />
                </View>
            </View>}

            {/*disabled={props.entityStatus === 'loading'*/}

        </View>
        })


