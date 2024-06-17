import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image } from "react-native";
import Comment from "@/src/interface/Comment";
import CommentSectionProps from "@/src/types/smallFixes/CommentSectionProps";
import { ChatInput } from "@/src/components/Chat/ChatInput";
import { addComment, fetchComments } from "@/src/services/smallfixes/commentService";
import {uri} from "@sideway/address";
import {SvgXml} from "react-native-svg";
import AccountProfileImage from "@/assets/icons/Account/AccountProfileImage";

export const CommentSection: React.FC<CommentSectionProps> = ({ navigation, smallFixesId, refreshing, setRefreshing, role }) => {
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadComments = async () => {
        try {
            const fetchedComments = await fetchComments(smallFixesId);
            setComments(fetchedComments);
        } catch (err) {
            // @ts-ignore
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [smallFixesId]);

    useEffect(() => {
        if(refreshing) {
            loadComments();
            setRefreshing(false);
        }
    }, [refreshing]);

    const handleAddComment = async () => {
        try {
            await addComment(comment, smallFixesId);
            setComment("");
            loadComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Komentari:</Text>
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
            >
                {(comments && comments.length > 0) ? (
                    comments.map((comment: Comment, index: React.Key | null | undefined) => (
                        <View key={index} style={styles.commentContainer}>
                            <View style={styles.profileImage}>
                                {
                                    comment.user && comment.user.profileImage ? (
                                        <Image source={{uri : `data:image/jpeg;base64,${comment.user && comment.user.profileImage}`}} style={styles.defaultUserProfileImage} />
                                    ) : (
                                        <View>
                                            <SvgXml
                                                width="100%"
                                                height="100%"
                                                xml={AccountProfileImage}
                                            />
                                        </View>
                                    )
                                }
                            </View>
                            <Text style={styles.commentText}>{comment.description}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noData}>No comments yet.</Text>
                )}
            </ScrollView>
            <ChatInput role={role} message={comment} setMessage={setComment} calendarOption={false} submit={handleAddComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingRight: 0,
        paddingBottom: 60,
    },
    noData: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollViewContainer: {
        paddingBottom: 20,
    },
    commentInputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    commentContainer: {
        flexDirection: 'row',
    },
    commentText: {
        backgroundColor: '#e5e5e5',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    defaultUserProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
    },
    profileImage: {
        width: "10%",
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 10,
    },
});

export default CommentSection;
