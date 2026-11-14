const PARTS = [
    "Desire Management",
    "Capital Preservation",
    "Market Equanimity",
    "Sovereign Freedom",
];

const quotes = Array.from({ length: 96 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const part = PARTS[Math.floor(i / 24)];
    return {
        id: i + 1,
        text: `Placeholder maxim ${n} of 96. Your stoic money quote will be engraved here.`,
        attribution: `Placeholder · Part ${"I".repeat(Math.floor(i / 24) + 1).replace("IIII", "IV")} · ${part}`,
    };
});

export default quotes;
