// import React from 'react'
// import {useFormik} from "formik";
// import {loginTC} from "./authReducer";
// import {useAppDispatch} from "../../state/store";
// import {Button, StyleSheet, Text, TextInput, View} from "react-native";
// import Checkbox from "expo-checkbox";
// import {LoginProps} from "../../utils/NavigationType";
//
// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }
//
// export const Login = (props: LoginProps) => {
//
//     const dispatch = useAppDispatch()
//
//
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//             rememberMe: false
//         },
//         validate: (values) => {
//             const errors: FormikErrorType = {};
//             if (!values.email) {
//                 errors.email = 'Required'
//             } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 errors.email = 'Invalid email address';
//             }
//             if (!values.password) {
//                 errors.password = 'Required'
//             } else if (values.password.length < 2) {
//                 errors.password = 'Password has be longer two symbol'
//             }
//             return errors
//         },
//         onSubmit: (values) => {
//             dispatch(loginTC(values))
//         },
//     });
//
//     const submit = () => {
//         return formik.handleSubmit
//     }
//
//     return (
//         <View style={{backgroundColor: '#abd1c6', height: '100%', paddingVertical: 50}}>
//             {/*<form onSubmit={formik.handleSubmit}>*/}
//             <View style={{paddingHorizontal: 10}}>
//                 <Text>To log in get registered
//                 </Text>
//                 <Text>or use common test account credentials:</Text>
//                 <Text>Email: free@samuraijs.com</Text>
//                 <Text>Password: free</Text>
//             </View>
//
//             <View>
//                 <TextInput style={styles.input}
//                            onChangeText={formik.handleChange('email')}
//                            placeholder="Email"
//                            {...formik.getFieldProps('email')}
//                 />
//                 {formik.touched.email ? formik.errors.email &&
//                     <View>{formik.errors.email}</View> : null}
//                 <TextInput style={styles.input}
//                            autoComplete={'password'}
//                            onChangeText={formik.handleChange('password')}
//                            placeholder="Password"
//                            {...formik.getFieldProps('password')}
//                 />
//                 {formik.touched.password ? formik.errors.password &&
//                     <View>{formik.errors.password}</View> : null}
//                 <View style={{flexDirection: 'row', padding: 10}}>
//                     <Checkbox/>
//                     <Text style={{paddingHorizontal: 10}}>Remember me</Text>
//                 </View>
//                 <Button color={'#f9bc60'} title={'Login'} onPress={submit}/>
//             </View>
//         </View>
//     )
// }
//
// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
// });
//
//
//

import {TextInput, View, StyleSheet, Text} from "react-native";
import {Formik} from "formik";
import {Button} from "react-native-paper";
import {useAppDispatch} from "../../state/store";
import {loginTC} from "./authReducer";
import Checkbox from "expo-checkbox";

export const Login = () => {

    const dispatch = useAppDispatch()

    return (
        <View style={{backgroundColor: '#abd1c6', height: '100%'}}>
            <Formik initialValues={{email: '', password: '', rememberMe: false}}
                    onSubmit={(values) => {
                        dispatch(loginTC(values))
                    }}>
                {(props) => (
                    <View>
                        <View style={{paddingHorizontal: 10}}>
                            <Text>To log in get registered
                            </Text>
                            <Text>or use common test account credentials:</Text>
                            <Text>Email: free@samuraijs.com</Text>
                            <Text>Password: free</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Email'}
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Password'}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <Checkbox/>
                            <Text style={{paddingHorizontal: 10}}>Remember me</Text>
                        </View>
                        <Button onPress={props.handleSubmit} buttonColor={'#f9bc60'} color={'red'}> Login </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
