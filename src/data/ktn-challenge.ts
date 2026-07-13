import type { KTNJerseyHolder, KTNParticipant } from "@/types";

export const ktnChallengeMeta = {
  id: "ktn-tdf-2026",
  title: "KTN de France Challenge",
  subtitle: "Ride the Tour with Katoen Natie. Connect Strava and every kilometre counts.",
  startDate: "2026-07-04",
  endDate: "2026-07-26",
  targetDistance: 3320.7,
  participants: 847,
  rules: [
    "Connect your Strava account — rides sync automatically during the Tour",
    "All cycling activities between 4–26 July count toward your total",
    "Complete a virtual stage by riding at least 80% of that stage's distance on the same calendar day",
    "Jerseys are awarded daily based on cumulative standings",
  ],
};

export const ktnParticipants: KTNParticipant[] = [
  { userId: "user-006", name: "Pieter De Vries", country: "Netherlands", terminal: "Rotterdam", department: "Management", birthDate: "1988-03-14", gender: "male", totalDistance: 724.2, elevationGain: 8420, stagesCompleted: 5, stravaConnected: true, lastActivity: "2026-07-08T07:15:00" },
  { userId: "user-002", name: "James Mitchell", country: "United Kingdom", terminal: "Felixstowe", department: "Logistics", birthDate: "1991-07-22", gender: "male", totalDistance: 612.8, elevationGain: 5180, stagesCompleted: 5, stravaConnected: true, lastActivity: "2026-07-08T06:30:00" },
  { userId: "user-001", name: "Sophie Van Der Berg", country: "Belgium", terminal: "Antwerp", department: "Operations", birthDate: "1998-11-05", gender: "female", totalDistance: 589.4, elevationGain: 4920, stagesCompleted: 5, stravaConnected: true, lastActivity: "2026-07-08T18:30:00" },
  { userId: "user-005", name: "Maria Santos", country: "Brazil", terminal: "Santos", department: "HR", birthDate: "1990-04-18", gender: "female", totalDistance: 445.1, elevationGain: 3210, stagesCompleted: 4, stravaConnected: true, lastActivity: "2026-07-07T07:45:00" },
  { userId: "user-004", name: "Chen Wei", country: "China", terminal: "Shanghai", department: "IT", birthDate: "2001-09-30", gender: "male", totalDistance: 398.6, elevationGain: 2840, stagesCompleted: 4, stravaConnected: false, lastActivity: "2026-07-06T16:20:00" },
  { userId: "user-003", name: "Amara Okafor", country: "Nigeria", terminal: "Lagos", department: "Warehouse", birthDate: "1995-12-08", gender: "female", totalDistance: 312.5, elevationGain: 1890, stagesCompleted: 3, stravaConnected: true, lastActivity: "2026-07-07T14:15:00" },
  { userId: "user-007", name: "Lucas Vermeer", country: "Belgium", terminal: "Antwerp", department: "Operations", birthDate: "2002-06-12", gender: "male", totalDistance: 478.3, elevationGain: 4100, stagesCompleted: 5, stravaConnected: true, lastActivity: "2026-07-08T17:00:00" },
  { userId: "user-008", name: "Emma Laurent", country: "France", terminal: "Marseille", department: "Logistics", birthDate: "2000-02-28", gender: "female", totalDistance: 356.7, elevationGain: 3650, stagesCompleted: 4, stravaConnected: true, lastActivity: "2026-07-08T06:00:00" },
  { userId: "user-009", name: "Tom Bakker", country: "Netherlands", terminal: "Rotterdam", department: "Warehouse", birthDate: "2003-08-19", gender: "male", totalDistance: 421.9, elevationGain: 3890, stagesCompleted: 5, stravaConnected: true, lastActivity: "2026-07-08T05:45:00" },
  { userId: "user-010", name: "Fatima Al-Rashid", country: "UAE", terminal: "Dubai", department: "Management", birthDate: "1993-01-15", gender: "female", totalDistance: 267.4, elevationGain: 1240, stagesCompleted: 3, stravaConnected: false },
];

function getAge(birthDate: string, asOf = "2026-07-08"): number {
  const birth = new Date(birthDate);
  const ref = new Date(asOf);
  let age = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) age--;
  return age;
}

export function getKTNGCLeaderboard(): KTNParticipant[] {
  return [...ktnParticipants].sort((a, b) => b.totalDistance - a.totalDistance);
}

export function getKTNJerseyHolders(): KTNJerseyHolder[] {
  const sorted = getKTNGCLeaderboard();
  const gcLeader = sorted[0];

  const youngRiders = sorted.filter((p) => getAge(p.birthDate) <= 25);
  const youngLeader = youngRiders[0];

  const mountainLeader = [...ktnParticipants].sort((a, b) => b.elevationGain - a.elevationGain)[0];

  const women = sorted.filter((p) => p.gender === "female");
  const womenLeader = women[0];

  return [
    { type: "gc", participant: gcLeader, value: gcLeader.totalDistance, unit: "km" },
    { type: "young", participant: youngLeader, value: youngLeader.totalDistance, unit: "km" },
    { type: "mountain", participant: mountainLeader, value: mountainLeader.elevationGain, unit: "m" },
    { type: "women", participant: womenLeader, value: womenLeader.totalDistance, unit: "km" },
  ];
}