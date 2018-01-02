# Neighborhood Map Project
Capstone project for the Udacity Frontend Web Developer Nano-degree program.

The application displays a list of Indian eateries in Cary, NC. Maps are updated via Google, and information about the venues is fetched via FourSquare.

# Using the Application
Clone the project:
```
git clone https://github.com/dipikachadha/neighborhood-map-project.git
```

Navigate to the folder and open `dist/index.html`. The app should load a map of Cary, NC showing Indian eateries. It also loads a clickable list view of the venues. The view can be dragged around using the mouse.

You can filter the list by typing into the search bar.

An information window containing FourSquare results pops up when a location is clicked on the map or the list display.

# Developer Insights
The directory structure is as follows:
- `src` folder contains the original source code for the project.
- `docs` folder contains the annotated source code for documentation, generated via `docco`/`gulp-docco`.
- `dist` folder contains the distribution code for the end user. The code is minified and stripped of comments.

The code dependencies are managed as follows:
- Libraries and frameworks are handled via `bower`. The requirements are already available via the `bower-components` folder.
- `gulp` and dependencies are managed via `npm`. Use the following commands to install dependencies and examine the included `gulp` tasks:
```
# Pull all dependencies
npm install

# Examine default gulp workflow: includes docs creation, minification and watch
gulp &
```

## Open Issues
The following issues are known, but are low priority as of now:
1. A linting task is included in `gulpfile.js`, but the code does not yet steer clean there.

```
# Lint via ESlint -- not yet working
gulp lint
```
2. Material Design CSS is used via `bower`. However, the package is incomplete and issues errors as below on the console. This is a bower/materialize issue as far as I can tell...
```
GET file:///.../neighborhood-map-project/bower_components/materialize/dist/fonts/roboto/Roboto-Light.woff2 net::ERR_FILE_NOT_FOUND
```
3. List CSS animations need to be more graceful.

# Future Application
- Develop project to Udacity provided Rubric.
- Pull points of interest from API instead of keeping a local copy.
- Add custom map styling to map display.
- Making the regex search case insensitive.
- Adding more information from the FourSquare API
- Fixing display of multiple InfoWindows.
- Do something about the div display -- possible issue on smaller screens. Possibly move it off-screen.
- Fix markers?
- Implement list toggle with KO.
- Include more information out of FourSquare API -- like URL.

# Attributions
Maps are pulled via Google API. Venue data is pulled from FourSquare.
