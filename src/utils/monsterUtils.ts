function generateName(type: string): string {
  const typeToNameMap: Record<string, string[]> = {
    Aberration: ["Gloomcreep", "Mindshatter", "Voidspawn"],
    Beast: ["Fangtail", "Clawmaw", "Prowling Shadow"],
    Celestial: ["Radiantwing", "Skyflame", "Lightbringer"],
    Construct: ["Ironclad", "Steel Sentinel", "Gearcrusher"],
    Dragon: ["Flameclaw", "Stormfang", "Shadowwing"],
    Elemental: ["Stormshade", "Infernal Spark", "Earthshard"],
    Fey: ["Moonsprite", "Starweaver", "Whisperbloom"],
    Fiend: ["Hellmaw", "Doomcaller", "Ashfang"],
    Giant: ["Stonebreaker", "Earthheaver", "Frostfang"],
    Humanoid: ["Shadeborn", "Bladewalker", "Duskscourge"],
    Monstrosity: ["Riftcrawler", "Nightstalker", "Abyssfang"],
    Ooze: ["Sludgegrim", "Blightmass", "Gelatinous Wraith"],
    Plant: ["Thornbriar", "Barkwrath", "Vinewraith"],
    Undead: ["Gravewight", "Bonehollow", "Ghastcaller"],
  };

  // Pick a random name from the list for the given type
  const names = typeToNameMap[type] || [`Mysterious ${type}`];
  return names[Math.floor(Math.random() * names.length)];
}

function getValidCR(minCR: number, maxCR: number): number {
  const validCRs = [
    0, 1 / 8, 1 / 4, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  // Filter valid CRs within the specified range
  const filteredCRs = validCRs.filter((cr) => cr >= minCR && cr <= maxCR);

  // Randomly select one of the valid CRs
  return filteredCRs[Math.floor(Math.random() * filteredCRs.length)];
}

function calculateBaseStats(cr: number): {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
} {
  const baseValue = Math.min(Math.max(Math.floor(cr * 3), 1), 20); // Scale with CR
  const randomModifier = () => Math.floor(Math.random() * 5) - 2; // Random modifier between -2 and +2

  return {
    strength: baseValue + randomModifier(),
    dexterity: baseValue + randomModifier(),
    constitution: baseValue + randomModifier(),
    intelligence: baseValue + randomModifier(),
    wisdom: baseValue + randomModifier(),
    charisma: baseValue + randomModifier(),
  };
}

function generateLairActions(): string[] {
  const universalLairActions = [
    "The lair trembles, causing unstable structures to collapse.",
    "Volcanic vents spew lava, dealing fire damage.",
    "A sudden burst of wind knocks creatures prone.",
    "The lair fills with ghostly whispers, imposing disadvantage on Wisdom saving throws.",
    "Shadows shift and attack, dealing necrotic damage.",
    "Bones animate and attempt to grapple intruders.",
    "Illusory flowers bloom, creating difficult terrain.",
    "Fey magic confuses enemies, forcing them to attack allies.",
    "Pools of infernal fire erupt, dealing fire damage.",
    "Demonic laughter echoes, causing fear in non-fiends.",
    "The lair's mechanical defenses activate, firing bolts or darts.",
    "Gears grind loudly, imposing disadvantage on Perception checks.",
  ];

  // Randomly pick 1 to 3 actions from the list
  const numberOfActions = Math.floor(Math.random() * 3) + 1; // Between 1 and 3
  const shuffledActions = universalLairActions.sort(() => 0.5 - Math.random());
  return shuffledActions.slice(0, numberOfActions);
}

export default function generateMonster(req) {
  const formData = req;

  const type = formData.type;

  const name = generateName(type); // Use the function to generate the name
  const size = formData.size || "Unknown";
  const minCR = formData.minCR ?? 0;
  const maxCR = formData.maxCR ?? 30;

  const cr = getValidCR(minCR, maxCR); // Pick a valid CR

  const stats = calculateBaseStats(cr);

  const resistances: string[] = formData.resistances;
  const vulnerabilities: string[] = formData.vulnerabilities;
  const lairActions = formData.hasLairActions ? generateLairActions() : [];

  const monster = {
    name,
    type,
    size,
    cr,
    stats,
    resistances,
    vulnerabilities,
    lairActions,
  };

  return monster;
}