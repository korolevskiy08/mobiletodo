import {ChangeEvent, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    //console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: string) => {
        setTitle(e)
    }

    return editMode
        ? <View style={{flexDirection: 'row'}}>
            <TextInput
                style={styles.input}
                onChangeText={changeTitle}
                value={title}
            />
            <View>
                <Ionicons name="checkmark" size={24} color="black" onPress={activateViewMode}/>
            </View>
        </View>
        : <Text
            onLongPress={activateEditMode}
            style={{fontSize: 18, fontWeight: '500'}}
        >
            {props.value}
        </Text>
    //onDoubleClick={activateEditMode}

});
//<TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
const styles = StyleSheet.create({
    input: {
        width: 150,
        backgroundColor: '#195b27'
    },
});