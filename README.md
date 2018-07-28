https://demystification.co/mmittee

# Dev Setup
It's a wordpress theme.

## General
Browserify is used via Gulp to concat scripts, allow require()ing of modules and to minify. Run ```gulp watch-pack``` in the root.

## CSS
The CSS is written naked, no preprocessors, no modularisation. It's a huge, terrifying, file. Good luck.

The theme loads the CSS from ```assets/styles/dist/style.css```. running ```gulp watch-pack``` will do that for you, although it will also minify it which is a bit annoying.
