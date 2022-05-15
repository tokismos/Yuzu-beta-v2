// C'est un textInput modifié qu'on trouve dans toute notre App, elle plusieurs attributs, dont leftIcon
// qui nous permet de choisir l'icon qui s'affiche a gauche, secured si c'est true il cache les données saisies

import React, { forwardRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../consts/colors";

const TextInputColored = forwardRef(
  (
    {
      placeholder,
      multiline,
      label,
      value,
      setChangeText,
      leftIcon,
      secured,
      style,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(true);
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
        onChangeText={setChangeText}
        secureTextEntry={secured ? visible : null}
        style={{
          marginVertical: 5,
          ...style,
        }}
        left={
          leftIcon ? (
            <TextInput.Icon
              name={leftIcon}
              color={isFocused ? COLORS.primary : "black"}
            />
          ) : null
        }
        right={
          secured ? (
            <TextInput.Icon
              name={visible ? "eye" : "eye-off"}
              onPress={() => setVisible(!visible)}
              color={isFocused ? COLORS.primary : "black"}
            />
          ) : null
        }
      />
    );
  }
);

export default TextInputColored;

const styles = StyleSheet.create({});
