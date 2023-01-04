// C'est un textInput modifié qu'on trouve dans toute notre App, elle plusieurs attributs, dont leftIcon
// qui nous permet de choisir l'icon qui s'affiche a gauche, secured si c'est true il cache les données saisies

import React, { forwardRef, useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../consts/colors';

const TextInputColored = (
  {
    placeholder,
    multiline,
    label,
    value,
    setChangeText,
    leftIcon,
    secured,
    style,
    type,
    keyboardType,
    autoComplete,
    autoCapitalize,
    autoCorrect,
    clearButtonMode,
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleChange = (val) => {
    setChangeText(type === 'email' ? val.trim() : val);
  };

  useEffect(()=>{
    if(secured) setVisible(true)
    else setVisible(false)
  },[])

  return (
    <TextInput
      multiline={multiline}
      ref={ref}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      theme={{ colors: { primary: COLORS.primary } }}
      mode="outlined"
      label={label}
      value={value}
      placeholder={placeholder}
      onChangeText={handleChange}
      secureTextEntry={secured ? visible : false}
      textContentType={type || 'none'}
      keyboardType={keyboardType || 'default'}
      autoComplete={autoComplete || 'off'}
      autoCapitalize={autoCapitalize || 'sentences'}
      autoCorrect={autoCorrect == undefined ? true : autoCorrect}
      clearButtonMode={clearButtonMode || 'never'}
      style={{
        marginVertical: 5,
        ...style,
      }}
      left={
        leftIcon ? (
          <TextInput.Icon
            name={leftIcon}
            color={isFocused ? COLORS.primary : 'black'}
          />
        ) : null
      }
      right={
        secured ? (
          <TextInput.Icon
            name={visible ? 'eye' : 'eye-off'}
            onPress={() => setVisible(!visible)}
            color={isFocused ? COLORS.primary : 'black'}
          />
        ) : null
      }
    />
  );
};

export default forwardRef(TextInputColored);
