// import {useFormik} from "formik";
// import {useDispatch, useSelector} from "react-redux";
// import {loginTC} from "./authReducer";
// import {AppRootStateType, useAppDispatch} from "../../state/store";
// import {Navigate} from "react-router-dom";
// import {Button, View} from "react-native";
// import Checkbox from "expo-checkbox";
//
// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }
//
// export const Login = () => {
//
//     const dispatch = useAppDispatch()
//     const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn)
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
//            dispatch(loginTC(values))
//         },
//     });
//
//     if(isLoggedIn){
//         return <Navigate to={'/'} />
//     }
//
//     return <View style={{justifyContent: 'center'}}>
//         <View style={{justifyContent: 'center'}}>
//             <form onSubmit={formik.handleSubmit}>
//                 <View>
//                     <View>
//                         <p>To log in get registered
//                             <a href={'https://social-network.samuraijs.com/'}
//                                target={'_blank'}> here
//                             </a>
//                         </p>
//                         <p>or use common test account credentials:</p>
//                         <p>Email: free@samuraijs.com</p>
//                         <p>Password: free</p>
//                     </View>
//                     <View>
//                         <label
//                             label="Email"
//                             margin="normal"
//                             {...formik.getFieldProps('email')}
//                         />
//                         {formik.touched.email ? formik.errors.email &&
//                             <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
//                         <View
//                             type="password"
//                             label="Password"
//                             margin="normal"
//                             {...formik.getFieldProps('password')}
//                         />
//                         {formik.touched.password ? formik.errors.password &&
//                             <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
//                         <View
//                             label={'Remember me'}
//                             control={<Checkbox/>}
//                             {...formik.getFieldProps('rememberMe')}
//                         />
//                         <Button type={'submit'} variant={'contained'} color={'primary'}>
//                             Login
//                         </Button>
//                     </View>
//                 </View>
//             </form>
//         </View>
//     </View>
// }
