import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import TastingsAPI from '@/src/services/tastings';
import { FileArrowDownIcon, NotePencilIcon, StarIcon } from 'phosphor-react-native';

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
    visual_exam: Record<string, any>;
    olfactory_exam: Record<string, any>;
    taste_olfactory_exam: Record<string, any>;
    final_considerations: Record<string, any>;
};

export default function TastingDetail() {
    
    const theme = useTheme();
    const navigation = useNavigation();
    const [fav, setFav] = useState(false);
    const [loading, setLoading] = useState(true);
    const { tid } = useLocalSearchParams<{ tid: string }>();
    const [tasting, setTasting] = useState<Tasting | null>(null);

    useLayoutEffect(() => {
      navigation.setOptions({
          title: '',
          headerRight: () => (
              <>
                  <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }} onPress={() => {console.log("downloaded tasting")}}>
                      <FileArrowDownIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }} onPress={() => {console.log("edited tasting")}}>
                      <NotePencilIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 0 }} onPress={() => {
                      console.log(`fav = ${fav}`);
                      setFav(!fav);
                        }}>
                        <StarIcon size={32} weight={fav ? "fill" : "regular"} color={fav ? theme.colors.amber : (theme.dark ? "#ffffff" : "#000000") } />
                    </TouchableOpacity>
                </>
            )
        });
    }, [navigation, theme, fav]);

    useEffect(() => {
      const fetchTasting = async () => {
        try {
          const response = await TastingsAPI.fetchTastingById(tid);
          setTasting(response.data);
        } catch (error) {
          console.error('Error fetching tasting:', error);
        } finally {
          setLoading(false);
        }
      };

      if (tid) {
        fetchTasting();
      }
    }, [tid]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 16,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
        },
        card: {
            marginBottom: 16,
            backgroundColor: theme.colors.pearl
        },
        title: {
            color: "#000000",
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        subtitle: {
            color: "#000000",
            fontSize: 18,
            fontWeight: '600',
            marginTop: 16,
            marginBottom: 8,
        },
        text: {
            color: "#000000"
        }
    });

    if (loading) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 8 }}>Loading tasting details...</Text>
          </View>
      );
    }

    if (!tasting) {
      return (
          <View style={styles.loadingContainer}>
              <Text>Tasting not found</Text>
          </View>
      );
    }
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>{tasting.wine_denomination.toUpperCase()}</Text>
                    <Text style={styles.subtitle}>Description</Text>
                    <Text style={styles.text}>Category: {tasting.wine_category_name}</Text>
                    <Text style={styles.text}>Sample: {tasting.sample_number}</Text>
                    <Text style={styles.text}>Alcohol: {tasting.alcohol_content}</Text>
                    <Text style={styles.text}>Vintage: {tasting.vintage}</Text>
                    <Text style={styles.text}>Wine Temperature: {tasting.wine_temperature}</Text>
                    <Text style={styles.text}>Ambient Temperature: {tasting.ambient_temperature}</Text>
                    <Text style={styles.text}>Date & Time: {tasting.tasting_date.split('T')[0]} @ {tasting.tasting_time.split('T')[1].slice(0, 5)}</Text>
                    <Text style={styles.text}>Location: {tasting.tasting_location}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.subtitle}>Visual Examination</Text>
                    <Text style={styles.text}>{JSON.stringify(tasting.visual_exam, null, 2)}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.subtitle}>Olfactory Examination</Text>
                    <Text style={styles.text}>{JSON.stringify(tasting.olfactory_exam, null, 2)}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.subtitle}>Taste-Olfactory Examination</Text>
                    <Text style={styles.text}>{JSON.stringify(tasting.taste_olfactory_exam, null, 2)}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.subtitle}>Final Considerations</Text>
                    <Text style={styles.text}>{JSON.stringify(tasting.final_considerations, null, 2)}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}