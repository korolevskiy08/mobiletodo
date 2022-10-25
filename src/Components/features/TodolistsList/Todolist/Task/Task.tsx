import {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../EditableSpan/EditableSpan'
import {TaskStatuses, TaskType} from "../../../../../api/todoapi";
import * as React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';


type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: boolean) => {
        props.changeTaskStatus(props.task.id, e ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <View
        style={props.task.status === TaskStatuses.Completed ? {...styles.task, opacity: 0.5} : {...styles.task}}
        key={props.task.id}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
                value={props.task.status === TaskStatuses.Completed}
                onValueChange={onChangeHandler}
                style={{marginRight: 12}}
            />
            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        </View>
        <View>
            <TouchableOpacity style={{marginLeft: 25}} onPress={onClickHandler}>
                <MaterialIcons name="delete" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    </View>
})

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 4
    }
});