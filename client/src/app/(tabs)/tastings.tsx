import { useAuth } from "@/src/hooks/useAuth";
import TastingsAPI from "@/src/services/tastings";
import React, { useEffect, useState } from "react";
import { FileTextIcon } from "phosphor-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { capitalizeFirst, formatDescription } from "@/src/utils/utils";
import { useTheme, ActivityIndicator, Button, List, Text } from "react-native-paper";

type Exam = Record<string, any>;

type Tasting = {
  tid: string;
  uid: string;
  full_name: string;
  wine_category_name: string;
  sample_number: string;
  wine_denomination: string;
  alcohol_content: string;
  vintage: string;
  wine_temperature: string;
  ambient_temperature: string;
  tasting_date: string;
  tasting_time: string;
  tasting_location: string;
  created_at: string;
  updated_at: string;
  visual_exam: Exam;
  olfactory_exam: Exam;
  taste_olfactory_exam: Exam;
  final_considerations: Exam;
};

export default function Tastings() {

  const theme = useTheme();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tastings, setTastings] = useState<Tasting[]>([]);

  const handlePress = () => {
    console.log(`Button pressed!`);
  }

  useEffect(() => {
    async function fetchTastings() {
      const delay = new Promise((resolve) => setTimeout(resolve, 650));
      try {
        const [data] = await Promise.all([
          TastingsAPI.fetchTastings(accessToken),
          delay,
        ]);
        setTastings(data.tastings || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTastings();
  }, [accessToken]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.background
    },
    spinnerContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    row: {
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center"
    },
    iconContainer: {
      width: 50, 
      height: 50,
      marginLeft: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.pearl
    },
    accordionTrigger: {
      flex: 1,
      marginLeft: 5,
      color: theme.colors.text
    },
    accordionBody: {
      marginLeft: 30,
      color: theme.colors.text
    }
  });

  if (loading) {
    return(
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={"large"} color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        {tastings.map((t, index) => (
          <View key={index} style={styles.row}>

            <View style={styles.iconContainer}>
              <Button onPress={handlePress}>
                <FileTextIcon size={32} />
              </Button>
            </View>

            <View style={styles.accordionTrigger}>
              <List.Accordion
                title={`${t.wine_denomination.toUpperCase()} - ${capitalizeFirst(t.wine_category_name)}`}
                description={formatDescription(t.tasting_date, t.tasting_time, t.tasting_location)}
              >
                <View style={styles.accordionBody}>
                  <Text>Sample Number: {t.sample_number}</Text>
                  <Text>Alcohol Content: {t.alcohol_content}</Text>
                  <Text>Vintage Year: {t.vintage}</Text>
                  <Text>Wine Temperature: {t.wine_temperature}</Text>
                  <Text>Ambient Temperature: {t.ambient_temperature}</Text>
                </View>
              </List.Accordion>
            </View>

          </View>
        ))}
      </List.Section>
    </ScrollView>
  );
}