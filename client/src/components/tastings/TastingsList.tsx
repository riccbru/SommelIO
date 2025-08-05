import { Button, List, useTheme } from "react-native-paper";
import { FileTextIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import { capitalizeFirst, formatDescription } from "@/src/utils/utils";
import { useRouter } from "expo-router";

type Props = {
    searchQuery: string;
    tastings: Tasting[];
}

export default function TastingsList({ searchQuery, tastings }: Props) {
    
    const theme = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
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

    const handlePress = (tasting: Tasting) => {
        console.log(`Button ${tasting.tid} pressed!`);
        router.replace("/screens/TastingForm");
    }

    return (
      <List.Section>
        {tastings
            .filter(t =>
              t.wine_denomination.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((t, index) =>
                (
                    <View key={index} style={styles.row}>
                    
                        <View style={styles.iconContainer}>
                            <Button onPress={() => handlePress(t)}>
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
                )
            )
        }
      </List.Section>
    )
}