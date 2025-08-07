import { useNavigation } from "expo-router";
import TastingsAPI from "@/src/services/tastings";
import { ListPlusIcon } from "phosphor-react-native";
import TastingsList from "@/src/components/tastings/TastingsList";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTheme, ActivityIndicator, Searchbar, Text } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

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
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tastings, setTastings] = useState<Tasting[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }} onPress={() => {
          console.log("add wine to drink")
        }}>
          <ListPlusIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      )
    });
  }, [navigation, theme.dark]);

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
    container: {
      backgroundColor: theme.colors.background
    },
    centeredContainer: {
      flex: 1,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    searchBarContainer: {
      marginLeft: 5,
      marginRight: 5,
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
        <ActivityIndicator size={"large"} color={theme.dark ? "#ffffff" : "#000000"} />
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
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
              <Searchbar
                style={{ marginTop: 5 }}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search wine..."
                />
            </View>
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