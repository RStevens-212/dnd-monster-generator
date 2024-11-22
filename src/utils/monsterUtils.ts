function generateName(type: string): string {
  const typeToNameMap = {
    Aberration: "Gloomcreep",
    Beast: "Fangtail",
    Celestial: "Radiantwing",
    Construct: "Ironclad",
    Dragon: "Flameclaw",
    Elemental: "Stormshade",
    Fey: "Moonsprite",
    Fiend: "Hellmaw",
    Giant: "Stonebreaker",
    Humanoid: "Shadeborn",
    Monstrosity: "Riftcrawler",
    Ooze: "Sludgegrim",
    Plant: "Thornbriar",
    Undead: "Gravewight",
  };

  // If the type exists in the map, return the mapped name; otherwise, use a generic fallback
  return typeToNameMap[type] || `Mysterious ${type}`;
}

function calculateBaseStats(cr: number): {
  strength: number;
  dexterity: number;
  constitution: number;
} {
  const baseValue = Math.min(Math.max(Math.floor(cr * 3), 1), 20); // Scale with CR
  return {
    strength: baseValue + Math.floor(Math.random() * 5) - 2,
    dexterity: baseValue + Math.floor(Math.random() * 5) - 2,
    constitution: baseValue + Math.floor(Math.random() * 5) - 2,
  };
}

function generateLairActions(type: string): string[] {
  const lairActionsMap: Record<string, string[]> = {
    Dragon: [
      "The lair trembles, causing unstable structures to collapse.",
      "Volcanic vents spew lava, dealing fire damage.",
      "A sudden burst of wind knocks creatures prone.",
    ],
    Undead: [
      "The lair fills with ghostly whispers, imposing disadvantage on Wisdom saving throws.",
      "Shadows shift and attack, dealing necrotic damage.",
      "Bones animate and attempt to grapple intruders.",
    ],
    Fey: [
      "Illusory flowers bloom, creating difficult terrain.",
      "Fey magic confuses enemies, forcing them to attack allies.",
    ],
    Fiend: [
      "Pools of infernal fire erupt, dealing fire damage.",
      "Demonic laughter echoes, causing fear in non-fiends.",
    ],
    Construct: [
      "The lair's mechanical defenses activate, firing bolts or darts.",
      "Gears grind loudly, imposing disadvantage on Perception checks.",
    ],
    // Add more types as needed
    Default: ["The lair reacts unpredictably."],
  };

  // Ensure the type exists; fallback to Default
  const selectedLairActions = lairActionsMap[type] || lairActionsMap.Default;

  // Randomize and return one lair action
  return [selectedLairActions[Math.floor(Math.random() * selectedLairActions.length)]];
}

export default function generateMonster(req, res) {
  const formData = req.body;

  const type =
    formData.types && formData.types.length > 0
      ? formData.types[Math.floor(Math.random() * formData.types.length)]
      : "Unknown";

  const name = generateName(type); // Use the function to generate the name
  const size = formData.size || "Unknown";
  const cr = formData.minCR && formData.maxCR
    ? parseFloat(
        (Math.random() * (formData.maxCR - formData.minCR) + formData.minCR).toFixed(2)
      )
    : 0;

  const stats = calculateBaseStats(cr);

  const resistances: string[] = [];
  const vulnerabilities: string[] = [];
  const lairActions = formData.hasLairActions ? generateLairActions(type) : [];

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

  res.status(200).json(monster);
}