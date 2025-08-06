import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TastingsLayout() {

    const theme = useTheme();

    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ 
                  title: 'Tastings',
                  headerShown: false
                }} 
            />
            <Stack.Screen 
                name="[tid]" 
                options={{ 
                    headerShown: true,
                    presentation: 'card',
                    headerBackTitle: 'Back',
                    title: '',
                    headerStyle: {
                        backgroundColor: theme.colors.background
                    }
                }} 
            />
        </Stack>
    );
}