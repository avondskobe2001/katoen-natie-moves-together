import type {
  Challenge,
  FeedPost,
  GlobalActivity,
  LeaderboardEntry,
  Match,
  Sponsorship,
  Team,
  Tournament,
  User,
} from "@/types";

export const currentUser: User = {
  id: "user-001",
  name: "Sophie Van Der Berg",
  email: "sophie.vanderberg@katoennatie.com",
  department: "Operations",
  country: "Belgium",
  terminal: "Antwerp",
  region: "europe",
  sport: ["cycling", "running"],
  totalDistance: 1247,
  totalPoints: 3840,
  joinedAt: "2024-01-15",
  achievements: [
    {
      id: "ach-1",
      title: "Tour de France Finisher",
      description: "Completed all 21 virtual stages",
      icon: "trophy",
      earnedAt: "2025-07-28",
    },
    {
      id: "ach-2",
      title: "Century Rider",
      description: "Cycled 100km in a single session",
      icon: "bike",
      earnedAt: "2025-06-12",
    },
    {
      id: "ach-3",
      title: "Global Connector",
      description: "Connected with colleagues from 10+ countries",
      icon: "globe",
      earnedAt: "2025-03-20",
    },
  ],
};

export const users: User[] = [
  currentUser,
  {
    id: "user-002",
    name: "James Mitchell",
    email: "james.mitchell@katoennatie.com",
    department: "Logistics",
    country: "United Kingdom",
    terminal: "Felixstowe",
    region: "europe",
    sport: ["cycling", "football"],
    totalDistance: 2103,
    totalPoints: 4520,
    joinedAt: "2023-11-08",
    achievements: [
      {
        id: "ach-4",
        title: "Prediction Master",
        description: "Top predictor in Nations League",
        icon: "target",
        earnedAt: "2025-09-15",
      },
    ],
  },
  {
    id: "user-003",
    name: "Amara Okafor",
    email: "amara.okafor@katoennatie.com",
    department: "Warehouse",
    country: "Nigeria",
    terminal: "Lagos",
    region: "africa",
    sport: ["running", "football"],
    totalDistance: 856,
    totalPoints: 2890,
    joinedAt: "2024-03-22",
    achievements: [
      {
        id: "ach-5",
        title: "AFCON Champion",
        description: "Won the AFCON prediction league",
        icon: "trophy",
        earnedAt: "2024-02-11",
      },
    ],
  },
  {
    id: "user-004",
    name: "Chen Wei",
    email: "chen.wei@katoennatie.com",
    department: "IT",
    country: "China",
    terminal: "Shanghai",
    region: "asia",
    sport: ["running", "walking"],
    totalDistance: 1542,
    totalPoints: 3210,
    joinedAt: "2024-06-01",
    achievements: [],
  },
  {
    id: "user-005",
    name: "Maria Santos",
    email: "maria.santos@katoennatie.com",
    department: "HR",
    country: "Brazil",
    terminal: "Santos",
    region: "americas",
    sport: ["cycling", "running"],
    totalDistance: 1890,
    totalPoints: 4100,
    joinedAt: "2023-09-14",
    achievements: [
      {
        id: "ach-6",
        title: "Marathon Walker",
        description: "Walked 42km in the Global Walk Challenge",
        icon: "footprints",
        earnedAt: "2025-01-30",
      },
    ],
  },
  {
    id: "user-006",
    name: "Pieter De Vries",
    email: "pieter.devries@katoennatie.com",
    department: "Management",
    country: "Netherlands",
    terminal: "Rotterdam",
    region: "europe",
    sport: ["cycling"],
    totalDistance: 3201,
    totalPoints: 5890,
    joinedAt: "2023-06-01",
    achievements: [
      {
        id: "ach-7",
        title: "Yellow Jersey",
        description: "Led the global cycling leaderboard for 4 weeks",
        icon: "medal",
        earnedAt: "2025-07-14",
      },
    ],
  },
];

export const challenges: Challenge[] = [
  {
    id: "chal-001",
    title: "Tour de France Virtual 2026",
    description:
      "Ride alongside the peloton! Complete 21 virtual stages mirroring the legendary Tour de France route. From Florence to Paris, every kilometre counts toward our global logistics network.",
    sport: "cycling",
    status: "active",
    startDate: "2026-07-05",
    endDate: "2026-07-27",
    targetDistance: 3408,
    currentDistance: 1847,
    participants: 1247,
    stages: [
      { id: "s1", number: 1, name: "Florence → Rimini", distance: 184, elevation: 1850, completed: true, date: "2026-07-05" },
      { id: "s2", number: 2, name: "Cesenatico → Bologna", distance: 182, elevation: 2100, completed: true, date: "2026-07-06" },
      { id: "s3", number: 3, name: "Piacenza → Turin", distance: 190, elevation: 3200, completed: true, date: "2026-07-07" },
      { id: "s4", number: 4, name: "Pinerolo → Valloire", distance: 180, elevation: 4500, completed: false, date: "2026-07-08" },
      { id: "s5", number: 5, name: "Grenoble → Lyon", distance: 175, elevation: 2800, completed: false, date: "2026-07-09" },
    ],
  },
  {
    id: "chal-002",
    title: "Global Walk Challenge Q3",
    description:
      "Walk the equivalent distance from Antwerp to Singapore — 10,500 km as a company. Every step from every terminal adds up.",
    sport: "walking",
    status: "active",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    targetDistance: 10500,
    currentDistance: 4230,
    participants: 2891,
  },
  {
    id: "chal-003",
    title: "Terminal to Terminal Run",
    description:
      "Run between Katoen Natie terminals worldwide. Connect Antwerp to Santos, Shanghai to Lagos — virtually.",
    sport: "running",
    status: "active",
    startDate: "2026-06-15",
    endDate: "2026-08-15",
    targetDistance: 5000,
    currentDistance: 3120,
    participants: 876,
  },
  {
    id: "chal-004",
    title: "Winter Wellness Ride",
    description: "Indoor and outdoor cycling challenge to keep moving through the colder months.",
    sport: "cycling",
    status: "upcoming",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    targetDistance: 800,
    participants: 0,
  },
  {
    id: "chal-005",
    title: "Container Count Challenge",
    description:
      "Custom company challenge: log 1km for every 100 containers handled at your terminal. Operations meets athletics!",
    sport: "general",
    status: "active",
    startDate: "2026-05-01",
    endDate: "2026-12-31",
    targetDistance: 25000,
    currentDistance: 14890,
    participants: 1543,
  },
];

export const tournaments: Tournament[] = [
  {
    id: "tour-001",
    name: "FIFA World Cup 2026",
    shortName: "World Cup",
    sport: "football",
    status: "upcoming",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    matches: 104,
    participants: 0,
  },
  {
    id: "tour-002",
    name: "UEFA Nations League 2026",
    shortName: "Nations League",
    sport: "football",
    status: "active",
    startDate: "2026-09-04",
    endDate: "2026-11-18",
    matches: 168,
    participants: 2134,
  },
  {
    id: "tour-003",
    name: "UEFA Euro 2028",
    shortName: "Euros",
    sport: "football",
    status: "upcoming",
    startDate: "2028-06-09",
    endDate: "2028-07-09",
    matches: 51,
    participants: 0,
  },
  {
    id: "tour-004",
    name: "Africa Cup of Nations 2025",
    shortName: "AFCON",
    sport: "football",
    status: "completed",
    startDate: "2025-12-21",
    endDate: "2026-01-18",
    matches: 52,
    participants: 1876,
  },
];

export const matches: Match[] = [
  {
    id: "match-001",
    tournamentId: "tour-002",
    homeTeam: "Belgium",
    awayTeam: "France",
    homeFlag: "🇧🇪",
    awayFlag: "🇫🇷",
    kickoff: "2026-09-05T20:45:00",
    status: "scheduled",
    round: "League A - Matchday 1",
  },
  {
    id: "match-002",
    tournamentId: "tour-002",
    homeTeam: "Netherlands",
    awayTeam: "Germany",
    homeFlag: "🇳🇱",
    awayFlag: "🇩🇪",
    kickoff: "2026-09-06T20:45:00",
    status: "scheduled",
    round: "League A - Matchday 1",
  },
  {
    id: "match-003",
    tournamentId: "tour-002",
    homeTeam: "Nigeria",
    awayTeam: "Morocco",
    homeFlag: "🇳🇬",
    awayFlag: "🇲🇦",
    kickoff: "2026-09-07T18:00:00",
    status: "scheduled",
    round: "League B - Matchday 1",
  },
  {
    id: "match-004",
    tournamentId: "tour-004",
    homeTeam: "Nigeria",
    awayTeam: "Senegal",
    homeFlag: "🇳🇬",
    awayFlag: "🇸🇳",
    homeScore: 2,
    awayScore: 1,
    kickoff: "2026-01-18T20:00:00",
    status: "finished",
    round: "Final",
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: "post-001",
    userId: "user-006",
    user: { name: "Pieter De Vries", country: "Netherlands", terminal: "Rotterdam" },
    content:
      "Stage 3 complete! 190km from Piacenza to Turin — the Alps are calling tomorrow. Who's joining me for the mountain stages? 🚴‍♂️⛰️",
    sport: "cycling",
    likes: 47,
    comments: 12,
    createdAt: "2026-07-07T18:30:00",
    achievement: "Stage 3 Finisher",
  },
  {
    id: "post-002",
    userId: "user-003",
    user: { name: "Amara Okafor", country: "Nigeria", terminal: "Lagos" },
    content:
      "Our Lagos terminal just hit 500km in the Global Walk Challenge! Proud of the warehouse team — we move containers by day and kilometres by evening. 💪",
    sport: "walking",
    likes: 89,
    comments: 23,
    createdAt: "2026-07-07T14:15:00",
  },
  {
    id: "post-003",
    userId: "user-002",
    user: { name: "James Mitchell", country: "United Kingdom", terminal: "Felixstowe" },
    content:
      "Nailed my Nations League predictions this week — Belgium 2-1 France! Come challenge me in the Predictions Arena. 🇧🇪⚽",
    sport: "football",
    likes: 34,
    comments: 8,
    createdAt: "2026-07-06T21:00:00",
  },
  {
    id: "post-004",
    userId: "user-005",
    user: { name: "Maria Santos", country: "Brazil", terminal: "Santos" },
    content:
      "Morning run along the port — 12km with views of our terminal. Nothing beats starting the day with movement and purpose. 🌅🏃‍♀️",
    sport: "running",
    likes: 56,
    comments: 15,
    createdAt: "2026-07-06T07:45:00",
  },
  {
    id: "post-005",
    userId: "user-004",
    user: { name: "Chen Wei", country: "China", terminal: "Shanghai" },
    content:
      "Shanghai team reached 1,000km combined this month! From Bund to Pudong, we're connecting terminals one step at a time.",
    sport: "walking",
    likes: 72,
    comments: 19,
    createdAt: "2026-07-05T16:20:00",
  },
  {
    id: "post-006",
    userId: "user-001",
    user: { name: "Sophie Van Der Berg", country: "Belgium", terminal: "Antwerp" },
    content:
      "Earned my Tour de France Finisher badge! 21 stages, 3,408km — what an incredible journey with colleagues worldwide. One Company. One Movement. 🏆",
    sport: "cycling",
    likes: 124,
    comments: 31,
    createdAt: "2025-07-28T20:00:00",
    achievement: "Tour de France Finisher",
  },
];

export const globalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "user-006", name: "Pieter De Vries", country: "Netherlands", terminal: "Rotterdam", department: "Management", points: 5890, distance: 3201 },
  { rank: 2, userId: "user-002", name: "James Mitchell", country: "United Kingdom", terminal: "Felixstowe", department: "Logistics", points: 4520, distance: 2103 },
  { rank: 3, userId: "user-005", name: "Maria Santos", country: "Brazil", terminal: "Santos", department: "HR", points: 4100, distance: 1890 },
  { rank: 4, userId: "user-001", name: "Sophie Van Der Berg", country: "Belgium", terminal: "Antwerp", department: "Operations", points: 3840, distance: 1247 },
  { rank: 5, userId: "user-004", name: "Chen Wei", country: "China", terminal: "Shanghai", department: "IT", points: 3210, distance: 1542 },
  { rank: 6, userId: "user-003", name: "Amara Okafor", country: "Nigeria", terminal: "Lagos", department: "Warehouse", points: 2890, distance: 856 },
];

export const cyclingLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "user-006", name: "Pieter De Vries", country: "Netherlands", terminal: "Rotterdam", department: "Management", points: 3200, distance: 3201 },
  { rank: 2, userId: "user-002", name: "James Mitchell", country: "United Kingdom", terminal: "Felixstowe", department: "Logistics", points: 2100, distance: 2103 },
  { rank: 3, userId: "user-001", name: "Sophie Van Der Berg", country: "Belgium", terminal: "Antwerp", department: "Operations", points: 1247, distance: 1247 },
];

export const predictionLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "user-002", name: "James Mitchell", country: "United Kingdom", terminal: "Felixstowe", department: "Logistics", points: 890, predictions: 42 },
  { rank: 2, userId: "user-003", name: "Amara Okafor", country: "Nigeria", terminal: "Lagos", department: "Warehouse", points: 756, predictions: 38 },
  { rank: 3, userId: "user-006", name: "Pieter De Vries", country: "Netherlands", terminal: "Rotterdam", department: "Management", points: 654, predictions: 35 },
];

export const teams: Team[] = [
  { id: "team-001", name: "Antwerp Operations", type: "terminal", members: 234, totalPoints: 45200, totalDistance: 12400, terminal: "Antwerp", country: "Belgium" },
  { id: "team-002", name: "Rotterdam Cyclists", type: "terminal", members: 189, totalPoints: 38900, totalDistance: 18900, terminal: "Rotterdam", country: "Netherlands" },
  { id: "team-003", name: "Belgium National", type: "country", members: 567, totalPoints: 98400, totalDistance: 34500, country: "Belgium" },
  { id: "team-004", name: "Lagos Warehouse Warriors", type: "terminal", members: 145, totalPoints: 22100, totalDistance: 8900, terminal: "Lagos", country: "Nigeria" },
  { id: "team-005", name: "Logistics Division", type: "department", members: 892, totalPoints: 156000, totalDistance: 67800, department: "Logistics" },
  { id: "team-006", name: "Shanghai Movers", type: "terminal", members: 312, totalPoints: 41200, totalDistance: 15600, terminal: "Shanghai", country: "China" },
];

export const globalActivities: GlobalActivity[] = [
  { id: "act-1", country: "Belgium", terminal: "Antwerp", lat: 51.22, lng: 4.40, activity: "Completed Stage 3 — 190km", sport: "cycling", timestamp: "2026-07-07T18:30:00" },
  { id: "act-2", country: "Netherlands", terminal: "Rotterdam", lat: 51.92, lng: 4.48, activity: "Morning ride — 45km", sport: "cycling", timestamp: "2026-07-07T07:15:00" },
  { id: "act-3", country: "Nigeria", terminal: "Lagos", lat: 6.45, lng: 3.40, activity: "Team walk — 8km", sport: "walking", timestamp: "2026-07-07T14:15:00" },
  { id: "act-4", country: "Brazil", terminal: "Santos", lat: -23.96, lng: -46.33, activity: "Port run — 12km", sport: "running", timestamp: "2026-07-06T07:45:00" },
  { id: "act-5", country: "China", terminal: "Shanghai", lat: 31.23, lng: 121.47, activity: "Evening walk — 6km", sport: "walking", timestamp: "2026-07-05T16:20:00" },
  { id: "act-6", country: "United Kingdom", terminal: "Felixstowe", lat: 51.96, lng: 1.35, activity: "Prediction submitted", sport: "football", timestamp: "2026-07-06T21:00:00" },
  { id: "act-7", country: "South Africa", terminal: "Durban", lat: -29.86, lng: 31.02, activity: "Weekend cycle — 80km", sport: "cycling", timestamp: "2026-07-06T11:00:00" },
  { id: "act-8", country: "United States", terminal: "Houston", lat: 29.76, lng: -95.37, activity: "Lunch walk — 3km", sport: "walking", timestamp: "2026-07-07T12:30:00" },
];

export const sponsorships: Sponsorship[] = [
  {
    id: "spon-001",
    name: "INEOS Grenadiers",
    description:
      "Katoen Natie proudly partners with INEOS Grenadiers, one of the world's leading professional cycling teams. Together we champion performance, teamwork, and the pursuit of excellence — on the road and in logistics.",
    sport: "Cycling",
    since: "2019",
  },
  {
    id: "spon-002",
    name: "Club Brugge",
    description:
      "Supporting Belgian football excellence through our partnership with Club Brugge, connecting local pride with global ambition.",
    sport: "Football",
    since: "2021",
  },
  {
    id: "spon-003",
    name: "Antwerp Marathon",
    description:
      "Title sponsor of the Antwerp Marathon, bringing together runners from across our global network for one of Europe's premier road races.",
    sport: "Running",
    since: "2018",
  },
];

export const platformStats = {
  totalParticipants: 3847,
  totalDistance: 284750,
  totalCountries: 32,
  totalTerminals: 68,
  activeChallenges: 4,
  activeTournaments: 1,
};