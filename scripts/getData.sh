#!/usr/bin/env bash

# Project: advent-of-code-2022
# FilePath: /scripts/getData.sh
# File: getData.sh
# Created Date: Saturday, December 3rd 2022, 5:00:07 pm
# Author: Craig Bojko (craig@pixelventures.co.uk)
# -----
# Last Modified: Sat Dec 03 2022
# Modified By: Craig Bojko
# -----
# Copyright (c) 2022 Pixel Ventures Ltd.
# ------------------------------------
# <<licensetext>>


# Get the data for the day
day=$1
if [ -z $1 ]; then
    echo "Enter the day number"
    read day
fi

# Get the current directory path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get session from env variable or prompt for it
SESSION=$AOC_SESSION
if [ -z "$AOC_SESSION" ]; then
    echo "Enter your session cookie from adventofcode.com"
    read SESSION
fi

echo "Getting data for day $day"
echo "Outputting to $DIR/../data/day$day.txt"

curl \
  -H "Cookie: session=$SESSION" \
  -s https://adventofcode.com/2022/day/$day/input \
  > $DIR/../data/day$day.txt
