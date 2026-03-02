"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface WaitlistEntry {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  company?: string;
  tasks?: string;
  teamSize?: string;
  role?: string;
  // legacy fields
  tier?: string;
  industry?: string;
  source?: string;
  createdAt: number;
  // referral fields
  status?: string;
  referralCode?: string;
  invitedAt?: number;
}

const roleLabels: Record<string, string> = {
  founder: "🚀 Fundador/CEO",
  marketing: "📣 Marketing",
  sales: "💼 Ventas",
  operations: "⚙️ Operaciones",
  tech: "💻 Tecnología",
  support: "🎧 Soporte",
  other: "🧩 Otro",
};

const statusStyles: Record<string, string> = {
  pending: "bg-white/10 text-white/60",
  invited: "bg-violet/20 text-violet border border-violet/30",
  signed_up: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [invitingId, setInvitingId] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<Record<string, string>>({});
  const [inviteSuccess, setInviteSuccess] = useState<Record<string, boolean>>({});

  const waitlistEntries = useQuery(api.waitlist.list) as WaitlistEntry[] | undefined;
  const waitlistCount = useQuery(api.waitlist.count);

  const invitedCount = waitlistEntries?.filter(e => e.status === "invited" || e.status === "signed_up").length ?? 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setIsChecking(false);
    }
  };

  const handleInvite = async (entry: WaitlistEntry) => {
    setInvitingId(entry._id);
    setInviteError((prev) => ({ ...prev, [entry._id]: "" }));

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify({
          waitlistId: entry._id,
          email: entry.email,
          name: entry.name,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setInviteError((prev) => ({
          ...prev,
          [entry._id]: data.error || "Error al invitar",
        }));
        return;
      }

      setInviteSuccess((prev) => ({ ...prev, [entry._id]: true }));
    } catch {
      setInviteError((prev) => ({
        ...prev,
        [entry._id]: "Error de conexión",
      }));
    } finally {
      setInvitingId(null);
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
              disabled={isChecking}
              className="w-full bg-magenta hover:bg-magenta-dark text-white font-semibold py-3 rounded-full transition-all disabled:opacity-60"
            >
              {isChecking ? "Verificando..." : "Entrar"}
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
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">Total</p>
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
            <p className="text-white/50 text-sm">Invitados</p>
            <p className="text-2xl font-bold text-violet">{invitedCount}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">🚀 Founders</p>
            <p className="text-2xl font-bold text-magenta">
              {waitlistEntries?.filter(e => e.role === "founder").length ?? 0}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/50 text-sm">💻 Tech</p>
            <p className="text-2xl font-bold text-violet">
              {waitlistEntries?.filter(e => e.role === "tech").length ?? 0}
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
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Rol</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Empresa</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Estado</th>
                  <th className="text-left text-white/50 text-sm font-medium px-4 py-3">Fecha</th>
                  <th className="text-right text-white/50 text-sm font-medium px-4 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {waitlistEntries?.map((entry) => {
                  const status = entry.status || "pending";
                  const isInvited = status === "invited" || status === "signed_up";
                  const isThisInviting = invitingId === entry._id;
                  const didSucceed = inviteSuccess[entry._id];
                  const entryError = inviteError[entry._id];

                  return (
                    <tr key={entry._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{entry.name}</td>
                      <td className="px-4 py-3 text-white/70">{entry.email}</td>
                      <td className="px-4 py-3 text-white/70">{entry.role ? (roleLabels[entry.role] || entry.role) : "—"}</td>
                      <td className="px-4 py-3 text-white/50">{entry.company || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${statusStyles[status] || statusStyles.pending}`}>
                          {status === "pending" && "Pendiente"}
                          {status === "invited" && "Invitado"}
                          {status === "signed_up" && "Registrado"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-sm">
                        {new Date(entry.createdAt).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isInvited || didSucceed ? (
                          <span className="text-xs text-violet">Invitado ✓</span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {entryError && (
                              <span className="text-xs text-red-400">{entryError}</span>
                            )}
                            <button
                              onClick={() => handleInvite(entry)}
                              disabled={isThisInviting}
                              className="text-xs bg-magenta/20 hover:bg-magenta/30 text-magenta border border-magenta/30 px-3 py-1.5 rounded-full transition-all disabled:opacity-60"
                            >
                              {isThisInviting ? "Enviando..." : "Invitar"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {(!waitlistEntries || waitlistEntries.length === 0) && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-white/30">
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
