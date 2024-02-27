#!/bin/bash

# Directory containing HTML files
directory="./main/errors"

# Change directory
cd "$directory" || exit

# Rename HTML files to have .ejs extension
for file in *.html; do
    newname="${file%.html}.ejs"
    mv -- "$file" "$newname"
    echo "Renamed $file to $newname"
done
