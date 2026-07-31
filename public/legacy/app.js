
// 1. Local-first setup. Production persistence can be connected later without
// exposing database credentials in the browser.
const isMockMode = true;
const supabase = null;
const confetti = window.confetti || (() => {});

// Mock Database (Used when Supabase is not configured to keep app fully functional)

const initialUnits = [
  {
    id: 'un_g8_1',
    grade: 8,
    title: 'Unit 1: Leisure Time',
    description: `Learn vocabulary and expressions about leisure activities and talk about likes/dislikes.`,
    transcript: `Mai: What do you do in your free time?
Nam: I enjoy doing DIY and surfing the net.
Mai: I prefer hanging out with my friends and making paper flowers.`,
    keywords: ['leisure', 'DIY', 'surfing', 'hanging out'],
    speakingPrompt: `Talk about what you usually do in your leisure time.`,
    quizzes: [
      { question: "What does Nam enjoy doing?", options: ['Making paper flowers', 'Doing DIY and surfing the net', 'Playing football', 'Listening to music'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_2',
    grade: 8,
    title: 'Unit 2: Life in the Countryside',
    description: `Discuss life in the countryside and make comparisons.`,
    transcript: `Nick: How was your summer holiday, Mai?
Mai: It was great. I stayed at my uncle\'s house in a small village. I helped them load rice and herd the buffaloes.`,
    keywords: ['countryside', 'herd', 'harvest', 'paddy field'],
    speakingPrompt: `Compare life in the city with life in the countryside.`,
    quizzes: [
      { question: "Where did Mai stay during her summer holiday?", options: ['In a big city', 'At her uncle\'s house in a village', 'At the beach', 'In a foreign country'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_3',
    grade: 8,
    title: 'Unit 3: Teenagers',
    description: `Talk about teen school clubs, social media use, and teen stress.`,
    transcript: `Teacher: What pressure do you have at school?
Minh: We have pressure from our parents and friends. It\'s really stressful.`,
    keywords: ['pressure', 'forum', 'stressful', 'school club'],
    speakingPrompt: `What kind of pressure do teenagers face today?`,
    quizzes: [
      { question: "According to Minh, where does their pressure come from?", options: ['Only from teachers', 'Parents and friends', 'Homework', 'Social media'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_4',
    grade: 8,
    title: 'Unit 4: Ethnic Groups of Viet Nam',
    description: `Learn about the lifestyle and culture of different ethnic groups.`,
    transcript: `Tom: What is life in your village like, Lai?
Lai: It\'s peaceful. We live in stilt houses overlooking terraced fields.`,
    keywords: ['ethnic group', 'stilt house', 'terraced fields', 'culture'],
    speakingPrompt: `Describe a traditional feature of an ethnic group in Viet Nam.`,
    quizzes: [
      { question: "What kind of houses do people in Lai\'s village live in?", options: ['Modern flats', 'Stilt houses', 'Villas', 'Boats'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_5',
    grade: 8,
    title: 'Unit 5: Our Customs and Traditions',
    description: `Discuss family customs, traditions, and local festivals.`,
    transcript: `Elena: Does your family visit flower villages too?
Trang: Yes. We usually visit Nhat Tan Village to buy peach blossoms for Tet.`,
    keywords: ['customs', 'traditions', 'peach blossoms', 'festival'],
    speakingPrompt: `Talk about a custom or tradition your family follows during Tet.`,
    quizzes: [
      { question: "Why does Trang\'s family visit Nhat Tan Village?", options: ['To buy kumquat trees', 'To buy peach blossoms', 'To visit relatives', 'To watch fireworks'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_6',
    grade: 8,
    title: 'Unit 6: Lifestyles',
    description: `Learn about different lifestyles and the impact of modern technology.`,
    transcript: `Nam: People buy and sell a lot of street food here.
Tom: I see. In my country, we typically have a light breakfast at home.`,
    keywords: ['lifestyle', 'street food', 'habit', 'technology'],
    speakingPrompt: `Discuss the differences between a traditional and a modern lifestyle.`,
    quizzes: [
      { question: "What do people typically do for breakfast in Tom\'s country?", options: ['Eat street food', 'Have a light breakfast at home', 'Skip breakfast', 'Go to a restaurant'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_7',
    grade: 8,
    title: 'Unit 7: Environmental Protection',
    description: `Discuss environmental problems and how to protect endangered species.`,
    transcript: `Club leader: What are our serious environmental problems?
Nam: Pollution and habitat loss, I think. We can reduce our carbon footprint.`,
    keywords: ['pollution', 'habitat loss', 'carbon footprint', 'endangered species'],
    speakingPrompt: `What can we do to reduce our carbon footprint?`,
    quizzes: [
      { question: "Which is mentioned as a serious environmental problem?", options: ['Traffic jams', 'Pollution and habitat loss', 'Noise', 'Overpopulation'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_8',
    grade: 8,
    title: 'Unit 8: Shopping',
    description: `Talk about shopping places, online shopping, and ways to bargain.`,
    transcript: `Alice: I prefer shopping at the supermarket. The items have fixed prices.
Mai: I like open-air markets. The products are home-grown.`,
    keywords: ['supermarket', 'fixed prices', 'open-air market', 'bargain'],
    speakingPrompt: `Do you prefer shopping online or at a traditional market? Why?`,
    quizzes: [
      { question: "Why does Alice prefer the supermarket?", options: ['She can bargain', 'It is cheaper', 'Items have fixed prices', 'It is outdoors'], correctIndex: 2 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_9',
    grade: 8,
    title: 'Unit 9: Natural Disasters',
    description: `Learn vocabulary about natural disasters and safety instructions.`,
    transcript: `Mi: What happened last night?
Tom: We saw a big funnel of wind moving towards us. It was a tornado.`,
    keywords: ['tornado', 'earthquake', 'flood', 'eruption'],
    speakingPrompt: `Describe a natural disaster you know and what people should do to stay safe.`,
    quizzes: [
      { question: "What disaster did Tom experience?", options: ['An earthquake', 'A flood', 'A tornado', 'A volcanic eruption'], correctIndex: 2 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_10',
    grade: 8,
    title: 'Unit 10: Communication in the Future',
    description: `Explore future means of communication like telepathy and holography.`,
    transcript: `Mark: You just sit in front of the computer. I\'ll connect with you via my tablet.
Trang: Can you see me clearly? It\'s my first video conference.`,
    keywords: ['video conference', 'telepathy', 'holography', 'webcam'],
    speakingPrompt: `How do you think people will communicate in the year 2050?`,
    quizzes: [
      { question: "What are Mark and Trang trying to do?", options: ['Make a phone call', 'Set up a video conference', 'Send a text message', 'Meet face to face'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_11',
    grade: 8,
    title: 'Unit 11: Science and Technology',
    description: `Discuss the impact of scientific inventions and robot teachers.`,
    transcript: `Ann: There\'s some great news. In the future, we will have robot teachers.
Minh: Fantastic! They will be able to mark our work instantly.`,
    keywords: ['invention', 'robot teacher', 'technology', 'biometrics'],
    speakingPrompt: `Do you think robot teachers will replace human teachers? Why or why not?`,
    quizzes: [
      { question: "What is one advantage of robot teachers mentioned by Minh?", options: ['They can play games', 'They can mark work instantly', 'They never get tired', 'They are cheaper'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  },
  {
    id: 'un_g8_12',
    grade: 8,
    title: 'Unit 12: Life on Other Planets',
    description: `Read about space exploration, the solar system, and imaginary aliens.`,
    transcript: `Nick: I\'m reading a science fiction book about aliens travelling to Earth.
Mai: That sounds thrilling! Do you think Mars can support human life?`,
    keywords: ['alien', 'solar system', 'planet', 'spaceship'],
    speakingPrompt: `If you could visit another planet, which one would you choose and why?`,
    quizzes: [
      { question: "What is Nick\'s book about?", options: ['History of Earth', 'Aliens travelling to Earth', 'Building spaceships', 'A journey to the moon'], correctIndex: 1 },
      { question: "What is the main topic of this conversation?", options: ["Everyday activities", "Academic subjects", "Future plans", "Health and fitness"], correctIndex: 0 }
    ]
  }
];

const defaultDB = {
  users: [
    { id: 'u1', username: 'hs1', password: '123', role: 'student', full_name: 'Nguyễn Văn A', class_name: '8A1', xp_points: 1250, streak_days: 5 },
    { id: 'u2', username: 'hs2', password: '123', role: 'student', full_name: 'Trần Thị B', class_name: '8A1', xp_points: 980, streak_days: 2 },
    { id: 'u3', username: 'gv1', password: '123', role: 'teacher', full_name: 'Cô Lan Anh', class_name: '8A1, 8A2', xp_points: 0, streak_days: 0 },
    { id: 'u4', username: 'admin', password: '123', role: 'admin', full_name: 'Admin CVA', class_name: null, xp_points: 0, streak_days: 0 }
  ],
  submissions: [],
  units: initialUnits
};

let mockDB = JSON.parse(localStorage.getItem('ai_studio_db_v3'));
if (!mockDB) {
  mockDB = structuredClone(defaultDB);
  saveDB();
}

const BADGE_CATALOG = [
  { id: 'first-step', name: 'First Step', icon: 'footprints', color: 'emerald', label: 'Bắt đầu hành trình', check: user => user.xp_points >= 10 },
  { id: 'xp-500', name: 'Rising Star', icon: 'star', color: 'amber', label: 'Đạt 500 XP', check: user => user.xp_points >= 500 },
  { id: 'xp-1500', name: 'XP Champion', icon: 'trophy', color: 'violet', label: 'Đạt 1.500 XP', check: user => user.xp_points >= 1500 },
  { id: 'listener', name: 'Master Listener', icon: 'headphones', color: 'indigo', label: 'Hoàn thành 5 lượt nghe', check: user => user.gamification.listening_completed >= 5 },
  { id: 'quiz', name: 'Quiz Master', icon: 'brain', color: 'cyan', label: 'Trả lời đúng 10 câu', check: user => user.gamification.quiz_correct >= 10 },
  { id: 'speaker', name: 'Gold Speaker', icon: 'mic', color: 'rose', label: 'Nộp 3 bài nói', check: user => user.gamification.speaking_submitted >= 3 },
  { id: 'streak-7', name: 'Streak Keeper', icon: 'flame', color: 'orange', label: 'Chuỗi học 7 ngày', check: user => user.streak_days >= 7 },
  { id: 'all-rounder', name: 'All‑Rounder', icon: 'gem', color: 'fuchsia', label: 'Nghe 5 · Quiz 10 · Nói 3', check: user => user.gamification.listening_completed >= 5 && user.gamification.quiz_correct >= 10 && user.gamification.speaking_submitted >= 3 }
];

function ensureGamificationData() {
  mockDB.users.forEach((user, index) => {
    if(user.role !== 'student') return;
    user.gamification ||= {
      listening_completed: Math.max(0, Math.floor((user.xp_points || 0) / 180)),
      quiz_correct: Math.max(0, Math.floor((user.xp_points || 0) / 90)),
      speaking_submitted: Math.max(0, Math.floor((user.xp_points || 0) / 420)),
      last_activity_date: null,
      xp_events: []
    };
    user.gamification.xp_events ||= [];
    if(!user.gamification.xp_events.length && user.xp_points > 0) {
      const now = Date.now();
      user.gamification.xp_events.push({
        id: `migration-${user.id}`,
        amount: user.xp_points,
        reason: 'Điểm tích lũy',
        timestamp: new Date(now - index * 86_400_000).toISOString()
      });
    }
  });
  saveDB();
}

function ensureTeacherData() {
  mockDB.assignments ||= [{
    id: 'assignment-demo-1',
    grade: 8,
    title: 'Unit 1: Leisure Time',
    question: 'What does Mai usually do in her free time?',
    options: ['Read books', 'Play badminton', 'Watch films', 'Go cycling'],
    correctIndex: 1,
    speakingPrompt: 'Talk about one leisure activity you enjoy and explain why.',
    audio_url: '',
    audio_status: 'Chưa có MP3',
    created_at: new Date().toISOString()
  }];
  mockDB.classes ||= [
    { id: 'class-8a1', name: '8A1', grade: 8, code: 'CVA8A1', teacher_id: 'u3' },
    { id: 'class-8a2', name: '8A2', grade: 8, code: 'CVA8A2', teacher_id: 'u3' }
  ];
  mockDB.analytics ||= {
    listening_minutes: 2840,
    recording_count: 186,
    unit_performance: [
      { unit: 'Unit 1', listening: 7.8, speaking: 7.2, practice: 74 },
      { unit: 'Unit 2', listening: 8.1, speaking: 7.6, practice: 82 },
      { unit: 'Unit 3', listening: 7.4, speaking: 7.9, practice: 68 },
      { unit: 'Unit 4', listening: 8.4, speaking: 8.0, practice: 87 },
      { unit: 'Unit 5', listening: 8.0, speaking: 8.3, practice: 79 }
    ],
    class_completion: [
      { class_name: '6A1', grade: 6, completed: 88 },
      { class_name: '7A1', grade: 7, completed: 81 },
      { class_name: '8A1', grade: 8, completed: 76 },
      { class_name: '8A2', grade: 8, completed: 69 },
      { class_name: '9A1', grade: 9, completed: 91 }
    ],
    at_risk: [
      { student: 'Trần Thị B', class_name: '8A1', average: 5.4, late: 2, reason: 'Điểm Nói thấp · nộp muộn 2 bài' },
      { student: 'Lê Minh Khang', class_name: '8A2', average: 5.8, late: 3, reason: 'Thiếu luyện tập · nộp muộn 3 bài' },
      { student: 'Phạm Gia Hân', class_name: '7A1', average: 6.1, late: 2, reason: 'Điểm Nghe giảm 2 Unit liên tiếp' }
    ]
  };
  mockDB.system_settings ||= {
    storage: { bucket: 'audio-submissions', quota_gb: 20, retention_days: 365 },
    backup: { frequency: 'daily', retention: 30, mask_student_data: true, last_backup: null, next_backup: null },
    backup_history: []
  };
  saveDB();
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function recordDailyActivity(user) {
  if(!user?.gamification) return;
  const today = localDateKey();
  const last = user.gamification.last_activity_date;
  if(last === today) return;
  if(last) {
    const previous = new Date(`${last}T00:00:00`);
    const current = new Date(`${today}T00:00:00`);
    const days = Math.round((current - previous) / 86_400_000);
    user.streak_days = days === 1 ? (user.streak_days || 0) + 1 : 1;
  } else {
    user.streak_days = Math.max(1, user.streak_days || 0);
  }
  user.gamification.last_activity_date = today;
  saveDB();
}

function awardXP(amount, reason, metric) {
  const user = state.currentUser;
  if(!user || user.role !== 'student') return;
  ensureGamificationData();
  recordDailyActivity(user);
  if(metric) user.gamification[metric] = (user.gamification[metric] || 0) + 1;
  user.xp_points = (user.xp_points || 0) + amount;
  user.gamification.xp_events.push({
    id: `xp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    amount,
    reason,
    timestamp: new Date().toISOString()
  });
  saveDB();
  renderGamification();
}

function completeListeningSession() {
  const user = state.currentUser;
  if(!user?.gamification || !state.currentUnit) return;
  user.gamification.completed_listening ||= [];
  const key = `${state.currentUnit.id}:${localDateKey()}`;
  if(user.gamification.completed_listening.includes(key)) return;
  user.gamification.completed_listening.push(key);
  awardXP(20, 'Hoàn thành bài nghe', 'listening_completed');
}

function saveDB() {
  localStorage.setItem('ai_studio_db_v3', JSON.stringify(mockDB));
}
window.mockDB = mockDB;
window.saveDB = saveDB;
window.renderAdminDashboard = renderAdminDashboard;

// Global State
const state = {
  currentUser: null,
  currentGrade: 6,
  isRecording: false,
  mediaRecorder: null,
  audioChunks: [],
  audioBlob: null,
  audioUrl: null,
  quizAnswered: false,
  currentGradingSubmissionId: null,
  listening: {
    lines: [],
    durations: [],
    starts: [],
    total: 0,
    currentTime: 0,
    currentLine: 0,
    playing: false,
    shadowing: false,
    waitingForRepeat: false,
    bookmarks: []
  }
};

// 2. Initialization
document.addEventListener('DOMContentLoaded', () => {
  ensureGamificationData();
  ensureTeacherData();
  initWorkspaceNavigation();
  lucide.createIcons();
  initAuthFlow();
  initGradeTabs();
  initAudioPlayer();
  initQuiz();
  initWebAudioAPI();
  initGradingModal();
  initTeacherWorkspace();
  initSystemAdmin();
  initAdminModals();
  initEditProfileModal();
  initFlashcards();
  initGamificationControls();
});

function buildWorkspaceNavigation(portal, items) {
  if(!portal || portal.querySelector('.workspace-nav')) return;
  const nav = document.createElement('div');
  nav.className = 'workspace-nav';
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-label', 'Điều hướng phân hệ');

  const panels = items.map((item, index) => {
    const panel = document.createElement('section');
    panel.id = `${portal.id}-${item.id}-panel`;
    panel.className = `workspace-panel ${index ? 'hidden' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    item.nodes.filter(Boolean).forEach(node => panel.appendChild(node));
    portal.appendChild(panel);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `workspace-nav-btn ${index === 0 ? 'active' : ''}`;
    button.dataset.panel = panel.id;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === 0));
    button.innerHTML = `<i data-lucide="${item.icon}" class="w-4 h-4"></i><span>${item.label}</span>`;
    nav.appendChild(button);
    return panel;
  });

  portal.prepend(nav);
  nav.addEventListener('click', event => {
    const button = event.target.closest('.workspace-nav-btn');
    if(!button) return;
    nav.querySelectorAll('.workspace-nav-btn').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    panels.forEach(panel => panel.classList.toggle('hidden', panel.id !== button.dataset.panel));
    portal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initWorkspaceNavigation() {
  const teacher = document.getElementById('teacher-portal');
  if(teacher) {
    const children = [...teacher.children];
    buildWorkspaceNavigation(teacher, [
      { id: 'overview', label: 'Tổng quan', icon: 'layout-dashboard', nodes: [children[0], children[1]] },
      { id: 'lessons', label: 'Bài tập & Lớp', icon: 'book-open-check', nodes: [children[2]] },
      { id: 'grading', label: 'Chấm bài', icon: 'clipboard-check', nodes: [children[3]] },
      { id: 'progress', label: 'Tiến độ lớp', icon: 'trophy', nodes: [children[4]] }
    ]);
  }

  const admin = document.getElementById('admin-portal');
  if(admin) {
    const children = [...admin.children];
    const managementGrid = children[4];
    const accountCard = managementGrid?.children[0];
    const lessonCard = managementGrid?.children[1];
    managementGrid?.remove();
    buildWorkspaceNavigation(admin, [
      { id: 'overview', label: 'Tổng quan', icon: 'layout-dashboard', nodes: [children[0], children[1]] },
      { id: 'accounts', label: 'Tài khoản & RBAC', icon: 'users-round', nodes: [children[2], accountCard] },
      { id: 'content', label: 'Nội dung học', icon: 'library-big', nodes: [lessonCard] },
      { id: 'cloud', label: 'Cloud & Sao lưu', icon: 'cloud-cog', nodes: [children[3]] }
    ]);
  }
}

function initEditProfileModal() {
  const openBtn = document.getElementById('open-edit-profile-btn');
  const modal = document.getElementById('edit-profile-modal');
  const closeBtn = document.getElementById('close-profile-modal');
  const cancelBtn = document.getElementById('cancel-profile-modal');
  const form = document.getElementById('profile-form');
  
  if (!modal) return;
  
  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('logout-dropdown').classList.add('hidden');
  };
  
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      const u = state.currentUser;
      if(!u) return;
      document.getElementById('profile-fullname').value = u.full_name;
      document.getElementById('profile-password').value = '';
      document.getElementById('profile-avatar-input').value = u.avatar_url || '';
      
      const seed = encodeURIComponent(u.full_name);
      document.getElementById('profile-avatar-preview').src = u.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`;
      
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  
  // Handle file upload
  document.getElementById('profile-avatar-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('profile-avatar-preview').src = e.target.result;
        document.getElementById('profile-avatar-input').value = e.target.result; // store base64 in hidden input
      };
      reader.readAsDataURL(file);
    }
  });

  // Update preview on URL input
  document.getElementById('profile-avatar-input').addEventListener('input', (e) => {
    const val = e.target.value;
    const preview = document.getElementById('profile-avatar-preview');
    if (val) {
      preview.src = val;
    } else {
      const seed = encodeURIComponent(state.currentUser.full_name);
      preview.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`;
    }
  });
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('profile-fullname').value.trim();
      const newPass = document.getElementById('profile-password').value;
      const newAvatar = document.getElementById('profile-avatar-input').value.trim();
      
      if (!newName) {
        alert("Tên không được để trống!");
        return;
      }
      
      // Update in memory
      state.currentUser.full_name = newName;
      if (newPass) state.currentUser.password = newPass;
      state.currentUser.avatar_url = newAvatar;
      
      // Update in DB
      const dbUser = mockDB.users.find(u => u.id === state.currentUser.id);
      if (dbUser) {
        dbUser.full_name = newName;
        if (newPass) dbUser.password = newPass;
        dbUser.avatar_url = newAvatar;
        saveDB();
      }
      
      document.getElementById('user-fullname').textContent = state.currentUser.full_name;
      const seed = encodeURIComponent(state.currentUser.full_name);
      document.getElementById('user-avatar').src = state.currentUser.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`;
      
      alert('Đã cập nhật hồ sơ thành công!');
      closeModal();
    });
  }
}


// --- MODULE: AUTHENTICATION ---
function initAuthFlow() {
  const authScreen = document.getElementById('auth-screen');
  const appScreen = document.getElementById('app-screen');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  // Toggle Forms
  document.getElementById('show-register').addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });
  document.getElementById('show-login').addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Role select logic in register
  document.getElementById('reg-role').addEventListener('change', (e) => {
    const classContainer = document.getElementById('reg-class-container');
    if (e.target.value === 'student') classContainer.classList.remove('hidden');
    else classContainer.classList.add('hidden');
  });

  // Login Logic
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    
    // Mock Auth Check
    const user = mockDB.users.find(u => u.username === username && u.password === pass);
    if (user) {
      handleLoginSuccess(user);
    } else {
      alert('Sai tài khoản hoặc mật khẩu!');
    }
  });

  // Register Logic
  
  const regRole = document.getElementById('reg-role');
  if(regRole) {
    regRole.addEventListener('change', (e) => {
      const lbl = document.getElementById('lbl-reg-class');
      const inp = document.getElementById('reg-class');
      if(e.target.value === 'teacher') {
        lbl.textContent = 'Các lớp giảng dạy (cách nhau bởi dấu phẩy)';
        inp.placeholder = 'VD: 6A1, 7A1';
      } else {
        lbl.textContent = 'Lớp';
        inp.placeholder = 'VD: 6A1';
      }
    });
  }
  
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;
    const name = document.getElementById('reg-name').value;
    const role = document.getElementById('reg-role').value;
    const className = document.getElementById('reg-class').value;

    const exists = mockDB.users.find(u => u.username === username);
    if (exists) {
      alert('Tài khoản này đã tồn tại!');
      return;
    }

    
    const newUser = {
      id: 'u' + Date.now(),
      username, password: pass, full_name: name, role,
      class_name: className,
      xp_points: 0, streak_days: 0
    };
    mockDB.users.push(newUser); saveDB();
    handleLoginSuccess(newUser);
  });

  
  const logoutTrigger = document.getElementById('logout-trigger');
  const logoutDropdown = document.getElementById('logout-dropdown');
  if(logoutTrigger && logoutDropdown) {
    logoutTrigger.addEventListener('click', (e) => {
      // Don't close immediately if clicking inside the trigger
      e.stopPropagation();
      logoutDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if(!logoutTrigger.contains(e.target)) {
        logoutDropdown.classList.add('hidden');
      }
    });
  }

  // Logout Logic

  document.getElementById('logout-btn').addEventListener('click', () => {
    state.currentUser = null;
    if(logoutDropdown) logoutDropdown.classList.add('hidden');
    appScreen.classList.add('hidden');
    appScreen.classList.remove('flex');
    authScreen.classList.remove('hidden');
    authScreen.classList.add('flex');
    
    // Reset forms
    loginForm.reset();
    registerForm.reset();
  });
}

function handleLoginSuccess(user) {
  ensureGamificationData();
  state.currentUser = user;
  recordDailyActivity(user);
  
  // Hide Auth, Show App
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('flex');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('app-screen').classList.add('flex');

  // Setup Header
  document.getElementById('user-fullname').textContent = user.full_name;
  
  // User avatar logic
  const seed = encodeURIComponent(user.full_name);
  document.getElementById('user-avatar').src = user.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`;

  const studentInfo = document.getElementById('student-header-info');
  const staffInfo = document.getElementById('staff-header-info');
  const heroBanner = document.getElementById('hero-banner');
  const gradeTabs = document.getElementById('grade-tabs-container');
  const roleText = document.getElementById('header-role-text');

  // Setup Portals based on Role
  document.getElementById('student-portal').classList.add('hidden');
  document.getElementById('teacher-portal').classList.add('hidden');
  document.getElementById('admin-portal').classList.add('hidden');

  if (user.role === 'student') {
    roleText.textContent = `Học sinh - ${user.class_name}`;
    studentInfo.classList.remove('hidden');
    studentInfo.classList.add('flex');
    staffInfo.classList.add('hidden');
    
    renderGamification();
    
    
    heroBanner.classList.remove('hidden');
    gradeTabs.classList.add('hidden'); // Only show student's grade, no need for tabs
    document.getElementById('student-portal').classList.remove('hidden');
    document.getElementById('student-portal').classList.add('grid');
    
    renderStudentSubmissions();
    
    // Auto-select grade tab based on class_name (e.g. 8A1 -> grade 8)
    if(user.class_name) {
       const gradeMatch = user.class_name.match(/^(\d)/);
       if(gradeMatch) {
          const g = parseInt(gradeMatch[1]);
          state.currentGrade = g;
          const tabs = document.querySelectorAll('.grade-tab');
          tabs.forEach(t => {
            if(parseInt(t.dataset.grade) === g) {
              t.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50');
              t.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
            } else {
              t.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
              t.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50');
            }
          });
       }
    }
    
    renderLeaderboard();
    loadStudentUnits();
  } 
  
  else if (user.role === 'teacher') {
    roleText.textContent = `Giáo viên Bộ môn`;
    studentInfo.classList.add('hidden');
    studentInfo.classList.remove('flex');
    staffInfo.classList.remove('hidden');
    staffInfo.textContent = 'Ban Giảng Dạy';
    heroBanner.classList.add('hidden');
    gradeTabs.classList.add('hidden');
    document.getElementById('teacher-portal').classList.remove('hidden');
    document.getElementById('teacher-portal').classList.add('flex');
    
    renderTeacherSubmissions();
    renderTeacherLeaderboard();
    renderTeacherAssignments();
    renderTeacherClasses();
    renderAnalyticsDashboard('teacher');
  }
  else if (user.role === 'admin') {
    roleText.textContent = `Quản trị Hệ thống`;
    studentInfo.classList.add('hidden');
    studentInfo.classList.remove('flex');
    staffInfo.classList.remove('hidden');
    staffInfo.textContent = 'System Admin';

    heroBanner.classList.add('hidden');
    gradeTabs.classList.add('hidden');
    document.getElementById('admin-portal').classList.remove('hidden');
    document.getElementById('admin-portal').classList.add('flex');
    
    renderAdminDashboard();
    renderAnalyticsDashboard('admin');
    renderAdminRbac();
    renderSystemSettings();
    runScheduledBackup();
  }
}

// --- MODULE: UI HELPERS ---
function initGradeTabs() {
  const tabs = document.querySelectorAll('.grade-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => {
        t.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50');
      });
      const target = e.currentTarget;
      target.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50');
      target.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
      state.currentGrade = parseInt(target.dataset.grade);
      if(state.currentUser && state.currentUser.role === 'student') loadStudentUnits();
    });
  });

  const transcriptBtn = document.getElementById('transcript-toggle');
  const transcriptContent = document.getElementById('transcript-content');
  const transcriptIcon = document.getElementById('transcript-icon');

  if(transcriptBtn) {
    transcriptBtn.addEventListener('click', () => {
      transcriptContent.classList.toggle('open');
      transcriptIcon.style.transform = transcriptContent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  if(!list || !state.currentUser) return;
  const period = document.getElementById('leaderboard-period')?.value || 'week';
  const scope = document.getElementById('leaderboard-scope')?.value || 'class';
  const now = new Date();
  const periodStart = period === 'month'
    ? new Date(now.getFullYear(), now.getMonth(), 1)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  periodStart.setHours(0, 0, 0, 0);
  const userGrade = String(state.currentUser.class_name || '').match(/^\d+/)?.[0];
  const students = mockDB.users
    .filter(user => user.role === 'student')
    .filter(user => scope === 'class'
      ? user.class_name === state.currentUser.class_name
      : String(user.class_name || '').startsWith(userGrade || '__'))
    .map(user => ({
      ...user,
      periodXP: (user.gamification?.xp_events || [])
        .filter(event => new Date(event.timestamp) >= periodStart)
        .reduce((sum, event) => sum + Number(event.amount || 0), 0)
    }))
    .sort((a,b) => b.periodXP - a.periodXP || b.xp_points - a.xp_points);

  list.innerHTML = students.map((s, index) => `
    <div class="flex items-center justify-between p-2 rounded-lg ${s.id === state.currentUser.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 transition-colors'}">
      <div class="flex items-center gap-3">
        <span class="text-lg font-bold ${index===0?'text-indigo-400':(index===1?'text-slate-400':'text-amber-700')} w-4 text-center">${index + 1}</span>
        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(s.full_name)}&backgroundColor=e2e8f0" class="w-8 h-8 rounded-full border border-white">
        <span class="text-sm font-semibold ${s.id === state.currentUser.id ? 'text-indigo-900' : 'text-slate-700'}">${s.full_name} ${s.id === state.currentUser.id ? '(Bạn)' : ''}</span>
      </div>
      <div class="text-right">
        <span class="block text-xs font-bold text-amber-500">${s.periodXP} XP</span>
        <span class="text-[10px] text-slate-400">Tổng ${s.xp_points}</span>
      </div>
    </div>
  `).join('');
  const caption = document.getElementById('leaderboard-caption');
  if(caption) caption.textContent = `${period === 'week' ? 'Tuần hiện tại' : 'Tháng hiện tại'} · ${scope === 'class' ? `Lớp ${state.currentUser.class_name}` : `Khối ${userGrade}`}`;
}

function renderBadges() {
  const container = document.getElementById('badges-catalog');
  const count = document.getElementById('badge-count');
  const user = state.currentUser;
  if(!container || !user?.gamification) return;
  const unlocked = BADGE_CATALOG.filter(badge => badge.check(user));
  if(count) count.textContent = `${unlocked.length} / ${BADGE_CATALOG.length}`;
  const colors = {
    emerald: 'from-emerald-500 to-teal-400 text-emerald-700 border-emerald-100 bg-emerald-50',
    amber: 'from-amber-400 to-yellow-300 text-amber-700 border-amber-100 bg-amber-50',
    violet: 'from-violet-600 to-indigo-400 text-violet-700 border-violet-100 bg-violet-50',
    indigo: 'from-indigo-500 to-cyan-400 text-indigo-700 border-indigo-100 bg-indigo-50',
    cyan: 'from-cyan-500 to-sky-400 text-cyan-700 border-cyan-100 bg-cyan-50',
    rose: 'from-rose-500 to-pink-400 text-rose-700 border-rose-100 bg-rose-50',
    orange: 'from-orange-500 to-amber-400 text-orange-700 border-orange-100 bg-orange-50',
    fuchsia: 'from-fuchsia-600 to-purple-400 text-fuchsia-700 border-fuchsia-100 bg-fuchsia-50'
  };
  container.innerHTML = BADGE_CATALOG.map(badge => {
    const isUnlocked = badge.check(user);
    const palette = colors[badge.color].split(' ');
    return `
      <div class="relative rounded-xl p-3 border ${isUnlocked ? `${palette[3]} ${palette[4]} shadow-sm` : 'border-slate-200 bg-slate-50 opacity-60 grayscale'} flex flex-col items-center text-center">
        <div class="w-11 h-11 rounded-full ${isUnlocked ? `bg-gradient-to-tr ${palette[0]} ${palette[1]}` : 'bg-slate-200'} flex items-center justify-center mb-2 shadow-inner">
          <i data-lucide="${isUnlocked ? badge.icon : 'lock'}" class="w-5 h-5 ${isUnlocked ? 'text-white' : 'text-slate-400'}"></i>
        </div>
        <p class="text-xs font-bold text-slate-800">${badge.name}</p>
        <p class="text-[10px] mt-0.5 ${isUnlocked ? palette[2] : 'text-slate-400'}">${isUnlocked ? 'Đã mở khóa' : badge.label}</p>
      </div>`;
  }).join('');
  lucide.createIcons();
}

function renderGamification() {
  const user = state.currentUser;
  if(!user || user.role !== 'student') return;
  document.getElementById('xp-display').textContent = `${user.xp_points || 0} XP`;
  document.getElementById('streak-display').textContent = user.streak_days || 0;
  document.getElementById('xp-display-card').textContent = user.xp_points || 0;
  renderBadges();
  renderLeaderboard();
}

function initGamificationControls() {
  document.getElementById('leaderboard-period')?.addEventListener('change', renderLeaderboard);
  document.getElementById('leaderboard-scope')?.addEventListener('change', renderLeaderboard);
}

// --- MODULE: AUDIO & QUIZ ---

async function openDictionary(keyword, context) {
   const modal = document.getElementById('dictionary-modal');
   const content = document.getElementById('dict-content');
   modal.classList.remove('hidden');
   modal.classList.add('flex');
   
   content.innerHTML = `<div class="animate-pulse flex flex-col gap-3">
           <div class="h-6 bg-slate-200 rounded w-1/2"></div>
           <div class="h-4 bg-slate-200 rounded w-1/3"></div>
           <div class="h-16 bg-slate-200 rounded w-full mt-2"></div>
         </div>`;
         
   try {
      const res = await fetch('/api/keyword-meaning', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ keyword, context })
      });
      const data = await res.json();
      if(!res.ok) {
         throw new Error(data.error || "Lỗi không xác định khi tải nghĩa của từ.");
      }
      
      content.innerHTML = `
         <div>
            <h4 class="text-xl font-bold text-indigo-700">${keyword}</h4>
            <p class="text-sm text-slate-500">${data.phonetic || ''} • <span class="italic">${data.partOfSpeech || ''}</span></p>
         </div>
         <div class="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
            <p class="text-sm font-medium text-indigo-900">${data.vietnameseMeaning}</p>
         </div>
         <div>
            <p class="text-sm text-slate-700 italic">"${data.exampleEn}"</p>
            <p class="text-sm text-slate-500">(${data.exampleVi})</p>
         </div>
      `;
   } catch(e) {
      content.innerHTML = `<p class="text-rose-500 text-sm">${e.message || 'Lỗi khi tải nghĩa của từ. Vui lòng thử lại sau.'}</p>`;
   }
}


function initAudioPlayer() {
  const playBtn = document.getElementById('play-btn');
  const rewindBtn = document.getElementById('rewind-btn');
  const forwardBtn = document.getElementById('forward-btn');
  const speedSelect = document.getElementById('speed-select');
  const aiVoiceToggle = document.getElementById('ai-voice-toggle');
  const aiVoiceToggleText = document.getElementById('ai-voice-toggle-text');
  const aiVoiceToggleLabel = document.getElementById('ai-voice-toggle-label');
  const shadowingBtn = document.getElementById('shadowing-btn');
  const continueBtn = document.getElementById('shadowing-continue-btn');
  const autoShadowToggle = document.getElementById('shadow-auto-toggle');
  const bookmarkBtn = document.getElementById('bookmark-btn');
  const progress = document.getElementById('listening-progress');
  if(!playBtn) return;

  const listening = state.listening;
  let shadowStream = null;
  let shadowAudioContext = null;
  let shadowAnimationFrame = null;
  let kiraAudio = null;
  let kiraPlaybackToken = 0;

  const FEMALE_SPEAKERS = new Set(['mai', 'mi', 'trang', 'alice', 'elena', 'ann', 'vy', 'linda', 'mary', 'hoa', 'lan', 'lucy', 'susan']);
  const MALE_SPEAKERS = new Set(['tom', 'nam', 'minh', 'nick', 'mark', 'phong', 'duy', 'peter', 'david', 'mike', 'john']);
  const FEMALE_VOICE_HINTS = ['samantha', 'karen', 'victoria', 'zira', 'aria', 'jenny', 'susan', 'hazel', 'female', 'fiona', 'moira', 'tessa', 'serena'];
  const MALE_VOICE_HINTS = ['daniel', 'alex', 'david', 'guy', 'mark', 'george', 'male', 'fred', 'thomas', 'oliver', 'ryan'];
  const NATURAL_VOICE_HINTS = ['natural', 'neural', 'premium', 'enhanced', 'online', 'google', 'microsoft', 'apple'];
  let englishVoices = [];
  let castUnitId = null;
  const speakerVoiceAssignments = new Map();
  const speakerVariantAssignments = new Map();
  const genderCastCounters = { female: 0, male: 0, neutral: 0 };
  const speakerKiraVoiceAssignments = new Map();
  const OPENAI_VOICE_POOLS = {
    female: [
      { openai: 'nova', kira: 'Aoede' },
      { openai: 'alloy', kira: 'Kore' }
    ],
    male: [
      { openai: 'echo', kira: 'Fenrir' },
      { openai: 'onyx', kira: 'Charon' },
      { openai: 'fable', kira: 'Puck' }
    ],
    neutral: [
      { openai: 'alloy', kira: 'Kore' },
      { openai: 'fable', kira: 'Puck' },
      { openai: 'echo', kira: 'Fenrir' },
      { openai: 'nova', kira: 'Aoede' },
      { openai: 'onyx', kira: 'Charon' }
    ]
  };

  function refreshEnglishVoices() {
    const refreshed = window.speechSynthesis.getVoices().filter(voice => /^en[-_]/i.test(voice.lang));
    if(refreshed.length !== englishVoices.length) speakerVoiceAssignments.clear();
    englishVoices = refreshed;
  }

  function resetVoiceCastIfNeeded() {
    const unitId = state.currentUnit?.id || state.currentUnit?.title || 'default';
    if(castUnitId === unitId) return;
    castUnitId = unitId;
    speakerVoiceAssignments.clear();
    speakerVariantAssignments.clear();
    speakerKiraVoiceAssignments.clear();
    genderCastCounters.female = 0;
    genderCastCounters.male = 0;
    genderCastCounters.neutral = 0;
  }

  function selectKiraVoice(profile) {
    resetVoiceCastIfNeeded();
    if(speakerKiraVoiceAssignments.has(profile.key)) return speakerKiraVoiceAssignments.get(profile.key);
    const pool = OPENAI_VOICE_POOLS[profile.gender] || OPENAI_VOICE_POOLS.neutral;
    const used = new Set(
      [...speakerKiraVoiceAssignments.entries()]
        .filter(([speakerKey]) => speakerVariantAssignments.get(speakerKey)?.gender === profile.gender)
        .map(([, voice]) => voice.openai)
    );
    const voice = pool.find(candidate => !used.has(candidate.openai))
      || pool[genderCastCounters[profile.gender] % pool.length];
    speakerKiraVoiceAssignments.set(profile.key, voice);
    return voice;
  }

  function isAiVoiceEnabled() {
    return aiVoiceToggle?.checked !== false;
  }

  function renderAiVoiceToggle() {
    const enabled = isAiVoiceEnabled();
    if(aiVoiceToggleText) aiVoiceToggleText.textContent = `Giọng AI: ${enabled ? 'Bật' : 'Tắt'}`;
    aiVoiceToggleLabel?.classList.toggle('bg-violet-50', enabled);
    aiVoiceToggleLabel?.classList.toggle('text-violet-700', enabled);
    aiVoiceToggleLabel?.classList.toggle('border-violet-200', enabled);
    aiVoiceToggleLabel?.classList.toggle('bg-slate-50', !enabled);
    aiVoiceToggleLabel?.classList.toggle('text-slate-600', !enabled);
    aiVoiceToggleLabel?.classList.toggle('border-slate-200', !enabled);
  }

  function cancelActiveVoice() {
    kiraPlaybackToken++;
    if(kiraAudio) {
      kiraAudio.pause();
      kiraAudio.src = '';
      kiraAudio = null;
    }
    window.speechSynthesis.cancel();
  }

  function getSpeakerProfile(line) {
    const rawSpeaker = line.includes(':') ? line.split(':')[0].trim() : '';
    const normalized = rawSpeaker.toLowerCase().replace(/[^a-z\s-]/g, '').trim();
    const firstName = normalized.split(/\s+/)[0];
    let gender = 'neutral';
    if(FEMALE_SPEAKERS.has(firstName) || /\b(mrs|ms|miss|girl|woman|mother|mum|aunt)\b/.test(normalized)) gender = 'female';
    if(MALE_SPEAKERS.has(firstName) || /\b(mr|boy|man|father|dad|uncle)\b/.test(normalized)) gender = 'male';
    const adult = /\b(teacher|leader|principal|reporter|doctor|mother|father|mum|dad|mr|mrs|ms)\b/.test(normalized);
    return {
      speaker: rawSpeaker || 'Narrator',
      key: normalized || 'narrator',
      gender,
      adult,
      pitch: gender === 'female' ? 1.04 : gender === 'male' ? 0.94 : 1,
      rateFactor: adult ? 0.94 : 0.98,
      label: gender === 'female' ? 'Giọng nữ' : gender === 'male' ? 'Giọng nam' : 'Giọng trung tính'
    };
  }

  function scoreVoice(voice, profile) {
    const name = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    const genderHints = profile.gender === 'female' ? FEMALE_VOICE_HINTS : profile.gender === 'male' ? MALE_VOICE_HINTS : [];
    let score = 0;
    if(NATURAL_VOICE_HINTS.some(hint => name.includes(hint))) score += 12;
    if(genderHints.some(hint => name.includes(hint))) score += 18;
    if(voice.lang === 'en-US') score += 5;
    else if(/^en-(GB|AU|CA)$/i.test(voice.lang)) score += 4;
    if(voice.localService) score += 2;
    if(/espeak|compact|robot/i.test(name)) score -= 12;
    return score;
  }

  function selectNaturalVoice(profile) {
    if(!englishVoices.length) refreshEnglishVoices();
    if(!englishVoices.length) return null;
    if(profile.key && speakerVoiceAssignments.has(profile.key)) return speakerVoiceAssignments.get(profile.key);

    const ranked = [...englishVoices].sort((a, b) => scoreVoice(b, profile) - scoreVoice(a, profile));
    const expectedHints = profile.gender === 'female' ? FEMALE_VOICE_HINTS : profile.gender === 'male' ? MALE_VOICE_HINTS : [];
    const genderMatched = expectedHints.length
      ? ranked.filter(voice => expectedHints.some(hint => `${voice.name} ${voice.voiceURI}`.toLowerCase().includes(hint)))
      : ranked;
    const safePool = genderMatched.length ? genderMatched : ranked;
    const usedBySameGender = new Set(
      [...speakerVoiceAssignments.entries()]
        .filter(([speakerKey]) => speakerVariantAssignments.get(speakerKey)?.gender === profile.gender)
        .map(([, voice]) => voice.voiceURI || voice.name)
    );
    const unused = safePool.filter(voice => !usedBySameGender.has(voice.voiceURI || voice.name));
    const selected = unused[0] || safePool[genderCastCounters[profile.gender] % safePool.length] || null;
    if(profile.key && selected) speakerVoiceAssignments.set(profile.key, selected);
    return selected;
  }

  function createNaturalUtterance(text, profile, requestedRate = 1) {
    resetVoiceCastIfNeeded();
    if(!speakerVariantAssignments.has(profile.key)) {
      const index = genderCastCounters[profile.gender]++;
      const toneOffsets = [-0.035, 0.035, -0.065, 0.065];
      const rateOffsets = [-0.018, 0.018, -0.032, 0.032];
      speakerVariantAssignments.set(profile.key, {
        gender: profile.gender,
        castNumber: index + 1,
        pitchOffset: toneOffsets[index % toneOffsets.length],
        rateOffset: rateOffsets[index % rateOffsets.length]
      });
    }
    const variant = speakerVariantAssignments.get(profile.key);
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectNaturalVoice(profile);
    if(voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = Math.max(0.72, Math.min(1.35, requestedRate * (profile.rateFactor + variant.rateOffset)));
    utterance.pitch = Math.max(0.82, Math.min(1.18, profile.pitch + variant.pitchOffset));
    utterance.volume = 1;
    utterance.characterVariant = variant;
    return utterance;
  }

  function voiceAccentLabel(voice) {
    if(!voice) return 'English';
    if(/en-GB/i.test(voice.lang)) return 'Anh–Anh';
    if(/en-AU/i.test(voice.lang)) return 'Anh–Úc';
    if(/en-CA/i.test(voice.lang)) return 'Anh–Canada';
    return 'Anh–Mỹ';
  }

  function stopShadowListening() {
    if(shadowAnimationFrame) cancelAnimationFrame(shadowAnimationFrame);
    shadowAnimationFrame = null;
    shadowStream?.getTracks().forEach(track => track.stop());
    shadowStream = null;
    if(shadowAudioContext && shadowAudioContext.state !== 'closed') shadowAudioContext.close().catch(() => {});
    shadowAudioContext = null;
  }

  async function startShadowListening() {
    stopShadowListening();
    if(!autoShadowToggle?.checked || !listening.waitingForRepeat) return;
    const status = document.getElementById('shadow-listening-status');
    try {
      shadowStream = await navigator.mediaDevices.getUserMedia({
        audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true }
      });
      if(!listening.waitingForRepeat) return stopShadowListening();
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      shadowAudioContext = new AudioContextClass();
      const analyser = shadowAudioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.6;
      shadowAudioContext.createMediaStreamSource(shadowStream).connect(analyser);
      const samples = new Uint8Array(analyser.fftSize);
      let speechStartedAt = null;
      let lastVoiceAt = null;
      status.textContent = 'Microphone đang nghe…';

      const detectVoice = () => {
        if(!listening.waitingForRepeat || !autoShadowToggle.checked) return stopShadowListening();
        analyser.getByteTimeDomainData(samples);
        const rms = Math.sqrt(samples.reduce((sum, value) => {
          const normalized = (value - 128) / 128;
          return sum + normalized * normalized;
        }, 0) / samples.length);
        const now = performance.now();
        if(rms > 0.045) {
          if(!speechStartedAt) speechStartedAt = now;
          lastVoiceAt = now;
          status.textContent = 'Đang nghe bạn nhắc lại…';
        } else if(speechStartedAt && lastVoiceAt && now - speechStartedAt >= 350 && now - lastVoiceAt >= 900) {
          status.textContent = 'Đã nhận câu nói — chuyển sang câu tiếp…';
          stopShadowListening();
          setTimeout(() => {
            if(!listening.waitingForRepeat) return;
            listening.waitingForRepeat = false;
            document.getElementById('shadowing-prompt')?.classList.add('hidden');
            listening.currentLine++;
            speakCurrentLine();
          }, 450);
          return;
        }
        shadowAnimationFrame = requestAnimationFrame(detectVoice);
      };
      detectVoice();
    } catch {
      status.textContent = 'Không truy cập được microphone — dùng nút “Nghe câu tiếp”.';
      stopShadowListening();
    }
  }

  function setPlayIcon(isPlaying) {
    playBtn.innerHTML = `<i data-lucide="${isPlaying ? 'square' : 'play'}" class="w-5 h-5 ${isPlaying ? 'fill-white' : 'ml-0.5'}"></i>`;
    playBtn.setAttribute('aria-label', isPlaying ? 'Dừng bài nghe' : 'Phát bài nghe');
    lucide.createIcons();
  }

  function prepareTimeline(preserveTime = false) {
    const previousTime = listening.currentTime;
    listening.lines = (state.currentUnit?.transcript || '')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    listening.durations = listening.lines.map(line => {
      const spoken = line.includes(':') ? line.split(':').slice(1).join(':') : line;
      return Math.max(2.5, spoken.trim().split(/\s+/).length / 2.25);
    });
    listening.starts = [];
    listening.total = listening.durations.reduce((sum, duration) => {
      listening.starts.push(sum);
      return sum + duration;
    }, 0);
    listening.currentTime = preserveTime ? Math.min(previousTime, listening.total) : 0;
    listening.currentLine = lineAtTime(listening.currentTime);
    listening.bookmarks = [];
    renderListeningState();
    renderBookmarks();
  }

  function lineAtTime(time) {
    if (!listening.lines.length) return 0;
    const index = listening.starts.findLastIndex(start => start <= time);
    return Math.max(0, Math.min(index, listening.lines.length - 1));
  }

  function renderListeningState() {
    const time = document.getElementById('time-display');
    const active = document.getElementById('active-sentence');
    if(time) time.textContent = `${formatAudioTime(listening.currentTime)} / ${formatAudioTime(listening.total)}`;
    if(progress) {
      progress.max = listening.total || 1;
      progress.value = listening.currentTime;
    }
    if(active && listening.lines.length) {
      active.classList.toggle('hidden', !listening.shadowing);
      active.innerHTML = `<span class="font-semibold">Câu ${listening.currentLine + 1}/${listening.lines.length}:</span> ${escapeHtml(listening.lines[listening.currentLine])}`;
    }
    document.querySelectorAll('.transcript-line').forEach((line, index) => {
      line.classList.toggle('bg-indigo-100', index === listening.currentLine);
      line.classList.toggle('ring-1', index === listening.currentLine);
      line.classList.toggle('ring-indigo-200', index === listening.currentLine);
    });
  }

  function stopPlayback() {
    cancelActiveVoice();
    stopShadowListening();
    listening.playing = false;
    listening.waitingForRepeat = false;
    document.getElementById('shadowing-prompt')?.classList.add('hidden');
    setPlayIcon(false);
  }

  function finishCurrentLine() {
    listening.currentTime = listening.starts[listening.currentLine] + listening.durations[listening.currentLine];
    renderListeningState();
    if (listening.shadowing) {
      listening.waitingForRepeat = true;
      listening.playing = false;
      setPlayIcon(false);
      document.getElementById('shadowing-prompt')?.classList.remove('hidden');
      startShadowListening();
    } else {
      listening.currentLine++;
      speakCurrentLine();
    }
  }

  function speakWithBrowserFallback(text, profile, requestedRate, indicator, token) {
    if(token !== kiraPlaybackToken) return;
    const utterance = createNaturalUtterance(text, profile, requestedRate);
    if(indicator) {
      indicator.textContent = `${profile.speaker} · ${profile.label} ${utterance.characterVariant.castNumber} · ${voiceAccentLabel(utterance.voice)} · Dự phòng`;
      indicator.classList.remove('hidden');
    }
    const startedAt = performance.now();
    const startTime = listening.starts[listening.currentLine];
    const timer = setInterval(() => {
      if (!listening.playing || listening.waitingForRepeat || token !== kiraPlaybackToken) return clearInterval(timer);
      const elapsed = ((performance.now() - startedAt) / 1000) * utterance.rate;
      listening.currentTime = Math.min(startTime + elapsed, startTime + listening.durations[listening.currentLine]);
      renderListeningState();
    }, 200);
    utterance.onend = () => {
      clearInterval(timer);
      if(token === kiraPlaybackToken) finishCurrentLine();
    };
    utterance.onerror = () => {
      clearInterval(timer);
      if(token === kiraPlaybackToken) stopPlayback();
    };
    window.speechSynthesis.speak(utterance);
  }

  async function speakCurrentLine() {
    if (!listening.lines.length || listening.currentLine >= listening.lines.length) {
      completeListeningSession();
      stopPlayback();
      listening.currentTime = listening.total;
      renderListeningState();
      return;
    }
    const line = listening.lines[listening.currentLine];
    const text = line.includes(':') ? line.split(':').slice(1).join(':').trim() : line;
    const profile = getSpeakerProfile(line);
    resetVoiceCastIfNeeded();
    if(!speakerVariantAssignments.has(profile.key)) {
      createNaturalUtterance(text, profile, parseFloat(speedSelect?.value || '1'));
    }
    const variant = speakerVariantAssignments.get(profile.key);
    const requestedRate = parseFloat(speedSelect?.value || '1');
    const kiraVoice = selectKiraVoice(profile);
    const token = ++kiraPlaybackToken;
    const indicator = document.getElementById('voice-profile-indicator');
    if(!isAiVoiceEnabled()) {
      listening.playing = true;
      setPlayIcon(true);
      renderListeningState();
      speakWithBrowserFallback(text, profile, requestedRate, indicator, token);
      return;
    }
    if(indicator) {
      indicator.textContent = `${profile.speaker} · ${profile.label} ${variant.castNumber} · OpenAI ${kiraVoice.openai} → Kira ${kiraVoice.kira} · Đang tạo…`;
      indicator.classList.remove('hidden');
    }
    listening.playing = true;
    setPlayIcon(true);
    renderListeningState();

    try {
      const response = await fetch('/api/audio/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: text,
          model: 'kira-3.0-flash-tts',
          voice: kiraVoice.openai
        })
      });
      if(!response.ok) throw new Error((await response.json().catch(() => null))?.error || 'Kira TTS không phản hồi.');
      const blob = await response.blob();
      if(token !== kiraPlaybackToken) return;
      const audioUrl = URL.createObjectURL(blob);
      kiraAudio = new Audio(audioUrl);
      kiraAudio.playbackRate = Math.max(0.8, Math.min(1.5, requestedRate));
      kiraAudio.preservesPitch = true;
      if(indicator) indicator.textContent = `${profile.speaker} · ${profile.label} ${variant.castNumber} · OpenAI ${kiraVoice.openai} → Kira ${kiraVoice.kira}`;
      const startTime = listening.starts[listening.currentLine];
      const timer = setInterval(() => {
        if(!kiraAudio || token !== kiraPlaybackToken) return clearInterval(timer);
        listening.currentTime = Math.min(
          startTime + kiraAudio.currentTime * kiraAudio.playbackRate,
          startTime + listening.durations[listening.currentLine]
        );
        renderListeningState();
      }, 160);
      kiraAudio.onended = () => {
        clearInterval(timer);
        URL.revokeObjectURL(audioUrl);
        kiraAudio = null;
        if(token === kiraPlaybackToken) finishCurrentLine();
      };
      kiraAudio.onerror = () => {
        clearInterval(timer);
        URL.revokeObjectURL(audioUrl);
        kiraAudio = null;
        speakWithBrowserFallback(text, profile, requestedRate, indicator, token);
      };
      await kiraAudio.play();
    } catch {
      if(token === kiraPlaybackToken) {
        speakWithBrowserFallback(text, profile, requestedRate, indicator, token);
      }
    }
  }

  function seekTo(time) {
    const shouldResume = listening.playing;
    cancelActiveVoice();
    stopShadowListening();
    listening.currentTime = Math.max(0, Math.min(time, listening.total));
    listening.currentLine = lineAtTime(listening.currentTime);
    listening.waitingForRepeat = false;
    document.getElementById('shadowing-prompt')?.classList.add('hidden');
    renderListeningState();
    if (shouldResume) {
      listening.playing = true;
      speakCurrentLine();
    }
    else setPlayIcon(false);
  }

  function renderBookmarks() {
    const container = document.getElementById('audio-bookmarks');
    if(!container) return;
    container.classList.toggle('hidden', listening.bookmarks.length === 0);
    container.innerHTML = listening.bookmarks.map((bookmark, index) => `
      <button class="bookmark-chip px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold hover:bg-amber-100" data-time="${bookmark.time}">
        <i data-lucide="bookmark" class="w-3 h-3 inline mr-1"></i>Mốc ${index + 1} · ${formatAudioTime(bookmark.time)}
      </button>
    `).join('');
    container.querySelectorAll('.bookmark-chip').forEach(button => {
      button.addEventListener('click', () => seekTo(Number(button.dataset.time)));
    });
    lucide.createIcons();
  }

  playBtn.addEventListener('click', () => {
    if(!listening.lines.length) prepareTimeline();
    if (listening.playing || listening.waitingForRepeat) return stopPlayback();
    if (listening.currentTime >= listening.total) seekTo(0);
    speakCurrentLine();
  });
  rewindBtn?.addEventListener('click', () => seekTo(listening.currentTime - 5));
  forwardBtn?.addEventListener('click', () => seekTo(listening.currentTime + 10));
  progress?.addEventListener('input', () => seekTo(Number(progress.value)));
  speedSelect?.addEventListener('change', () => {
    if(listening.playing) {
      cancelActiveVoice();
      speakCurrentLine();
    }
  });
  if(aiVoiceToggle) {
    aiVoiceToggle.checked = localStorage.getItem('listening_ai_voice_enabled') !== 'false';
    renderAiVoiceToggle();
    aiVoiceToggle.addEventListener('change', () => {
      localStorage.setItem('listening_ai_voice_enabled', String(aiVoiceToggle.checked));
      renderAiVoiceToggle();
      const wasPlaying = listening.playing;
      cancelActiveVoice();
      if(wasPlaying) {
        listening.playing = true;
        speakCurrentLine();
      } else {
        const indicator = document.getElementById('voice-profile-indicator');
        if(indicator) {
          indicator.textContent = aiVoiceToggle.checked
            ? 'Giọng AI đã bật · OpenAI → Kira'
            : 'Giọng trình duyệt đã bật';
          indicator.classList.remove('hidden');
        }
      }
    });
  }
  shadowingBtn?.addEventListener('click', () => {
    listening.shadowing = !listening.shadowing;
    shadowingBtn.textContent = `Shadowing: ${listening.shadowing ? 'Bật' : 'Tắt'}`;
    shadowingBtn.classList.toggle('bg-indigo-600', listening.shadowing);
    shadowingBtn.classList.toggle('text-white', listening.shadowing);
    shadowingBtn.setAttribute('aria-pressed', String(listening.shadowing));
    if(!listening.shadowing) {
      stopShadowListening();
      listening.waitingForRepeat = false;
      document.getElementById('shadowing-prompt')?.classList.add('hidden');
    }
    renderListeningState();
  });
  continueBtn?.addEventListener('click', () => {
    stopShadowListening();
    listening.waitingForRepeat = false;
    document.getElementById('shadowing-prompt')?.classList.add('hidden');
    listening.currentLine++;
    speakCurrentLine();
  });
  autoShadowToggle?.addEventListener('change', () => {
    if(autoShadowToggle.checked && listening.waitingForRepeat) startShadowListening();
    else stopShadowListening();
  });
  bookmarkBtn?.addEventListener('click', () => {
    if(!listening.lines.length) prepareTimeline();
    const duplicate = listening.bookmarks.some(bookmark => Math.abs(bookmark.time - listening.currentTime) < 1);
    if(!duplicate) {
      listening.bookmarks.push({ time: listening.currentTime });
      listening.bookmarks.sort((a, b) => a.time - b.time);
      renderBookmarks();
    }
  });
  window.prepareListeningTimeline = prepareTimeline;
  refreshEnglishVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshEnglishVoices);
  window.getNaturalEnglishVoice = (gender = 'neutral') => selectNaturalVoice({ gender, key: null });
}

function formatAudioTime(seconds) {
  const safe = Math.max(0, Math.round(seconds || 0));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}


function initWebAudioAPI() {
  const recordBtn = document.getElementById('record-btn');
  const recordIcon = document.getElementById('record-icon');
  const recordingTime = document.getElementById('record-timer');
  const resultDiv = document.getElementById('preview-container');
  const audioPlayback = document.getElementById('preview-player');
  const aiEvalBtn = document.getElementById('ai-evaluate-btn');
  const retryBtn = document.getElementById('retry-btn');
  const liveCanvas = document.getElementById('live-waveform-canvas');
  const limitSelect = document.getElementById('record-limit-select');
  
  if(!recordBtn) return;
  
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;
  let timerInterval;
  let startTime;
  let animationFrame;
  let audioContext;
  let activeStream;
  let recordingLimit = Number(limitSelect?.value || 60);

  function resetDraft({ keepPrompt = true } = {}) {
    if(state.audioUrl) URL.revokeObjectURL(state.audioUrl);
    state.audioUrl = null;
    state.audioBlob = null;
    state.lastAiEvaluation = null;
    audioPlayback.removeAttribute('src');
    resultDiv.classList.add('hidden');
    retryBtn?.classList.add('hidden');
    document.getElementById('submit-audio-btn')?.classList.add('hidden');
    aiEvalBtn?.classList.add('hidden');
    document.getElementById('ai-feedback-container')?.classList.add('hidden');
    document.getElementById('waveform-canvas')?.classList.add('hidden');
    if(!keepPrompt) document.getElementById('transcript-draft-text').textContent = 'Dừng ghi âm để tự động phiên âm.';
  }

  function stopLiveWaveform() {
    if(animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    liveCanvas?.classList.add('hidden');
    document.getElementById('wave-container')?.classList.remove('hidden');
    if(audioContext && audioContext.state !== 'closed') audioContext.close().catch(() => {});
    audioContext = null;
  }

  function startLiveWaveform(stream) {
    if(!liveCanvas) return;
    const CanvasAudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new CanvasAudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.75;
    audioContext.createMediaStreamSource(stream).connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    const ctx = liveCanvas.getContext('2d');
    liveCanvas.classList.remove('hidden');
    document.getElementById('wave-container')?.classList.add('hidden');

    const draw = () => {
      analyser.getByteTimeDomainData(data);
      ctx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, liveCanvas.width, liveCanvas.height);
      const gradient = ctx.createLinearGradient(0, 0, liveCanvas.width, 0);
      gradient.addColorStop(0, '#818cf8');
      gradient.addColorStop(0.5, '#22d3ee');
      gradient.addColorStop(1, '#34d399');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = index * liveCanvas.width / (data.length - 1);
        const y = value / 255 * liveCanvas.height;
        if(index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      animationFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  async function transcribeDraft(blob) {
    const transcriptText = document.getElementById('transcript-draft-text');
    transcriptText.innerHTML = '<span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin"></span>AI đang nhận diện giọng nói…</span>';
    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');
    formData.append('prompt', document.getElementById('student-speaking-prompt').textContent);
    try {
      const response = await fetch('/api/evaluate-speaking', { method: 'POST', body: formData });
      const data = await response.json();
      if(!response.ok) throw new Error(data.error || 'Không thể phiên âm.');
      if(state.audioBlob !== blob) return;
      state.lastAiEvaluation = { blob, data };
      transcriptText.innerHTML = data.transcribedText
        ? `<span class="text-slate-800">“${escapeHtml(data.transcribedText)}”</span>`
        : '<span class="text-amber-700">AI chưa nhận diện được nội dung. Bạn có thể thu lại.</span>';
    } catch(error) {
      if(state.audioBlob !== blob) return;
      transcriptText.innerHTML = `<span class="text-rose-600">${escapeHtml(error.message || 'Phiên âm thất bại. Bạn có thể thu lại.')}</span>`;
    }
  }

  limitSelect?.addEventListener('change', () => {
    recordingLimit = Number(limitSelect.value);
    if(!isRecording) recordingTime.textContent = formatAudioTime(recordingLimit);
  });
  
  recordBtn.addEventListener('click', async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorder.stop();
      isRecording = false;
      recordBtn.classList.remove('animate-pulse', 'bg-rose-500', 'shadow-rose-300');
      recordBtn.classList.add('bg-rose-500');
      recordBtn.innerHTML = '<i data-lucide="mic" id="record-icon" class="w-7 h-7 group-hover:scale-110 transition-transform"></i>';
      clearInterval(timerInterval);
      stopLiveWaveform();
      lucide.createIcons();
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true } });
        activeStream = stream;
        resetDraft({ keepPrompt: false });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        const waveformCanvas = document.getElementById('waveform-canvas');
        if (waveformCanvas) waveformCanvas.classList.add('hidden');
        
        mediaRecorder.ondataavailable = e => {
          if(e.data.size > 0) audioChunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          state.audioBlob = audioBlob;
          state.lastAiEvaluation = null;
          if(state.audioUrl) URL.revokeObjectURL(state.audioUrl);
          const audioUrl = URL.createObjectURL(audioBlob);
          state.audioUrl = audioUrl;
          
          audioPlayback.src = audioUrl;
          resultDiv.classList.remove('hidden');
          if(aiEvalBtn) aiEvalBtn.classList.remove('hidden');
          retryBtn?.classList.remove('hidden');
          const submitBtn = document.getElementById('submit-audio-btn');
          if(submitBtn) submitBtn.classList.remove('hidden');
          document.getElementById('ai-feedback-container').classList.add('hidden');
          drawWaveform(audioUrl);
          transcribeDraft(audioBlob);
          
          // clean up tracks
          stream.getTracks().forEach(track => track.stop());
          activeStream = null;
        };
        
        mediaRecorder.start();
        isRecording = true;
        recordBtn.classList.add('animate-pulse', 'shadow-rose-300');
        recordBtn.innerHTML = '<i data-lucide="square" id="record-icon" class="w-7 h-7 group-hover:scale-110 transition-transform"></i>';
        lucide.createIcons();
        recordingLimit = Number(limitSelect?.value || 60);
        recordingTime.textContent = formatAudioTime(recordingLimit);
        startLiveWaveform(stream);
        
        startTime = Date.now();
        timerInterval = setInterval(() => {
           const elapsed = Math.floor((Date.now() - startTime)/1000);
           const remaining = Math.max(0, recordingLimit - elapsed);
           recordingTime.textContent = formatAudioTime(remaining);
           recordingTime.classList.toggle('text-rose-600', remaining <= 10);
           if (remaining <= 0) {
              recordBtn.click();
           }
        }, 250);
        
      } catch(err) {
        alert('Không thể truy cập Microphone. Vui lòng cấp quyền.');
      }
    }
  });

  retryBtn?.addEventListener('click', () => {
    if(isRecording) return;
    resetDraft({ keepPrompt: false });
    recordingTime.textContent = formatAudioTime(Number(limitSelect?.value || 60));
    recordingTime.classList.remove('text-rose-600');
    recordBtn.focus();
  });

  document.getElementById('close-feedback-modal')?.addEventListener('click', () => {
    document.getElementById('feedback-modal').classList.add('hidden');
    document.getElementById('feedback-modal').classList.remove('flex');
    document.getElementById('feedback-audio-player').pause();
  });
  
  document.getElementById('btn-close-feedback')?.addEventListener('click', () => {
    document.getElementById('feedback-modal').classList.add('hidden');
    document.getElementById('feedback-modal').classList.remove('flex');
    document.getElementById('feedback-audio-player').pause();
  });

  document.getElementById('submit-audio-btn').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if(!state.audioUrl) return;
    
    btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang nộp...';
    lucide.createIcons();
    btn.disabled = true;
    
    await new Promise(r => setTimeout(r, 1000));
    
    const currentUnitTitle = document.getElementById('student-unit-title').textContent || 'Speaking Practice';
    mockDB.submissions.push({
      id: 's' + Date.now(),
      student_id: state.currentUser.id,
      student_name: state.currentUser.full_name,
      class_name: state.currentUser.class_name,
      unit_title: currentUnitTitle,
      audio_url: state.audioUrl,
      status: 'pending',
      score: null
    });
    awardXP(50, 'Nộp bài luyện nói', 'speaking_submitted');
    saveDB();
    if(typeof renderStudentSubmissions === 'function') renderStudentSubmissions();
    
    alert('Nộp bài thành công! Vui lòng chờ giáo viên chấm điểm.');
    resultDiv.classList.add('hidden');
    if(aiEvalBtn) aiEvalBtn.classList.add('hidden');
    btn.classList.add('hidden');
    btn.innerHTML = '<i data-lucide="rocket" class="w-4 h-4 mr-2"></i> Nộp Bài Thu Âm';
    btn.disabled = false;
    document.getElementById('ai-feedback-container').classList.add('hidden');
    recordingTime.textContent = '00:00';
    state.audioUrl = null;
    state.audioBlob = null;
    const waveformCanvas = document.getElementById('waveform-canvas');
    if (waveformCanvas) waveformCanvas.classList.add('hidden');
    
    btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Nộp bài cho Giáo viên';
    lucide.createIcons();
    btn.disabled = false;
  });
  
  // AI Evaluate Button
  if(aiEvalBtn) {
    aiEvalBtn.addEventListener('click', async () => {
       if(!state.audioBlob) return;
       
       aiEvalBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> AI đang phân tích...';
       aiEvalBtn.disabled = true;
       lucide.createIcons();
       
       try {
          let data;
          if(state.lastAiEvaluation?.blob === state.audioBlob) {
             data = state.lastAiEvaluation.data;
          } else {
             const formData = new FormData();
             formData.append('audio', state.audioBlob, 'recording.webm');
             formData.append('prompt', document.getElementById('student-speaking-prompt').textContent);
             const res = await fetch('/api/evaluate-speaking', {
                method: 'POST',
                body: formData
             });
             data = await res.json();
             if (!res.ok) {
                console.error("API Error:", data.details);
                throw new Error(data.error || "Lỗi không xác định khi kết nối với máy chủ.");
             }
             state.lastAiEvaluation = { blob: state.audioBlob, data };
          }
          document.getElementById('ai-feedback-container').classList.remove('hidden');
          document.getElementById('ai-score').textContent = data.score + '/100';
          
          const wordFeedbackDiv = document.getElementById('ai-word-feedback');
          if (wordFeedbackDiv) {
             if (data.words && Array.isArray(data.words)) {
                wordFeedbackDiv.innerHTML = data.words.map(w => {
                   let colorClass = 'text-slate-600 bg-slate-100 border-slate-200';
                   let title = `Confidence: ${w.confidence}%`;
                   
                   if (w.confidence >= 80) {
                      colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
                   } else if (w.confidence >= 60) {
                      colorClass = 'text-amber-700 bg-amber-50 border-amber-200';
                   } else {
                      colorClass = 'text-rose-700 bg-rose-50 border-rose-200 font-bold';
                   }
                   
                   return `<span class="px-2 py-0.5 rounded border ${colorClass}" title="${title}">${w.word}</span>`;
                }).join('');
             } else {
                wordFeedbackDiv.innerHTML = '';
             }
          }
          
          document.getElementById('ai-feedback-text').innerHTML = '<p class="mt-2 text-xs italic text-slate-400">Transcribed: "' + (data.transcribedText || '') + '"</p>';
          const criteriaDiv = document.getElementById('ai-criteria-feedback');
          if (criteriaDiv) {
             if (data.criteria) {
                 criteriaDiv.classList.remove('hidden');
                 document.getElementById('ai-feedback-fluency').textContent = data.criteria.fluency || 'Không có dữ liệu';
                 document.getElementById('ai-feedback-lexical').textContent = data.criteria.lexical || 'Không có dữ liệu';
                 document.getElementById('ai-feedback-grammar').textContent = data.criteria.grammar || 'Không có dữ liệu';
                 document.getElementById('ai-feedback-pronunciation').textContent = data.criteria.pronunciation || 'Không có dữ liệu';
                 document.getElementById('ai-feedback-advice').textContent = data.advice || 'Không có dữ liệu';
             } else {
                 criteriaDiv.classList.add('hidden');
             }
          }
       } catch (err) {
          alert(err.message);
       } finally {
          aiEvalBtn.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> Tự Đánh Giá AI (Chấm điểm)';
          aiEvalBtn.disabled = false;
          lucide.createIcons();
       }
    });
  }
}

// Additional Modal Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Dict Modal
  const dictModal = document.getElementById('dictionary-modal');
  document.querySelectorAll('.close-dict').forEach(btn => {
     btn.addEventListener('click', () => {
        if(dictModal) {
           dictModal.classList.add('hidden');
           dictModal.classList.remove('flex');
        }
     });
  });

  // Group Room Modal
  const groupModal = document.getElementById('group-room-modal');
  const btnGroup = document.getElementById('btn-group-speaking');
  if(btnGroup) {
     btnGroup.addEventListener('click', () => {
        if(groupModal) {
           groupModal.classList.remove('hidden');
           groupModal.classList.add('flex');
        }
     });
  }
  document.querySelectorAll('.close-group').forEach(btn => {
     btn.addEventListener('click', () => {
        if(groupModal) {
           groupModal.classList.add('hidden');
           groupModal.classList.remove('flex');
           
           // Reset state for next open
           const youSpan = groupModal.querySelector('.text-emerald-500.font-medium');
           if(youSpan) youSpan.textContent = 'Đang kết nối...';
           
           const partnerSpan = groupModal.querySelector('.text-indigo-600.font-bold');
           if(partnerSpan) {
              partnerSpan.textContent = 'Chờ ghép cặp...';
              partnerSpan.classList.replace('text-indigo-600', 'text-slate-500');
           }
           
           const userPlusIcon = groupModal.querySelector('.w-12.h-12.bg-indigo-100');
           if(userPlusIcon) {
              userPlusIcon.classList.replace('bg-indigo-100', 'bg-slate-200');
              userPlusIcon.innerHTML = '<i data-lucide="user-plus" class="w-5 h-5 text-slate-400"></i>';
              lucide.createIcons();
           }
           
           const groupRecordBtn = document.getElementById('group-record-btn');
           if(groupRecordBtn) {
              groupRecordBtn.classList.add('opacity-50', 'cursor-not-allowed');
              groupRecordBtn.classList.remove('animate-pulse', 'bg-rose-600');
              groupRecordBtn.innerHTML = '<i data-lucide="mic" class="w-6 h-6"></i>';
              lucide.createIcons();
           }
        }
     });
  });
  
  // Next Quiz Button
  const btnNextQuiz = document.getElementById('btn-next-quiz');
  if(btnNextQuiz) {
     btnNextQuiz.addEventListener('click', () => {
        state.currentQuizIndex++;
        if(state.currentQuizIndex < state.quizzes.length) {
           renderQuizQuestion();
        }
     });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // Group Room Interaction
  const groupRecordBtn = document.getElementById('group-record-btn');
  if(groupRecordBtn) {
    let groupRecording = false;
    groupRecordBtn.addEventListener('click', () => {
       // Enable interaction
       if(!groupRecordBtn.classList.contains('cursor-not-allowed')) {
          if(!groupRecording) {
             groupRecordBtn.classList.add('animate-pulse', 'bg-rose-600');
             groupRecordBtn.innerHTML = '<i data-lucide="square" class="w-6 h-6"></i>';
             groupRecording = true;
          } else {
             groupRecordBtn.classList.remove('animate-pulse', 'bg-rose-600');
             groupRecordBtn.innerHTML = '<i data-lucide="mic" class="w-6 h-6"></i>';
             groupRecording = false;
             alert('Đã lưu bản ghi âm nhóm thành công!');
          }
          lucide.createIcons();
       }
    });
    
    // Auto-enable after 3 seconds when opened
    const groupModal = document.getElementById('group-room-modal');
    const observer = new MutationObserver((mutations) => {
       mutations.forEach((mutation) => {
          if (mutation.target.classList.contains('flex')) {
             // Mock peer connection
             // Simulate You connecting
             setTimeout(() => {
                const youSpan = mutation.target.querySelector('.text-emerald-500.font-medium');
                if(youSpan && youSpan.textContent === 'Đang kết nối...') {
                   youSpan.textContent = 'Đã kết nối';
                }
             }, 1000);

             // Simulate Partner connecting
             setTimeout(() => {
                const partnerSpan = mutation.target.querySelector('.text-slate-500.font-bold');
                if(partnerSpan && partnerSpan.textContent === 'Chờ ghép cặp...') {
                   partnerSpan.textContent = 'Bạn học (Đã kết nối)';
                   partnerSpan.classList.replace('text-slate-500', 'text-indigo-600');
                   const userPlusIcon = mutation.target.querySelector('.w-12.h-12.bg-slate-200');
                   if(userPlusIcon) {
                      userPlusIcon.classList.replace('bg-slate-200', 'bg-indigo-100');
                      userPlusIcon.innerHTML = '<img src="https://api.dicebear.com/7.x/notionists/svg?seed=Friend" class="w-full h-full rounded-full">';
                   }
                   groupRecordBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
             }, 3000);
          }
       });
    });
    
    if(groupModal) {
       observer.observe(groupModal, { attributes: true, attributeFilter: ['class'] });
    }
  }
});

function initQuiz() {} // Remains empty since quiz is now handled by initQuizOptions

function renderTeacherSubmissions() {
  const tbody = document.getElementById('teacher-submissions-list');
  if(!tbody) return;
  
  const pending = mockDB.submissions.filter(s => s.status === 'pending');
  const graded = mockDB.submissions.filter(s => s.status === 'graded');
  
  document.getElementById('teacher-stat-pending').innerHTML = pending.length + ' <span class="text-sm font-normal text-slate-500">bài</span>';
  document.getElementById('teacher-stat-graded').innerHTML = graded.length + ' <span class="text-sm font-normal text-slate-500">bài</span>';

  const filter = document.getElementById('teacher-submission-filter')?.value || 'all';
  const submissions = filter === 'all'
    ? mockDB.submissions
    : mockDB.submissions.filter(s => s.status === filter);

  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-500">Chưa có bài nộp nào</td></tr>';
    return;
  }

  tbody.innerHTML = submissions.map(sub => {
    return `
      <tr class="hover:bg-slate-50 transition-colors group">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
              ${sub.student_name.charAt(0)}
            </div>
            <div>
              <p class="font-medium text-slate-900">${sub.student_name}</p>
              <p class="text-xs text-slate-500">Lớp: ${sub.class_name}</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-4">
          <p class="font-medium text-slate-800 line-clamp-1">${sub.unit_title}</p>
        </td>
        <td class="px-6 py-4">
          <audio controls src="${sub.audio_url}" class="h-8 w-32"></audio>
        </td>
        <td class="px-6 py-4 text-center">
          ${sub.status === 'pending' 
             ? '<span class="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">Chờ chấm</span>'
             : `<span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">Đã chấm (${sub.score}/10)</span>`
          }
        </td>
        <td class="px-6 py-4 text-right">
          ${sub.status === 'pending'
             ? `<button onclick="openGradingModal('${sub.id}')" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-medium transition-colors">Chấm điểm</button>`
             : '<span class="text-xs text-slate-400">Hoàn tất</span>'
          }
        </td>
      </tr>
    `;
  }).join('');
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadLessonAudio(file) {
  const form = new FormData();
  form.append('audio', file, file.name);
  const response = await fetch('/api/teacher/audio-upload', { method: 'POST', body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Không thể tải MP3 lên Supabase.');
  return data.url;
}

function renderTeacherAssignments() {
  const list = document.getElementById('teacher-assignment-list');
  if(!list) return;
  if(!mockDB.assignments.length) {
    list.innerHTML = '<p class="text-sm text-center text-slate-500 py-6">Chưa có bài tập trong ngân hàng đề.</p>';
    return;
  }
  list.innerHTML = [...mockDB.assignments].reverse().map(item => `
    <article class="rounded-xl border border-slate-200 p-4 hover:border-indigo-200 transition-colors">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold">Khối ${item.grade}</span>
            <span class="text-[11px] font-medium ${item.audio_url ? 'text-emerald-600' : 'text-amber-600'}">${escapeHtml(item.audio_status || '')}</span>
          </div>
          <h4 class="font-bold text-slate-800">${escapeHtml(item.title)}</h4>
          <p class="text-xs text-slate-500 mt-1">${escapeHtml(item.question)}</p>
        </div>
        <i data-lucide="file-audio" class="w-5 h-5 text-indigo-400 shrink-0"></i>
      </div>
      ${item.audio_url ? `<audio controls src="${item.audio_url}" class="w-full h-8 mt-3"></audio>` : ''}
      <div class="mt-3 p-3 rounded-lg bg-slate-50 text-xs text-slate-600">
        <strong>Speaking:</strong> ${escapeHtml(item.speakingPrompt || 'Chưa có gợi ý')}
      </div>
    </article>
  `).join('');
  lucide.createIcons();
}

function downloadCsv(filename, rows) {
  const csv = '\ufeff' + rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderTeacherClasses() {
  const list = document.getElementById('teacher-class-list');
  if(!list) return;
  const teacherId = state.currentUser?.role === 'teacher' ? state.currentUser.id : 'u3';
  const classes = mockDB.classes.filter(item => item.teacher_id === teacherId);
  list.innerHTML = classes.map(item => {
    const students = mockDB.users.filter(user => user.role === 'student' && user.class_name === item.name);
    const latestAssignment = mockDB.assignments.at(-1);
    const missing = students.filter(student => !mockDB.submissions.some(sub =>
      sub.student_id === student.id && (!latestAssignment || sub.unit_title === latestAssignment.title)
    ));
    return `
      <article class="rounded-xl border border-slate-200 p-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h4 class="font-bold text-slate-800">Lớp ${escapeHtml(item.name)}</h4>
            <p class="text-xs text-slate-500">${students.length} học sinh · ${missing.length} chưa nộp bài gần nhất</p>
          </div>
          <span class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-mono text-sm font-bold">${escapeHtml(item.code)}</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          <button onclick="regenerateClassCode('${item.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">Tạo mã mới</button>
          <button onclick="exportMissingStudents('${item.id}')" class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold hover:bg-amber-100">Xuất DS chưa nộp</button>
        </div>
      </article>
    `;
  }).join('');
}

window.regenerateClassCode = function(classId) {
  const item = mockDB.classes.find(entry => entry.id === classId);
  if(!item) return;
  item.code = `CVA${item.name.replace(/\s/g, '')}${Math.floor(100 + Math.random() * 900)}`.toUpperCase();
  saveDB();
  renderTeacherClasses();
};

window.exportMissingStudents = function(classId) {
  const item = mockDB.classes.find(entry => entry.id === classId);
  if(!item) return;
  const latestAssignment = mockDB.assignments.at(-1);
  const missing = mockDB.users.filter(user =>
    user.role === 'student' &&
    user.class_name === item.name &&
    !mockDB.submissions.some(sub => sub.student_id === user.id && (!latestAssignment || sub.unit_title === latestAssignment.title))
  );
  downloadCsv(`hoc-sinh-chua-nop-${item.name}.csv`, [
    ['STT', 'Họ và tên', 'Lớp', 'Bài tập'],
    ...missing.map((student, index) => [index + 1, student.full_name, item.name, latestAssignment?.title || 'Bài tập gần nhất'])
  ]);
};

function initTeacherWorkspace() {
  const toggle = document.getElementById('toggle-assignment-form');
  const form = document.getElementById('teacher-assignment-form');
  toggle?.addEventListener('click', () => form?.classList.toggle('hidden'));
  document.getElementById('teacher-submission-filter')?.addEventListener('change', renderTeacherSubmissions);
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"], button:not([type])');
    const audioFile = document.getElementById('assignment-audio').files[0];
    if(audioFile && audioFile.size > 10 * 1024 * 1024) {
      alert('File MP3 tối đa 10 MB.');
      return;
    }
    button.disabled = true;
    button.textContent = audioFile ? 'Đang tải MP3...' : 'Đang lưu...';
    let audioUrl = '';
    let audioStatus = 'Chưa có MP3';
    if(audioFile) {
      try {
        audioUrl = await uploadLessonAudio(audioFile);
        audioStatus = 'Đã lưu trên Supabase';
      } catch(error) {
        audioUrl = await fileToDataUrl(audioFile);
        audioStatus = 'Bản nháp cục bộ';
      }
    }
    mockDB.assignments.push({
      id: `assignment-${Date.now()}`,
      grade: Number(document.getElementById('assignment-grade').value),
      title: document.getElementById('assignment-title').value.trim(),
      question: document.getElementById('assignment-question').value.trim(),
      options: document.getElementById('assignment-options').value.split('|').map(value => value.trim()).filter(Boolean),
      correctIndex: 0,
      speakingPrompt: document.getElementById('assignment-speaking-prompt').value.trim(),
      audio_url: audioUrl,
      audio_status: audioStatus,
      created_at: new Date().toISOString()
    });
    saveDB();
    form.reset();
    form.classList.add('hidden');
    button.disabled = false;
    button.textContent = 'Lưu vào ngân hàng đề';
    renderTeacherAssignments();
    renderTeacherClasses();
  });
}

function getAnalyticsData(scope) {
  const analytics = mockDB.analytics;
  const allowedClasses = scope === 'teacher' && state.currentUser?.class_name
    ? state.currentUser.class_name.split(',').map(value => value.trim())
    : null;
  const classCompletion = allowedClasses
    ? analytics.class_completion.filter(item => allowedClasses.includes(item.class_name))
    : analytics.class_completion;
  const atRisk = allowedClasses
    ? analytics.at_risk.filter(item => allowedClasses.includes(item.class_name))
    : analytics.at_risk;
  const gradedScores = mockDB.submissions.filter(item => item.status === 'graded' && Number.isFinite(item.score));
  const averageScore = gradedScores.length
    ? gradedScores.reduce((sum, item) => sum + item.score, 0) / gradedScores.length
    : analytics.unit_performance.reduce((sum, item) => sum + (item.listening + item.speaking) / 2, 0) / analytics.unit_performance.length;
  return { ...analytics, class_completion: classCompletion, at_risk: atRisk, averageScore };
}

function renderAnalyticsDashboard(scope) {
  const root = document.getElementById(`${scope}-analytics`);
  if(!root) return;
  const data = getAnalyticsData(scope);
  const title = scope === 'admin' ? 'Phân tích Cấp trường & Khối' : 'Báo cáo Tiến độ Học sinh';
  const listeningHours = (data.listening_minutes / 60).toFixed(1);
  const maxPractice = Math.max(...data.unit_performance.map(item => item.practice), 1);
  root.innerHTML = `
    <div class="rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 p-6 text-white shadow-lg overflow-hidden relative">
      <div class="absolute -right-12 -top-16 w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl"></div>
      <div class="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-[0.18em]">Analytics & Dashboard</p>
          <h2 class="text-2xl font-bold mt-1">${title}</h2>
          <p class="text-sm text-slate-300 mt-1">Dữ liệu Nghe – Nói được tổng hợp tự động theo Unit, lớp và khối.</p>
        </div>
        <button onclick="exportAnalyticsExcel('${scope}')" class="shrink-0 px-4 py-2.5 rounded-xl bg-white text-indigo-800 font-bold text-sm hover:bg-indigo-50 flex items-center gap-2">
          <i data-lucide="file-spreadsheet" class="w-4 h-4"></i> Xuất báo cáo Excel
        </button>
      </div>
      <div class="relative grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <div class="rounded-xl bg-white/10 border border-white/10 p-4"><p class="text-xs text-slate-300">Lượt thu âm</p><p class="text-2xl font-bold mt-1">${data.recording_count}</p></div>
        <div class="rounded-xl bg-white/10 border border-white/10 p-4"><p class="text-xs text-slate-300">Giờ luyện nghe</p><p class="text-2xl font-bold mt-1">${listeningHours}<span class="text-sm font-medium ml-1">giờ</span></p></div>
        <div class="rounded-xl bg-white/10 border border-white/10 p-4"><p class="text-xs text-slate-300">Điểm TB Nghe – Nói</p><p class="text-2xl font-bold mt-1">${data.averageScore.toFixed(1)}<span class="text-sm font-medium">/10</span></p></div>
        <div class="rounded-xl bg-rose-500/20 border border-rose-300/20 p-4"><p class="text-xs text-rose-100">Cần can thiệp</p><p class="text-2xl font-bold mt-1">${data.at_risk.length}<span class="text-sm font-medium ml-1">học sinh</span></p></div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">
      <article class="xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div class="flex items-center justify-between mb-5">
          <div><h3 class="font-bold text-slate-900">Hiệu quả theo từng Unit</h3><p class="text-xs text-slate-500 mt-1">Điểm trung bình Nghe – Nói và tần suất luyện tập</p></div>
          <div class="flex gap-3 text-[11px] font-semibold"><span class="text-indigo-600">● Nghe</span><span class="text-emerald-600">● Nói</span></div>
        </div>
        <div class="h-48 flex items-end gap-3 sm:gap-5 border-b border-slate-200">
          ${data.unit_performance.map(item => `
            <div class="flex-1 h-full flex flex-col justify-end items-center gap-1 group">
              <div class="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100">${item.listening}/${item.speaking}</div>
              <div class="w-full max-w-12 flex items-end justify-center gap-1 h-32">
                <div class="w-2/5 rounded-t bg-indigo-500" style="height:${item.listening * 10}%"></div>
                <div class="w-2/5 rounded-t bg-emerald-500" style="height:${item.speaking * 10}%"></div>
              </div>
              <span class="text-[11px] font-semibold text-slate-600 pb-2">${escapeHtml(item.unit)}</span>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 space-y-2">
          ${data.unit_performance.map(item => `
            <div class="grid grid-cols-[52px_1fr_38px] items-center gap-3 text-xs">
              <span class="font-medium text-slate-600">${escapeHtml(item.unit)}</span>
              <div class="h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full bg-amber-400" style="width:${item.practice / maxPractice * 100}%"></div></div>
              <span class="text-right font-bold text-slate-600">${item.practice}%</span>
            </div>
          `).join('')}
        </div>
      </article>

      <article class="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100">
          <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="shield-alert" class="w-5 h-5 text-rose-500"></i> Students at risk</h3>
          <p class="text-xs text-slate-500 mt-1">Phát hiện tự động từ điểm thấp hoặc nộp bài muộn</p>
        </div>
        <div class="divide-y divide-slate-100">
          ${data.at_risk.length ? data.at_risk.map(item => `
            <div class="p-4 flex gap-3">
              <div class="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">${escapeHtml(item.student.charAt(0))}</div>
              <div class="min-w-0 flex-1">
                <div class="flex justify-between gap-2"><p class="font-semibold text-sm text-slate-800 truncate">${escapeHtml(item.student)}</p><span class="text-xs font-bold text-rose-600">${item.average}/10</span></div>
                <p class="text-xs text-slate-500">${escapeHtml(item.class_name)} · ${escapeHtml(item.reason)}</p>
              </div>
            </div>
          `).join('') : '<p class="p-6 text-sm text-center text-emerald-600">Không có học sinh cần can thiệp.</p>'}
        </div>
      </article>
    </div>

    <article class="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 overflow-hidden">
      <div class="p-5 border-b border-slate-100"><h3 class="font-bold text-slate-900">Tỷ lệ hoàn thành theo Lớp / Khối</h3></div>
      <div class="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${data.class_completion.map(item => `
          <div class="rounded-xl border border-slate-200 p-4">
            <div class="flex justify-between text-sm mb-2"><span class="font-bold text-slate-800">${escapeHtml(item.class_name)} · Khối ${item.grade}</span><span class="font-bold ${item.completed < 70 ? 'text-rose-600' : 'text-emerald-600'}">${item.completed}%</span></div>
            <div class="h-2.5 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full ${item.completed < 70 ? 'bg-rose-500' : item.completed < 80 ? 'bg-amber-400' : 'bg-emerald-500'}" style="width:${item.completed}%"></div></div>
          </div>
        `).join('')}
      </div>
    </article>
  `;
  lucide.createIcons();
}

window.exportAnalyticsExcel = function(scope) {
  const data = getAnalyticsData(scope);
  const rows = [
    ['BÁO CÁO PHÂN TÍCH NGHE - NÓI', '', '', '', ''],
    ['Thời điểm xuất', new Date().toLocaleString('vi-VN'), '', '', ''],
    ['Tổng lượt thu âm', data.recording_count, 'Tổng giờ luyện nghe', (data.listening_minutes / 60).toFixed(1), ''],
    [],
    ['HIỆU QUẢ THEO UNIT', 'Điểm Nghe', 'Điểm Nói', 'Tần suất luyện tập (%)', ''],
    ...data.unit_performance.map(item => [item.unit, item.listening, item.speaking, item.practice, '']),
    [],
    ['TỶ LỆ HOÀN THÀNH', 'Khối', 'Hoàn thành (%)', '', ''],
    ...data.class_completion.map(item => [item.class_name, item.grade, item.completed, '', '']),
    [],
    ['HỌC SINH CẦN CAN THIỆP', 'Lớp', 'Điểm TB', 'Số bài muộn', 'Nguyên nhân'],
    ...data.at_risk.map(item => [item.student, item.class_name, item.average, item.late, item.reason])
  ];
  const xmlRows = rows.map((row, rowIndex) => `<Row>${row.map(value => `<Cell${rowIndex === 0 ? ' ss:StyleID="title"' : ''}><Data ss:Type="${typeof value === 'number' ? 'Number' : 'String'}">${escapeHtml(value ?? '')}</Data></Cell>`).join('')}</Row>`).join('');
  const workbook = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Default"><Font ss:FontName="Arial" ss:Size="10"/></Style><Style ss:ID="title"><Font ss:Bold="1" ss:Size="14" ss:Color="#FFFFFF"/><Interior ss:Color="#312E81" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="Analytics"><Table><Column ss:Width="180"/><Column ss:Width="90"/><Column ss:Width="110"/><Column ss:Width="140"/><Column ss:Width="260"/>${xmlRows}</Table></Worksheet></Workbook>`;
  const url = URL.createObjectURL(new Blob([workbook], { type: 'application/vnd.ms-excel' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `bao-cao-analytics-${scope}-${localDateKey()}.xls`;
  anchor.click();
  URL.revokeObjectURL(url);
};

function renderTeacherLeaderboard() {
  const list = document.getElementById('teacher-leaderboard-list');
  if(!list) return;
  
  const students = mockDB.users.filter(u => u.role === 'student').sort((a, b) => b.xp_points - a.xp_points);
  
  list.innerHTML = students.map((s, i) => `
    <li class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full ${i===0?'bg-amber-100 text-amber-600':i===1?'bg-slate-200 text-slate-600':i===2?'bg-orange-100 text-orange-600':'bg-slate-100 text-slate-500'} flex items-center justify-center font-bold text-sm">
          ${i + 1}
        </div>
        <div>
          <p class="font-medium text-slate-900">${s.full_name}</p>
          <p class="text-xs text-slate-500">${s.class_name}</p>
        </div>
      </div>
      <div class="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">
        ${s.xp_points} XP
      </div>
    </li>
  `).join('');
}

function renderAdminDashboard() {
  const usersList = document.getElementById('admin-users-list');
  const unitsList = document.getElementById('admin-units-list');
  
  if (usersList) {
    usersList.innerHTML = mockDB.users.map(u => `
      <div class="flex items-center justify-between p-3 border-b border-slate-100 last:border-0">
        <div>
          <p class="font-medium text-slate-900">${u.full_name} <span class="text-xs text-slate-500 ml-2">(${u.username})</span></p>
          <p class="text-xs text-indigo-600 font-medium">${u.role.toUpperCase()}</p>
        </div>
        <div class="flex gap-2"><button onclick="window.editUser('${u.id}')" class="text-slate-400 hover:text-indigo-500 transition-colors"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="if(confirm('Xóa tài khoản này?')) { window.mockDB.users = window.mockDB.users.filter(x => x.id !== '${u.id}'); window.saveDB(); window.renderAdminDashboard(); }" class="text-slate-400 hover:text-rose-500 transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div>
      </div>
    `).join('');
  }
  
  if (unitsList) {
    unitsList.innerHTML = mockDB.units.map(u => `
      <div class="flex items-center justify-between p-3 border-b border-slate-100 last:border-0">
        <div>
          <p class="font-medium text-slate-900">${u.title}</p>
          <p class="text-xs text-slate-500">Khối ${u.grade}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="window.editUnit('${u.id}')" class="text-slate-400 hover:text-indigo-500 transition-colors"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="if(confirm('Xóa bài học này?')) { window.mockDB.units = window.mockDB.units.filter(x => x.id !== '${u.id}'); window.saveDB(); window.renderAdminDashboard(); }" class="text-slate-400 hover:text-rose-500 transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

const ROLE_META = {
  admin: { label: 'Admin', icon: 'shield', color: 'rose', scope: 'Toàn hệ thống · cấu hình & phân quyền' },
  teacher: { label: 'Teacher', icon: 'presentation', color: 'indigo', scope: 'Lớp phụ trách · bài tập & chấm điểm' },
  student: { label: 'Student', icon: 'graduation-cap', color: 'emerald', scope: 'Học tập · bài nộp và kết quả cá nhân' }
};

function renderAdminRbac() {
  const list = document.getElementById('admin-rbac-list');
  if(!list) return;
  const filter = document.getElementById('admin-role-filter')?.value || 'all';
  const users = filter === 'all' ? mockDB.users : mockDB.users.filter(user => user.role === filter);
  list.innerHTML = users.map(user => {
    const meta = ROLE_META[user.role] || ROLE_META.student;
    const protectedAccount = user.id === state.currentUser?.id;
    return `
      <div class="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-${meta.color}-50 text-${meta.color}-600 flex items-center justify-center shrink-0"><i data-lucide="${meta.icon}" class="w-5 h-5"></i></div>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-sm text-slate-900 truncate">${escapeHtml(user.full_name)}</p>
          <p class="text-xs text-slate-500">${escapeHtml(user.username)}${user.class_name ? ` · ${escapeHtml(user.class_name)}` : ''}</p>
        </div>
        <div class="sm:text-right">
          <select onchange="changeUserRole('${user.id}', this.value)" ${protectedAccount ? 'disabled title="Không thể đổi vai trò tài khoản đang đăng nhập"' : ''} class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-${meta.color}-700 disabled:opacity-60">
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
            <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
          </select>
          <p class="text-[10px] text-slate-400 mt-1">${meta.scope}</p>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

window.changeUserRole = function(userId, role) {
  const user = mockDB.users.find(item => item.id === userId);
  if(!user || user.id === state.currentUser?.id || !ROLE_META[role]) return;
  user.role = role;
  if(role !== 'student') user.gamification = undefined;
  if(role === 'student') {
    user.xp_points ||= 0;
    user.streak_days ||= 0;
  }
  ensureGamificationData();
  saveDB();
  renderAdminRbac();
  renderAdminDashboard();
};

function studentRows() {
  return mockDB.users.filter(user => user.role === 'student').map(user => ({
    studentId: user.student_id || user.username,
    fullName: user.full_name,
    className: user.class_name || ''
  }));
}

function downloadExcelXml(filename, sheetName, rows) {
  const xmlRows = rows.map((row, index) => `<Row>${row.map(value => `<Cell${index === 0 ? ' ss:StyleID="header"' : ''}><Data ss:Type="${typeof value === 'number' ? 'Number' : 'String'}">${escapeHtml(value ?? '')}</Data></Cell>`).join('')}</Row>`).join('');
  const workbook = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Default"><Font ss:FontName="Arial" ss:Size="10"/></Style><Style ss:ID="header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#312E81" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="${escapeHtml(sheetName)}"><Table><Column ss:Width="100"/><Column ss:Width="220"/><Column ss:Width="90"/>${xmlRows}</Table></Worksheet></Workbook>`;
  const url = URL.createObjectURL(new Blob([workbook], { type: 'application/vnd.ms-excel' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function createBackup(download = false) {
  const settings = mockDB.system_settings.backup;
  const snapshot = structuredClone(mockDB);
  if(settings.mask_student_data) {
    snapshot.users = snapshot.users.map(user => {
      const { password, ...safe } = user;
      return safe;
    });
  }
  const now = new Date();
  const record = {
    id: `backup-${Date.now()}`,
    created_at: now.toISOString(),
    users: snapshot.users.length,
    submissions: snapshot.submissions.length
  };
  settings.last_backup = record.created_at;
  const days = settings.frequency === 'daily' ? 1 : settings.frequency === 'weekly' ? 7 : 30;
  settings.next_backup = new Date(now.getTime() + days * 86_400_000).toISOString();
  mockDB.system_settings.backup_history.unshift(record);
  mockDB.system_settings.backup_history = mockDB.system_settings.backup_history.slice(0, Number(settings.retention));
  saveDB();
  if(download) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `backup-english-hub-${localDateKey()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  renderSystemSettings();
}

function runScheduledBackup() {
  const next = mockDB.system_settings?.backup?.next_backup;
  if(!next || new Date(next) <= new Date()) createBackup(false);
}

function renderSystemSettings() {
  const settings = mockDB.system_settings;
  if(!settings) return;
  document.getElementById('storage-quota').value = settings.storage.quota_gb;
  document.getElementById('storage-retention').value = String(settings.storage.retention_days);
  document.getElementById('backup-frequency').value = settings.backup.frequency;
  document.getElementById('backup-retention').value = String(settings.backup.retention);
  document.getElementById('mask-student-data').checked = settings.backup.mask_student_data;
  const status = document.getElementById('backup-status');
  const last = settings.backup.last_backup ? new Date(settings.backup.last_backup).toLocaleString('vi-VN') : 'Chưa có';
  const next = settings.backup.next_backup ? new Date(settings.backup.next_backup).toLocaleString('vi-VN') : 'Chưa lên lịch';
  status.innerHTML = `<strong>Lần gần nhất:</strong> ${last}<br><strong>Lần tiếp theo:</strong> ${next} · ${settings.backup_history.length} bản đang lưu`;
}

async function refreshSupabaseStatus() {
  const label = document.getElementById('supabase-config-status');
  if(!label) return;
  try {
    const response = await fetch('/api/admin/supabase-status');
    const data = await response.json();
    label.textContent = data.configured ? 'Đã kết nối an toàn' : 'Chưa cấu hình Cloud';
    label.parentElement.parentElement.classList.toggle('bg-amber-50', !data.configured);
    label.parentElement.parentElement.classList.toggle('border-amber-100', !data.configured);
  } catch {
    label.textContent = 'Không thể kiểm tra kết nối';
  }
}

function initSystemAdmin() {
  document.getElementById('admin-role-filter')?.addEventListener('change', renderAdminRbac);
  document.getElementById('download-student-template')?.addEventListener('click', () => {
    downloadExcelXml('mau-import-hoc-sinh.xls', 'Hoc sinh', [
      ['MSSV', 'Họ tên', 'Lớp'],
      ['HS0001', 'Nguyễn Văn An', '8A1'],
      ['HS0002', 'Trần Thị Bình', '8A2']
    ]);
  });
  document.getElementById('export-students-excel')?.addEventListener('click', () => {
    downloadExcelXml(`danh-sach-hoc-sinh-${localDateKey()}.xls`, 'Hoc sinh', [
      ['MSSV', 'Họ tên', 'Lớp'],
      ...studentRows().map(item => [item.studentId, item.fullName, item.className])
    ]);
  });
  document.getElementById('student-import-file')?.addEventListener('change', async event => {
    const file = event.target.files[0];
    const status = document.getElementById('student-import-status');
    if(!file) return;
    status.textContent = 'Đang kiểm tra file…';
    const form = new FormData();
    form.append('file', file);
    try {
      const response = await fetch('/api/admin/import-students', { method: 'POST', body: form });
      const data = await response.json();
      if(!response.ok) throw new Error(data.error);
      let added = 0;
      let updated = 0;
      data.students.forEach(item => {
        const existing = mockDB.users.find(user => user.student_id === item.studentId || user.username === item.studentId);
        if(existing) {
          existing.full_name = item.fullName;
          existing.class_name = item.className;
          existing.role = 'student';
          existing.student_id = item.studentId;
          updated++;
        } else {
          mockDB.users.push({
            id: `student-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            student_id: item.studentId,
            username: item.studentId,
            password: '123456',
            role: 'student',
            full_name: item.fullName,
            class_name: item.className,
            xp_points: 0,
            streak_days: 0
          });
          added++;
        }
      });
      ensureGamificationData();
      saveDB();
      renderAdminRbac();
      renderAdminDashboard();
      status.innerHTML = `<span class="text-emerald-600 font-semibold">Thành công: ${added} thêm mới, ${updated} cập nhật.</span>${data.errors.length ? `<br><span class="text-amber-600">${data.errors.length} dòng không hợp lệ đã bỏ qua.</span>` : ''}`;
    } catch(error) {
      status.innerHTML = `<span class="text-rose-600">${escapeHtml(error.message || 'Import thất bại.')}</span>`;
    }
    event.target.value = '';
  });
  document.getElementById('save-storage-policy')?.addEventListener('click', () => {
    mockDB.system_settings.storage.quota_gb = Number(document.getElementById('storage-quota').value);
    mockDB.system_settings.storage.retention_days = Number(document.getElementById('storage-retention').value);
    saveDB();
    const button = document.getElementById('save-storage-policy');
    button.textContent = 'Đã lưu chính sách';
    setTimeout(() => button.textContent = 'Lưu chính sách Storage', 1500);
  });
  document.getElementById('save-backup-policy')?.addEventListener('click', () => {
    const backup = mockDB.system_settings.backup;
    backup.frequency = document.getElementById('backup-frequency').value;
    backup.retention = Number(document.getElementById('backup-retention').value);
    backup.mask_student_data = document.getElementById('mask-student-data').checked;
    backup.next_backup = null;
    saveDB();
    runScheduledBackup();
  });
  document.getElementById('backup-now')?.addEventListener('click', () => createBackup(true));
  refreshSupabaseStatus();
}









function loadStudentUnits() {
  const select = document.getElementById('student-unit-select');
  if(!select) return;
  const units = mockDB.units.filter(u => u.grade === state.currentGrade);
  if(units.length === 0) {
    select.innerHTML = '<option value="">-- Chưa có bài học --</option>';
    renderStudentUnit(null);
    return;
  }
  
  select.innerHTML = units.map(u => `<option value="${u.id}">${u.title}</option>`).join('');
  renderStudentUnit(units[0]);
  
  select.addEventListener('change', (e) => {
    const unit = units.find(u => u.id === e.target.value);
    renderStudentUnit(unit);
  });
}


let currentGradingId = null;
let voiceFeedbackRecorder = null;
let voiceFeedbackChunks = [];
let currentVoiceFeedbackUrl = '';

window.openGradingModal = function(subId) {
  currentGradingId = subId;
  const sub = mockDB.submissions.find(s => s.id === subId);
  if(!sub) return;
  
  document.getElementById('grading-audio-player').src = sub.audio_url;
  document.getElementById('grade-intonation').value = '';
  document.getElementById('grade-fluency').value = '';
  document.getElementById('grade-total').value = '';
  document.getElementById('grade-feedback').value = '';
  currentVoiceFeedbackUrl = sub.voice_feedback_url || '';
  const preview = document.getElementById('voice-feedback-preview');
  preview.src = currentVoiceFeedbackUrl;
  preview.classList.toggle('hidden', !currentVoiceFeedbackUrl);
  document.getElementById('voice-feedback-status').textContent = currentVoiceFeedbackUrl ? 'Đã có nhận xét bằng giọng nói' : 'Ghi âm nhận xét gửi học sinh';
  
  document.getElementById('grading-modal').classList.remove('hidden');
  document.getElementById('grading-modal').classList.add('flex');
};

function initGradingModal() {
  const modal = document.getElementById('grading-modal');
  const closeBtn = document.getElementById('close-grading-modal');
  const cancelBtn = document.getElementById('cancel-grading');
  const saveBtn = document.getElementById('submit-grading');
  const aiGradeBtn = document.getElementById('ai-auto-grade-btn');
  const audioPlayer = document.getElementById('grading-audio-player');
  const voiceBtn = document.getElementById('voice-feedback-btn');

  const intonationInput = document.getElementById('grade-intonation');
  const fluencyInput = document.getElementById('grade-fluency');
  const totalInput = document.getElementById('grade-total');

  const calculateTotal = () => {
    if (intonationInput.value && fluencyInput.value) {
      const intonation = parseFloat(intonationInput.value) || 0;
      const fluency = parseFloat(fluencyInput.value) || 0;
      totalInput.value = ((intonation + fluency) / 2).toFixed(1);
    }
  };

  if (intonationInput && fluencyInput && totalInput) {
    intonationInput.addEventListener('input', calculateTotal);
    fluencyInput.addEventListener('input', calculateTotal);
  }

  document.querySelectorAll('.grading-speed').forEach(button => {
    button.addEventListener('click', () => {
      audioPlayer.playbackRate = Number(button.dataset.speed);
      document.querySelectorAll('.grading-speed').forEach(item => {
        item.classList.toggle('border-indigo-300', item === button);
        item.classList.toggle('bg-indigo-50', item === button);
        item.classList.toggle('text-indigo-700', item === button);
      });
    });
  });

  voiceBtn?.addEventListener('click', async () => {
    if(voiceFeedbackRecorder?.state === 'recording') {
      voiceFeedbackRecorder.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      voiceFeedbackChunks = [];
      voiceFeedbackRecorder = new MediaRecorder(stream);
      voiceFeedbackRecorder.ondataavailable = event => voiceFeedbackChunks.push(event.data);
      voiceFeedbackRecorder.onstop = async () => {
        const blob = new Blob(voiceFeedbackChunks, { type: voiceFeedbackRecorder.mimeType || 'audio/webm' });
        currentVoiceFeedbackUrl = await fileToDataUrl(blob);
        const preview = document.getElementById('voice-feedback-preview');
        preview.src = currentVoiceFeedbackUrl;
        preview.classList.remove('hidden');
        document.getElementById('voice-feedback-status').textContent = 'Đã ghi xong · có thể nghe lại';
        voiceBtn.innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i>';
        voiceBtn.classList.remove('animate-pulse', 'bg-slate-700');
        voiceBtn.classList.add('bg-rose-500');
        stream.getTracks().forEach(track => track.stop());
        lucide.createIcons();
      };
      voiceFeedbackRecorder.start();
      document.getElementById('voice-feedback-status').textContent = 'Đang ghi âm · bấm để dừng';
      voiceBtn.innerHTML = '<i data-lucide="square" class="w-4 h-4"></i>';
      voiceBtn.classList.add('animate-pulse', 'bg-slate-700');
      voiceBtn.classList.remove('bg-rose-500');
      lucide.createIcons();
    } catch(error) {
      alert('Không thể truy cập micro. Vui lòng cho phép quyền micro và thử lại.');
    }
  });
  
  if(aiGradeBtn) {
    aiGradeBtn.addEventListener('click', async () => {
      if(!currentGradingId) return;
      const sub = mockDB.submissions.find(s => s.id === currentGradingId);
      if(!sub) return;
      
      const originalText = aiGradeBtn.innerHTML;
      aiGradeBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang chấm...';
      aiGradeBtn.disabled = true;
      lucide.createIcons();
      
      try {
          // Fetch the blob from audio_url
          const audioResponse = await fetch(sub.audio_url);
          const audioBlob = await audioResponse.blob();
          
          const formData = new FormData();
          formData.append('audio', audioBlob, 'student_audio.webm');
          formData.append('prompt', sub.unit_title);
          
          const res = await fetch('/api/evaluate-speaking', {
             method: 'POST',
             body: formData
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error || "Lỗi khi AI chấm bài");
          
          // Fill form
          document.getElementById('grade-total').value = (data.score / 10).toFixed(1); // scale 100 to 10
          
          let feedbackStr = (data.advice || "Khá tốt!") + "\n\n";
          if (data.criteria) {
             feedbackStr += "Độ trôi chảy: " + (data.criteria.fluency || "") + "\n";
             feedbackStr += "Phát âm: " + (data.criteria.pronunciation || "") + "\n";
             feedbackStr += "Từ vựng: " + (data.criteria.lexical || "") + "\n";
             feedbackStr += "Ngữ pháp: " + (data.criteria.grammar || "") + "\n";
          }
          document.getElementById('grade-feedback').value = feedbackStr;
          
      } catch (err) {
          console.error(err);
          alert(err.message || 'Lỗi khi AI chấm bài');
      } finally {
          aiGradeBtn.innerHTML = originalText;
          aiGradeBtn.disabled = false;
          lucide.createIcons();
      }
    });
  }
  
  if(closeBtn && modal) {
    cancelBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.getElementById('grading-audio-player').pause();
    });
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.getElementById('grading-audio-player').pause();
    });
  }
  
  if(saveBtn) {
    saveBtn.addEventListener('click', () => {
      if(!currentGradingId) return;
      const sub = mockDB.submissions.find(s => s.id === currentGradingId);
      if(!sub) return;
      
      const score = document.getElementById('grade-total').value;
      if(!score) {
        alert('Vui lòng nhập điểm tổng!');
        return;
      }
      
      sub.status = 'graded';
      sub.score = parseFloat(score);
      sub.feedback = document.getElementById('grade-feedback').value;
      sub.voice_feedback_url = currentVoiceFeedbackUrl;
      
      saveDB();
      renderTeacherSubmissions();
      
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.getElementById('grading-audio-player').pause();
    });
  }
}

function initAdminModals() {
  const aiModal = document.getElementById('ai-upload-modal');
  const userForm = document.getElementById('user-form');
  if (userForm) {
    userForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-user-id').value;
      const username = document.getElementById('edit-username').value;
      const fullname = document.getElementById('edit-fullname').value;
      const role = document.getElementById('edit-role').value;
      
      let existingUser = {};
      if(id) {
        const idx = mockDB.users.findIndex(u => u.id === id);
        if(idx >= 0) existingUser = mockDB.users[idx];
      }
      const newUser = {
        id: id || 'u' + Date.now(),
        username: username,
        password: existingUser.password || '123',
        role: role,
        full_name: fullname,
        class_name: role === 'student' ? (existingUser.class_name || '8A1') : null,
        xp_points: existingUser.xp_points || 0,
        streak_days: existingUser.streak_days || 0
      };
      
      if(id) {
         const idx = mockDB.users.findIndex(u => u.id === id);
         if(idx >= 0) mockDB.users[idx] = newUser;
      } else {
         mockDB.users.push(newUser);
      }
      
      saveDB();
      renderAdminDashboard();
      userForm.reset();
      userModal.classList.add('hidden');
      userModal.classList.remove('flex');
    });
  }

  const unitForm = document.getElementById('unit-form');
  if (unitForm) {
    unitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-unit-id').value;
      const title = document.getElementById('edit-unit-title').value;
      const grade = parseInt(document.getElementById('edit-unit-grade').value);
      const desc = document.getElementById('edit-unit-desc').value;
      const transcript = document.getElementById('edit-unit-transcript').value;
      
      let existingUnit = {};
      if(id) {
        const idx = mockDB.units.findIndex(u => u.id === id);
        if(idx >= 0) existingUnit = mockDB.units[idx];
      }
      const newUnit = {
        id: id || 'un_man_' + Date.now(),
        grade: grade,
        title: title,
        description: desc,
        transcript: transcript,
        keywords: existingUnit.keywords || [],
        speakingPrompt: existingUnit.speakingPrompt || 'Hãy đọc lại đoạn hội thoại trên.',
        quizzes: existingUnit.quizzes || []
      };
      
      if(id) {
         const idx = mockDB.units.findIndex(u => u.id === id);
         if(idx >= 0) mockDB.units[idx] = newUnit;
      } else {
         mockDB.units.push(newUnit);
      }
      
      saveDB();
      renderAdminDashboard();
      unitForm.reset();
      unitModal.classList.add('hidden');
      unitModal.classList.remove('flex');
    });
  }

  const aiUploadForm = document.getElementById('ai-upload-form');
  const aiFileInput = document.getElementById('ai-file-input');
  const aiFileName = document.getElementById('ai-file-name');
  const cancelAi = document.getElementById('cancel-ai');
  const btnGenerateAi = document.getElementById('btn-generate-ai');

  if (aiFileInput && aiFileName) {
    aiFileInput.addEventListener('change', (e) => {
      if(e.target.files.length > 0) {
        aiFileName.textContent = e.target.files[0].name;
        aiFileName.classList.remove('hidden');
      } else {
        aiFileName.classList.add('hidden');
      }
    });
  }

  if (cancelAi && aiModal) {
    cancelAi.addEventListener('click', () => {
      aiModal.classList.add('hidden');
      aiModal.classList.remove('flex');
    });
  }

  if (aiUploadForm) {
    aiUploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!aiFileInput.files || aiFileInput.files.length === 0) {
        alert("Vui lòng chọn một tệp tài liệu.");
        return;
      }
      
      const originalText = btnGenerateAi.innerHTML;
      btnGenerateAi.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Đang phân tích...';
      btnGenerateAi.disabled = true;
      
      try {
        const formData = new FormData();
        for (let i = 0; i < aiFileInput.files.length; i++) {
            formData.append('files', aiFileInput.files[i]);
        }
        
        const res = await fetch('/api/generate-lesson', {
            method: 'POST',
            body: formData
        });
        
        const data = await res.json();
        if (!res.ok) {
            console.error("API Error:", data.details);
            throw new Error(data.error || "Lỗi không xác định khi kết nối với máy chủ.");
        }
        
        const lessonData = data;
        
        // Use quizzes array instead of single quiz to fix undefined .question later
        const quizzes = lessonData.quiz ? [lessonData.quiz] : [];
        if (lessonData.quizzes) {
            quizzes.push(...lessonData.quizzes);
        }
        
        const newUnit = {
          id: 'un_ai_' + Date.now(),
          grade: 8,
          title: lessonData.title || ('Unit ' + (mockDB.units.length + 1) + ': ' + aiFileInput.files[0].name.split('.')[0]),
          description: lessonData.description || 'Bài học được tạo tự động từ tài liệu bởi AI.',
          transcript: lessonData.transcript || "",
          keywords: lessonData.keywords || [],
          speakingPrompt: lessonData.speakingPrompt || "Please read the text aloud.",
          quizzes: quizzes
        };
        
        mockDB.units.push(newUnit);
        saveDB();
        
        renderAdminDashboard();
        
        btnGenerateAi.innerHTML = originalText;
        btnGenerateAi.disabled = false;
        aiModal.classList.add('hidden');
        aiModal.classList.remove('flex');
        aiUploadForm.reset();
        aiFileName.classList.add('hidden');
        
        alert('Tạo bài học bằng AI thành công!');
        lucide.createIcons();
      } catch (err) {
        console.error("AI Generation Error", err);
        alert(err.message || 'Có lỗi xảy ra khi tạo bài học bằng AI. Vui lòng thử lại.');
        btnGenerateAi.innerHTML = originalText;
        btnGenerateAi.disabled = false;
      }
    });
  }


  const btnAiUpload = document.getElementById('btn-ai-upload');
  const closeAiModal = document.getElementById('close-ai-modal');
  
  if (btnAiUpload && aiModal) {
    btnAiUpload.addEventListener('click', () => {
      aiModal.classList.remove('hidden');
      aiModal.classList.add('flex');
    });
  }
  
  if (closeAiModal && aiModal) {
    closeAiModal.addEventListener('click', () => {
      aiModal.classList.add('hidden');
      aiModal.classList.remove('flex');
    });
  }

  const userModal = document.getElementById('user-modal');
  const unitModal = document.getElementById('unit-modal');
  
  const btnAddUser = document.getElementById('btn-add-user');
  const btnAddUnit = document.getElementById('btn-add-unit');
  
  const closeUser = document.getElementById('close-user-modal');
  const closeUnit = document.getElementById('close-unit-modal');
  
  if(btnAddUser && userModal) {
    btnAddUser.addEventListener('click', () => {
      document.getElementById('user-form').reset();
      document.getElementById('edit-user-id').value = '';
      userModal.classList.remove('hidden');
      userModal.classList.add('flex');
    });
  }
  
  if(btnAddUnit && unitModal) {
    btnAddUnit.addEventListener('click', () => {
      document.getElementById('unit-form').reset();
      document.getElementById('edit-unit-id').value = '';
      unitModal.classList.remove('hidden');
      unitModal.classList.add('flex');
    });
  }
  
  if(closeUser && userModal) {
    closeUser.addEventListener('click', () => {
      userModal.classList.add('hidden');
      userModal.classList.remove('flex');
    });
  }
  
  if(closeUnit && unitModal) {
    closeUnit.addEventListener('click', () => {
      unitModal.classList.add('hidden');
      unitModal.classList.remove('flex');
    });
  }
}


function renderStudentUnit(unit) {
  if(!unit) {
    const titleEl = document.getElementById('student-unit-title');
    if (titleEl) titleEl.textContent = 'Chưa có bài học nào cho khối này';
    const descEl = document.getElementById('student-unit-desc');
    if (descEl) descEl.textContent = '';
    const transcriptEl = document.getElementById('student-unit-transcript');
    if (transcriptEl) transcriptEl.innerHTML = '';
    const keywordsEl = document.getElementById('student-unit-keywords');
    if (keywordsEl) keywordsEl.innerHTML = '';
    const quizCont = document.getElementById('student-unit-quiz-container');
    if (quizCont) quizCont.classList.add('hidden');
    const voiceTitle = document.getElementById('student-voice-title');
    if (voiceTitle) voiceTitle.textContent = 'Your Turn';
    const promptEl = document.getElementById('student-speaking-prompt');
    if (promptEl) promptEl.textContent = '';
    return;
  }
  
  state.currentUnit = unit;
  document.getElementById('student-unit-title').textContent = unit.title;
  document.getElementById('student-unit-desc').textContent = unit.description;
  
  // Lock transcript initially
  document.getElementById('student-unit-transcript').style.filter = 'blur(4px)';
  const lockMsg = document.getElementById('transcript-lock-msg');
  if(lockMsg) lockMsg.classList.remove('hidden');

  const transcriptHTML = (unit.transcript || '').split('\n').filter(line => line.trim() !== '').map((line, lineIndex) => {
    const parts = line.includes(':') ? line.split(':') : [];
    const speaker = parts.length ? `<span class="font-bold text-indigo-700 mr-1">${escapeHtml(parts[0])}:</span>` : '';
    const sentence = parts.length ? parts.slice(1).join(':').trim() : line.trim();
    const words = sentence.split(/(\s+)/).map(token => {
      if(/^\s+$/.test(token)) return token;
      const cleanWord = token.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '');
      if(!cleanWord) return escapeHtml(token);
      const prefix = token.slice(0, token.indexOf(cleanWord));
      const suffix = token.slice(token.indexOf(cleanWord) + cleanWord.length);
      return `${escapeHtml(prefix)}<button type="button" class="transcript-word rounded px-0.5 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" data-word="${escapeHtml(cleanWord)}" title="Nghe và xem nghĩa của ${escapeHtml(cleanWord)}">${escapeHtml(cleanWord)}</button>${escapeHtml(suffix)}`;
    }).join('');
    return `<p class="transcript-line rounded-lg px-2 py-1.5 transition-colors" data-line="${lineIndex}">${speaker}${words}</p>`;
  }).join('');
  document.getElementById('student-unit-transcript').innerHTML = transcriptHTML || '<p class="italic text-slate-400">Không có đoạn hội thoại</p>';

  document.querySelectorAll('.transcript-word').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const word = button.dataset.word;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      const naturalVoice = window.getNaturalEnglishVoice?.('neutral');
      if(naturalVoice) {
        utterance.voice = naturalVoice;
        utterance.lang = naturalVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      openDictionary(word, unit.description);
    });
  });
  document.querySelectorAll('.transcript-line').forEach(line => {
    line.addEventListener('click', () => {
      if(!window.prepareListeningTimeline) return;
      window.prepareListeningTimeline(true);
      state.listening.currentLine = Number(line.dataset.line);
      state.listening.currentTime = state.listening.starts[state.listening.currentLine] || 0;
      document.getElementById('listening-progress').value = state.listening.currentTime;
      document.getElementById('play-btn').click();
    });
  });
  
  document.getElementById('student-unit-keywords').innerHTML = (unit.keywords || []).map(k => `<button class="keyword-btn px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md text-xs font-medium border border-indigo-100 transition-colors">${k}</button>`).join('');
  
  // Attach keyword click events
  document.querySelectorAll('.keyword-btn').forEach(btn => {
     btn.addEventListener('click', () => openDictionary(btn.textContent, unit.description));
  });
  
  const quizContainer = document.getElementById('student-unit-quiz-container');
  if(unit.quizzes && unit.quizzes.length > 0) {
    quizContainer.classList.remove('hidden');
    state.quizzes = buildAdaptiveQuizzes(unit);
    state.currentQuizIndex = 0;
    renderQuizQuestion();
  } else if (unit.quiz) {
    quizContainer.classList.remove('hidden');
    state.quizzes = [unit.quiz];
    state.currentQuizIndex = 0;
    renderQuizQuestion();
  } else {
    quizContainer.classList.add('hidden');
    unlockTranscript();
  }

  document.getElementById('student-voice-title').textContent = `Your Turn: ${unit.title}`;
  document.getElementById('student-speaking-prompt').textContent = unit.speakingPrompt || 'Chưa có câu luyện nói.';
  
  // Reset audio UI
  const resultDiv = document.getElementById('audio-result');
  if(resultDiv) resultDiv.classList.add('hidden');
  const aiEvalBtn = document.getElementById('ai-evaluate-btn');
  if(aiEvalBtn) aiEvalBtn.classList.add('hidden');
  const aiFeedback = document.getElementById('ai-feedback-container');
  if(aiFeedback) aiFeedback.classList.add('hidden');
  const waveformCanvas = document.getElementById('waveform-canvas');
  if (waveformCanvas) waveformCanvas.classList.add('hidden');
  state.audioBlob = null;
  state.lastAiEvaluation = null;
  document.getElementById('preview-container')?.classList.add('hidden');
  document.getElementById('retry-btn')?.classList.add('hidden');
  document.getElementById('submit-audio-btn')?.classList.add('hidden');
  const limit = Number(document.getElementById('record-limit-select')?.value || 60);
  const timer = document.getElementById('record-timer');
  if(timer) {
    timer.textContent = formatAudioTime(limit);
    timer.classList.remove('text-rose-600');
  }
  if(typeof setupFlashcardsForUnit === 'function') setupFlashcardsForUnit(unit);
  if(typeof window.prepareListeningTimeline === 'function') window.prepareListeningTimeline(false);
}

function buildAdaptiveQuizzes(unit) {
  const source = (unit.quizzes || []).map((quiz, index) => ({
    ...quiz,
    type: quiz.type || (index === 0 ? 'mcq' : 'fill')
  }));
  if(!source.some(quiz => quiz.type === 'word-order')) {
    const firstLine = (unit.transcript || '').split('\n').find(Boolean) || unit.speakingPrompt || '';
    const answer = firstLine.includes(':') ? firstLine.split(':').slice(1).join(':').trim() : firstLine.trim();
    if(answer) source.push({
      type: 'word-order',
      question: 'Sắp xếp các từ để tạo lại một câu trong bài nghe.',
      answer,
      options: [answer],
      correctIndex: 0
    });
  }
  return source;
}

function unlockTranscript() {
   const transcriptEl = document.getElementById('student-unit-transcript');
   if(transcriptEl) transcriptEl.style.filter = 'none';
   const lockMsg = document.getElementById('transcript-lock-msg');
   if(lockMsg) lockMsg.classList.add('hidden');
}

function renderQuizQuestion() {
   const quiz = state.quizzes[state.currentQuizIndex];
   const quizType = quiz.type || ['mcq', 'fill', 'word-order'][state.currentQuizIndex % 3];
   quiz._resolvedType = quizType;
   const progressText = document.getElementById('quiz-progress-text');
   const progressBar = document.getElementById('quiz-progress-bar');
   if(progressText) progressText.textContent = `${state.currentQuizIndex + 1} / ${state.quizzes.length}`;
   if(progressBar) progressBar.style.width = `${((state.currentQuizIndex) / state.quizzes.length) * 100}%`;
   const typeLabels = { mcq: 'Trắc nghiệm', fill: 'Điền từ', 'word-order': 'Sắp xếp câu' };
   document.getElementById('student-quiz-question').innerHTML = `
     <span class="inline-flex mb-2 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wide">${typeLabels[quizType]}</span>
     <span class="block">Câu ${state.currentQuizIndex + 1}/${state.quizzes.length}: ${escapeHtml(quiz.question)}</span>`;

   const answer = String(quiz.answer || quiz.options?.[quiz.correctIndex] || '').trim();
   quiz._resolvedAnswer = answer;
   let interactionHtml = '';
   if(quizType === 'fill') {
      interactionHtml = `
        <div class="flex flex-col sm:flex-row gap-2">
          <label class="sr-only" for="fill-answer">Câu trả lời</label>
          <input id="fill-answer" autocomplete="off" class="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" placeholder="Nhập đáp án chính xác">
          <button id="check-fill-btn" class="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Kiểm tra</button>
        </div>`;
   } else if(quizType === 'word-order') {
      const words = answer.split(/\s+/);
      const shuffled = [...words].sort((a, b) => {
        const ah = [...a].reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const bh = [...b].reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (ah % 7) - (bh % 7) || b.localeCompare(a);
      });
      if(shuffled.join(' ') === answer && shuffled.length > 1) shuffled.reverse();
      interactionHtml = `
        <div id="word-order-answer" class="min-h-12 p-3 mb-3 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex flex-wrap gap-2" aria-label="Câu đang sắp xếp">
          <span class="word-order-placeholder text-sm text-slate-400">Chọn các từ theo đúng thứ tự…</span>
        </div>
        <div id="word-order-bank" class="flex flex-wrap gap-2 mb-3">
          ${shuffled.map((word, index) => `<button class="word-token px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm font-medium hover:border-indigo-400" data-word="${escapeHtml(word)}" data-index="${index}">${escapeHtml(word)}</button>`).join('')}
        </div>
        <div class="flex gap-2">
          <button id="undo-word-btn" class="px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50">Hoàn tác</button>
          <button id="check-order-btn" class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Kiểm tra</button>
        </div>`;
   } else {
      interactionHtml = (quiz.options || []).map((opt, index) => {
        const isCorrect = index === quiz.correctIndex;
        const letter = String.fromCharCode(65 + index);
        return `
          <button class="quiz-option text-left px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium text-slate-700 flex items-center gap-3" data-correct="${isCorrect}">
            <span class="option-indicator w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-500 shrink-0">${letter}</span>
            <span class="option-text">${escapeHtml(opt)}</span>
          </button>`;
      }).join('');
   }

   document.getElementById('student-quiz-options').innerHTML = interactionHtml;
   state.quizAnswered = false;
   document.getElementById('quiz-feedback').classList.add('hidden');
   document.getElementById('btn-next-quiz').classList.add('hidden');
   initQuizOptions(); 
}

function initQuizOptions() {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if(state.quizAnswered) return;
      const isCorrect = opt.dataset.correct === 'true';
      options.forEach(o => o.disabled = true);
      if(isCorrect) {
        opt.classList.add('border-emerald-500', 'bg-emerald-50');
        opt.querySelector('.option-indicator').classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
      } else {
        opt.classList.add('border-rose-500', 'bg-rose-50');
        opt.querySelector('.option-indicator').classList.add('bg-rose-500', 'text-white', 'border-rose-500');
        const correctOpt = Array.from(options).find(o => o.dataset.correct === 'true');
        if(correctOpt) {
          correctOpt.classList.add('border-emerald-500', 'bg-emerald-50');
          correctOpt.querySelector('.option-indicator').classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
        }
      }
      finishQuizAttempt(isCorrect);
    });
  });

  const fillInput = document.getElementById('fill-answer');
  const fillButton = document.getElementById('check-fill-btn');
  const checkFill = () => {
    if(state.quizAnswered) return;
    const expected = normalizeAnswer(state.quizzes[state.currentQuizIndex]._resolvedAnswer);
    const actual = normalizeAnswer(fillInput.value);
    fillInput.classList.add(actual === expected ? 'border-emerald-500' : 'border-rose-500');
    finishQuizAttempt(actual === expected, state.quizzes[state.currentQuizIndex]._resolvedAnswer);
  };
  fillButton?.addEventListener('click', checkFill);
  fillInput?.addEventListener('keydown', event => {
    if(event.key === 'Enter') checkFill();
  });

  const selectedWords = [];
  const answerArea = document.getElementById('word-order-answer');
  const renderSelectedWords = () => {
    if(!answerArea) return;
    answerArea.innerHTML = selectedWords.length
      ? selectedWords.map((item, index) => `<button class="selected-word px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium" data-selected-index="${index}">${escapeHtml(item.word)}</button>`).join('')
      : '<span class="word-order-placeholder text-sm text-slate-400">Chọn các từ theo đúng thứ tự…</span>';
    answerArea.querySelectorAll('.selected-word').forEach(button => {
      button.addEventListener('click', () => {
        const [item] = selectedWords.splice(Number(button.dataset.selectedIndex), 1);
        document.querySelector(`.word-token[data-index="${item.index}"]`).disabled = false;
        renderSelectedWords();
      });
    });
  };
  document.querySelectorAll('.word-token').forEach(button => {
    button.addEventListener('click', () => {
      selectedWords.push({ word: button.dataset.word, index: button.dataset.index });
      button.disabled = true;
      renderSelectedWords();
    });
  });
  document.getElementById('undo-word-btn')?.addEventListener('click', () => {
    const item = selectedWords.pop();
    if(item) document.querySelector(`.word-token[data-index="${item.index}"]`).disabled = false;
    renderSelectedWords();
  });
  document.getElementById('check-order-btn')?.addEventListener('click', () => {
    if(state.quizAnswered) return;
    const actual = normalizeAnswer(selectedWords.map(item => item.word).join(' '));
    const expectedAnswer = state.quizzes[state.currentQuizIndex]._resolvedAnswer;
    finishQuizAttempt(actual === normalizeAnswer(expectedAnswer), expectedAnswer);
  });
}

function normalizeAnswer(value) {
  return String(value || '').toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
}

function finishQuizAttempt(isCorrect, correctAnswer = '') {
  state.quizAnswered = true;
  const feedback = document.getElementById('quiz-feedback');
  const btnNext = document.getElementById('btn-next-quiz');
  feedback.innerHTML = isCorrect
    ? '<div class="p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200 flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i> Chính xác!</div>'
    : `<div class="p-3 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg border border-rose-200"><div class="flex items-center gap-2"><i data-lucide="x-circle" class="w-4 h-4"></i> Chưa đúng.</div>${correctAnswer ? `<p class="mt-1 ml-6">Đáp án: <strong>${escapeHtml(correctAnswer)}</strong></p>` : ''}</div>`;

  if(isCorrect && state.currentUser?.role === 'student') awardXP(10, 'Trả lời đúng micro‑quiz', 'quiz_correct');

  if(state.currentQuizIndex < state.quizzes.length - 1) {
    btnNext.classList.remove('hidden');
  } else {
    feedback.innerHTML += '<div class="mt-2 text-indigo-600 font-bold text-sm">Bạn đã hoàn thành micro‑quiz! Transcript đã được mở khóa.</div>';
    unlockTranscript();
    document.getElementById('quiz-progress-bar').style.width = '100%';
    if(isCorrect) confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#4f46e5', '#10b981', '#f59e0b'] });
  }
  feedback.classList.remove('hidden');
  lucide.createIcons();
}


async function drawWaveform(audioUrl) {
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas) return;
    canvas.classList.remove('hidden');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const channelData = audioBuffer.getChannelData(0);
        const step = Math.ceil(channelData.length / width);
        const amp = height / 2;
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < step; j++) {
                const datum = channelData[i * step + j];
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }
            ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
    } catch (e) {
        console.error("Error drawing waveform", e);
    }
}

window.editUser = function(id) {
  const user = mockDB.users.find(u => u.id === id);
  if (!user) return;
  document.getElementById('edit-user-id').value = user.id;
  document.getElementById('edit-username').value = user.username;
  document.getElementById('edit-fullname').value = user.full_name;
  document.getElementById('edit-role').value = user.role;
  const userModal = document.getElementById('user-modal');
  userModal.classList.remove('hidden');
  userModal.classList.add('flex');
};

window.editUnit = function(id) {
  const unit = mockDB.units.find(u => u.id === id);
  if (!unit) return;
  document.getElementById('edit-unit-id').value = unit.id;
  document.getElementById('edit-unit-title').value = unit.title;
  document.getElementById('edit-unit-grade').value = unit.grade;
  document.getElementById('edit-unit-desc').value = unit.description || '';
  document.getElementById('edit-unit-transcript').value = unit.transcript || '';
  const unitModal = document.getElementById('unit-modal');
  unitModal.classList.remove('hidden');
  unitModal.classList.add('flex');
};

function renderStudentSubmissions() {
  const tbody = document.getElementById('student-submissions-list');
  if(!tbody || !state.currentUser) return;
  
  const mySubs = mockDB.submissions.filter(s => s.student_id === state.currentUser.id).sort((a, b) => {
     // Descending by id which has timestamp
     return b.id.localeCompare(a.id);
  });
  
  if (mySubs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-8 text-center text-slate-500">Chưa có bài nộp nào</td></tr>';
    return;
  }
  
  tbody.innerHTML = mySubs.map(sub => {
    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4">
          <p class="font-medium text-slate-800 line-clamp-1">${sub.unit_title}</p>
        </td>
        <td class="px-6 py-4">
          <audio controls src="${sub.audio_url}" class="h-8 w-32"></audio>
        </td>
        <td class="px-6 py-4 text-center">
          ${sub.status === 'pending' 
             ? '<span class="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">Đang chờ chấm</span>'
             : '<span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">Đã chấm</span>'
          }
        </td>
        <td class="px-6 py-4 text-right flex justify-end items-center gap-2">
          ${sub.status === 'pending'
             ? '<span class="text-xs text-slate-400 self-center mr-2">--</span>'
             : `<button onclick="openStudentFeedbackModal('${sub.id}')" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">${sub.score}/10 <i data-lucide="eye" class="w-3 h-3"></i></button>`
          }
          <button onclick="deleteSubmission('${sub.id}')" class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Xóa bài">
             <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
  
  lucide.createIcons();
}

window.openStudentFeedbackModal = function(subId) {
  const sub = mockDB.submissions.find(s => s.id === subId);
  if(!sub) return;
  
  document.getElementById('feedback-unit-title').textContent = sub.unit_title;
  document.getElementById('feedback-score').textContent = sub.score;
  document.getElementById('feedback-audio-player').src = sub.audio_url;
  document.getElementById('feedback-text').textContent = sub.feedback || 'Không có nhận xét.';
  const voiceSection = document.getElementById('feedback-voice-section');
  const voicePlayer = document.getElementById('feedback-voice-player');
  voiceSection.classList.toggle('hidden', !sub.voice_feedback_url);
  voicePlayer.src = sub.voice_feedback_url || '';
  
  document.getElementById('feedback-modal').classList.remove('hidden');
  document.getElementById('feedback-modal').classList.add('flex');
};

window.deleteSubmission = function(subId) {
  if(!confirm("Bạn có chắc chắn muốn xóa bài nộp này?")) return;
  mockDB.submissions = mockDB.submissions.filter(s => s.id !== subId);
  saveDB();
  if(typeof renderStudentSubmissions === 'function') renderStudentSubmissions();
};

// --- MODULE: FLASHCARDS ---
let fcState = {
  keywords: [],
  currentIndex: 0,
  isFlipped: false,
  cache: {}
};

function initFlashcards() {
  const fcPrev = document.getElementById('fc-prev');
  const fcNext = document.getElementById('fc-next');
  const fcFlip = document.getElementById('fc-flip');
  const fcInner = document.getElementById('flashcard-inner');
  const fcContainer = document.getElementById('flashcard-container');

  if(fcPrev) fcPrev.addEventListener('click', () => changeFlashcard(-1));
  if(fcNext) fcNext.addEventListener('click', () => changeFlashcard(1));
  
  if(fcFlip) fcFlip.addEventListener('click', toggleFlashcardFlip);
  if(fcContainer) fcContainer.addEventListener('click', (e) => {
    // Only flip if not clicking a button
    if(e.target.tagName !== 'BUTTON') {
      toggleFlashcardFlip();
    }
  });

  // Handle spacebar flip if in view
  document.addEventListener('keydown', (e) => {
    const section = document.getElementById('flashcard-section');
    if(!section || section.classList.contains('hidden')) return;
    
    // Only if user is not typing in an input
    if(e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      toggleFlashcardFlip();
    }
  });
}

function setupFlashcardsForUnit(unit) {
  const section = document.getElementById('flashcard-section');
  if(!section) return;

  if(!unit || !unit.keywords || unit.keywords.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  fcState.keywords = unit.keywords;
  fcState.currentIndex = 0;
  
  updateFlashcardUI();
}

function changeFlashcard(dir) {
  const newIndex = fcState.currentIndex + dir;
  if(newIndex >= 0 && newIndex < fcState.keywords.length) {
    fcState.currentIndex = newIndex;
    updateFlashcardUI();
  }
}

async function toggleFlashcardFlip() {
  const fcInner = document.getElementById('flashcard-inner');
  if(!fcInner) return;

  fcState.isFlipped = !fcState.isFlipped;
  
  if(fcState.isFlipped) {
    fcInner.classList.remove('rotate-y-0');
    fcInner.classList.add('rotate-y-180');
    await loadFlashcardMeaning();
  } else {
    fcInner.classList.remove('rotate-y-180');
    fcInner.classList.add('rotate-y-0');
  }
}

function updateFlashcardUI() {
  const keyword = fcState.keywords[fcState.currentIndex];
  document.getElementById('fc-keyword').textContent = keyword;
  document.getElementById('flashcard-counter').textContent = `${fcState.currentIndex + 1} / ${fcState.keywords.length}`;
  
  document.getElementById('fc-prev').disabled = (fcState.currentIndex === 0);
  document.getElementById('fc-next').disabled = (fcState.currentIndex === fcState.keywords.length - 1);
  
  // Reset flip state
  fcState.isFlipped = false;
  const fcInner = document.getElementById('flashcard-inner');
  fcInner.classList.remove('rotate-y-180');
  fcInner.classList.add('rotate-y-0');
  
  // Hide back side content
  document.getElementById('fc-loading').classList.add('hidden');
  document.getElementById('fc-content').classList.add('hidden');
}

async function loadFlashcardMeaning() {
  const keyword = fcState.keywords[fcState.currentIndex];
  const loadingEl = document.getElementById('fc-loading');
  const contentEl = document.getElementById('fc-content');
  
  if(fcState.cache[keyword]) {
    renderFlashcardBack(fcState.cache[keyword], keyword);
    return;
  }
  
  loadingEl.classList.remove('hidden');
  contentEl.classList.add('hidden');
  
  try {
    const res = await fetch('/api/keyword-meaning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: keyword, context: state.currentUnit?.description || "Secondary school english" })
    });
    
    if(!res.ok) throw new Error("Failed to fetch");
    
    const data = await res.json();
    fcState.cache[keyword] = data;
    renderFlashcardBack(data, keyword);
  } catch(e) {
    console.error(e);
    // Render fallback
    const fallback = { vietnameseMeaning: "Không tìm thấy nghĩa", partOfSpeech: "unknown", phonetic: "", exampleEn: "", exampleVi: "" };
    renderFlashcardBack(fallback, keyword);
  }
}

function renderFlashcardBack(data, keyword) {
  document.getElementById('fc-loading').classList.add('hidden');
  document.getElementById('fc-content').classList.remove('hidden');
  
  document.getElementById('fc-back-keyword').textContent = keyword;
  document.getElementById('fc-phonetic').textContent = data.phonetic || '';
  document.getElementById('fc-pos').textContent = data.partOfSpeech || 'word';
  document.getElementById('fc-meaning').textContent = data.vietnameseMeaning || 'Nghĩa của từ';
  document.getElementById('fc-ex-en').textContent = data.exampleEn ? '"' + data.exampleEn + '"' : '';
  document.getElementById('fc-ex-vi').textContent = data.exampleVi || '';
}
