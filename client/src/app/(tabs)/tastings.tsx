import { useAuth } from "@/src/hooks/useAuth";
import TastingsAPI from "@/src/services/tastings";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TastingsList from "@/src/components/tastings/TastingsList";
import { useTheme, ActivityIndicator, Searchbar, Text } from "react-native-paper";

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
  const { accessToken, refresh } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tastings, setTastings] = useState<Tasting[]>([]);

  useEffect(() => {
    async function fetchTastings() {
      const delay = new Promise((resolve) => setTimeout(resolve, 650));
      try {
        const [data] = await Promise.all([
          TastingsAPI.fetchTastings(accessToken),
          delay,
        ]);
        setTastings(data.tastings || []);
      } catch (error: any) {
        const status = error.trim().split(' ').pop();
        if (status === '401') {
          refresh();
        }
        console.log(`Some ERR: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTastings();
  }, [accessToken, refresh]);

  const styles = StyleSheet.create({
    searchBarContainer: {
      backgroundColor: theme.colors.background
    },
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
    },
    emptyListContainer: {
      flex: 1,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 22
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
    <>
      {tastings.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.text}>No tasting yet added</Text>
        </View>
      ) : (
        <>
          <View style={styles.searchBarContainer}>
            <Searchbar
              value={searchQuery}
              placeholder="Search wine denomination..."
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView style={styles.container}>
            <TastingsList searchQuery={searchQuery} tastings={tastings} />
          </ScrollView>
        </>
      )}
    </>
  );
}