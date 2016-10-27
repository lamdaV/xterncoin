This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[Demo](https://xterncoin.herokuapp.com/)

# Description
This is my solution to the Xtern Technical Screening. 

# The Background
A new cryptocurrency has hit the market called XternCoin, and you are the lead developer, product manager, IT analyst, and/or designer (depending on the role you are applying for in Xtern).
Like all cryptocurrencies, XternCoin has value because of the compute difficulty of solving cryptographic problems. What's our cryptographic problem? Guessing random numbers.
XternCoin users must guess random numbers. If they guess correctly, they are awarded a coin. Once they have coins, they can trade them with other users, buy things... all the normal stuff you can do with dollars. At least, that's the idea.

# The Problem
Right now, XternCoin is just an idea and a small spec.
Your job, should you choose to accept it, is to advance the creation of XternCoin in a way that best fits your background and skillset. Pick one of the sections below based upon the role you are applying for in Xtern. If your role isn't listed verbatim, read over them all and try your hand at something similar, or contact TechPoint (talent@techpoint.org) for more help.

# Requirements
func HandleGuess(userId string, guess int) bool {} (Server Code)  
Function which takes a user's id and a user's guess, and returns whether or not their guess was correct.

func GetCoins(userId string) int {} (Server Code)  
Function which takes a userid and returns how many coins they have.
**Note:** this is unused as a guess will already return how many coins the user has regardless of success or failure of guesses.

Finally, one more function is required:
func StartGuessing() {} (Client Code)  
A function which, when called, pretends to be a user of XternCoin and uses the other two functions you've written to accumulate coins by guessing random numbers in a loop (indefinite is fine) fasdf.
