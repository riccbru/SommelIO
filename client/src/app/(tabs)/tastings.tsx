import TastingsAPI from "@/src/services/tastings";
import { useCallback, useEffect, useState } from "react";
import TastingsList from "@/src/components/tastings/TastingsList";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tastings, setTastings] = useState<Tasting[]>([]);

  const fetchTastings = useCallback(async () => {
    const delay = new Promise((resolve) => setTimeout(resolve, 650));
    try {
      const [data] = await Promise.all([
        TastingsAPI.fetchTastings(),
        delay,
      ]);
      setTastings(data.tastings || []);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTastings();
  }, [fetchTastings]);

  const styles = StyleSheet.create({
    centeredContainer: {
      flex: 1,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    searchBarContainer: {
      backgroundColor: theme.colors.background
    },
    tastingsContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 22
    }
  });

  if (loading) {
    return(
      <View style={styles.centeredContainer}>
        <ActivityIndicator size={"large"} color="#ffffff" />
        <View style={{ marginTop: 8 }} />
        <Text style={styles.text}>Fetching wines...</Text>
      </View>
    );
  }

  return (
    <>
      {!tastings.length ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.text}>No tasting found</Text>
        </View>
      ) : (
        <>
          <View style={styles.searchBarContainer}>
            <Searchbar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search wine denomination..."
            />
          </View>
          <ScrollView
            style={styles.tastingsContainer}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchTastings}
              />
            }
          >
            <TastingsList searchQuery={searchQuery} tastings={tastings} />
          </ScrollView>
        </>
      )}
    </>
  );
}