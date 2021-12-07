# Advent of Code 2021

### Day 01

Simple iteration through all the numbers in the file with some counting. Most of my time today was spent setting up the project and remembering how to read contents from a file lol

### Day 02

Pretty straightforward again. This one adds the extra complexity of splitting each line in to it's appropriate `command` and `amount` parts. But still took a similar approach to day01 by iterating over each line and doing some maths on a global value.

### Day 03

I took some liberties with part 1 initially (like creating a hard-coded array to represent the amount of ones present at each index) and probably overcomplicated the logic here a bit, but was able to get solution pretty quickly.

I actually got stumped on part 2 a bit. Right off the bat a recursive solution sounded like the right way to go, but I got tripped up on trying to do all the logic for the `oxygenList` and the `co2List` in the same function using the same stretegy for counting the most popular number. The logic for 'which number is actually the most common in each column' got mixed up with 'are we looking for the most common or least common.' It ended up getting to a point where it was really messy so I rewrote it keeping the logic separate for each list after finding some inspiration on [r/adventofcode](https://reddit.com/r/adventofcode).

### Day 04

Once again I feel like trying to get too cute and clever with it was my downfall. Ended up spending way too much time trying to figure out how to solve bingo in the most minimal amount of loops and array definitions. I eventually took a more verbose approach creating `markCalled()` and `checkForWinner()` functions to finally solve part 1.

Part 2 took me hours longer than it should have because of an error where I was removing the boards that won and continuing on before all the subsequent boards were able to get marked. I solved this naively by moving the 'marking' and the 'checking for winner' logic into two separate for loops, but I'm sure there's a more elegant solution here. Frustrating puzzle tbh. Spent too much time confirming my logic was valid only to realize it kinda was -- just my variable references were causing the logic to not work correctly.

### Day 05

Straightforward. Tried to use an actual interface and a matrix to represent the grid this time instead of doing it in a single dimension array like Day 4. Only thing that tripped me up was that I needed to take the absolute value of `x2 - x1` when calculating the length of a diagonal in part 2 🤦‍♂️

### Day 06

This was a fun one. Easy to solve part 1 using an array but immediately noticed what the problem was going to be when getting to part 2. Took some time to scratch out a couple 'days' of reproduction thinking that maybe there is some formula to use for each 'lifespan remaining' value to determine how many fish will exist with a given input, but ended up seeing the pattern. Since we don't really care about the indivudual fish (sorry fish), we can just keep a map to store counts of fish by 'days left to live.' With a little additional logic on '6 days remaining,' we end up with a pretty clean solution that isn't going to suck up every bit of memory your computer has to offer. This one was fun. I was also thinkng that the solution might break the max integer value, and I'd have to look at `BigInt` options, but it seemed to come out just fine with `number`.

### Day 07

Obviously a puzzle that was solved by a lot of people very quickly considering the leaderboards were throwing 500's within minutes of the puzzle being launched. The two things that slowed me down were 1. remembering the formula for `n + (n + 1) + (n + 2) + ...` and 1. realizing that `n` to the power of `x` in JavaScript is `n ** x` **not** `n ^ x` 🤦‍♂️.
