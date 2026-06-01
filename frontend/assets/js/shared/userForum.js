const STORAGE_KEY = "workly_usuario_forum_posts";

const DEFAULT_POSTS = [
  {
    id: "user-forum-1",
    author: "Ana Martinez",
    title: "Como preparan una entrevista tecnica?",
    content: "Estoy aplicando a mi primera plaza como desarrolladora junior y quiero ordenar mi preparacion.",
    category: "Entrevistas",
    createdAt: "2026-04-20T09:00:00.000Z",
    likes: 7,
    saved: false,
    comments: []
  }
];

const normalizePosts = (posts) =>
  posts.map((post) => ({
    ...post,
    likes: Number(post.likes || 0),
    saved: Boolean(post.saved),
    comments: Array.isArray(post.comments) ? post.comments : []
  }));

export const getUserForumPosts = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
    return normalizePosts(DEFAULT_POSTS);
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? normalizePosts(parsed) : normalizePosts(DEFAULT_POSTS);
  } catch {
    return normalizePosts(DEFAULT_POSTS);
  }
};

export const saveUserForumPosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePosts(posts)));
};

export const createUserForumPost = ({ author, content, category }) => {
  const cleanContent = String(content || "").trim();
  const firstSentence = cleanContent.split(/[.!?]/)[0]?.trim() || cleanContent;
  const post = {
    id: `user-post-${Date.now()}`,
    author: author || "Usuario",
    title: firstSentence.length > 70 ? `${firstSentence.slice(0, 67)}...` : firstSentence,
    content: cleanContent,
    category: category || "General",
    createdAt: new Date().toISOString(),
    likes: 0,
    saved: false,
    comments: []
  };

  saveUserForumPosts([post, ...getUserForumPosts()]);
  return post;
};

export const toggleUserForumSave = (postId) => {
  const nextPosts = getUserForumPosts().map((post) =>
    post.id === postId ? { ...post, saved: !post.saved } : post
  );
  saveUserForumPosts(nextPosts);
};

export const incrementUserForumLike = (postId) => {
  const nextPosts = getUserForumPosts().map((post) =>
    post.id === postId ? { ...post, likes: Number(post.likes || 0) + 1 } : post
  );
  saveUserForumPosts(nextPosts);
};
