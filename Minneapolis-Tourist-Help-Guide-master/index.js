var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE',
};

var location = "Minneapolis";

var numberOfResults = 3;

var APIKey = "842e9b3bcdac431fb7f4011fb6e45825";

var welcomeMessage = location + " Guide. You can ask me for an attraction, the local news, or  say help. What will it be?";

var welcomeRepromt = "You can ask me for an attraction, the local news, or  say help. What will it be?";

var locationOverview = "Minneapolis is a major city in Minnesota that forms Twin Cities with the neighboring state capital of St. Paul. With an estimated 413,651 residents as of 2016, Bisected by the Mississippi River, it's known for its parks and lakes. Minneapolis is also home to many cultural landmarks. ";

var HelpMessage = "Here are some things you  can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do. Tell me the local news.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "What attraction was that? " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example, open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
    { name: "The Como Zoo", content: "located just 15 minutes East of downtown Minneapolis. Como Zoo and Conservatory provides a balanced combination of fun and education. Its mission is to inspire the public to value the presence of living things in our lives. Como Park Zoo and Conservatory is open 365 days a year and admission is free.", location: " \n Main Entrance:\n Street address: 1225 Estabrook Dr, St Paul, MN 55103", contact:"651 487 8201" },
    { name: "Mall Of America", content: "Mall of America® is located in Bloomington, Minnesota—only 15 minutes from downtown Minneapolis and St. Paul. As one of the most visited tourist destinations in the world, Mall of America features—520 stores, 50 restaurants and attractions galore, including Nickelodeon Universe®, the nation's largest indoor theme park, and the American Girl store. Plus, there's no sales tax on clothing or shoes!", location: "60 E Broadway, Bloomington, MN 55425", contact: "952 883 8800" },
    { name: "Minnehaha Park", content: "Minnehaha Park is a city park in Minneapolis, Minnesota, United States, and home to Minnehaha Falls and the lower reaches of Minnehaha Creek. it's One of Minneapolis' oldest and most popular parks features a majestic 53-foot waterfall, limestone bluffs, and river overlooks, attracting more than 850,000 visitors annually.", location: "1401 Alaskan Way, Seattle, WA 98101, United States", contact: "email at INFO@WALKERART.ORG or call them at 612 375 7600" },
    { name: "Minneapolis Sculpture Garden", content: "The Minneapolis Sculpture Garden has reopened, better than ever! This crown jewel of the city’s park system unites two of Minnesota’s most cherished resources—its parks and its cultural life. Since opening in 1988, the Garden has welcomed millions of visitors, showcasing more than 40 works from the Walker Art Center’s collections, including the iconic Spoonbridge and Cherry. ", location: "305 Harrison St, Seattle, WA 98109, United States", contact: "206 753 4940" },
    { name: "US Bank Stadium", content: "U.S. Bank Stadium is not just a location, but an epicenter of excitement, opportunity, and Minnesota pride. The Vikings are an important part of our proud heritage and the relationship between the Vikings and the citizens of Minnesota runs deep. But the stadium is not just the home of the Minnesota Vikings, it’s a facility that will host major national and international events that create economical, fiscal and social benefits to the region. Three major events have already been announced, Summer X Games (2017-2018), Super Bowl LII (February 4, 2018) and the NCAA Final Four (2019).", location: "401 Chicago Ave, Minneapolis, MN 55415", contact: "612 777 8700" }
];

var topFive = [
    { number: "1", caption: "Hit up Uptown to see Minneapolis culture at it's finest.", more: "Uptown is an eclectic, vibrant entertainment district filled with restaurants, large and small, that thrive in Uptown, along with movie theaters, retail stores, coffee shops and more than 30,000 residents.", location: "Follow Hennepin Avenue a few blocks south of downtown and you will find Uptown."},
    { number: "2", caption: "Go check out the Minneapolis Institute of Art", more: "Mia inspires wonder with extraordinary exhibitions and one of the finest wide-ranging art collections in the country. From Monet to Matisse, Asian to African, 40,000-year-old artifacts to world-famous masterpieces, Mia links the past to the present and enables global conversations.", location: "2400 3rd Ave S, Minneapolis, MN 55404", contact:"612 870 3000" },
    { number: "3", caption: "Hungry? You can kick back and enjoy some Juicy lucy's at Matts Bar!", more: " now a Minneapolis landmark, began in 1954 as a neighborhood burger eatery. Shortly after we opened, founder Matt Bristol explains how the “Jucy Lucy” was created when a local customer asked for two hamburger patties with a slice of cheese in the middle. Upon biting into this new, molten hot burger, he exclaimed “that’s one juicy Lucy”, and a legend was born.", location: "3500 Cedar Avenue, Minneapolis, MN 55407", contact: "612 722 7072" },
    { number: "4", caption: "Some fun for the kids would be at The Science Museum", more: "The Science Museum of Minnesota is an American museum focused on topics in technology, natural history, physical science, and mathematics education.", location: "120 W Kellogg Blvd, St Paul, MN 55102", contact: "651 221 9444" },
    { number: "5", caption: "another great food option would be at Holy Land Bakery, Grocery and Deli", more: "Middle Eastern deli attached to a market offering traditional from-scratch eats & a lunch buffet.", location: "2513 Central Ave NE, Minneapolis, MN 55418", contact:"612 781 2627" }
];

var topFiveIntro = "Here are the top five things to  do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getNewsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getNewsIntent');
    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':tellWithCard', output, location, locationOverview);
    },
    'getAttractionIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Things To See in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'getNewsIntent': function () {
        httpGet(location, function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by New York Times\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = newsIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.response.docs.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData.response.docs[i].headline.main;
                        var index = i + 1;

                        output += " Headline " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " See your Alexa app for more information.";
            }

            var cardTitle = location + " News";

            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
        });
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = 0;
        if(this.event.request.intent.slots.attraction ) {
            if (this.event.request.intent.slots.attraction.value) {
                slotValue = this.event.request.intent.slots.attraction.value;

            }
        }

        if (slotValue > 0 && slotValue <= topFive.length) {

            var index = parseInt(slotValue) - 1;
            var selectedAttraction = topFive[index];

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
    console.log("/n QUERY: "+query);

    var options = {
        //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

            var body = '';

    res.on('data', (d) => {
        body += d;
});

    res.on('end', function () {
        callback(body);
    });

});
    req.end();

    req.on('error', (e) => {
        console.error(e);
});
}

String.prototype.trunc =
    function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
    };
