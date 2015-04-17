#! /bin/bash

echo "How old are you ?"

beforeVar="yeah! you are"
afterVar="years old."
readonly beforeVar
readonly afterVar

read AGE
echo "${beforeVar} ${AGE} ${afterVar}"
