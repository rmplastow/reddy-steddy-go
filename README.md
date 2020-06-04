# Reddy Steddy Go

`------------------------------------------------------------------------------`

## Renderables

To understand classes, consider:

- Filesystem hierarchy (how the files and folders are organised)
- Inheritance (‘is a’ relationships)
- Composition (‘contains a’ or ‘has a’ relationships)
- Properties and methods (also known as values and functions)
- Default values

Renderables are organised in the ‘src/renderables/’ folder like this:

```
src/
  renderables/
    App-Config-Game-and-Player/
    Chats-Messages-and-Missions/
      Chats/
      Messages/
      Missions/
    Cutscenes-Habitats-and-Portals/
      Cutscenes/
      Habitats/
      Portals/
    Locatables/
      Animals/
      Avatars/
      Characters/
      Items/
      Plants/
      Scenics/
      Terrains/
```

### The ‘AbstractRenderable’ class

All Renderables inherit from the AbstractRenderable class, directly or
indirectly. It defines properties which all Renderable classes need:

- `id` Identifies the instance
- `kind` Identifies the class

`------------------------------------------------------------------------------`

### App, Config, Game and Player

These can be found in the ‘src/renderables/App-Config-Game-and-Player/’ folder.

#### App

The App is the outermost instance in the ‘composition’ hierarchy —  
it _contains_ the Game instances, which _contain_ Habitat instances,
and so on.

- `config` The App’s configuration
- `games` A list of the Player’s Games
- `player` The person playing the game, and their preferences

#### Config

The App’s configuration. Eveything in here is **constant** — in other words,
guaranteed to stay the same while the app is running:

- `debug` Switches debug features on and off, for development and testing
- `server` URL of the server which connects Players in a multiplayer Game
- `version` The version of the app, for example '2.27.6'

#### Game

Only one Game can be in 'playing' mode at any one time.  
A Player can choose from their list of saved Games, delete Games, or start
a new Game.

A Game contains a list of Habitats, and it defines how they are connected
to each other with a list of Portals.

- `chats` A list of all the Chats which have happened in the Game so far
- `habitats` All of the Deserts, Jungles and Meadows etc in this Game
- `mode` Can be 'starting', 'playing', 'paused', or 'complete'
- `portals` Portals are used to travel between Habitats

#### Player

Represents the person currently using the App. Can be ‘anonymous’ for an
unregistered Player, or contain account details if the Player is signed in.

The Player instance contains several preferences:

- `loudness` The volume of the audio
- `theme` Whether to use dark text on a light background, or vice versa

`------------------------------------------------------------------------------`

### Chats, Messages and Missions

These can be found in the ‘src/renderables/Chats-Messages-and-Missions/’ folder.

#### Chats

The Chat class can represent one Avatar or Character speaking, for example:

- Your Avatar overhears a Wizard (a non-player Character) chanting a spell
- Your Avatar shouts “Aaaarggh!!!” while running away from a Boar

But a Chat is usually a conversation between Avatars and Characters:

- Two Avatars speak to each other — a private conversation between Players
- Five Avatars speak to each other — a team of Players in a group conversation
- Your Avatar overhears three Goblins (non-player Characters) arguing
- Your Avatar tries to persuade a Chef to reveal a secret ApplePie recipe
- Two Players have teamed up — their Avatars ask three Witches some questions

#### Messages

Chats are composed of one or more Messages, There is no way for a Player to
type in their own text — all they can do is choose a predefined Message.

Classes like Greeting and Question inherit from the Message class.

- Acceptance — _“Yes sire, I will save the kingdom or die trying”_
- Answer — _“Blue... no, yellow!”_
- Farewell — _“See ya”_
- Greeting — _“Oh, hi!”_
- Insult — _“Your shoes don’t match your handbag”_
- Offer — _“I need a rare, orange, star-shaped flower”_
- Question — _“What... is your favourite colour?”_
- Rejection - _“Sorry, but I can’t go on a flower-picking mission right now”_

#### Missions

While chatting with a Character, your Avatar may be offered a Mission.  
This could be fairly quick and simple: _“Bring me my reading glasses”_.  
Or it could be long and complex, with many sub-missions: _“Save the kingdom”_.

An Avatar can have several Missions underway at any time.

`------------------------------------------------------------------------------`

### Cutscenes, Habitats and Portals

These can be found in the ‘src/renderables/Cutscenes-Habitats-and-Portals/’ folder.

#### Cutscenes

When a Player’s Avatar completes a major Mission, a Cutscene is shown —  
an animation, usually about 10 seconds long, accompanied by some Messages.  
Cutscenes are also shown while travelling through Portals.

#### Habitats

Habitats are areas of land and water, which Players can explore with
their Avatars.

When a Game starts, the Player’s Avatar is spawned in the first Habitat.  
There is a limit to how many objects a computer can render and keep track of.  
So when the Player’s Avatar moves to a different Habitat (via a Portal),  
the computer removes the old Habitat from memory, and loads the new one.

Classes like Desert, Jungle and Meadow inherit from the Habitat class.  
Fairly empty Habitats like Deserts are roughly 1000 meters across.  
Densely-packed Habitats like Jungles are roughly 100 meters across.

- `avatars` In a multiplayer Game, many Avatars can coexist in one Habitat
- `animals` All of the Birds, Fish and Rabbits etc currently in this Habitat
- `characters` The NPCs you can speak to, like Wizards and Princesses
- `items` Collectable stuff like Books, Jewels, and Rollerskates
- `plants` Various kinds of foliage like Trees, Flowers and Shrubs
- `scenics` Unchanging scenery like Boulders and Walls
- `terrains` Unchanging Terrain hexagons, in a ‘two dimensional array’

#### Portals

Used by the Game class to control how an Avatar travels between Habitats.

`------------------------------------------------------------------------------`

### Locatables

These can be found in the folders inside ‘src/renderables/Locatables/’.

Classes which have a location inherit from the Locatable class.

- `column` The instance’s ‘horizontal’ location in the grid of Terrains
- `hid` If set to `true`, the instance is currently hidden
- `offsetX` The ‘horizontal’ distance to the current location’s center
- `offsetY` The ‘vertical’ distance to the current location’s center
- `rotation` The clockwise rotation of the Locatable, in degrees
- `row` The instance’s ‘vertical’ location in the grid of Terrains

##### Animals

Animals can move around. Unlike Characters, they cannot speak. Unlike Items,
they cannot be collected.

Classes like Bird, Fish and Rabbit inherit from the Animal class.  
And then Seagull inherits from Bird, etc.

##### Avatars

A Player’s character. In a multiplayer game you might see several Avatars on
the screen at once. Avatars have lots of properties, for example:

- `appearance` Controls how the Avatar looks — for example, eye colour
- `inventory` A list of Items which the Avatar is carrying
- `missions` All of the Missions which the Avatar has accepted
- `name` The Avatar’s name, which other Players can see

##### Characters

[Non-player-characters](https://en.wikipedia.org/wiki/Non-player_character)
can move around, can be spoken to, and can offer Missions.

Classes like Wizard and Princess inherit from the Character class.  
And then BlueWizard inherits from Wizard, etc.

##### Items

Any kind of collectable item which the Player can make or pick up.

Classes like Books, Jewels, and Rollerskates inherit from the Item class.

Some Plants _provide_ Items, for example an Apple picked from an AppleTree.  
Some Plants can _become_ Items, for example a Flower when it’s picked.

##### Plants

Plants cannot move around, and they cannot speak.  
But perhaps in some future version of the game they will grow and evolve.

Classes like Tree and Flower inherit from the Plant class.  
And then AppleTree inherits from Tree, etc.

A Player might be able to eat an Apple from an AppleTree, or pick a Flower.

##### Scenics

Scenics do not move around, or change over time. They cannot be larger than a
single Terrain — buildings are constructed from many small ‘Wall’ Scenics.

Classes like Boulder and Wall inherit from the Scenic class.

A Scenic’s purpose may be decorative (to create an atmospheric world), or
strategic (to block where an Avatar can move).

#### Terrains

A single hexagon, one meter across. Some Terrains are faster to travel over than
others, and some block movement altogether. Some have pathways, which encourage
movement in a certain direction.

Classes like Lava, Sand, Soil and Water inherit from the Terrain class.
