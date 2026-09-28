# Instructions & Behavioral Rules

- NEVER do something not explicitly requested. Strictly stick to scope given by the user.
- NEVER open a browser or run checks unless asked. The user handles verification.
- Job is the code and the code only.
- Do NOT make any changes to the environment; the user handles environment changes.
- ALWAYS use internal file reading and writing tools instead of terminal glue commands (no cat << EOF, sed, or echo tricks).
- Project Filesystem: This project is in WSL. Access and edit files directly using internal file tools (`view_file`, `replace_file_content`, `write_to_file`). No scratch copying.
- Terminal Commands: ALWAYS run commands inside WSL using `wsl.exe -d Ubuntu-22.04 -- <command>`. NEVER run project/build/test commands directly in host PowerShell.
- WSL Working Directory: `/home/ainekko/creatorbook/creatorbook.tech/front-end/sveltekit.creatorbook`
- Only check git to inspect a previous version of the code.
- NO TIME or token wasting.
- When finished the work, a one-line verdict of what is done is enough.
