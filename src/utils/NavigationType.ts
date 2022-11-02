import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Todolists: undefined
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type TodolistsProps = NativeStackScreenProps<RootStackParamList, 'Todolists'>;
