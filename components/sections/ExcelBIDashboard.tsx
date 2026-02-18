"use client";

import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
    Upload, FileSpreadsheet, Loader2, Sparkles, BarChart2,
    PieChart as PieIcon, TrendingUp, AlertCircle, CheckCircle2,
    ArrowUpRight, ArrowDownRight, Minus, Download
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const API_KEY = "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";
const MODEL = "stepfun/step-3.5-flash:free";
const COLORS = ["#2563EB", "#059669", "#F59E0B", "#DC2626", "#8B5CF6", "#06B6D4", "#EC4899", "#84CC16"];

const BI_ENGINE_PROMPT = `You are an autonomous Business Intelligence engine.

Your task is to analyze structured data extracted from an uploaded Excel file and automatically design a dashboard specification plus a concise executive summary.

INPUT:
You will receive tabular data converted from Excel in structured JSON format.

YOUR RESPONSIBILITIES:
1. Understand the dataset structure - detect numeric columns, categories, time-based fields
2. Generate key KPIs - totals, averages, highest/lowest values, relevant comparisons
3. Propose optimal visualizations with actual data arrays for rendering
4. Identify notable patterns - trends, concentration, irregularities
5. Produce a concise executive summary (3-6 sentences in Spanish)

OUTPUT FORMAT - Respond ONLY in valid JSON with this exact structure:
{
  "kpis": [
    { "name": "string", "value": "string", "description": "string", "trend": "up|down|neutral" }
  ],
  "charts": [
    {
      "type": "bar|line|pie",
      "title": "string",
      "insight": "string",
      "data": [{ "name": "string", "value": number }]
    }
  ],
  "insights": ["string"],
  "executive_summary": "string"
}

RULES:
- Never invent missing data - only use values present in the input
- executive_summary must be in Spanish
- insights array must be in Spanish (3-5 items)
- kpi names and descriptions in Spanish
- chart titles in Spanish
- Maximum 8 data points per chart (aggregate if needed)
- Return ONLY valid JSON, no markdown, no explanation`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface KPI { name: string; value: string; description: string; trend?: "up" | "down" | "neutral"; }
interface ChartData { name: string; value: number;[key: string]: string | number; }
interface Chart { type: "bar" | "line" | "pie"; title: string; insight: string; data: ChartData[]; }
interface BIResult { kpis: KPI[]; charts: Chart[]; insights: string[]; executive_summary: string; }

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPICard({ kpi }: { kpi: KPI }) {
    const TrendIcon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
    const trendColor = kpi.trend === "up" ? "text-bitte-green" : kpi.trend === "down" ? "text-bitte-coral" : "text-bitte-steel";

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

function DynamicChart({ chart }: { chart: Chart }) {
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

// ─── Template Generator ──────────────────────────────────────────────────────

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

    // Column widths
    ws["!cols"] = [
        { wch: 10 }, { wch: 10 }, { wch: 14 },
        { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "plantilla_bitte_bi.xlsx");
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExcelBIDashboard() {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [rowCount, setRowCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<BIResult | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const processFile = useCallback(async (file: File) => {
        setError("");
        setResult(null);
        setFileName(file.name);

        // Read file with xlsx
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (jsonData.length === 0) {
            setError("El archivo no contiene datos válidos.");
            return;
        }

        // Limit to first 200 rows to avoid token overflow
        const sample = jsonData.slice(0, 200);
        setRowCount(jsonData.length);
        setIsLoading(true);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://bitte.tech",
                    "X-Title": "BITTE BI Engine",
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: BI_ENGINE_PROMPT },
                        {
                            role: "user",
                            content: `Analiza este dataset extraído de Excel y genera el dashboard BI:\n\n${JSON.stringify(sample, null, 2)}`
                        },
                    ],
                }),
            });

            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            const raw = data.choices?.[0]?.message?.content ?? "";

            // Strip markdown fences if present
            const cleaned = raw.replace(/```json|```/g, "").trim();
            const parsed: BIResult = JSON.parse(cleaned);
            setResult(parsed);

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
        } catch (e) {
            console.error(e);
            setError("Error al analizar el archivo. Verifica que el Excel tenga datos estructurados e intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFile = (file: File) => {
        const valid = file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv");
        if (!valid) { setError("Por favor sube un archivo .xlsx, .xls o .csv"); return; }
        processFile(file);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <section id="excel-bi" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bitte-blue/5 blur-[100px] rounded-full z-0" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-bitte-gold/10 border border-bitte-gold/20 rounded-full px-4 py-1.5 text-xs text-bitte-gold mb-4">
                        <Sparkles className="w-3 h-3" />
                        BI Engine — Excel Analyzer
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Dashboard desde Excel</h2>
                    <p className="text-bitte-steel max-w-xl mx-auto">
                        Sube tu archivo Excel y la IA genera automáticamente KPIs, gráficos y un resumen ejecutivo.
                    </p>

                    {/* Download template button */}
                    <button
                        onClick={downloadTemplate}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bitte-gold/10 border border-bitte-gold/30 text-bitte-gold text-sm font-semibold hover:bg-bitte-gold/20 hover:border-bitte-gold/50 transition-all group"
                    >
                        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        Descargar plantilla de ejemplo
                    </button>
                    <p className="text-xs text-bitte-steel/50 mt-2">
                        Incluye datos de ventas por mes, región y producto listos para analizar
                    </p>
                </div>

                {/* Upload Zone */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300
                            ${isDragging
                                ? "border-bitte-blue bg-bitte-blue/10 scale-[1.01]"
                                : "border-white/15 hover:border-bitte-blue/50 hover:bg-bitte-blue/5"
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={onInputChange}
                            className="hidden"
                        />

                        {isLoading ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-bitte-blue/20 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-bitte-blue animate-spin" />
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
                                    <Upload className="w-3 h-3" />
                                    Máximo 200 filas analizadas
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mt-4 flex items-start gap-3 p-4 bg-bitte-coral/10 border border-bitte-coral/30 rounded-xl text-sm text-bitte-coral">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Dashboard Output */}
                {result && (
                    <div ref={resultRef} className="space-y-10 max-w-6xl mx-auto">
                        {/* Executive Summary */}
                        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-bitte-blue">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-bitte-gold" />
                                <span className="text-sm font-bold text-white">Resumen Ejecutivo</span>
                            </div>
                            <p className="text-white/80 leading-relaxed">{result.executive_summary}</p>
                        </div>

                        {/* KPI Cards */}
                        {result.kpis?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-bitte-steel uppercase tracking-wider mb-4">
                                    Indicadores Clave
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {result.kpis.map((kpi, i) => (
                                        <KPICard key={i} kpi={kpi} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Charts */}
                        {result.charts?.filter(c => c.data?.length > 0).length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-bitte-steel uppercase tracking-wider mb-4">
                                    Visualizaciones
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {result.charts
                                        .filter(c => c.data?.length > 0)
                                        .map((chart, i) => (
                                            <DynamicChart key={i} chart={chart} />
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Insights */}
                        {result.insights?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-bitte-steel uppercase tracking-wider mb-4">
                                    Hallazgos Clave
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {result.insights.map((insight, i) => (
                                        <div key={i} className="flex items-start gap-3 glass-panel rounded-xl p-4">
                                            <span className="w-5 h-5 rounded-full bg-bitte-blue/20 text-bitte-blue text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Re-upload */}
                        <div className="text-center pt-4">
                            <button
                                onClick={() => { setResult(null); setFileName(""); setRowCount(0); fileInputRef.current?.click(); }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-bitte-steel hover:text-white hover:border-white/30 transition-all"
                            >
                                <Upload className="w-4 h-4" />
                                Analizar otro archivo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
