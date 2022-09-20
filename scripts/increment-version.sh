npm version patch
git push
echo "REACT_APP_VERSION=$(node -p "require('./package.json').version")" > .env.local

