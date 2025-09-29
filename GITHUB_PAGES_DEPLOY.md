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

- The app is configured to work with GitHub Pages out of the box
- Static assets and routing are handled automatically
- The deployment happens automatically on every push to the `main` branch

## Troubleshooting

If your app doesn't load correctly and your repository is deployed as a subdirectory (e.g., `username.github.io/my-app`), you may need to configure the base path:

1. Contact support or manually edit the vite.config.ts to add:
   ```javascript
   base: '/your-repository-name/',
   ```

2. Alternatively, deploy to a repository named `username.github.io` for root domain deployment.

## Manual Deployment

You can also trigger deployment manually:
- Go to the "Actions" tab in your GitHub repository
- Click on "Deploy to GitHub Pages" workflow
- Click "Run workflow" button