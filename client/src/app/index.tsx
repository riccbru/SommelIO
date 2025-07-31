import React from 'react';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native'
import { useAuth } from '../hooks/useAuth';

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