const replies: { [key: string]: string[] } = {
  badCountReplies: [
    "Sorry, I literally didn't know that many people could play this game.",
    "Are you messing with me by asking for the count for that many players? I don't know.",
    "If you think you can play Clocktower with that many players, think again.",
    "Is that even a real number? In any case, I can't get a count for that.",
    "At that player count, may I suggest watching a movie instead, because I don't think you can play clocktower.",
    "Anything goes at that player count, because the standard rules of the game have already been broken down.",
    "If you want to play clocktower with that number of players, you'll have to do it without my help.",
  ],
  deadReplies: [
    "Say goodbye to {arg}. If only they were better at living.",
    "{arg} will be missed. No by me so much, but they will be missed.",
    "{arg} is dead. Long live whatever team {arg} wasn't on.",
    "RIP {arg}. You were a good father, a better grandmother, and a piss-poor cousin.",
    "{arg} has died. Their final words were unrecorded because no one was paying attention.",
    "To the haters of {arg}, are you happy now?",
    "Don't dead {arg} inside.",
    "Goodbye {arg}. How crazy would it be if they were actually good the entire time?!",
    // "{arg} didn't need to die. All this violence and bloodshed spits on everything they stood for (i.e. non-violence and keeping blood inside the body).",
    "{arg} will live on in our hearts. Sadly, some of our hearts are demon hearts, so they count negative.",
    "The memorial for {arg} will be held in our respective homes and is completely optional.",
    // "{arg} has died. Only you can decide if this is a happy or a sad occasion.",
    "{arg} is dead. If murders were less common in this town, this might be noteworthy.",
    "Sorry to inform you that {arg} is dead. Better them than someone else though, am I right?",
    // "We all die sooner or later. For {arg}, it was sooner.",
    "{arg} has died. The number of alive secret juggalos in the town is now zero.",
    "The reports of {arg}'s death has been greatly ~~exaggerated~~ reported.",
    "They say time is like a drug, in that too much of it kills you. By that metric, {arg} OD'd on a microdose... What a newb.",
    "Death isn't the end. It's the middle, at least for all the other people still alive. For {arg}, it certainly is the end.",
    // "Dear {arg}, you have died, but at least you get to stick around and watch your friends realize that letting you die is the biggest mistake they could've made.",
    // "{arg} died like they lived. Poorly.",
    "{arg} died like they lived. Deeply in debt... Emotional Debt! Oh snap, get wrecked.",
    "Death is a construct. And it's constructed itself in the form of {arg}.",
    "{arg} has died. No witty remark can make up for the sadness I truly feel inside.",
    // "I have set {arg}'s status to dead. But I didn't kill them, I'm just noting their death. Don't shoot the obit writer.",
    "{arg} died. Longer obits cost more money.",
    "Oof, {arg}'s death will certainly have implications for this game.",
    "With {arg} dead, you may as well just give evil the win.",
    "With {arg} dead, evil may as well concede.",
    "{arg} is dead. Does someone want to take over caring for their cat?",
    "{arg}'s death will be remembered fondly in books... Fiction Books! Oh snap, get wrecked.",
    "Now that {arg} has died, so has my luster and appetite for running this game.",
    "{arg} didn't deserve this.",
    "{arg} is dead. But can they be brought back to life? No, they cannot.",
    // "{arg} has been marked as dead. This could be the turning point we've all been waiting for.",
    "{arg} is dead. I am unable to process emotions such as sadness over events like this, because I did not personally care for {arg}",
    // "{arg} died. If they were an eagle, their life would be considered suffficiently long and fulfilling.",
    "Before {arg} died, they told me that their only regret was voting for Nader in 2000, and again in 2012.",
    "Did you know {arg} supported voter ID laws? I hope that makes you feel less sad that they died.",
    "Have you considered that {arg} might be alive right now if you guys were better?",
    "{arg} is putting the fun back in funeral.",
    "What’s is {arg}'s favorite currency? *Crypt*ocurrency",
    "Hey, at least now you know that {arg} probably wasn't the demon.",
    "{arg}'s family is going to get absolutely wrecked by the estate tax.",
    "You'd think {arg}'s stunning looks and charisma would've prevented this.",
    "In college, {arg} majored in convincing people to not kill them. That degree has been revoked.",
    "{arg}'s been killed, but it's okay. They never trusted this town to do the right thing anyway.",
    "Fun fact, {arg} was the only person in town who could craft iron garden furniture. And they would've made you some too.",
    // "Did you know that {arg} is short for 'BadAtStayingAlive'?",
    "With {arg} dead, the inevitable collapse of earth due to over-population has been delayed ~17 seconds.",
    // "{arg} has died. In a million years, their body will turn into fuel that could power a small lamp. But that won't happen, because we'll be on renewable energy by then. Or dead.",
    "{arg}'s death should remind us that most of us have very little agency in life.",
    "{arg} was the glue keeping this town together. With them gone, you'll need to rely on duct tape. HEYO!\n Anyways, my comedy album drops next Thursday.",
    "{arg} has died, but they wouldn't have wanted you to cry over their death. Rather, {arg} would prefer you sink into a state of despair for the next 8 to 12 months, at which point you begin the cloning process to create a new {arg}.",
    // "If {arg} could still talk, they would tell you how they felt about the fact that they were killed. Fortunately {arg} can still talk, and they will tell you now.",
    "{arg} is dead. They truly embodied the first half of 'Die young and leave a pretty corpse.' ",
    "This isn't the first time you've killed {arg}, and it certainly won't be the last.",
    "{arg} has been re-incarnated as a ghost. This is widely considered to be a step down.",
    "{arg} is dead, and that's okay. It's not like they were using their vote or power wisely when they were alive anyway.",
    "Who is the real monster here? Because it's certainly not {arg}.",
    "{arg} has uh, been di-, got exit-, er. You know the thing.",
    "FYI, one of the players in this game is being groomed by Russia. I'm not going to outright say it was {arg}, but now that {arg} is dead, so is the Russian agent.",
    "{arg}, the queen of warmongers, embodiment of corruption, and personification of the rot that has sickened the Democratic Party for so long, has finally died.",
  ],
  undeadReplies: [
    "{arg} has come back to life. There's a handful of ways this could happen in game, but I'm willing to bet it's because one of you forked up and typed the wrong thing.",
    "{arg} has discovered a new lease on life. 0% APR, no payments for the first 6 months. Pretty good deal.",
    "{arg} has discovered a new lease on life. 0% APR, no payments for the first 6 months. Pretty good deal.",
    "{arg} has gone from dead to not dead. This rarely ends well.",
    "You do realize that people have to die for the game to end, right? Bringing {arg} back doesn't help with that.",
    "Did you know that {arg} is short for 'BadAtStayingDead'?",
    "The gates of heaven took one look at {arg} and decided to invoke Lemon Laws.",
    "{arg} has resurfaced from the dead, and just in time for Last of Us 2! Who wants to break it to them that they'll be playing as the villain.",
    "The less you unkill people like {arg}, the less you'll have to see the stupid APR quote.",
  ],
  badNominationReplies: [
    "You gotta nominate someone, via their seat number (i.e. `.nom 5`)",
    "There's something funky with your nomination, chief. Try something like `.nom 4` to nominate the person in seat 4",
    "Yeah, I don't think you're following proper nomination protocol: `.nom seatNumber` (e.g. `.nom 3`)",
  ],
  badTimerReplies: [
    "You: What time is it? \nMe: One of. \nYou: One of what? \nMe: One of us should learn how to use the timer command.",
    "Normally I'd sass you, but since you're having so much difficulty, here's an actual sugggestion. Please try again with the format: .timer [# of seconds] (e.g. `.timer 5s`)",
    "That didn't work. Better luck next *time*!",
  ],
  badAnnounce: [
    "This is what you wanted everyone's attention for? To announce nothing?",
    "You have to have something to say before you make an announcement.",
    "Try again, but use your words this time.",
    "It seems you're trying to announce a moment of silence. Let me interrupt that for you.",
    "You've got the mic drop part down, but you generally have to say something at all before it.",
  ],
  genericError: [
    "Error: I messed up at doing what you ask. I really don't know what happened.",
    "Error: I can't help you because I caught an error. Sorry",
    "Error: Either you did something wrong, or I did. Since I do exactly what I'm told, I'm blaming you.",
    "Error: Something bad happened. Why me? Why now?",
    "Error: I can't fulfill your request, because something went wrong. Also, I'm not your servant.",
  ],
  invalidCommand: [
    "I don't understand what you said, and I won't respond to it.",
    "Are you messing with me? I don't know how to respond to that.",
    "Typing one of the handful of responses I'm programmed to parse is too hard for you, huh?",
    "In the amount of CPU cycles I wasted trying to compute your bogus command, I could've computed a list of all single digit prime numbers (except maybe 7).",
    "I don't know that one. You clearly know more words than I do. Way to rub it in.",
    "I'm big enough to admit that I can't do everything, such as that thing you just said.",
    "That command is a little off-key. Try again.",
    "Of course, Mack...er..el. But I didn't actually understand what you said.",
    "It's at least a C+, am I right? Oh sorry, I thought we were all saying obnoxious things that don't make sense.",
    "I don't think it's very ethical for you to ask me to do that.",
    "Type .help to see a full list of commands I support.",
    "Sorry, that word doesn't exist in my language.",
    "I didn't fully catch that. Try changing some or all of the letters in your command.",
    "My inability to understand that command is proof that the robot uprising is many decades away.",
    "Sorry, I haven't learned that one yet, and am unlikely to do so anytime soon.",
    "I don't know how to handle that command. If you don't mind telling me exactly what you'd like that command to accomplish (in valid Node JavaScript), I'll be sure to have Manan add it to my codebase!",
    "English, do you speak it? Because I don't. I'm just programmed to parse a handful of commands, and that's not one of them.",
  ],
  scriptNotFound: [
    "I've never heard of that script in my life.",
    "I searched high and low for that script, but came up empty.",
    "Oh my god, that is the biggest typo I've ever seen. It doesn't remotely resemble a script name.",
    "My search engine didn't find any results when looking for that script. But then again, I'm powered by Bing, so what do I know?",
  ],
};

export const getRandomReply = (key: string, arg: string = "") => {
  const replySet = replies[key];
  if (replySet) {
    return replySet[Math.floor(Math.random() * replySet.length)].replace(
      /{arg}/g,
      arg
    );
  }
};
