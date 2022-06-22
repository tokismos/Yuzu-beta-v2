// Le dialog qui saffiche lorsqu'on clique sur le bouton report pour une recette,si on veut ajouter un autre champs
// on l'ajoute dans l'array reportsTab, et on appele un api qui nous permets d'envoyer un message
// vers l'adresse email

import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
} from "react-native";
import { api } from "../axios";

import CustomButton from "./CustomButton";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import TextInputColored from "./TextInputColored";
import auth from "@react-native-firebase/auth";
import {useTranslation} from "react-i18next";

const { width } = Dimensions.get("screen");

const ReportItemComponent = ({ title, setReport, report }) => {
    const { t } = useTranslation();
  return (
    <>
      <Pressable
        onPress={() => {
          if (report === title) {
            return setReport("");
          }

          setReport(title);
        }}
        style={styles.containerItem}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            color: report == title ? COLORS.primary : "black",
            fontWeight: report == title ? "bold" : "600",
            fontSize: report == title ? 16 : 14,
          }}
        >
          {title}
        </Text>

        {report !== title ? (
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        ) : (
          <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
        )}
      </Pressable>
      {title !== t('reportCompenent_field5') && <View style={styles.separator} />}
    </>
  );
};

const ReportComponent = ({ setShowReport, recipeName }) => {
    const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const reportsTab = [
    "field1",
    "field2",
    "field3",
    "field4",
    "field5",
  ].map(report => t(`reportComponent_${report}`));

  const sendEmail = async (fullName, reportTitle, message) => {
    setIsLoading(true);
    try {
      await api.post("/email", {
        fullName,
        title: reportTitle,
        message: ` ${fullName} a reporter la recette " ${recipeName} " - ${reportTitle} - ${message}`,
      });
      Alert.alert(t('reportComponent_thankAlert_title'), t('reportComponent_thankAlert_description'));
      ToastAndroid.show(
        t('reportComponent_thanks'),
        ToastAndroid.LONG
      );

      setShowReport(false);
    } catch (e) {
      Alert.alert(t('reportComponent_sentError'), e.message);
    }
    setIsLoading(false);
  };
  return (
    <View style={{ width: width * 0.8, padding: 5, marginTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons
          name="report"
          size={30}
          color={COLORS.red}
          style={{ padding: 5 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
            {t('reportComponent_askReport')}
        </Text>
      </View>

      {reportsTab.map((item, index) => (
        <ReportItemComponent
          key={index}
          setIsSelected={setIsSelected}
          setReport={setReport}
          report={report}
          title={item}
          isSelected={isSelected}
        />
      ))}

      <TextInputColored
        multiline
        setChangeText={setReportDescription}
        value={reportDescription}
        placeholder={t('reportComponent_contactAgain')}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <CustomButton title={t('cancel')} onPress={() => setShowReport(false)} />
        <CustomButton
          isLoading={isLoading}
          disabled={report === ""}
          title={t('report')}
          style={{ backgroundColor: COLORS.red, marginLeft: 10 }}
          onPress={async () => {
            await sendEmail(
              auth().currentUser?.displayName || t('reportComponent_anonymous'),
              report,
              reportDescription
            );
          }}
        />
      </View>
    </View>
  );
};
export default ReportComponent;

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  separator: {
    width: "90%",
    alignSelf: "center",
    height: 0.3,
    backgroundColor: "gray",
  },
});
