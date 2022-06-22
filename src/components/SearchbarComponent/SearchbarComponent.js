import React, {useState, useEffect, useRef} from 'react';
import {
    TextInput,
    View,
    Keyboard,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "100%",
    },
});

const SearchbarComponent = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked
                            }) => {
    const { t } = useTranslation();
    const searchInput = useRef();

    return (
        <View style={styles.container}>
            <View style={styles.searchBar__unclicked} onTouchEnd={() => searchInput.current?.focus?.()}>
                <Feather
                    name='search'
                    size={20}
                    color='black'
                    style={{ marginLeft: 1 }}
                    />
                <TextInput
                    ref={searchInput}
                    className={styles.input}
                    placeholder={t('searchbarScreen_search')}
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    />
            </View>
        </View>
    )
}

export default SearchbarComponent;
