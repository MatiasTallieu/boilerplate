"use client"
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Href, router} from "expo-router";
import type {ReactNode} from "react";

type AuthLayoutProps = {
    children: ReactNode;          // the inputs + button go here
    linkText: string;
    linkHref: Href;
    linkTestID?: string;
};

export function AuthLayout({children, linkText, linkHref, linkTestID}: AuthLayoutProps) {
    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <Image
                    source={require('../../../public/PillzLogo.png')}
                    style={styles.logoPlaceholder}
                    resizeMode="contain"
                    accessibilityLabel="Pillz logo"
                />
                <View style={styles.form}>{children}</View>

                <Pressable
                    onPress={() => router.replace(linkHref)}
                    accessibilityRole="link"
                    testID={linkTestID}
                >
                    <Text style={styles.link}>{linkText}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    panel: {
        width: '100%',
        maxWidth: 420,
        minHeight: 560,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 32,
        alignItems: 'center',
        paddingTop: 58,
        paddingBottom: 42,
    },
    logoPlaceholder: {
        width: 105,
        height: 105,
        marginBottom: 12,
    },
    form: {
        width: '86%',
        maxWidth: 360,
        marginTop: 48,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 18,
    },
    link: {
        marginTop: 24,
        fontSize: 14,
        color: '#555555',
    },
});