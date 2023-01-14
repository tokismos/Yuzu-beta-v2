//Page de suppression de compte
import React, { useEffect, useState, } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../consts/colors';
import { KeyboardAvoidingView } from "react-native";
import { useTranslation } from "react-i18next";
import useAuth from '../hooks/useAuth';
import { MaterialIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
const AccountDeletion = () => {
  const { deleteAccount } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.userStore);
  const [reauthMode, setReauthMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reasons, setReasons] = useState([
    t('accountDeletionScreen_reason1'),
    t('accountDeletionScreen_reason2'),
    t('accountDeletionScreen_reason3'),
    t('accountDeletionScreen_reason4'),
  ]);
  const [checkedReason, setCheckedReason] = useState(-1);

 

  //When we change the email for the first time because of google null email
  useEffect(() => {
  }, []);

  const checkOnBox = (index) => {
    if (index == checkedReason) setCheckedReason(-1)
    else setCheckedReason(index)
  }

  const deleteAccountt = async () => {
    setIsLoading(true)
    const { error } = await deleteAccount()
     if(error == "auth/requires-recent-login") {

     }
     else navigation.navigate('TinderScreen')
    setReauthMode(true)
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <SafeAreaView
        style={{
          height,
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >

        <View style={styles.container}>

          <Text style={styles.deleteAccountTitle}>
    {t('accountDeletionScreen_helpUsToUnderstand')} 
          </Text>

          {
            reasons.map((reason, index) => {
              return (


                <TouchableOpacity
                  onPress={() => { checkOnBox(index) }}
                  style={styles.listItemCheckContainer}>
                  <CheckBox
                    style={[styles.checkBox,
                    {

                      transform: [{ scale: 0.8 }],
                    },
                    ]}
                    onTintColor={COLORS.primary}
                    onFillColor={COLORS.primary}
                    onCheckColor={'white'}
                    onAnimationType="fill"
                    offAnimationType="fade"
                    boxType="square"
                    value={checkedReason == index}
                    tintColors={{ true: COLORS.primary, false: 'gray' }}
                  />
                  <Text style={styles.checkBoxTxt}>{reason}</Text>

                </TouchableOpacity>
              )
            })
          }





          <Text style={styles.deleteAccountTipTxt}>
    {t('accountDeletionScreen_DeletionConsequences')} 
          </Text>



          <CustomButton
            title={"Supprimer"}
            isLoading={isLoading}
            onPress={deleteAccountt}
            disabled={checkedReason == -1 || reauthMode}
            style={{ backgroundColor: checkedReason == -1 || reauthMode ? "gray" : "red", marginBottom: 20 }}
          />

          {reauthMode &&
            <>
              <View
                style={styles.reauthContainer}
              >
                <MaterialIcons
                  name="report"
                  size={30}
                  color={COLORS.red}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.reauthTxt}>
    {t('accountDeletionScreen_Reauth')} 
                </Text>
              </View>

            
              <Pressable
                onPress={() => {navigation.navigate('SignInScreen', {reauthMode: true}); setReauthMode(false)}}

                style={{ alignSelf: 'center',  backgroundColor: COLORS.primary, padding: 10 }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{t('next')}</Text>
              </Pressable>
            </>
          }




        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({






  textToSubmit: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    padding: 20,
    alignSelf: "center"
  },
  confirmBtn: {
    width: "100%",
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "red",
  },
  disabledBtn: {

    backgroundColor: "gray",
  },

  listItemCheckViewContainer: {
    width: "100%",
  },
  listItemCheckContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 10
  },
  deleteAccountTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    width: "100%",

  },
  deleteAccountListTxt: {
    marginBottom: 20,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",

  },
  deleteAccountTipTxt: {
    // marginTop: 10,
    marginBottom: 20,

    fontSize: 12,
    textAlign: 'center',
  },
  checkBox: {
    fontSize: 30,
    color: "#0099F4",
    marginRight: 10
  },
  checkBoxTxt: {
    flex: 1,
    fontSize: 15
  },
  reauthTxt: {
    flex: 1
  },
  reauthContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 20,
  }
})

export default AccountDeletion;
