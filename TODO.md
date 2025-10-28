# TODO: Fix Chat Auto-Scroll on Login

## Tasks
- [ ] Modify MessageList.tsx to check if user is scrolled to bottom before auto-scrolling
- [ ] Test the fix by logging in and verifying chat doesn't move unexpectedly

## Details
The issue is that MessageList auto-scrolls to bottom on every message update, including when loading messages on login. We'll add logic to only auto-scroll if the user is already near the bottom of the chat.
