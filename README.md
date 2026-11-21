# Swell Window

A one-button surf game for learning how a browser game fits together. Time your takeoff over five waves and try to beat your best score.

## Play on your computer

On the repository's **Code** tab, choose **Code → Download ZIP**. Extract the folder and open `index.html` in your browser. Select **Start set**, then tap **Catch wave** or press Space when the moving marker reaches the striped zone. Landing in the bright center scores three points. The rest of the zone scores one.

## Trace one tap through the stack

| Where to look | What happens |
| --- | --- |
| `index.html` · HTML | Defines the catch button, timing track and score display. |
| `game.js` · JavaScript | Reads the tap, measures the marker's distance from the target and awards points. |
| `style.css` · CSS | Draws the target bands and marker and sizes the controls for your screen. |
| Browser storage · `localStorage` | Remembers the best completed set in this browser when storage is available. |

These pieces run on the player's device. A shared leaderboard would add a backend to accept scores and a database to keep them across players.

## Try a GitHub change

Find the `PERFECT_RADIUS` setting near the top of `game.js`. It sets the half-width of the three-point zone as a fraction of the whole track. Increasing it gives players more room on both sides. The score check and the visible center band read the same setting.

A **branch** is a place to make a change. A **commit** saves a named checkpoint. A **pull request** puts the proposed change alongside the current version for review. In **Files changed**, green lines are additions and red lines are removals. **Merge** brings the reviewed change into `main`.
