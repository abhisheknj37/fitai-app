import { initialData } from '../data/mockData.js';

let communityState = JSON.parse(JSON.stringify(initialData.community));

export const getCommunityFeed = (req, res) => {
  res.status(200).json({
    success: true,
    data: communityState
  });
};

export const createPost = (req, res) => {
  const { content, image } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: 'Post content cannot be empty' });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    author: initialData.user.name,
    avatar: initialData.user.avatar,
    timeAgo: 'Just now',
    content: content.trim(),
    image: image || null,
    likes: 0,
    isLiked: false,
    commentsCount: 0,
    comments: []
  };

  communityState.posts.unshift(newPost);

  res.status(201).json({
    success: true,
    message: 'Post shared with the FitAI community!',
    post: newPost,
    data: communityState
  });
};

export const toggleLike = (req, res) => {
  const { id } = req.params;
  const post = communityState.posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (post.isLiked) {
    post.likes = Math.max(0, post.likes - 1);
    post.isLiked = false;
  } else {
    post.likes += 1;
    post.isLiked = true;
  }

  res.status(200).json({
    success: true,
    post
  });
};

export const addComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Comment cannot be empty' });
  }

  const post = communityState.posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    user: initialData.user.name,
    text: text.trim()
  };

  post.comments.push(newComment);
  post.commentsCount = post.comments.length;

  res.status(201).json({
    success: true,
    post
  });
};

export const joinChallenge = (req, res) => {
  communityState.weeklyChallenge.joined = true;
  communityState.weeklyChallenge.currentSteps = Math.min(
    communityState.weeklyChallenge.targetSteps,
    communityState.weeklyChallenge.currentSteps + 1000
  );

  res.status(200).json({
    success: true,
    message: 'Successfully updated challenge progress!',
    challenge: communityState.weeklyChallenge
  });
};
