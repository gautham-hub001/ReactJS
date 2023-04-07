### state vs props

props is if you want to pass some info like text (title, description). And each time the same component will have different title and desceription, so props is used.
state is if you are having like a counter and you update it based on previous count(state), so we use state there.

Note: React was created by Facebook

Install the extension on VS code: ES7 + React/Redux/React-Native.
You can use the shortcut rdc (react function code) and press enter to get readmade react snippet

### Important concept in javascript - object/array deconstruction:

https://www.youtube.com/watch?v=NIq3qLaHCIs

## Create React app

npx create-react-app name-of-app

It will add all the biolderplate code, so you can delete all files in public folder except for index.html. We can also remove all the files in src folder except for App.js and index.js. Remove all the imports too and return null in App.js.

### `npm start`

Runs the app in the development mode.

## Pokemon app

https://pokeapi.co/

## useState hook

Add it in index.js along with import react

Note: Whenever you have like a loop in your react code, add key attribute to that element so it would be easier for react to render those elements.

## Axios library

Allows to fetch from apis easier compared to default fetch()

npm i axios

axios.get('url') -> returns promise

useEffect() -> takes a function and runs everytime react re-renders or based on the props that we pass changes

cancelToken - Suppose if old request is processed after the new request, we should not load old data, so we can use cancelToken to cancel the old request so that only latest data gets shown to the user.
