# build
npm install
# shellcheck disable=SC2164
cd src
nexe readXcode.js
# shellcheck disable=SC2103
cd ..
zip readXcode.zip node_modules/ src/
