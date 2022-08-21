// C'est un textInput modifié qu'on trouve dans toute notre App, elle plusieurs attributs, dont leftIcon
// qui nous permet de choisir l'icon qui s'affiche a gauche, secured si c'est true il cache les données saisies

import React, { forwardRef, useState } from 'react';
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
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleChange = (val) => {
    setChangeText(type === 'email' ? val.trim() : val);
  };

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
      secureTextEntry={secured ? visible : null}
      textContentType={type || 'none'}
      keyboardType={keyboardType || 'default'}
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
