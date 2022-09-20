version=""

while [ "$version" == "" ]
do
  echo "Is this a (1) Major, (2) Minor, (3, default) Patch, or (4) do not increment version? "

  read input

  if [ "$input" == "1" ]; then
    version="major"
  elif [ "$input" == "2" ]; then
    version="minor"
  elif [ -z "$input" ] || [ "$input" == "3" ]; then 
    version="patch"
  elif [ "$input" == "4" ]; then
    version="none"
  else
    echo -e "Invalid option\n"
  fi
done

if [ "$version" != "none" ]; then
  npm version $version
  git push
fi

echo "REACT_APP_VERSION=$(node -p "require('./package.json').version")" > .env.local

