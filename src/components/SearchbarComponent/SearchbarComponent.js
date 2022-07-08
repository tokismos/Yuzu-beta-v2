import React, { useRef, useState } from 'react';
import {
  TextInput,
  View,
  StatusBar,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import styles from './SearchbarComponent.style'

const SearchbarComponent = ({
  searchPhrase,
  setSearchPhrase,
  setClicked
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const searchInput = useRef();

  const handleFocus = () => {
    searchInput.current?.focus?.();
    setClicked(true);
    setIsFocused(true);
  }

  const handleBlur = () => {
    Keyboard.dismiss();
    searchInput.current?.blur?.();
    setIsFocused(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='black' />
      <View style={styles.searchBar} >
        <View style={styles.textInput} onTouchEnd={handleFocus}>
          <Feather
            name='search'
            size={20}
            color='black'
            style={{ marginLeft: 1, marginRight: 5 }}
          />
          <TextInput
            ref={searchInput}
            className={styles.input}
            placeholder={t('searchbarScreen_search')}
            value={searchPhrase}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={setSearchPhrase}
          />
        </View>
        {isFocused &&
          <View>
            <TouchableHighlight onPress={() => setSearchPhrase('')}>
              <Ionicons
                name='close-circle'
                size={20}
                color={'grey'}
              />
            </TouchableHighlight>
          </View>
        }
      </View>
    </View>
  )
}

export default SearchbarComponent;
