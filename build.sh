#/bin/zsh

# compile
webpack
sass app/sass/main.scss assets/main.css --style expanded

# copy libraries
mkdir -p assets/libs/semantic
cp -r ./node_modules/semantic-ui/dist/* assets/libs/semantic
mkdir -p assets/libs/bootstrap
cp -r node_modules/bootstrap/dist/*  assets/libs/bootstrap

cp app/src/highlight.js assets/libs
cp ./node_modules/jquery/dist/jquery.min.js assets/libs
