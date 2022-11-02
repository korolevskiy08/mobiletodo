import React from 'react'
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import Checkbox from "expo-checkbox";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 2) {
                errors.password = 'Password has be longer two symbol'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });

    // if (isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }

    return <View style={{backgroundColor: '#abd1c6', height: '100%', paddingVertical: 50}}>
        {/*<form onSubmit={formik.handleSubmit}>*/}
        <View style={{paddingHorizontal: 10}}>
            <Text>To log in get registered
            </Text>
            <Text>or use common test account credentials:</Text>
            <Text>Email: free@samuraijs.com</Text>
            <Text>Password: free</Text>
        </View>
        <View>
            <TextInput style={styles.input}
                placeholder="Email"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email ? formik.errors.email &&
                <View>{formik.errors.email}</View> : null}
            <TextInput style={styles.input}
                placeholder="Password"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password ? formik.errors.password &&
                <View>{formik.errors.password}</View> : null}
            <View style={{flexDirection: 'row', padding: 10}}>
                <Checkbox/>
                <Text style={{paddingHorizontal: 10}}>Remember me</Text>
            </View>

            <Button color={'#f9bc60'} title={'Login'}/>
        </View>
    </View>
    {/*</form>*/
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
