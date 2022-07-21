const quotes=[
    {
        quote:"Where there is a will there is a way.",
        author:"Angela Merkel",
    },
    {
        quote:"Life is a journey.",
        author:"Ralph Waldo Emerson",
    },
    {
        quote:"Don't dream, Be it.",
        author:"Tim curry",
    },
    {
        quote:"The die is cast.",
        author:"Julius Caesar",
    },
    {
        quote:"when they go low, we go high.",
        author:"Michelle Obama",
    },
    {
        quote:"I was never less alone than when by myself.",
        author:"Edward Gibbon",
    },
    {
        quote:"Seeing is believing.",
        author:"Thomas Fuller",
    },
    {
        quote:"The will of man is his happiness.",
        author:"Friedrich von schiller",
    },
];

const quote=document.querySelector("#quote span:first-child");
const author=document.querySelector("#quote span:last-child");

const todaysQuote=quotes[Math.floor(Math.random()* quotes.length)];

quote.innerText=todaysQuote.quote;
author.innerText=todaysQuote.author;