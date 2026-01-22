"use client";

import { Card } from "@/components/ui/primitives";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from "lucide-react";

const data = [
    { name: '00:00', val: 4000, val2: 2400 },
    { name: '04:00', val: 3000, val2: 1398 },
    { name: '08:00', val: 2000, val2: 9800 },
    { name: '12:00', val: 2780, val2: 3908 },
    { name: '16:00', val: 1890, val2: 4800 },
    { name: '20:00', val: 2390, val2: 3800 },
    { name: '23:59', val: 3490, val2: 4300 },
];

export default function DataInsightsLab() {
    return (
        <section id="datalab" className="py-24 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Data Insights Lab</h2>
                    <p className="text-bitte-steel">Dashboards de inteligencia empresarial en tiempo real.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <Card className="lg:col-span-2 h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Activity className="w-5 h-5 text-bitte-blue" />
                                Anomalies Detection
                            </h3>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-bitte-blue" />
                                <span className="w-3 h-3 rounded-full bg-bitte-green" />
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorVal2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0B1121', borderColor: '#333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                                    <Area type="monotone" dataKey="val2" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorVal2)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Metrics Column */}
                    <div className="space-y-6">
                        <Card className="p-6 border-l-4 border-l-bitte-gold">
                            <span className="text-xs text-bitte-steel uppercase tracking-wider">Predictive Maintenance</span>
                            <div className="text-3xl font-bold text-white mt-1">98.4%</div>
                            <div className="text-xs text-bitte-green mt-2">▲ 2.1% vs last month</div>
                        </Card>
                        <Card className="p-6 border-l-4 border-l-bitte-coral">
                            <span className="text-xs text-bitte-steel uppercase tracking-wider">Critical Alerts</span>
                            <div className="text-3xl font-bold text-white mt-1">3</div>
                            <div className="text-xs text-bitte-coral mt-2">Requires Attention</div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-bitte-blue/20 to-transparent border-bitte-blue/30">
                            <span className="text-xs text-bitte-steel uppercase tracking-wider">Total Throughput</span>
                            <div className="text-3xl font-bold text-white mt-1">1,245 TB</div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
