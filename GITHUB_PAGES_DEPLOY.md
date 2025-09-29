# Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The deployment will start automatically

3. **Access your deployed app**:
   - Your app will be available at: `https://username.github.io/repository-name`
   - The URL will be shown in the Pages settings after deployment

## Configuration Notes

- The GitHub Actions workflow is configured with automatic base path detection
- SPA routing fallback (404.html) is automatically created for client-side routing
- The deployment happens automatically on every push to the `main` branch

## Important: Base Path Configuration

**For repositories deployed as subdirectories** (e.g., `username.github.io/my-app`), you need to manually configure the base path:

1. Edit `vite.config.ts` and add the base configuration:
   ```javascript
   export default defineConfig({
     base: process.env.VITE_BASE_PATH || "/",
     // ... rest of your config
   });
   ```

2. The GitHub Actions workflow already sets `VITE_BASE_PATH` automatically, so this will work once the config is updated.

**Alternative solution**: Deploy to a repository named `username.github.io` to avoid base path issues entirely.

## Troubleshooting

If your app doesn't load correctly:
- Check if CSS/JS files are loading (404 errors indicate base path issues)
- Verify that your repository name matches your expectations
- Ensure the Pages source is set to "GitHub Actions" in repository settings

## Manual Deployment

You can also trigger deployment manually:
- Go to the "Actions" tab in your GitHub repository
- Click on "Deploy to GitHub Pages" workflow
- Click "Run workflow" button