const headerEl = document.getElementById('header');
const textEl = document.getElementById('text');
const optionButtonsEl = document.getElementById('option-buttons');

let state = {};


const data = [
    {
        id: 0,
        header: '⚔️ Wysteria ⚔️',
        text: 'Welcome Adventurer! Ready to enter the mysterious land of Wysteria? Who knows what adventures await!',
        options: [
            {
                text: 'Play!',
                nextTextNode: 1
            }
        ]
    },
    {
        id: 1,
        header: 'A Dark Alley',
        text: 'You wake up in a dark alley amongst a pile of rotting wood crates and rotten fruit. The last thing you remember was an argument during a card game at the Tavern. You notice a Strange Vial of purple liquid on the ground.',
        options: [
            { 
                text: 'Take Strange Vial',
                setState: { strangeVial: true },
                nextTextNode: 2
            },
            {
                text: 'Drink the Strange Vial',
                nextTextNode: 2
            },
            { 
                text: 'Leave the area',
                nextTextNode: 2
            }
        ]
    },
    {
        id: 2,
        header: 'A Busy Marketplace',
        text: 'You head out of the Alley towards the road out of Town, when you hear a beckoning call. Across the lane you spot a tired but honest looking Merchant motioning for you to get closer.',
        options: [
            {
                text: 'Trade the Strange Vial for a decent looking Sword',
                requiredState: (currentState) => currentState.strangeVial,
                setState: { strangeVial: false, sword: true},
                nextTextNode: 3
            },
            {
                text: 'Trade the Strange Vial for a weathered but sturdy looking Shield',
                requiredState: (currentState) => currentState.strangeVial,
                setState: { strangeVial: false, shield: true },
                nextTextNode: 3
            },
            {
                text: 'Ignore the Merchant and continue heading out of Town',
                nextTextNode: 3
            }
        ]

    },
    {
        id: 3,
        header: 'A Fork in The Road',
        text: 'After making your way westwards for nearly the whole day, you start to feel tired. You soon reach a fork in the road; in one direction you can make out a small village, in the other you can see a large Mansion. The sun looks to be setting in a couple of hours.',
        options: [
            {
                text: 'Energized, you take the path towards the Mansion.',
                nextTextNode: 4
            },
            {
                text: 'Being smart, you head down the path towards the Village hoping to find an Inn for some rest.',
                nextTextNode: 5
            },
            {
                text: 'Look for shelter nearby',
                nextTextNode: 6
            }
        ]

    },
    {
        id: 4,
        header: 'The Mansion',
        text: 'Upon reaching the Mansion, you realize you are exhausted. Forging onwards you stumble through the Mansion, but soon collapse in a quiet room. Later that night, you\'re killed by a terrible monster.',
        options: [
            { 
                text: 'Restart your journey',
                nextTextNode: -1
            }
        ]
    },
    {
        id: 5,
        header: 'The Inn',
        text: 'Without any money to buy a room, you break into the nearest inn and fall asleep. After a few hours of sleep, the Innkeeper discovers you, and calls the Town Guard to arrest you. Welcome to prison.',
        options: [
          {
            text: 'Play Again?',
            nextTextNode: -1
          }
        ]
      },
      {
        id: 6,
        header: 'A small bit of shelter',
        text: 'It took you some time to fall asleep, but you manage to wake up rested and full of energy ready to explore the nearby Mansion.',
        options: [
          {
            text: 'Explore the Mansion.',
            nextTextNode: 7
          }
        ]
      },
      {
        id: 7,
        header: 'Inside the Mansion',
        text: 'While exploring the Mansion, you come across a horrible monster in your path.',
        options: [
          {
            text: 'Try to run',
            nextTextNode: 8
          },
          {
            text: 'Attack it with your Sword',
            requiredState: (currentState) => currentState.sword,
            nextTextNode: 9
          },
          {
            text: 'Hide behind your Shield',
            requiredState: (currentState) => currentState.shield,
            nextTextNode: 10
          },
          {
            text: 'Throw the Strange Vial at it',
            requiredState: (currentState) => currentState.strangeVial,
            nextTextNode: 11
          }
        ]
      },
      {
        id: 8,
        header: 'Inside the Mansion',
        text: 'In your panic to leave, you trip on some of the uneven floor boards. The monster easily catches up to you. Uh oh.',
        options: [
          {
            text: 'Play Again?',
            nextTextNode: -1
          }
        ]
      },
      {
        id: 9,
        header: 'Inside the Mansion',
        text: 'With a yell, you swing your Sword. It strikes the Monster but it didn\'t seem to have much effect. The Monster moves towards you licking its lips. Oh dear.',
        options: [
          {
            text: 'Play Again?',
            nextTextNode: -1
          }
        ]
      },
      {
        id: 10,
        header: 'Inside the Mansion',
        text: 'You hide behind your shield. At first confused, the Monster laughs as it swats your shield away and moves towards you.',
        options: [
          {
            text: 'Play Again?',
            nextTextNode: -1
          }
        ]
      },
      {
        id: 11,
        header: 'Inside the Mansion',
        text: 'In a desperate move, you throw your Strange Vial at the monster and it shatters upon impact, covering the Monster with the purple liquid. With a horrible scream, the Monster collapses to the ground - dead. With a victory yell, you loot the Mansion for its riches.',
        options: [
          {
            text: 'Congratulations. Play Again?',
            setState: { strangeVial: false },
            nextTextNode: -1
          }
        ]
      }

];


function startGame() {
    state = {};
    showTextNode(0);
}

function showTextNode(textNodeIndex) {
    const textNode = data.find(textNode => textNode.id === textNodeIndex);
    textEl.innerText = textNode.text;
    headerEl.innerText = textNode.header;
    while(optionButtonsEl.firstChild) {
        optionButtonsEl.removeChild(optionButtonsEl.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsEl.appendChild(button);
        }
    });

}

function selectOption(option) {
    const nextTextNodeId = option.nextTextNode;

    if (nextTextNodeId < 0) {
        return startGame();
    }

    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

window.onload = function() {
    startGame();
};
