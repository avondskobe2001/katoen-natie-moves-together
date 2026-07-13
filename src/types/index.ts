export type SportType = "cycling" | "running" | "walking" | "football" | "general";

export type ChallengeStatus = "active" | "upcoming" | "completed";

export type Region =
  | "global"
  | "europe"
  | "africa"
  | "asia"
  | "americas"
  | "oceania";

export type Gender = "male" | "female" | "other";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type EmailType = "corporate" | "personal";

export type KTNJerseyType = "gc" | "young" | "mountain" | "women";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  country: string;
  terminal: string;
  region: Region;
  sport: SportType[];
  totalDistance: number;
  totalPoints: number;
  achievements: Achievement[];
  joinedAt: string;
  birthDate?: string;
  gender?: Gender;
  elevationGain?: number;
  stravaConnected?: boolean;
  stravaAthleteId?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  sport: SportType;
  status: ChallengeStatus;
  startDate: string;
  endDate: string;
  targetDistance?: number;
  currentDistance?: number;
  participants: number;
  image?: string;
  stages?: CyclingStage[];
}

export interface CyclingStage {
  id: string;
  number: number;
  name: string;
  distance: number;
  elevation: number;
  completed: boolean;
  date: string;
}

export type TDFStageType =
  | "flat"
  | "hilly"
  | "mountain"
  | "team-tt"
  | "individual-tt"
  | "rest";

export interface TDFStage {
  number: number;
  date: string;
  start: string;
  finish: string;
  distance: number;
  type: TDFStageType;
  status: "completed" | "live" | "upcoming";
  winner?: string;
  winnerTeam?: string;
  winnerCountry?: string;
  winningTime?: string;
}

export interface TDFProRider {
  rank: number;
  name: string;
  team: string;
  country: string;
  time: string;
  gap: string;
}

export interface TDFJerseyHolder {
  jersey: "yellow" | "green" | "polka" | "white";
  rider: string;
  team: string;
  country: string;
  points?: string;
}

export interface KTNParticipant {
  userId: string;
  name: string;
  country: string;
  terminal: string;
  department: string;
  birthDate: string;
  gender: Gender;
  totalDistance: number;
  elevationGain: number;
  stagesCompleted: number;
  stravaConnected: boolean;
  lastActivity?: string;
}

export interface KTNJerseyHolder {
  type: KTNJerseyType;
  participant: KTNParticipant;
  value: number;
  unit: string;
}

export interface StravaTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  athleteId: number;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  sport: "football";
  status: ChallengeStatus;
  startDate: string;
  endDate: string;
  matches: number;
  participants: number;
  logo?: string;
}

export interface Prediction {
  id: string;
  userId: string;
  tournamentId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  kickoff: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
  round: string;
}

export interface FeedPost {
  id: string;
  userId: string;
  user: Pick<User, "name" | "avatar" | "country" | "terminal">;
  content: string;
  image?: string;
  sport: SportType;
  likes: number;
  comments: number;
  createdAt: string;
  achievement?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  country: string;
  terminal: string;
  department: string;
  points: number;
  distance?: number;
  predictions?: number;
}

export interface Team {
  id: string;
  name: string;
  type: "department" | "country" | "terminal";
  members: number;
  totalPoints: number;
  totalDistance: number;
  country?: string;
  terminal?: string;
  department?: string;
  logo?: string;
}

export interface GlobalActivity {
  id: string;
  country: string;
  terminal: string;
  lat: number;
  lng: number;
  activity: string;
  sport: SportType;
  timestamp: string;
}

export interface Sponsorship {
  id: string;
  name: string;
  description: string;
  sport: string;
  since: string;
  logo?: string;
}