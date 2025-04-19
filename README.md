# For all Developers, please follow following guidelines
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/client-form

# Work on the feature
git add .
git commit -m "Added client form feature"

# Push feature branch
git push -u origin feature/client-form

# Create a PR from feature/client-form → dev ( Go to GitHub → Open a PR → base: dev, compare: feature/add-client-ui)
# Team members review and approve
# Merge it into dev

# Once enough features are merged into dev, test thoroughly in your QA/staging environment

# After QA is done → create a release PR

# From dev branch
git checkout master
git pull origin master
git merge dev
git push origin master