import { ChangeEvent, KeyboardEvent, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as React from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    console.log('AddItemForm called')

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: string/*ChangeEvent<HTMLInputElement>*/) => {
        setTitle(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeHandler}
            value={title}
            placeholder={'Enter title'}
        />
        <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={27} color="black" onPress={addItemHandler}/>
            </TouchableOpacity>
        </View>
        {/*<TextField variant="outlined"*/}
        {/*           disabled={disabled}*/}
        {/*           error={!!error}*/}
        {/*           value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           label="Title"*/}
        {/*           helperText={error}*/}
        {/*/>*/}
    </View>
})
const styles = StyleSheet.create({
        input: {
            height: 27,
            borderWidth: 1,
            padding: 10,
            borderColor: '#fffffe',
            color: '#fffffe'
    },
});