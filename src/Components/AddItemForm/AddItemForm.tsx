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

    const onChangeHandler = (e: string ) => {
        setTitle(e)
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
                <Ionicons name="add-circle-outline" size={40} color="black" onPress={addItemHandler}/>
            </TouchableOpacity>
        </View>
    </View>
})

const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 200,
            borderWidth: 1,
            padding: 10,
            borderColor: '#fffffe',
            color: '#fffffe'
    },
});
