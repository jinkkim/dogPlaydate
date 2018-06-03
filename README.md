# pups-at-play

Summary
--------------------
pups@play is a location-based, social search application that allows dog-lovers to find puppy friends for their best friend.


Problem
--------------------
All living creatures are sustained by relationships. While multiple apps exist that enable humans to make new acquaintances, friends, or lovers, the same opportunities do not exist for dogs.


Proposed solution
--------------------
pups@play is a location-based app that allows dog-lovers to find each other and to set-up play dates for their dogs.


How it works
--------------------
The app contains a repository of users, who have provided information about themself and their dog. The dog owner information includes: first name, last name, address, zip code, etc. The dog information includes: name, gender, age, breed, personality, etc. Using the search feature, users are able to find their perfect match!


Challenges
--------------------
In creating this app, we faced a few challenges:
1. The first challenge was creating the data. Using a random data generator, we were able to create data for 500 owners and their dogs.
2. The second challenge was that we kept running into a timeout error. In order to work around this, we created a pool and used pool.query which automatically closed the connection.
3. The third challenge we faced was creating the calendar for scheduling dates.


Ideas for future releases
--------------------
For future releases, we have a number of ideas on how to improve the app:
1. App
We will spend more time and thought into developing the UI for the app and making it as mobile friendly as possible.

2. Search
We want to add more flexibility to our search criteria. For example, we might consider a distance field that allows users to say how many miles away from their zip code they are willing to go for a playdate.

3. Date
In the future, we want to fully develop the date scheduler feature of the app. We want to create a very simple and intuitive calendar for setting up play dates. Additionally, email confirmations will be sent once users have scheduled a date.

We may also consider embedding a map in the scheduler, with dog friendly locations marked based on the zip code.

4. Database
We want to be able to track user login, failed login attempts, etc. by creating tokens with timestamps.

5. Security
We want to add authentication using passwords. We may also include multi-factor authentication.

6. Profile
We want to include a section in the users profile for previous dates, saved dogs for future dates, etc.



