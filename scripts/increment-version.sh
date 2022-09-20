#!/bin/bash

version_type=""

while [ "$version_type" == "" ]
do
  echo "Is this a (1) Major, (2) Minor, (3, default) Patch, or (4) do not increment version? "

  read input

  if [ "$input" == "1" ]; then
    version_type="major"
  elif [ "$input" == "2" ]; then
    version_type="minor"
  elif [ -z "$input" ] || [ "$input" == "3" ]; then 
    version_type="patch"
  elif [ "$input" == "4" ]; then
    version_type="none"
  else
    echo -e "Invalid option\n"
  fi
done

if [ "$version_type" != "none" ]; then
  version=$(npm version $version_type)
  git push
  git push origin v$version
fi

echo "REACT_APP_VERSION=$(node -p "require('./package.json').version")" > .env.local

