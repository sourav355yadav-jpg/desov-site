# Agent Rules

### Deployment Verification
After pushing code that triggers a deployment (like to Vercel, Netlify, or similar services), do NOT simply state that the push was successful. You MUST actively check the live production URL using `read_url_content` (or similar tools) to verify that the new changes are visible on the live site before confirming with the user. If the changes are not yet live, you must notify the user that the build is still propagating and periodically check back or instruct the user on the status.
