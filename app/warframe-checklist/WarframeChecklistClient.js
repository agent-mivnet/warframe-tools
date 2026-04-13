'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Task Data ───────────────────────────────────────────────────────────────

const DAILY_TASKS = [
  { id: 'daily_login', text: 'Log in: Collect the daily login reward.', icon: '🌸' },
  { id: 'daily_craft_forma', text: 'Crafting (Forma): Start building a new Forma (and collect finished ones).', icon: '🔨', location: 'Base of Operations', terminal: 'Foundry' },
  { id: 'daily_craft_other', text: 'Crafting (Other): Craft other daily resources/items using reusable blueprints.', icon: '🔨', location: 'Base of Operations', terminal: 'Foundry' },
  { id: 'daily_syndicate_gain', text: 'Faction Syndicates: Gain daily standing cap with your pledged Syndicate(s).', icon: '⭐', info: 'Gain affinity in any mission to increase faction standing' },
  { id: 'daily_syndicate_spend', text: 'Faction Syndicates: If maxed on standing, spend it (Relic packs, Vosfor packs, etc.).', icon: '⭐', location: 'Base of Operations/Any Relay', terminal: 'Syndicates' },
  {
    id: 'daily_world_syndicate_parent', text: 'World Syndicates (Standing)', icon: '⭐', isParent: true,
    subtasks: [
      { id: 'daily_world_syndicate_simaris', text: 'Cephalon Simaris', icon: '🔬', location: 'Any Relay' },
      { id: 'daily_world_syndicate_ostron', text: 'Ostron', icon: '🏘️', location: 'Cetus, Earth', prereq: "Saya's Vigil" },
      { id: 'daily_world_syndicate_solaris', text: 'Solaris United', icon: '⚙️', location: 'Fortuna, Venus', prereq: 'Vox Solaris (Quest)' },
      { id: 'daily_world_syndicate_ventkids', text: 'Ventkids', icon: '🛹', location: 'Fortuna, Venus', prereq: 'Vox Solaris (Quest)' },
      { id: 'daily_world_syndicate_holdfasts', text: 'The Holdfasts', icon: '🌀', location: 'Chrysalith, Zariman', prereq: 'Angels of the Zariman' },
      { id: 'daily_world_syndicate_cavia', text: 'Cavia', icon: '🧪', location: 'Sanctum Anatomica, Deimos', prereq: 'Whispers in the Walls' },
      { id: 'daily_world_syndicate_hex', text: 'The Hex', icon: '🔮', location: 'Höllvania Central Mall', prereq: 'The Hex (Quest)' },
    ],
  },
  { id: 'daily_dark_sector', text: 'Dark Sector Mission (Early Game): Complete one Dark Sector mission for double credits.', icon: '🦠', location: 'Base of Operations', terminal: 'Navigation', info: 'Only the first Dark Sector mission of the day gives bonus credits' },
  { id: 'daily_sortie', text: 'Sortie: Complete the 3 daily Sortie missions.', icon: '⚔️', location: 'Base of Operations', terminal: 'Navigation', prereq: 'The War Within' },
  { id: 'daily_duviri_garden', text: 'Duviri Garden: Plant and harvest resources.', icon: '🌱', location: 'Duviri/Dormizone', prereq: 'The Duviri Paradox' },
  { id: 'daily_feed_helminth', text: 'Feed Helminth: Subsume or feed your Helminth.', icon: '🦠', location: 'Base of Operations', npc: 'Helminth', prereq: 'Rank 5 Entrati' },
  { id: 'daily_focus', text: 'Focus: Max out daily Focus gain (e.g., via Sanctuary Onslaught).', icon: '🔮', prereq: 'The Second Dream' },
  { id: 'daily_steel_path', text: 'Steel Path Incursions: Complete daily Steel Path missions for Steel Essence.', icon: '🗡️', prereq: 'Steel Path unlocked' },
  { id: 'daily_check_duviri_amp', text: 'Check Duviri Amp: Pick up weekly amp from Duviri.', icon: '🔧', location: 'Duviri/Dormizone', prereq: 'The Duviri Paradox' },
  {
    id: 'daily_vendors', text: 'Vendors', icon: '🏪', isParent: true,
    subtasks: [
      { id: 'daily_acrithis', text: 'Acrithis: Check daily Arcane and Captura offering.', icon: '📜', location: 'Duviri/Dormizone', npc: 'Acrithis', prereq: 'The Duviri Paradox' },
      { id: 'daily_ticker_crew', text: 'Ticker: Check available railjack crew to hire.', icon: '👥', location: 'Fortuna, Venus', npc: 'Ticker', prereq: 'Rising Tide & Command Intrinsics 1' },
      { id: 'daily_marie', text: 'Marie: Purchase Operator and amp mods.', icon: '✨', location: 'La Cathédrale (Sanctum Anatomica, Deimos)', npc: 'Marie', prereq: 'The Old Peace' },
    ],
  },
];

const WEEKLY_TASKS = [
  { id: 'weekly_nightwave_complete', text: 'Nightwave: Complete relevant weekly Nightwave missions.', icon: '📻' },
  { id: 'weekly_ayatan', text: "Ayatan Treasure Hunt: Complete Maroo's weekly mission for an Ayatan Sculpture.", icon: '💎', location: "Maroo's Bazaar, Mars", npc: 'Maroo' },
  { id: 'weekly_kahl_garrison', text: "Break Narmer: Complete Kahl's weekly mission for Stock.", icon: '🛡️', location: "Drifter's Camp, Earth", npc: 'Kahl', prereq: 'Veilbreaker' },
  { id: 'weekly_archon_hunt', text: 'Archon Hunt: Complete the weekly Archon Hunt for a guaranteed Archon Shard.', icon: '👑', location: 'Base of Operations', terminal: 'Navigation', prereq: 'The New War' },
  { id: 'weekly_duviri_circuit', text: 'Duviri Circuit (Normal): Check weekly Warframe options & run Circuit if desired.', icon: '🌀', location: 'Base of Operations/Dormizone', terminal: 'Navigation', prereq: 'The Duviri Paradox' },
  { id: 'weekly_duviri_circuit_sp', text: 'Duviri Circuit (Steel Path): Check weekly Incarnon Adapters & run Circuit if desired.', icon: '🌀', location: 'Base of Operations/Dormizone', terminal: 'Navigation', prereq: 'Steel Path unlocked & The Duviri Paradox' },
  {
    id: 'weekly_search_pulses', text: 'Search Pulses: Use 5 weekly search pulses on Netracells and Archimedeas.', icon: '🔍', isParent: true, prereq: 'Whispers in the Walls',
    subtasks: [
      { id: 'weekly_netracells', text: 'Netracells: Complete up to 5 weekly Netracell missions for Archon Shard chances.', icon: '🔮', location: 'Sanctum Anatomica, Deimos', npc: 'Tagfer', prereq: 'Whispers in the Walls', info: 'Costs 1 Search Pulse per successful mission' },
      { id: 'weekly_eda', text: 'Elite Deep Archimedea: Attempt weekly Elite DA for high Archon Shard chances.', icon: '💀', location: 'Sanctum Anatomica, Deimos', npc: 'Necraloid', prereq: 'Rank 5 Cavia', info: 'Costs 2 Search Pulses to unlock for the week' },
      { id: 'weekly_eta', text: 'Elite Temporal Archimedea: Attempt weekly Elite TA for high Archon Shard chances.', icon: '⏰', location: 'Höllvania Central Mall', npc: 'Kaya', prereq: 'Rank 5 The Hex', info: 'Costs 2 Search Pulses to unlock for the week' },
    ],
  },
  { id: 'weekly_calendar', text: '1999 Calendar: Complete weekly Calendar tasks.', icon: '🖥️', location: 'Base of Operations', terminal: 'POM-2 PC', prereq: 'The Hex' },
  { id: 'weekly_invigorations', text: 'Helminth: Use weekly Invigorations.', icon: '🦠', location: 'Base of Operations', npc: 'Helminth', prereq: 'Rank 5 Entrati' },
  { id: 'weekly_spend_riven_sliver', text: 'Spend Riven Sliver: Trade at Iron Wake or wherever useful.', icon: '💎', prereq: 'The Chains of Harrow' },
  { id: 'weekly_spend_steel_essence', text: 'Spend Steel Essence: Buy from Teshin if needed.', icon: '🗡️', prereq: 'Steel Path unlocked' },
  { id: 'weekly_spend_pathos_clamp', text: 'Spend Pathos Clamp: Trade with Acrithis or others if desired.', icon: '🌀', prereq: 'The Duviri Paradox' },
  {
    id: 'weekly_vendors', text: 'Vendors', icon: '🏪', isParent: true,
    subtasks: [
      { id: 'weekly_iron_wake', text: 'Paladino: Trade Riven Slivers.', icon: '💎', location: 'Iron Wake, Earth', npc: 'Paladino', prereq: 'The Chains of Harrow' },
      { id: 'weekly_yonta', text: 'Archimedian Yonta: Buy weekly Kuva with Voidplumes.', icon: '✨', location: 'Chrysalith, Zariman', npc: 'Yonta', prereq: 'Angels of the Zariman' },
      { id: 'weekly_acridies', text: 'Acrithis: Check wares and spend Pathos Clamps if desired.', icon: '📜', location: 'Duviri/Dormizone', npc: 'Acrithis', prereq: 'The Duviri Paradox' },
      { id: 'weekly_teshin', text: "Teshin (Steel Path): Check Teshin's Steel Essence shop (Umbra Forma every 8 weeks).", icon: '🗡️', location: 'Any Relay', npc: 'Teshin', prereq: 'Steel Path unlocked' },
      { id: 'weekly_bird3', text: 'Bird 3: Buy the weekly Archon Shard for 30k Cavia Standing.', icon: '🐦', location: 'Sanctum Anatomica, Deimos', npc: 'Bird 3', prereq: 'Rank 5 Cavia' },
      { id: 'weekly_nightcap', text: 'Nightcap: Trade Fergolyte for Kuva and Ayatan Sculpture.', icon: '🍄', location: 'Fortuna, Venus', npc: 'Nightcap', prereq: 'The New War' },
      { id: 'weekly_relist_rivens', text: 'Re-list Rivens: Relist any unsold Rivens on the market.', icon: '📋', prereq: 'The War Within' },
    ],
  },
];

const OTHER_TASKS = [
  { id: 'other_grandmother_tokens', text: 'Mend the Family: Purchase Family Tokens from Grandmother.', icon: '👵', location: 'Necralisk, Deimos', prereq: 'Heart of Deimos', isEightHour: true },
  { id: 'other_yonta_voidplumes', text: 'Trade for Voidplumes', icon: '✨', location: 'Chrysalith, Zariman', npc: 'Yonta', prereq: 'Angels of the Zariman', isEightHour: true },
  { id: 'other_loid_voca', text: 'Trade for Voca', icon: '🧪', location: 'Sanctum Anatomica, Deimos', npc: 'Loid', prereq: 'Whispers in the Walls', isEightHour: true },
];

const ALL_TASKS = { daily: DAILY_TASKS, weekly: WEEKLY_TASKS, other: OTHER_TASKS };
const STORAGE_KEY = 'mc_warframe_checklist_v2';

const ALL_PREREQS = (() => {
  const prereqs = new Set();
  const collect = (tasks) => {
    tasks.forEach((task) => {
      if (task.prereq) prereqs.add(task.prereq);
      if (task.subtasks) collect(task.subtasks);
    });
  };

  Object.values(ALL_TASKS).forEach(collect);
  return Array.from(prereqs).sort((a, b) => a.localeCompare(b));
})();

// ─── Reset Time Calculations ────────────────────────────────────────────────

function getNextDailyReset() {
  const now = new Date();
  const utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  if (now.getUTCHours() >= 0) utc.setUTCDate(utc.getUTCDate() + 1);
  return utc;
}

function getNextWeeklyReset() {
  const now = new Date();
  const day = now.getUTCDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  target.setUTCDate(target.getUTCDate() + daysUntilMonday);
  return target;
}

function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatCountdownLong(ms) {
  if (ms <= 0) return 'now';
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return `${d}d ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function getNextEightHourReset() {
  const now = new Date();
  const hour = now.getUTCHours();
  const bases = [0, 8, 16];
  let nextBase = bases.find(b => b > hour);
  if (nextBase === undefined) nextBase = bases[0] + 24;
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), nextBase, 0, 0));
  if (nextBase >= 24) target.setUTCDate(target.getUTCDate() + 1);
  return target;
}

// ─── Persistence ─────────────────────────────────────────────────────────────

function loadState() {
  if (typeof window === 'undefined') return { progress: {}, hiddenTasks: {}, unlockedPrereqs: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { progress: {}, hiddenTasks: {}, unlockedPrereqs: {} };
    const parsed = JSON.parse(raw);
    return {
      progress: parsed.progress || {},
      hiddenTasks: parsed.hiddenTasks || {},
      unlockedPrereqs: parsed.unlockedPrereqs || {},
    };
  } catch {
    return { progress: {}, hiddenTasks: {}, unlockedPrereqs: {} };
  }
}

function saveState(state) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ─── Components ──────────────────────────────────────────────────────────────

function SpoilerText({ children, forceReveal }) {
  const [revealed, setRevealed] = useState(false);
  if (forceReveal) {
    return <span className="wfSpoiler wfSpoilerRevealed">{children}</span>;
  }
  return (
    <span
      className={`wfSpoiler ${revealed ? 'wfSpoilerRevealed' : ''}`}
      onMouseEnter={(e) => { if (e.shiftKey) setRevealed(true); }}
      onMouseLeave={() => setRevealed(false)}
    >
      {children}
    </span>
  );
}

function TaskRow({ task, checked, hidden, visibleSubtasks, onToggle, onHide, unlockedPrereqs }) {
  if (hidden) return null;

  // Locked placeholder: show just the prereq line, dimmed
  if (task._locked) {
    return (
      <li className="wfTaskRow wfTaskLocked">
        <div className="wfTaskMain">
          <div className="wfTaskMeta">
            <span className="wfMetaChip wfPrereq">Requires: <SpoilerText forceReveal={!!unlockedPrereqs?.[task.prereq]}>{task.prereq}</SpoilerText></span>
          </div>
        </div>
      </li>
    );
  }

  const hasChildren = task.isParent && visibleSubtasks?.length;

  return (
    <li className={`wfTaskRow ${checked[task.id] ? 'wfTaskDone' : ''}`}>
      <div className="wfTaskMain">
        <label className="wfTaskLabel">
          <input
            type="checkbox"
            checked={!!checked[task.id]}
            onChange={() => onToggle(task.id)}
            className="wfCheckbox"
          />
          <span className="wfTaskIcon">{task.icon}</span>
          <span className={`wfTaskText ${checked[task.id] ? 'wfStrikethrough' : ''}`}>
            {task.text}
          </span>
        </label>
        <div className="wfTaskMeta">
          {task.location && <span className="wfMetaChip wfLocation">{task.location}</span>}
          {task.terminal && <span className="wfMetaChip wfTerminal">{task.terminal}</span>}
          {task.npc && <span className="wfMetaChip wfNpc">NPC: {task.npc}</span>}
          {task.prereq && <span className="wfMetaChip wfPrereq">Requires: <SpoilerText forceReveal={!!unlockedPrereqs?.[task.prereq]}>{task.prereq}</SpoilerText></span>}
          {task.info && <span className="wfMetaChip wfInfo">{task.info}</span>}
          {!task.isParent && (
            <button className="wfHideBtn" onClick={(e) => { e.stopPropagation(); onHide(task.id); }} title="Hide task">
              👁️
            </button>
          )}
        </div>
      </div>
      {hasChildren && (
        <ul className="wfSubtaskList">
          {visibleSubtasks.map(st => (
            <TaskRow
              key={st.id}
              task={st}
              checked={checked}
              hidden={false}
              visibleSubtasks={st.subtasks}
              onToggle={onToggle}
              onHide={onHide}
              unlockedPrereqs={unlockedPrereqs}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function SectionBlock({ title, tasks, resetLabel, resetMs, sectionKey, collapsed, onToggleCollapse, checked, hidden, unlockedPrereqs, onToggleCheck, onHide, onReset }) {
  // Build display list: mark tasks as locked (show placeholder) or unlocked (show normally)
  const displayTasks = tasks.reduce((acc, task) => {
    const isLocked = task.prereq && !unlockedPrereqs[task.prereq];
    if (task.isParent && task.subtasks) {
      const parentLocked = !!(task.prereq && !unlockedPrereqs[task.prereq]);
      const subtasksWithLock = task.subtasks.map(st => ({
        ...st,
        _locked: parentLocked || !!(st.prereq && !unlockedPrereqs[st.prereq]),
      }));
      acc.push({ ...task, _locked: parentLocked, subtasks: subtasksWithLock });
    } else {
      acc.push({ ...task, _locked: !!isLocked });
    }
    return acc;
  }, []);

  // Stats only count non-locked tasks
  const total = displayTasks.reduce((acc, t) => {
    if (t._locked) return acc;
    if (t.isParent) {
      const visibleSubs = (t.subtasks || []).filter(st => !st._locked);
      return acc + 1 + visibleSubs.length;
    }
    return acc + 1;
  }, 0);
  const done = displayTasks.reduce((acc, t) => {
    if (t._locked) return acc;
    let c = checked[t.id] ? 1 : 0;
    if (t.subtasks) c += t.subtasks.filter(st => !st._locked && checked[st.id]).length;
    return acc + c;
  }, 0);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className={`wfSection ${collapsed ? 'wfSectionCollapsed' : ''}`}>
      <div className="wfSectionHeader" onClick={onToggleCollapse}>
        <div className="wfSectionHeaderLeft">
          <span className={`wfChevron ${collapsed ? '' : 'wfChevronOpen'}`}>▶</span>
          <h3 className="wfSectionTitle">{title}</h3>
          {resetLabel && resetMs !== undefined && resetMs !== null && (
            <span className="wfResetTimer">Resets in {resetLabel}</span>
          )}
        </div>
        <div className="wfSectionHeaderRight">
          <span className="wfProgressBadge">{done}/{total} ({pct}%)</span>
          <div className="wfProgressBar">
            <div className="wfProgressFill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      {!collapsed && (
        <div className="wfSectionContent">
          <ul className="wfTaskList">
            {displayTasks.filter(t => !hidden[t.id]).map(task => (
              <TaskRow
                key={task.id}
                task={task}
                checked={checked}
                hidden={hidden[task.id]}
                visibleSubtasks={task.isParent && task.subtasks ? task.subtasks.filter(st => !st._locked) : undefined}
                onToggle={onToggleCheck}
                onHide={onHide}
                unlockedPrereqs={unlockedPrereqs}
              />
            ))}
          </ul>
          <div className="wfSectionActions">
            <button className="wfResetBtn" onClick={() => onReset(sectionKey)}>
              Reset {title.replace(' Tasks', '')} Checks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WarframeChecklistClient() {
  const [state, setState] = useState(() => loadState());
  const [now, setNow] = useState(() => Date.now());
  const [collapsed, setCollapsed] = useState({ daily: false, weekly: false, other: false, unlocks: false });
  const [unlockSearch, setUnlockSearch] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const toggleCheck = useCallback((id) => {
    setState(prev => {
      if (!prev) return prev;
      const next = { ...prev, progress: { ...prev.progress, [id]: !prev.progress[id] } };
      saveState(next);
      return next;
    });
  }, []);

  const hideTask = useCallback((id) => {
    setState(prev => {
      if (!prev) return prev;
      const next = { ...prev, hiddenTasks: { ...prev.hiddenTasks, [id]: true } };
      saveState(next);
      return next;
    });
  }, []);

  const togglePrereq = useCallback((prereq) => {
    setState(prev => {
      if (!prev) return prev;
      const next = {
        ...prev,
        unlockedPrereqs: {
          ...prev.unlockedPrereqs,
          [prereq]: !prev.unlockedPrereqs[prereq],
        },
      };
      saveState(next);
      return next;
    });
  }, []);

  const resetSection = useCallback((sectionKey) => {
    setState(prev => {
      if (!prev) return prev;
      const tasks = ALL_TASKS[sectionKey] || [];
      const ids = new Set();
      function collect(tList) {
        tList.forEach(t => {
          ids.add(t.id);
          if (t.subtasks) collect(t.subtasks);
        });
      }
      collect(tasks);
      const nextProgress = { ...prev.progress };
      ids.forEach(id => delete nextProgress[id]);
      const next = { ...prev, progress: nextProgress };
      saveState(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const next = { progress: {}, hiddenTasks: {}, unlockedPrereqs: {} };
    saveState(next);
    setState(next);
  }, []);

  const unhideAll = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      const next = { ...prev, hiddenTasks: {} };
      saveState(next);
      return next;
    });
  }, []);

  const toggleCollapse = useCallback((section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  if (!state) {
    return <div className="wfLoading">Loading checklist...</div>;
  }

  const dailyResetMs = getNextDailyReset().getTime() - now;
  const weeklyResetMs = getNextWeeklyReset().getTime() - now;
  const eightHourMs = getNextEightHourReset().getTime() - now;

  const allIds = [];
  Object.values(ALL_TASKS).forEach(tList => {
    function collect(t) { allIds.push(t.id); if (t.subtasks) t.subtasks.forEach(collect); }
    tList.forEach(collect);
  });
  const totalDone = allIds.filter(id => state.progress[id]).length;
  const totalAll = allIds.length;

  return (
    <div className="wfChecklist">
      <div className="wfSummaryBar">
        <div className="wfSummaryStats">
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{totalDone}</span>
            <span className="wfSummaryLabel">done</span>
          </div>
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{totalAll - totalDone}</span>
            <span className="wfSummaryLabel">remaining</span>
          </div>
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0}%</span>
            <span className="wfSummaryLabel">complete</span>
          </div>
        </div>
        <div className="wfSummaryActions">
          <button className="wfActionBtn" onClick={resetAll}>Reset All</button>
          <button className="wfActionBtn" onClick={unhideAll}>Unhide All</button>
        </div>
      </div>

      <div className="wfSectionsGrid">
        <SectionBlock
          title="Daily Tasks"
          tasks={DAILY_TASKS}
          resetLabel={formatCountdown(dailyResetMs)}
          resetMs={dailyResetMs}
          sectionKey="daily"
          collapsed={collapsed.daily}
          onToggleCollapse={() => toggleCollapse('daily')}
          checked={state.progress}
          hidden={state.hiddenTasks}
          unlockedPrereqs={state.unlockedPrereqs}
          onToggleCheck={toggleCheck}
          onHide={hideTask}
          onReset={resetSection}
        />

        <SectionBlock
          title="Weekly Tasks"
          tasks={WEEKLY_TASKS}
          resetLabel={formatCountdownLong(weeklyResetMs)}
          resetMs={weeklyResetMs}
          sectionKey="weekly"
          collapsed={collapsed.weekly}
          onToggleCollapse={() => toggleCollapse('weekly')}
          checked={state.progress}
          hidden={state.hiddenTasks}
          unlockedPrereqs={state.unlockedPrereqs}
          onToggleCheck={toggleCheck}
          onHide={hideTask}
          onReset={resetSection}
        />

        <SectionBlock
          title="Other Tasks"
          tasks={OTHER_TASKS}
          resetLabel={formatCountdown(eightHourMs)}
          resetMs={eightHourMs}
          sectionKey="other"
          collapsed={collapsed.other}
          onToggleCollapse={() => toggleCollapse('other')}
          checked={state.progress}
          hidden={state.hiddenTasks}
          unlockedPrereqs={state.unlockedPrereqs}
          onToggleCheck={toggleCheck}
          onHide={hideTask}
          onReset={resetSection}
        />

        <div className={`wfSection wfUnlocksSection ${collapsed.unlocks ? 'wfSectionCollapsed' : ''}`}>
          <div className="wfSectionHeader" onClick={() => toggleCollapse('unlocks')}>
            <div className="wfSectionHeaderLeft">
              <span className={`wfChevron ${collapsed.unlocks ? '' : 'wfChevronOpen'}`}>▶</span>
              <h3 className="wfSectionTitle">Content Unlocks</h3>
            </div>
          </div>
          {!collapsed.unlocks && (
            <div className="wfSectionContent">
              <p className="wfUnlockIntro">
                Toggle which quest milestones and unlocks you&apos;ve completed. Tasks requiring locked content will be hidden.<br />
                <span className="wfUnlockHint">Hold <kbd>Shift</kbd> + hover to reveal spoiler text on locked tasks.</span>
              </p>
              <div className="wfUnlockActions">
                <input
                  type="text"
                  className="wfUnlockSearch"
                  placeholder="Search unlocks..."
                  value={unlockSearch}
                  onChange={(e) => setUnlockSearch(e.target.value)}
                />
                <button
                  className="wfActionBtn"
                  onClick={() => {
                    const allOn = ALL_PREREQS.every(p => state.unlockedPrereqs[p]);
                    const next = { ...state.unlockedPrereqs };
                    ALL_PREREQS.forEach(p => { next[p] = !allOn; });
                    setState(prev => { const s = { ...prev, unlockedPrereqs: next }; saveState(s); return s; });
                  }}
                >
                  {ALL_PREREQS.every(p => state.unlockedPrereqs[p]) ? 'Uncheck All' : 'Check All'}
                </button>
              </div>
              <div className="wfUnlocksList">
                {ALL_PREREQS.filter((prereq) => {
                  if (!unlockSearch.trim()) return true;
                  return prereq.toLowerCase().includes(unlockSearch.trim().toLowerCase());
                }).map((prereq) => {
                  const isExactMatch = unlockSearch.trim() && prereq.toLowerCase() === unlockSearch.trim().toLowerCase();
                  return (
                  <label key={prereq} className={`wfUnlockItem ${unlockSearch.trim() && prereq.toLowerCase().includes(unlockSearch.trim().toLowerCase()) ? 'wfUnlockHighlight' : ''}`}>
                    <input
                      type="checkbox"
                      checked={!!state.unlockedPrereqs[prereq]}
                      onChange={() => togglePrereq(prereq)}
                      className="wfUnlockCheckbox"
                    />
                    <SpoilerText forceReveal={isExactMatch}>{prereq}</SpoilerText>
                  </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="wfFooter">
        <p className="wfDisclaimer">
          Remember, you don&apos;t have to do everything! Prioritize tasks based on your current goals and progress.
        </p>
        <p className="wfAttribution">
          Warframe and all related assets are the intellectual property of Digital Extremes Ltd.
          This is an unofficial fan-made tool.
        </p>
      </div>
    </div>
  );
}
