"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "frutero2026";

interface WaitlistEntry {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  company?: string;
  tasks?: string;
  teamSize?: string;
  source?: string;
  createdAt: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const waitlistEntries = useQuery(api.waitlist.list) as WaitlistEntry[] | undefined;
  const waitlistCount = useQuery(api.waitlist.count);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin</h1>
            <p className="text-white/50 text-sm">Godínez.AI Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all text-white placeholder:text-white/30"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-magenta hover:bg-magenta-dark text-white font-semibold py-3 rounded-full transition-all"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Waitlist Dashboard</h1>
            <p className="text-white/50 text-sm">Godínez.AI</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-magenta/20 border border-magenta/30 rounded-full px-4 py-2">
              <span className="text-magenta font-bold text-lg">{waitlistCount ?? 0}</span>
              <span className="text-white/50 text-sm ml-2">registros</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-white/50 hover:text-white text-sm"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">Total registros</p>
            <p className="text-2xl font-bold text-white">{waitlistCount ?? 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">Hoy</p>
            <p className="text-2xl font-bold text-gold">
              {waitlistEntries?.filter(e => {
                const today = new Date().toDateString();
                return new Date(e.createdAt).toDateString() === today;
              }).length ?? 0}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">Con empresa</p>
            <p className="text-2xl font-bold text-violet">
              {waitlistEntries?.filter(e => e.company).length ?? 0}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Nombre</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Email</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Empresa</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Equipo</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {waitlistEntries?.map((entry) => (
                  <tr key={entry._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-white">{entry.name}</td>
                    <td className="px-4 py-3 text-white/70">{entry.email}</td>
                    <td className="px-4 py-3 text-white/50">{entry.company || "—"}</td>
                    <td className="px-4 py-3 text-white/50">{entry.teamSize || "—"}</td>
                    <td className="px-4 py-3 text-white/50 text-sm">
                      {new Date(entry.createdAt).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {(!waitlistEntries || waitlistEntries.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-white/30">
                      No hay registros aún
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks detail (expandable) */}
        {waitlistEntries && waitlistEntries.some(e => e.tasks) && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-4">Tareas mencionadas</h2>
            <div className="space-y-3">
              {waitlistEntries.filter(e => e.tasks).map((entry) => (
                <div key={entry._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-medium mb-1">{entry.name}</p>
                  <p className="text-white/70 text-sm">{entry.tasks}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
