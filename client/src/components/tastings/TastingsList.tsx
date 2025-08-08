import { useRouter } from "expo-router";
import { FileTextIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button, List, useTheme } from "react-native-paper";
import { capitalizeFirst, formatDescription } from "@/src/utils/utils";

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
          marginRight: 5,
          color: theme.colors.text
        },
        accordionBody: {
          marginLeft: 30,
          backgroundColor: theme.colors.background
        },
        text: {
          color: theme.colors.text
        }
    });

    const handlePress = (tasting: Tasting) => {
        router.push(`/tastings/${tasting.tid}`);
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
                                title={`${capitalizeFirst(t.winemaker)} - ${t.wine_denomination.toUpperCase()}`}
                                description={formatDescription(t.tasting_date, t.tasting_time, t.tasting_location)}
                            >
                                <View style={styles.accordionBody}>
                                    <Text style={styles.text}>Sample Number: {t.sample_number}</Text>
                                    <Text style={styles.text}>Alcohol Content: {t.alcohol_content}</Text>
                                    <Text style={styles.text}>Vintage Year: {t.vintage}</Text>
                                    <Text style={styles.text}>Wine Temperature: {t.wine_temperature}</Text>
                                    <Text style={styles.text}>Ambient Temperature: {t.ambient_temperature}</Text>
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