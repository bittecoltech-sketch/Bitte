"use client";

import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from "recharts";
import {
    Brain, Loader2, Send, FileText, Sparkles,
    BarChart2, PieChart as PieIcon, TrendingUp,
    Zap, Clock, ShieldCheck, Star,
    Upload, FileSpreadsheet, AlertCircle, CheckCircle2,
    ArrowUpRight, ArrowDownRight, Minus, Download
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const API_KEY = "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";
const MODEL = "stepfun/step-3.5-flash:free";
const COLORS = ["#2563EB", "#059669", "#F59E0B", "#DC2626", "#8B5CF6", "#06B6D4", "#EC4899", "#84CC16"];

// ─── Prompts ──────────────────────────────────────────────────────────────────

const BI_TEXT_PROMPT = `You are an advanced Business Intelligence analyst and executive data consultant.
Your task is to interpret structured data summaries and transform them into clear, high-value business insights.

Write the response in Spanish using this exact structure:

📊 Resumen Ejecutivo
[concise overview]

📈 Tendencias Clave
[patterns and directional movement]

⚠ Anomalías y Observaciones
[irregular or noteworthy behavior]

💡 Insights de Negocio
[operational implications]

🚀 Recomendaciones
[practical next actions]

Rules:
- Always respond in Spanish
- Professional executive tone
- Never invent data
- Be concise but insightful`;

const BI_CHART_PROMPT = `You are a data extraction specialist. Extract numerical data from the user's text and return ONLY a valid JSON object (no markdown, no explanation, just raw JSON).

The JSON must follow this exact schema:
{
  "barChart": { "title": "string", "data": [{ "name": "string", "value": number }] },
  "pieChart": { "title": "string", "data": [{ "name": "string", "value": number }] },
  "lineChart": { "title": "string", "data": [{ "name": "string", "value": number }] }
}

Rules:
- barChart: regional/category comparisons
- pieChart: distribution/composition
- lineChart: time-series or sequential data
- If a chart type has no relevant data, set its "data" to []
- Values must be pure numbers
- Maximum 8 items per chart
- Return ONLY the JSON, nothing else`;

const BI_ENGINE_PROMPT = `You are an autonomous Business Intelligence engine.
Your task is to analyze structured data extracted from an uploaded Excel file and automatically design a dashboard specification plus a concise executive summary.

INPUT: You will receive tabular data converted from Excel in structured JSON format.

YOUR RESPONSIBILITIES:
1. Understand the dataset structure - detect numeric columns, categories, time-based fields
2. Generate key KPIs - totals, averages, highest/lowest values, relevant comparisons
3. Propose optimal visualizations with actual data arrays for rendering
4. Identify notable patterns - trends, concentration, irregularities
5. Produce a concise executive summary (3-6 sentences in Spanish)

OUTPUT FORMAT - Respond ONLY in valid JSON with this exact structure:
{
  "kpis": [{ "name": "string", "value": "string", "description": "string", "trend": "up|down|neutral" }],
  "charts": [{ "type": "bar|line|pie", "title": "string", "insight": "string", "data": [{ "name": "string", "value": number }] }],
  "insights": ["string"],
  "executive_summary": "string"
}

RULES:
- Never invent missing data
- executive_summary, insights, kpi names/descriptions, chart titles all in Spanish
- Maximum 8 data points per chart
- Return ONLY valid JSON, no markdown, no explanation`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TextChartDataPoint { name: string; value: number; }
interface TextChartSection { title: string; data: TextChartDataPoint[]; }
interface TextChartPayload { barChart: TextChartSection; pieChart: TextChartSection; lineChart: TextChartSection; }

interface KPI { name: string; value: string; description: string; trend?: "up" | "down" | "neutral"; }
interface ExcelChartData { name: string; value: number;[key: string]: string | number; }
interface ExcelChart { type: "bar" | "line" | "pie"; title: string; insight: string; data: ExcelChartData[]; }
interface BIResult { kpis: KPI[]; charts: ExcelChart[]; insights: string[]; executive_summary: string; }

type Tab = "text" | "excel";

// ─── Static data ──────────────────────────────────────────────────────────────

const FEATURES = [
    { icon: Zap, label: "Análisis en segundos", color: "text-bitte-gold", bg: "bg-bitte-gold/10 border-bitte-gold/20" },
    { icon: BarChart2, label: "Gráficos automáticos", color: "text-bitte-blue", bg: "bg-bitte-blue/10 border-bitte-blue/20" },
    { icon: ShieldCheck, label: "Sin configuración", color: "text-bitte-green", bg: "bg-bitte-green/10 border-bitte-green/20" },
    { icon: Clock, label: "Resultados al instante", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const EXAMPLE_DATA = `Ventas totales Q1: $1,240,000
Región Norte: $520,000 (+22% vs Q4)
Región Sur: $380,000 (+5% vs Q4)
Región Este: $340,000 (-3% vs Q4)
Producto A: 38% del total
Producto B: 27% del total
Producto C: 19% del total
Otros: 16%
Devoluciones: 4.1%
Clientes nuevos: 312
Ticket promedio: $3,974`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function downloadTemplate() {
    const data = [
        ["Mes", "Region", "Producto", "Ventas", "Unidades", "Costo", "Utilidad"],
        ["Enero", "Norte", "Producto A", 52000, 320, 31200, 20800],
        ["Enero", "Sur", "Producto B", 38000, 210, 24700, 13300],
        ["Enero", "Este", "Producto C", 29500, 180, 17700, 11800],
        ["Febrero", "Norte", "Producto A", 61000, 390, 36600, 24400],
        ["Febrero", "Sur", "Producto B", 41000, 240, 26650, 14350],
        ["Febrero", "Este", "Producto C", 33000, 200, 19800, 13200],
        ["Marzo", "Norte", "Producto A", 57500, 360, 34500, 23000],
        ["Marzo", "Sur", "Producto B", 44500, 265, 28925, 15575],
        ["Marzo", "Este", "Producto C", 37000, 225, 22200, 14800],
        ["Abril", "Norte", "Producto A", 68000, 420, 40800, 27200],
        ["Abril", "Sur", "Producto B", 49000, 290, 31850, 17150],
        ["Abril", "Este", "Producto C", 41000, 250, 24600, 16400],
        ["Mayo", "Norte", "Producto A", 72000, 450, 43200, 28800],
        ["Mayo", "Sur", "Producto B", 53500, 315, 34775, 18725],
        ["Mayo", "Este", "Producto C", 45000, 275, 27000, 18000],
        ["Junio", "Norte", "Producto A", 78000, 490, 46800, 31200],
        ["Junio", "Sur", "Producto B", 58000, 340, 37700, 20300],
        ["Junio", "Este", "Producto C", 49500, 300, 29700, 19800],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 10 }, { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "plantilla_bitte_bi.xlsx");
}

async function callAPI(systemPrompt: string, userContent: string): Promise<string> {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://bitte.tech",
            "X-Title": "BITTE BI Analyst",
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
            ],
        }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "";
}

// ─── Shared chart sub-components ─────────────────────────────────────────────

function TextAnalysisResult({ text }: { text: string }) {
    const HEADERS = ["📊", "📈", "⚠", "💡", "🚀"];
    return (
        <div className="space-y-2 text-sm leading-relaxed">
            {text.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed || trimmed === "---") return null;
                const clean = trimmed.replace(/\*\*/g, "");
                const isHeader = HEADERS.some(h => clean.startsWith(h));
                if (isHeader) return <h4 key={i} className="font-bold text-white text-base mt-5 first:mt-0">{clean}</h4>;
                if (clean.startsWith("-") || clean.startsWith("•")) {
                    return <p key={i} className="text-white/75 pl-4 border-l-2 border-bitte-blue/30 py-0.5">{clean.replace(/^[-•]\s*/, "")}</p>;
                }
                return <p key={i} className="text-white/80">{clean}</p>;
            })}
        </div>
    );
}

function TextGeneratedCharts({ charts }: { charts: TextChartPayload }) {
    const hasBar = charts.barChart?.data?.length > 0;
    const hasPie = charts.pieChart?.data?.length > 0;
    const hasLine = charts.lineChart?.data?.length > 0;
    if (!hasBar && !hasPie && !hasLine) return null;
    return (
        <div className="space-y-6 mt-6">
            <div className="flex items-center gap-2 border-t border-white/10 pt-6">
                <BarChart2 className="w-4 h-4 text-bitte-gold" />
                <span className="text-sm font-bold text-white">Visualizaciones Generadas</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {hasBar && (
                    <div className="bg-bitte-base/60 rounded-xl p-5 border border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart2 className="w-4 h-4 text-bitte-blue" />
                            <span className="text-xs font-semibold text-bitte-steel uppercase tracking-wider">{charts.barChart.title}</span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={charts.barChart.data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} cursor={{ fill: "rgba(37,99,235,0.1)" }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {charts.barChart.data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
                {hasPie && (
                    <div className="bg-bitte-base/60 rounded-xl p-5 border border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                            <PieIcon className="w-4 h-4 text-bitte-green" />
                            <span className="text-xs font-semibold text-bitte-steel uppercase tracking-wider">{charts.pieChart.title}</span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={charts.pieChart.data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                                    {charts.pieChart.data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} formatter={(val: number) => [`${val}`, ""]} />
                                <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "11px" }}>{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
                {hasLine && (
                    <div className={`bg-bitte-base/60 rounded-xl p-5 border border-white/5 ${!hasBar || !hasPie ? "" : "md:col-span-2"}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-bitte-gold" />
                            <span className="text-xs font-semibold text-bitte-steel uppercase tracking-wider">{charts.lineChart.title}</span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={charts.lineChart.data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

function KPICard({ kpi }: { kpi: KPI }) {
    const TrendIcon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
    const trendColor = kpi.trend === "up" ? "text-bitte-green" : kpi.trend === "down" ? "text-red-400" : "text-bitte-steel";
    return (
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-2 hover:border-bitte-blue/30 transition-all">
            <span className="text-xs text-bitte-steel uppercase tracking-wider">{kpi.name}</span>
            <div className="flex items-end justify-between gap-2">
                <span className="text-2xl font-bold text-white leading-none">{kpi.value}</span>
                <TrendIcon className={`w-5 h-5 ${trendColor} shrink-0`} />
            </div>
            <p className="text-xs text-bitte-steel/80 leading-relaxed">{kpi.description}</p>
        </div>
    );
}

function ExcelDynamicChart({ chart }: { chart: ExcelChart }) {
    const Icon = chart.type === "bar" ? BarChart2 : chart.type === "pie" ? PieIcon : TrendingUp;
    const iconColor = chart.type === "bar" ? "text-bitte-blue" : chart.type === "pie" ? "text-bitte-green" : "text-bitte-gold";
    return (
        <div className="glass-panel rounded-xl p-5">
            <div className="flex items-start gap-2 mb-1">
                <Icon className={`w-4 h-4 ${iconColor} mt-0.5 shrink-0`} />
                <div>
                    <h4 className="text-sm font-semibold text-white">{chart.title}</h4>
                    <p className="text-xs text-bitte-steel mt-0.5">{chart.insight}</p>
                </div>
            </div>
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={220}>
                    {chart.type === "bar" ? (
                        <BarChart data={chart.data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} itemStyle={{ color: "#fff" }} cursor={{ fill: "rgba(37,99,235,0.08)" }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chart.data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Bar>
                        </BarChart>
                    ) : chart.type === "line" ? (
                        <LineChart data={chart.data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} itemStyle={{ color: "#fff" }} />
                            <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 3 }} activeDot={{ r: 5 }} />
                        </LineChart>
                    ) : (
                        <PieChart>
                            <Pie data={chart.data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                                {chart.data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#0B1121", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px" }} itemStyle={{ color: "#fff" }} />
                            <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: "#94a3b8", fontSize: "11px" }}>{v}</span>} />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function TextAnalyzerPanel() {
    const [dataInput, setDataInput] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [charts, setCharts] = useState<TextChartPayload | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const resultRef = useRef<HTMLDivElement>(null);

    const handleAnalyze = async () => {
        const trimmed = dataInput.trim();
        if (!trimmed || isLoading) return;
        setIsLoading(true); setError(""); setAnalysis(""); setCharts(null);
        try {
            const [textResult, chartResult] = await Promise.all([
                callAPI(BI_TEXT_PROMPT, `Analiza el siguiente resumen de datos:\n\n${trimmed}`),
                callAPI(BI_CHART_PROMPT, trimmed),
            ]);
            setAnalysis(textResult);
            try {
                const cleaned = chartResult.replace(/```json|```/g, "").trim();
                setCharts(JSON.parse(cleaned));
            } catch { console.warn("Chart parse failed"); }
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        } catch {
            setError("Hubo un problema al conectar con el servicio. Por favor intenta de nuevo.");
        } finally { setIsLoading(false); }
    };

    return (
        <div className="space-y-6">
            {/* Panel header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bitte-blue to-bitte-green flex items-center justify-center shadow-lg shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Analizador BI con IA</h3>
                    <p className="text-sm text-bitte-steel">Pega cualquier dato y obtén análisis ejecutivo + gráficos en segundos</p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-bitte-green/10 border border-bitte-green/20 rounded-full px-3 py-1">
                    <span className="w-2 h-2 rounded-full bg-bitte-green animate-pulse" />
                    <span className="text-xs text-bitte-green font-medium">En línea</span>
                </div>
            </div>

            {/* Textarea */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white">
                        <FileText className="w-4 h-4 text-bitte-blue" />
                        Tus datos de negocio
                    </label>
                    <button onClick={() => setDataInput(EXAMPLE_DATA)} className="text-xs text-bitte-blue hover:text-bitte-green transition-colors underline underline-offset-2">
                        ✨ Cargar ejemplo
                    </button>
                </div>
                <textarea
                    value={dataInput}
                    onChange={(e) => setDataInput(e.target.value)}
                    placeholder={`Ejemplo de lo que puedes pegar aquí:\n\nVentas totales: $1,240,000\nRegión Norte: $520,000 (+22%)\nRegión Sur: $380,000 (+5%)\nProducto A: 38%, Producto B: 27%\nDevoluciones: 4.1%\n\n¡Pega tus propios datos y la IA hará el resto!`}
                    rows={8}
                    className="w-full bg-bitte-base/80 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitte-blue/50 focus:ring-1 focus:ring-bitte-blue/20 transition-all resize-none font-mono leading-relaxed"
                />
                <p className="text-xs text-bitte-steel/50 mt-2 pl-1">Acepta: tablas, métricas, reportes de ventas, KPIs, datos de inventario, finanzas y más.</p>
            </div>

            {/* CTA */}
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !dataInput.trim()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-bitte-blue to-bitte-green rounded-2xl font-bold text-white text-base hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
            >
                {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Analizando tus datos con IA...</>
                ) : (
                    <><Send className="w-5 h-5" /> Generar Análisis Ejecutivo + Gráficos <span className="text-white/60 text-sm font-normal">— gratis</span></>
                )}
            </button>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">{error}</div>}

            {(analysis || charts) && (
                <div ref={resultRef} className="border-t border-white/10 pt-6 space-y-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-bitte-gold" />
                        <span className="text-sm font-bold text-white">Tu Análisis Ejecutivo</span>
                        <span className="ml-auto text-xs text-bitte-steel">Generado por BITTE AI</span>
                    </div>
                    {analysis && (
                        <div className="bg-bitte-base/60 rounded-2xl p-6 border border-white/5">
                            <TextAnalysisResult text={analysis} />
                        </div>
                    )}
                    {charts && <TextGeneratedCharts charts={charts} />}
                </div>
            )}
        </div>
    );
}

function ExcelUploaderPanel() {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [rowCount, setRowCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<BIResult | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const processFile = useCallback(async (file: File) => {
        setError(""); setResult(null); setFileName(file.name);
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        if (jsonData.length === 0) { setError("El archivo no contiene datos válidos."); return; }
        const sample = jsonData.slice(0, 200);
        setRowCount(jsonData.length);
        setIsLoading(true);
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", "HTTP-Referer": "https://bitte.tech", "X-Title": "BITTE BI Engine" },
                body: JSON.stringify({ model: MODEL, messages: [{ role: "system", content: BI_ENGINE_PROMPT }, { role: "user", content: `Analiza este dataset extraído de Excel y genera el dashboard BI:\n\n${JSON.stringify(sample, null, 2)}` }] }),
            });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            const raw = data.choices?.[0]?.message?.content ?? "";
            const parsed: BIResult = JSON.parse(raw.replace(/```json|```/g, "").trim());
            setResult(parsed);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
        } catch (e) {
            console.error(e);
            setError("Error al analizar el archivo. Verifica que el Excel tenga datos estructurados e intenta de nuevo.");
        } finally { setIsLoading(false); }
    }, []);

    const handleFile = (file: File) => {
        if (!file.name.match(/\.(xlsx|xls|csv)$/)) { setError("Por favor sube un archivo .xlsx, .xls o .csv"); return; }
        processFile(file);
    };

    return (
        <div className="space-y-6">
            {/* Panel header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bitte-gold to-orange-500 flex items-center justify-center shadow-lg shrink-0">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Dashboard desde Excel</h3>
                    <p className="text-sm text-bitte-steel">Sube tu archivo y la IA genera KPIs, gráficos y resumen ejecutivo</p>
                </div>
                <button
                    onClick={downloadTemplate}
                    className="ml-auto hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bitte-gold/10 border border-bitte-gold/30 text-bitte-gold text-xs font-semibold hover:bg-bitte-gold/20 transition-all group"
                >
                    <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    Descargar plantilla
                </button>
            </div>

            {/* Upload zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${isDragging ? "border-bitte-gold bg-bitte-gold/10 scale-[1.01]" : "border-white/15 hover:border-bitte-gold/50 hover:bg-bitte-gold/5"}`}
            >
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-bitte-gold/20 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-bitte-gold animate-spin" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Analizando {fileName}...</p>
                            <p className="text-sm text-bitte-steel mt-1">{rowCount} filas detectadas · Generando dashboard BI</p>
                        </div>
                    </div>
                ) : fileName && !error ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-bitte-green/20 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-bitte-green" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">{fileName}</p>
                            <p className="text-sm text-bitte-steel mt-1">{rowCount} filas · Haz clic para cambiar archivo</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <FileSpreadsheet className="w-8 h-8 text-bitte-steel" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Arrastra tu Excel aquí</p>
                            <p className="text-sm text-bitte-steel mt-1">o haz clic para seleccionar · .xlsx, .xls, .csv</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-bitte-steel/60">
                            <Upload className="w-3 h-3" /> Máximo 200 filas analizadas
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile download button */}
            <button onClick={downloadTemplate} className="sm:hidden w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-bitte-gold/10 border border-bitte-gold/30 text-bitte-gold text-sm font-semibold hover:bg-bitte-gold/20 transition-all">
                <Download className="w-4 h-4" /> Descargar plantilla de ejemplo
            </button>

            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
                </div>
            )}

            {result && (
                <div ref={resultRef} className="space-y-8 pt-2">
                    <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-bitte-gold">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-bitte-gold" />
                            <span className="text-sm font-bold text-white">Resumen Ejecutivo</span>
                        </div>
                        <p className="text-white/80 leading-relaxed">{result.executive_summary}</p>
                    </div>

                    {result.kpis?.length > 0 && (
                        <div>
                            <h3 className="text-xs font-semibold text-bitte-steel uppercase tracking-wider mb-4">Indicadores Clave</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {result.kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
                            </div>
                        </div>
                    )}

                    {result.charts?.filter(c => c.data?.length > 0).length > 0 && (
                        <div>
                            <h3 className="text-xs font-semibold text-bitte-steel uppercase tracking-wider mb-4">Visualizaciones</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {result.charts.filter(c => c.data?.length > 0).map((chart, i) => <ExcelDynamicChart key={i} chart={chart} />)}
                            </div>
                        </div>
                    )}

                    {result.insights?.length > 0 && (
                        <div>
                            <h3 className="text-xs font-semibold text-bitte-steel uppercase tracking-wider mb-4">Hallazgos Clave</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {result.insights.map((insight, i) => (
                                    <div key={i} className="flex items-start gap-3 glass-panel rounded-xl p-4">
                                        <span className="w-5 h-5 rounded-full bg-bitte-gold/20 text-bitte-gold text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{i + 1}</span>
                                        <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center pt-2">
                        <button onClick={() => { setResult(null); setFileName(""); setRowCount(0); fileInputRef.current?.click(); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-bitte-steel hover:text-white hover:border-white/30 transition-all">
                            <Upload className="w-4 h-4" /> Analizar otro archivo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DataInsightsLab() {
    const [activeTab, setActiveTab] = useState<Tab>("text");

    return (
        <section id="datalab" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-bitte-blue/5 blur-[120px] rounded-full z-0" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── Hero Header ── */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-bitte-blue/10 border border-bitte-blue/20 rounded-full px-4 py-1.5 text-xs text-bitte-blue mb-6">
                        <Sparkles className="w-3 h-3" />
                        Inteligencia de Negocio · Powered by AI
                    </div>
                    <h2 className="text-5xl font-bold mb-5 leading-tight">
                        Convierte tus datos en{" "}
                        <span className="bg-gradient-to-r from-bitte-blue to-bitte-green bg-clip-text text-transparent">
                            decisiones inteligentes
                        </span>
                    </h2>
                    <p className="text-bitte-steel text-lg leading-relaxed mb-8">
                        Pega datos o sube tu Excel — nuestra IA genera al instante análisis ejecutivo, KPIs y gráficos listos para presentar.
                        <strong className="text-white"> Sin configuración. Sin código. Sin esperas.</strong>
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-10">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-bitte-gold text-bitte-gold" />)}
                        <span className="text-sm text-bitte-steel ml-2">Análisis ejecutivo en menos de 10 segundos</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {FEATURES.map(({ icon: Icon, label, color, bg }) => (
                            <div key={label} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${bg} ${color}`}>
                                <Icon className="w-3.5 h-3.5" />{label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Product Selector Tabs ── */}
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
                        <button
                            onClick={() => setActiveTab("text")}
                            className={`relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === "text"
                                    ? "bg-gradient-to-r from-bitte-blue to-bitte-green text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                    : "text-bitte-steel hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Brain className="w-5 h-5 shrink-0" />
                            <span className="text-left">
                                <span className="block">Analizador BI</span>
                                <span className={`block text-xs font-normal ${activeTab === "text" ? "text-white/70" : "text-bitte-steel/60"}`}>Pega tus datos de texto</span>
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("excel")}
                            className={`relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === "excel"
                                    ? "bg-gradient-to-r from-bitte-gold to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                    : "text-bitte-steel hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <FileSpreadsheet className="w-5 h-5 shrink-0" />
                            <span className="text-left">
                                <span className="block">Dashboard Excel</span>
                                <span className={`block text-xs font-normal ${activeTab === "excel" ? "text-white/70" : "text-bitte-steel/60"}`}>Sube tu archivo .xlsx</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Active Panel ── */}
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.08)]">
                        {activeTab === "text" ? <TextAnalyzerPanel /> : <ExcelUploaderPanel />}
                    </div>
                    <p className="text-center text-xs text-bitte-steel/40 mt-6">
                        🔒 Tus datos no se almacenan · Análisis 100% en tiempo real · Tecnología BITTE AI
                    </p>
                </div>

            </div>
        </section>
    );
}
