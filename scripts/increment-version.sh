npm version patch
echo "REACT_APP_VERSION=$(node -p "require('./package.json').version")" > .env.local

