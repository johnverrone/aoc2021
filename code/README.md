# Advent of Code 2021

### Day 01

Simple iteration through all the numbers in the file with some counting. Most of my time today was spent setting up the project and remembering how to read contents from a file lol

### Day 02

Pretty straightforward again. This one adds the extra complexity of splitting each line in to it's appropriate `command` and `amount` parts. But still took a similar approach to day01 by iterating over each line and doing some maths on a global value.

### Day 03

I took some liberties with part 1 initially (like creating a hard-coded array to represent the amount of ones present at each index) and probably overcomplicated the logic here a bit, but was able to get solution pretty quickly.

I actually got stumped on part 2 a bit. Right off the bat a recursive solution sounded like the right way to go, but I got tripped up on trying to do all the logic for the `oxygenList` and the `co2List` in the same function using the same stretegy for counting the most popular number. The logic for 'which number is actually the most common in each column' got mixed up with 'are we looking for the most common or least common.' It ended up getting to a point where it was really messy so I rewrote it keeping the logic separate for each list after finding some inspiration on [r/adventofcode](https://reddit.com/r/adventofcode).
