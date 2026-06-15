import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CollectorLayout } from "@/components/CollectorLayout";
import { useAuth } from "@/services/AuthContext";
import { submitEntry, type WorkingStatus, type FineCategory } from "@/services/entries";
import { useMemo, useState } from "react";
import {
  Check,
  Save,
  Train,
  User,
  Phone,
  MapPin,
  IndianRupee,
  Briefcase,
  Cloud,
} from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/entry/new")({
  head: () => ({ meta: [{ title: "New Daily Entry · TC System" }] }),
  component: NewEntryPage,
});

const WORKING_OPTIONS: WorkingStatus[] = [
  "VIRAT",
  "OPEN",
  "REST",
  "LEAVE",
  "VEDANT",
  "SQD",
  "LAP",
  "SICK",
];

const CATEGORIES = [
  { key: "A", label: "A Case", hint: "WT / fare evader" },
  { key: "B", label: "B Case", hint: "Excess fare" },
  { key: "C", label: "C Case", hint: "Without proper ticket" },
  { key: "D", label: "D Case", hint: "Luggage / parcel" },
  { key: "E", label: "E Case", hint: "Other" },
  { key: "smoking", label: "Smoking Case", hint: "Smoking on board" },
] as const;

type CatKey = (typeof CATEGORIES)[number]["key"];

function NewEntryPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [train, setTrain] = useState("");
  const [working, setWorking] = useState<WorkingStatus>("VIRAT");
  const [cats, setCats] = useState<Record<CatKey, FineCategory>>({
    A: { cases: 0, amount: 0 },
    B: { cases: 0, amount: 0 },
    C: { cases: 0, amount: 0 },
    D: { cases: 0, amount: 0 },
    E: { cases: 0, amount: 0 },
    smoking: { cases: 0, amount: 0 },
  });

  const totals = useMemo(() => {
    const tc = Object.values(cats).reduce((a, c) => a + (c.cases || 0), 0);
    const ta = Object.values(cats).reduce((a, c) => a + (c.amount || 0), 0);
    return { tc, ta };
  }, [cats]);

  function update(key: CatKey, field: "cases" | "amount", v: string) {
    const num = v === "" ? 0 : Math.max(0, parseInt(v, 10) || 0);
    setCats((c) => ({ ...c, [key]: { ...c[key], [field]: num } }));
  }

  async function submit() {
    if (authLoading || !user || !profile) return;
    if (!train.trim()) {
      toast.error("Please enter the train number");
      return;
    }
    await submitEntry({
      collectorId: user.uid,
      collectorName: profile.name,
      collectorBase: profile.base,
      date: new Date().toISOString().slice(0, 10),
      trainNumber: train.trim(),
      working,
      A: cats.A,
      B: cats.B,
      C: cats.C,
      D: cats.D,
      E: cats.E,
      smoking: cats.smoking,
      totalCases: totals.tc,
      totalAmount: totals.ta,
    });
    toast.success("Daily entry saved", {
      description: `${totals.tc} cases · ${formatINR(totals.ta)}`,
    });
    navigate({ to: "/entries" });
  }

  if (authLoading || !user || !profile) return null;

  return (
    <CollectorLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">New Daily Entry</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fields auto-save as draft. Submit when complete.
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
          <Cloud className="h-3.5 w-3.5" /> Draft autosaved
        </div>
      </div>

      {/* Card 1: Auto-filled info */}
      <Section title="Your Details" subtitle="Auto-filled from profile">
        <Grid>
          <Field icon={<User className="h-4 w-4" />} label="Collector">
            {profile.name}
          </Field>
          <Field icon={<MapPin className="h-4 w-4" />} label="Base">
            {profile.base}
          </Field>
          <Field icon={<Phone className="h-4 w-4" />} label="Mobile">
            {profile.mobile}
          </Field>
          <Field icon={<Briefcase className="h-4 w-4" />} label="Date">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Field>
        </Grid>
      </Section>

      {/* Card 2: Train info */}
      <Section title="Train Information">
        <div className="space-y-4">
          <div>
            <Label>Train Number</Label>
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
              <Train className="h-5 w-5 text-muted-foreground" />
              <input
                value={train}
                onChange={(e) => setTrain(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 22973"
                className="flex-1 bg-transparent text-lg font-semibold tracking-wide outline-none"
              />
            </div>
          </div>
          <div>
            <Label>Working Status</Label>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {WORKING_OPTIONS.map((w) => {
                const active = working === w;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWorking(w)}
                    className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {active && <Check className="mr-1 inline h-3.5 w-3.5" />}
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Card 3: Categories */}
      <Section title="Fine Categories" subtitle="Tap a category to record cases and fine collected">
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const v = cats[cat.key];
            const filled = v.cases > 0 || v.amount > 0;
            return (
              <div
                key={cat.key}
                className={`rounded-xl border p-4 transition-colors ${
                  filled ? "border-primary/40 bg-primary-soft" : "border-border bg-card"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">{cat.label}</div>
                    <div className="text-[11px] text-muted-foreground">{cat.hint}</div>
                  </div>
                  {filled && (
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="Cases"
                    value={v.cases}
                    onChange={(s) => update(cat.key, "cases", s)}
                  />
                  <NumberInput
                    label="Amount"
                    prefix="₹"
                    value={v.amount}
                    onChange={(s) => update(cat.key, "amount", s)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Sticky summary + save */}
      <div className="h-32 md:h-24" />
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 backdrop-blur md:bottom-0">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <div className="flex-1 rounded-xl bg-primary-soft px-3 py-2">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-primary">
              <span>Total Cases</span>
              <span>Total Amount</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between gap-3">
              <span className="text-xl font-bold text-primary">{totals.tc}</span>
              <span className="text-xl font-bold text-primary">{formatINR(totals.ta)}</span>
            </div>
          </div>
          <button
            onClick={submit}
            className="flex h-14 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-card"
          >
            <Save className="h-5 w-5" /> Save
          </button>
        </div>
      </div>
    </CollectorLayout>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4">
        <h2 className="text-base font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-muted/60 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-0.5 truncate text-sm font-semibold">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (s: string) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-input bg-background px-2.5 py-2 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
        {prefix && <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />}
        <input
          inputMode="numeric"
          value={value === 0 ? "" : String(value)}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="0"
          className="w-full bg-transparent text-base font-semibold outline-none"
        />
      </div>
    </label>
  );
}
