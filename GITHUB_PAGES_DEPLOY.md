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

## Automatic Configuration

The GitHub Actions workflow automatically handles:
- **Base path detection** - Automatically sets the correct path for subdirectory deployments
- **Asset URLs** - Ensures CSS/JS files load correctly whether deployed to root or subdirectory
- **SPA routing** - Creates fallback for client-side routing

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