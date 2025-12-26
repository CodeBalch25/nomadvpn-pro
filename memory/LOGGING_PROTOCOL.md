# NomadVPN Pro - Work Logging Protocol

## Overview
All development work on this project follows a structured logging process to maintain accurate records of changes, fixes, and deployments.

---

## Logging Process: Before / During / After

### BEFORE the Fix
Log immediately when a task is identified:

```markdown
### [Task Name]
**Status:** IN PROGRESS
**Issue:** [Description of the problem]
**Location:** [File path and line numbers]
**Root Cause:** [Why this is happening]
```

### DURING the Fix
Update as work progresses:

```markdown
**Approach:**
- [What solution was chosen]
- [Files being modified]
- [Dependencies or considerations]
```

### AFTER the Fix
Complete the log entry:

```markdown
**Fix Applied:**
- [Exact changes made]
- [New files created]
- [Files modified]

**Commit:** [hash] - [message]
**Deployed:** [Yes/No]
**Verified:** [Yes/No - include how verified]
```

---

## Session Log Structure

Create a new session log for each working session:
- **Filename:** `SESSION_YYYY_MM_DD_[TOPIC].md`
- **Location:** `memory/` folder

### Template:
```markdown
# Session Log: [Date] - [Topic]

## Summary
[One-line description of what was accomplished]

---

## Completed Tasks

### 1. [Task Name]
**Status:** COMPLETED
**Commit:** [hash] - [message]

**Before:**
- [What was wrong]

**After:**
- [What was fixed]

**Files Changed:**
- `path/to/file.tsx` (NEW/MODIFIED/DELETED)

---

## Deployments This Session

| Commit | Description | Status | Verified |
|--------|-------------|--------|----------|
| abc123 | Description | Deployed | Yes/No |

---

*Logged: [Date]*
*Author: Timothy Balch*
```

---

## Git Commit Standards

### Commit Message Format
```
[Action] [what changed]

- Bullet points for details (optional)
```

### Example Commits:
```
Fix share button with Web Share API and clipboard fallback

- Create ShareButton client component with proper onClick handler
- Use Web Share API for native mobile sharing
- Fall back to clipboard copy with visual feedback
```

```
Add Complex Setup to footer services list

- Add all 4 service tiers to footer navigation
```

### Commit Actions:
- `Fix` - Bug fixes
- `Add` - New features or files
- `Update` - Modifications to existing features
- `Remove` - Deletions
- `Refactor` - Code cleanup without functional changes
- `Style` - CSS/UI changes only
- `Docs` - Documentation updates

---

## Memory Files Reference

| File | Purpose |
|------|---------|
| `SESSION_*.md` | Daily work logs with before/during/after details |
| `LOGGING_PROTOCOL.md` | This file - how to log work |
| `ISP_STRATEGY_INSIGHTS.md` | ISP compatibility strategy and specs |
| `ISP_RESEARCH_RESULTS.md` | Raw ISP research data |
| `MARKET_RESEARCH.md` | Market demand validation |
| `MARKETING_PLAYBOOK.md` | Reddit/YouTube marketing strategy |

---

## Verification Checklist

After every deployment, verify:
- [ ] Changes visible in production
- [ ] No console errors
- [ ] Mobile responsive (if UI change)
- [ ] Links work correctly
- [ ] Forms submit properly (if applicable)

---

*Protocol Established: December 26, 2024*
*Author: Timothy Balch*
