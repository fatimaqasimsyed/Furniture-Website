# Deployment Guide for The Furniture Gallery

## GitHub Pages Configuration

### Repository Settings (IMPORTANT - Check These):

1. Go to your GitHub repository: `https://github.com/fatimaqasimsyed/Furniture-Website`

2. Navigate to **Settings** → **Pages**

3. Ensure the following settings:
   - **Source**: GitHub Actions (NOT "Deploy from a branch")
   - **Custom domain**: Leave empty (unless you have one)

### Adding the Web3Forms Secret (Optional but Recommended):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_WEB3FORMS_ACCESS_KEY`
4. Value: `8e240f24-8173-4c80-bc9a-b0d18194f037`
5. Click **Add secret**

### Monitoring Deployment:

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Watch the deployment progress

### If Deployment Still Fails:

The "Deployment failed, try again later" error is often a temporary GitHub infrastructure issue. Try:

1. **Wait 15-30 minutes** and manually re-run the workflow:
   - Go to Actions tab
   - Click the failed workflow
   - Click "Re-run jobs" → "Re-run failed jobs"

2. **Manual deployment using gh-pages package**:
   ```bash
   npm run deploy
   ```
   This uses the gh-pages package to deploy directly.

3. **Check GitHub Status**: Visit https://www.githubstatus.com/ to see if there are any ongoing issues

### Current Configuration:

- **Base URL**: `/Furniture-Website/`
- **Build Output**: `./dist`
- **Node Version**: 22
- **Email Service**: Web3Forms → tfgallery0@gmail.com
- **Live Site**: https://fatimaqasimsyed.github.io/Furniture-Website/

### Troubleshooting:

**Blank Page Issue**: Fixed by setting `base: '/Furniture-Website/'` in vite.config.ts

**Build Failures**: All dependencies are locked in package-lock.json, build should work consistently

**Form Not Working**: Ensure .env file is committed (it is) or GitHub secret is set

### What's Been Done:

✅ Fixed base path for GitHub Pages subdirectory  
✅ Updated workflow to Node 22  
✅ Combined build and deploy jobs (eliminates artifact transfer issues)  
✅ Updated package-lock.json for consistency  
✅ Configured proper permissions for GitHub Pages  
✅ Added Web3Forms access key in .env file  

### Next Steps:

Monitor the GitHub Actions workflow that was just triggered by the latest push. If it succeeds, your site will be live at the URL above. If it fails again with the same error, this is a GitHub infrastructure issue and will require either waiting or trying the manual deployment method.
