This game has been deployed at https://hangmangame-by-sahara.netlify.app/. Please have a play.

# 1. About

This was my first major personal project. I worked on this duing the christmas week break of the programming bootcamp.

It is a hangman game written in javascript, html and styled using css. The word bank is hardcoded in a file. Another alternative would be to import word list from an API.

# 2. Further plans for this project

If you played the game, you may have noticed that the score does not update. My plan is to have scores with username to be stored in a database so high scores can be displayed.

If you click on new word, new game with a new word will be started. However, if a game is lost and the restart button is clicked, it rerenders the site. This was a quick fix solution that needs to be updated.

# 3. Major challengs and learnings from the project

Working on this project helped me solidify and improve my knowledge and understanding of javascript, html and css. I had to write more complex functions than I had previously worked on. After breaking down the problems, I researched and searched for solutions that I could not slove using my prior programming knowledge. Doing this I was able to use new built-in methods and features(such as split and join methods and features such as display and visibility), and also have a greater understanding of functions and how to best pass paramenter and other values to these functions.

One of the main challenge was to work around the 26 differnt bottons for the alphabets, without having the need to code for each button individually. When a letter button was clicked, I needed the alphabet value of that button to be set as the value selected and pass that value to another function that would process that value.

Using input type, I worked around this by having all the alphabet buttons in one div. The letterselected function was set to evoke only when an input type of button within that div was clicked.
