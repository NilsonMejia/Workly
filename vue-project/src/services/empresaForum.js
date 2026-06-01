const STORAGE_KEY = 'workly_empresa_forum_posts';

const defaultPosts = [
  {
    id: 1,
    companyName: 'Workly',
    authorInitials: 'WK',
    title: 'Bienvenida al foro de empresas',
    content: 'Comparte actualizaciones, eventos y consejos de reclutamiento con otras empresas.',
    category: 'Cultura',
    createdAt: new Date().toISOString(),
    likes: 0,
    shares: 0,
    saved: false,
    comments: []
  }
];

const readPosts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) && parsed.length ? parsed : defaultPosts;
  } catch {
    return defaultPosts;
  }
};

const writePosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const getCompanyForumPosts = () =>
  [...readPosts()].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

export const saveCompanyForumPosts = (posts) => {
  writePosts(Array.isArray(posts) ? posts : []);
};

export const createCompanyForumPost = ({
  companyName = 'Empresa',
  authorInitials = 'EM',
  content = '',
  category = 'Noticia',
  title = ''
} = {}) => {
  const posts = readPosts();
  const post = {
    id: Date.now(),
    companyName,
    authorInitials,
    title: title || category,
    content: String(content || '').trim(),
    category,
    createdAt: new Date().toISOString(),
    likes: 0,
    shares: 0,
    saved: false,
    comments: []
  };

  writePosts([post, ...posts]);
  return post;
};

export const addCompanyForumComment = (postId, author = 'Empresa', content = '') => {
  const posts = readPosts().map((post) => {
    if (Number(post.id) !== Number(postId)) return post;
    return {
      ...post,
      comments: [
        ...(post.comments || []),
        {
          id: Date.now(),
          author,
          content,
          createdAt: new Date().toISOString()
        }
      ]
    };
  });
  writePosts(posts);
};

export const incrementCompanyForumMetric = (postId, metric) => {
  const posts = readPosts().map((post) => {
    if (Number(post.id) !== Number(postId)) return post;
    return {
      ...post,
      [metric]: Number(post[metric] || 0) + 1
    };
  });
  writePosts(posts);
};

export const toggleCompanyForumSave = (postId) => {
  const posts = readPosts().map((post) => (
    Number(post.id) === Number(postId) ? { ...post, saved: !post.saved } : post
  ));
  writePosts(posts);
};
