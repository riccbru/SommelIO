import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
    const { isLoggedIn, isReady } = useAuth();
    
    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Checking session...</Text>
            </View>
        );
    }
    return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}