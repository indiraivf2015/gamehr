========================================
  GAMETHON — Indira IVF Culture Club
========================================
"Your Focus Defines Your Speed—Show What You've Got!"

----------------------------------------
HOW TO RUN
----------------------------------------
This is a standalone web application. No server, internet,
or installation required.

Option 1 (Easiest):
  - Double-click "gamethon.html" (or "index.html")
  - It opens in your default browser. Done.

Option 2 (Host it for multiple players on a network):
  - Put this folder on any web server / shared host
  - "index.html" is the entry point
  - Works on AWS S3, Netlify, GitHub Pages, IIS, Apache,
    Nginx, or any static hosting

Works on: Desktop & Mobile (Chrome, Safari, Edge, Firefox)

----------------------------------------
THE 5 GAMES
----------------------------------------
1. Spot the Difference  - Find 5 differences in hospital scene
2. Jumble Puzzle        - Unscramble hospital words
                          (PHARMACIST, SURGERY, PATIENT,
                           VACCINE, HOSPITAL)
3. Match the Word       - Pair 6 medical terms with meanings
4. Find the Way         - Maze: guide patient to doctor
5. Cross or Zero        - Tic-tac-toe vs computer / 2 players

----------------------------------------
GAME RULES
----------------------------------------
- Total time: 120 seconds for ALL 5 games combined
- Timer runs continuously (not per game)
- Solve a game -> auto-advances to the next
- "Skip" button -> jump to next game
- Timer hits 0 -> auto-submit
- Session valid for only 5 minutes after login

----------------------------------------
PLAYER FLOW
----------------------------------------
1. Login (Employee ID + Name)
2. Click "Start Gamethon"
3. 120-second timer starts
4. Play through the 5 games
5. On finish -> rank dashboard popup appears
   showing position (e.g. "3rd out of 12 players")
6. Logout for next player

----------------------------------------
ADMIN PANEL
----------------------------------------
- Click the "Admin" button (bottom-right corner)
- Password (any of these, case-insensitive):
       admin
       admin123
       indira
       indira123

Admin can view:
  * Employee Status — name, ID, games completed,
    time taken, status (Completed / Timeout /
    In Progress / Session Expired), start time
  * Leaderboard (Top 10) — ranked by most games
    solved, ties broken by fastest time
  * Clear All Data button (resets everything)

----------------------------------------
IMPORTANT NOTE ON DATA
----------------------------------------
Player records are stored in the browser's local
storage. This means:

  - Records are saved PER browser / PER device
  - The admin panel on a device only shows players
    who played ON THAT SAME device/browser

For a single-kiosk setup (one laptop/tablet where
everyone plays), this works perfectly — the admin
sees all players and the full leaderboard.

For a multi-device setup (players use their own
phones), each device keeps its own records. If you
need ONE central leaderboard across many devices,
that requires a backend server (can be built
separately on request).

----------------------------------------
CUSTOMIZATION
----------------------------------------
All content is in the single HTML file. To change
words, hints, scenes, timer, or passwords, edit the
relevant section in gamethon.html and re-save.

========================================
