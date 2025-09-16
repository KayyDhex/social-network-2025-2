import { AuthContext } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useContext } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const POSTS_PER_ROW = 3;
const POST_SIZE = (width - 6) / POSTS_PER_ROW;

export default function Profile() {
    const { user } = useContext(AuthContext);

    console.log({
        user
    })

    // Mock data para posts - después conectar con datos reales
    const mockPosts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        image: `https://picsum.photos/300/300?random=${i + 1}`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100)
    }));

    const stats = {
        posts: mockPosts.length,
        followers: 1248,
        following: 523
    };

    const renderPost = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.postItem}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <View style={styles.postOverlay}>
                <View style={styles.postStats}>
                    <Ionicons name="heart" size={16} color="white" />
                    <Text style={styles.postStatText}>{item.likes}</Text>
                    <Ionicons name="chatbubble" size={16} color="white" style={styles.commentIcon} />
                    <Text style={styles.postStatText}>{item.comments}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header con avatar y stats */}
            <View style={styles.header}>
                <View style={styles.profileInfo}>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: user?.avatar_url || 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'
                            }}
                            style={styles.avatar}
                        />
                    </View>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <TouchableOpacity style={styles.statItem}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Posts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.statItem}>
                            <Text style={styles.statNumber}>{user?.followers_count}</Text>
                            <Text style={styles.statLabel}>Seguidores</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.statItem}>
                            <Text style={styles.statNumber}>{user?.following_count}</Text>
                            <Text style={styles.statLabel}>Siguiendo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bio section */}
                <View style={styles.bioSection}>
                    <Text style={styles.displayName}>{user?.name}</Text>
                    <Text style={styles.username}>@{user?.username || user?.email?.split('@')[0]}</Text>
                    <Text style={styles.bio}>
                        {user?.bio}
                    </Text>
                    {user?.website && (
                        <Text style={styles.website}>{user.website}</Text>
                    )}
                </View>
                <View style={styles.actionButtons}>
                    <Link
                        href={"/(main)/profile/edit"}
                        asChild
                    >
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Editar perfil</Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.shareButton}>
                        <Ionicons name="share-outline" size={20} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="menu" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlights}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <View key={item} style={styles.highlight}>
                            <View style={styles.highlightCircle}>
                                <Ionicons name="add" size={24} color="#999" />
                            </View>
                            <Text style={styles.highlightText}>Destacado</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.postsSection}>
                <View style={styles.postsTabs}>
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Ionicons name="grid" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Ionicons name="play" size={24} color="#999" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Ionicons name="bookmark" size={24} color="#999" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={mockPosts}
                    renderItem={renderPost}
                    numColumns={POSTS_PER_ROW}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.postsGrid}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        marginRight: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#e1e1e1',
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    bioSection: {
        marginBottom: 16,
    },
    displayName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    username: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    website: {
        fontSize: 14,
        color: '#007AFF',
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    shareButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlights: {
        marginBottom: 16,
    },
    highlight: {
        alignItems: 'center',
        marginRight: 16,
    },
    highlightCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#e1e1e1',
        borderStyle: 'dashed',
    },
    highlightText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    postsSection: {
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
    },
    postsTabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#333',
    },
    postsGrid: {
        paddingTop: 2,
    },
    postItem: {
        width: POST_SIZE,
        height: POST_SIZE,
        margin: 1,
        position: 'relative',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    postOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
    },
    postStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    commentIcon: {
        marginLeft: 12,
    },
});