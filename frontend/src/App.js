import { useCallback, useEffect, useMemo, useState } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import quotes from "@/quotes";

const FONTS = [
    { name: "Old Standard TT", stack: '"Old Standard TT", "Big Caslon", "Bodoni MT", Georgia, serif' },
    { name: "Cormorant Garamond", stack: '"Cormorant Garamond", Georgia, serif' },
    { name: "Playfair Display", stack: '"Playfair Display", Georgia, serif' },
    { name: "Bodoni Moda", stack: '"Bodoni Moda", "Bodoni MT", serif' },
    { name: "Gloock", stack: '"Gloock", Georgia, serif' },
    { name: "Spectral", stack: '"Spectral", Georgia, serif' },
    { name: "EB Garamond", stack: '"EB Garamond", Georgia, serif' },
];

const THEMES = [
    {
        name: "abyssal",
        bg: "#0F1418",
        stage: "#202223",
        quote: "#CED4DA",
        meta: "#D0D4D8",
        frame: "#CED4DA",
    },
    {
        name: "carbon",
        bg: "#202223",
        stage: "#0F1418",
        quote: "#D0D4D8",
        meta: "#CED4DA",
        frame: "#D0D4D8",
    },
];

function App() {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [themeIndex, setThemeIndex] = useState(0);
    const [fontIndex, setFontIndex] = useState(0);
    const [atBottom, setAtBottom] = useState(false);
    const [copied, setCopied] = useState(false);

    const theme = THEMES[themeIndex % THEMES.length];
    const font = FONTS[fontIndex];
    const quote = quotes[quoteIndex];
    const entryNo = useMemo(() => String(quote.id).padStart(2, "0"), [quote.id]);

    const advance = useCallback(() => {
        setQuoteIndex((i) => (i + 1) % quotes.length);
        setThemeIndex((t) => t + 1);
        setFontIndex((f) => {
            let next = f;
            while (next === f) next = Math.floor(Math.random() * FONTS.length);
            return next;
        });
        setAtBottom((b) => !b);
        setCopied(false);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === " " || e.key === "ArrowRight") {
                e.preventDefault();
                advance();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [advance]);

    const copyQuote = useCallback(async () => {
        const text = `\u201C${quote.text}\u201D \u2014 ${quote.attribution}`;
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const el = document.createElement("textarea");
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
        setCopied(true);
        toast("Quote copied to clipboard", {
            style: {
                background: theme.stage,
                border: `1px solid ${theme.frame}`,
                color: theme.quote,
                borderRadius: 0,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            },
        });
        setTimeout(() => setCopied(false), 1800);
    }, [quote, theme]);

    return (
        <div
            className="pixel-dots min-h-[100svh] flex flex-col transition-colors duration-500 selection:bg-[#CED4DA] selection:text-[#0F1418]"
            style={{ backgroundColor: theme.bg, color: theme.quote }}
        >
            <Toaster position="top-center" />

            {/* HERO */}
            <header className="pt-10 px-6 text-center">
                <div
                    data-testid="vault-badge"
                    className="inline-block px-3 py-1 border text-[10px] font-mono-meta uppercase tracking-[0.25em]"
                    style={{
                        backgroundColor: theme.stage,
                        borderColor: `${theme.frame}33`,
                        color: theme.quote,
                    }}
                >
                    Vault Edition &bull; 96 Money &amp; Stoic Formulations
                </div>
                <h1
                    className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-none"
                    style={{ color: theme.quote }}
                >
                    <span className="ln">
                        <span>Calculated Will.</span>
                    </span>
                    <span className="ln">
                        <span>Unbroken Capital.</span>
                    </span>
                </h1>
                <p
                    className="mt-4 text-sm max-w-lg mx-auto leading-relaxed"
                    style={{ color: `${theme.meta}CC` }}
                >
                    Click the central medallion to advance through 96 stoic money quotes. The emblem
                    alternates between dead center and bottom center.
                </p>
            </header>

            {/* INTERACTIVE VAULT CONSOLE */}
            <main className="flex-1 flex items-stretch px-4 sm:px-6 pb-8 pt-6">
                <div
                    data-testid="vault-stage"
                    className="relative max-w-4xl mx-auto w-full min-h-[68svh] border-2 p-6 sm:p-10 flex flex-col items-center justify-between shadow-2xl transition-colors duration-500"
                    style={{ backgroundColor: theme.stage, borderColor: theme.stage }}
                >
                    {/* Quote area */}
                    <div className="w-full text-center min-h-[150px] flex items-center justify-center relative z-20">
                        <figure
                            key={`${quoteIndex}-${themeIndex}`}
                            className="quote-anim w-full"
                        >
                            <blockquote
                                data-testid="quote-text"
                                className="font-quote-display text-2xl sm:text-4xl leading-tight max-w-2xl mx-auto"
                                style={{ color: theme.quote, fontFamily: font.stack }}
                            >
                                &ldquo;{quote.text}&rdquo;
                            </blockquote>
                            <figcaption
                                data-testid="quote-meta"
                                className="mt-3 text-xs font-mono-meta uppercase tracking-[0.2em]"
                                style={{ color: `${theme.meta}99` }}
                            >
                                Vault Entry #{entryNo} of 96 &bull; {quote.attribution}
                            </figcaption>
                        </figure>
                    </div>

                    {/* Alternating medallion */}
                    <div
                        className="talisman-pedestal relative z-10 transition-all duration-700 ease-out my-4 flex flex-col items-center"
                        style={{ paddingBottom: atBottom ? "135px" : "0px" }}
                    >
                        <button
                            type="button"
                            data-testid="quote-medallion"
                            onClick={advance}
                            aria-label="Next quote"
                            className="block cursor-pointer transition-transform active:scale-95 p-2 border-2"
                            style={{
                                backgroundColor: theme.bg,
                                borderColor: theme.frame,
                            }}
                        >
                            <img
                                src="/placeholder.png"
                                alt="Clickable quote medallion"
                                width={176}
                                height={176}
                                draggable={false}
                                className="pixelated w-36 h-36 sm:w-44 sm:h-44 select-none"
                            />
                        </button>
                        <div
                            className="text-[10px] font-mono-meta mt-2 uppercase tracking-widest"
                            style={{ color: `${theme.meta}80` }}
                        >
                            [ Alternate Center vs Bottom State &middot; Space / &rarr; to advance ]
                        </div>
                    </div>

                    {/* Action toolbar */}
                    <div
                        className="w-full pt-4 border-t flex flex-wrap items-center justify-between gap-4 relative z-20"
                        style={{ borderColor: `${theme.frame}26` }}
                    >
                        <button
                            type="button"
                            data-testid="copy-quote-button"
                            onClick={copyQuote}
                            className="px-4 py-2 border text-xs font-mono-meta uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
                            style={{
                                backgroundColor: theme.bg,
                                borderColor: `${theme.frame}4D`,
                                color: theme.quote,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme.frame;
                                e.currentTarget.style.color = theme.bg;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = theme.bg;
                                e.currentTarget.style.color = theme.quote;
                            }}
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                            <span data-testid="copy-quote-label">
                                {copied ? "Copied" : "Copy Quote"}
                            </span>
                        </button>
                        <div
                            className="text-xs font-mono-meta"
                            style={{ color: `${theme.meta}99` }}
                        >
                            Typography:{" "}
                            <span
                                className="font-bold"
                                style={{ color: theme.quote }}
                                data-testid="font-label"
                            >
                                {font.name} 700
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
