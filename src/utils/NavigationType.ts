import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {Route, RouteProp} from "@react-navigation/native";

export type RootStackParamList = {
    "LOGIN": undefined;
    "TODO_LISTS": undefined
};

export type UseNavigateType = NativeStackNavigationProp<RootStackParamList>


export type LoginProps = NativeStackScreenProps<RootStackParamList,'LOGIN'>;
export type TodolistsProps = NativeStackScreenProps<RootStackParamList, "TODO_LISTS">;
