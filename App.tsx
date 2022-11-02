import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import MainApp from "./src/Components/App/MainApp";
import {store} from "./src/state/store";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <MainApp/>
            </View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

