#/bin/zsh

# compile
webpack
sass app/sass/main.scss assets/main.css

# copy libraries
mkdir -p assets/libs/semantic
cp -r ./node_modules/semantic-ui/dist/components\
      ./node_modules/semantic-ui/dist/themes\
      ./node_modules/semantic-ui/dist/semantic.min.js\
      ./node_modules/semantic-ui/dist/semantic.min.css\
      assets/libs/semantic

cp app/src/highlight.js assets/libs
cp ./node_modules/jquery/dist/jquery.min.js assets/libs
