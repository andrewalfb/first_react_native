#!/bin/bash
set -e

cd "$(dirname $0)"
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH="$JAVA_HOME/bin:$PATH"

java -version
npx expo run:android
