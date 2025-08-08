import { FileArrowDownIcon, StarIcon, TrashIcon } from 'phosphor-react-native';
import { formatOption } from '@/src/utils/utils';
import TastingsAPI from '@/src/services/tastings';
import TastingCard from '@/src/components/tastings/TastingCard';
import ExamDetails from '@/src/components/tastings/ExamDetails';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TastingDetails from '@/src/components/tastings/TastingDetails';
import OlfactoryDetails from '@/src/components/tastings/OlfactoryDetails';

type EditModeShape = {
  tasting: boolean;
  visual: boolean;
  olfactory: boolean;
  taste: boolean;
  final: boolean;
};

type Tasting = {
    tid: string;
    uid: string;
    full_name: string;
    wine_category_name: string;
    sample_number: string;
    wine_denomination: string;
    favorite: boolean;
    winemaker: string;
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
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const { tid } = useLocalSearchParams<{ tid: string }>();
    const [tasting, setTasting] = useState<Tasting | null>(null);
    const [editMode, setEditMode] = useState<EditModeShape>({
        tasting: false,
        visual: false,
        olfactory: false,
        taste: false,
        final: false,
    });

    const toggleFavorite = useCallback(async () => {
        try {
            const response = await TastingsAPI.toggleFavorite(tid);
            setFavorite(response.data.favorite);
        } catch (error) {
            console.log(error);
        }
    }, [tid]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${tasting?.wine_denomination} - ${tasting?.winemaker}`,
            headerTitleStyle: {
                color: theme.dark ? "#ffffff" : "#000000"
            },
            headerRight: () => (
                <TouchableOpacity style={{ justifyContent: "center", marginTop: 10, marginBottom: 10 }} onPress={toggleFavorite}>
                    <StarIcon size={32} weight={favorite ? "fill" : "regular"} color={favorite ? theme.colors.amber : (theme.dark ? "#ffffff" : "#000000") } />
                </TouchableOpacity>
            )
        });
    }, [navigation, theme, favorite, toggleFavorite]);

    useEffect(() => {
        const fetchTasting = async () => {
            try {
                const delay = new Promise((resolve) => setTimeout(resolve, 500));
                const [response] = await Promise.all([
                    TastingsAPI.fetchTastingById(tid),
                    delay
                ]);
                setTasting(response.data);
                setFavorite(response.data.favorite);
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
        cardSubtitle: {
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        subtitle: {
            fontSize: 18,
            fontWeight: '600',
            color: "#000000",
        },
        text: {
            color: "#000000"
        }
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading tasting details...</Text>
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

            <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => console.log(`download tasting ${tasting.tid}`)}>
                    <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <FileArrowDownIcon size={32} weight='bold' style={{ marginRight: 10, marginBottom: 20 }} color={theme.dark ? "#ffffff" : "#000000"} />
                        <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 20 }}>Download tasting</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log(`delete tasting ${tasting.tid}`)}>
                    <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <TrashIcon size={32} weight='bold' style={{ marginRight: 10, marginBottom: 20 }} color={theme.dark ? "#ffffff" : "#000000"} />
                        <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 20 }}>Delete tasting</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <TastingCard
                        name={"tasting"}
                        uuid={tasting.tid}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        subtitle="Wine description"
                    />
                    <TastingDetails tasting={tasting} />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <TastingCard
                        name={"visual"}
                        uuid={tasting.visual_exam.eid}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        subtitle="Visual Examination"
                    />
                    <ExamDetails exam={tasting.visual_exam} />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <TastingCard
                        name={"olfactory"}
                        uuid={tasting.olfactory_exam.eid}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        subtitle="Olfactory Examination"
                    />
                    <OlfactoryDetails exam={tasting.olfactory_exam} />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <TastingCard
                        name={"taste"}
                        uuid={tasting.taste_olfactory_exam.eid}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        subtitle="Taste-Olfactory Examination"
                    />
                    <ExamDetails exam={tasting.taste_olfactory_exam} />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <TastingCard
                        name={"final"}
                        uuid={tasting.final_considerations.eid}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        subtitle="Final Considerations"
                    />
                    <ExamDetails exam={tasting.final_considerations} />
                </Card.Content>
            </Card>

        </ScrollView>
    );
}