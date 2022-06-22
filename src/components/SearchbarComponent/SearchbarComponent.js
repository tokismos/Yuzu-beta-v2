import React, { useRef } from 'react';
import {
  TextInput,
  View,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import styles from './SearchbarComponent.style'

const SearchbarComponent = ({
  searchPhrase,
  setSearchPhrase,
  setClicked
}) => {
  const { t } = useTranslation();
  const searchInput = useRef();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' />
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
          onFocus={() => setClicked(true)}
          onChangeText={setSearchPhrase}
        />
      </View>
    </View>
  )
}

export default SearchbarComponent;
