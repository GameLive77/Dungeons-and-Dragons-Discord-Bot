import 'dotenv/config';
import embed from './embed_manager.js';

const builder = {

  results: { 
    playerNAME: null, 
    race: null, 
    classes: null,  
    str: null, 
    dex: null, 
    con: null, 
    int: null, 
    wis: null, 
    cha: null, 
    charNAME: null, 
    gender: null, 
    height: null,
    weight: null, 
    size: null, 
    age: null, 
    eyes: null, 
    hair: null, 
    skin: null, 
    background: null, 
    alignment: null, 
    personality: null, 
    ideals: null, 
    bonds: null, 
    flaws: null, 
    lang: null, 
    skills: null, 
    tool: null,  
    items: null, 
    money: null,  
  },

  util: {

    Emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],

    race: null,

    randomStats: null, 
    assignedStats: null,
    remainingStats: null,

    amountLang: null,
    availableLang: null,
    assignedLang: null,
    remainingLang: null,

    amountSkills: null,
    availableSkills: null,
    assignedSkills: null,
    remainingSkills: null,

  },

  constant: {

    races: ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Rock Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'],

    raceNAMEs: new Map([
      ['Dwarf', '**Male Names:** Adrik, Alberich, Baern, Barendd, Brottor, Bruenor, Dain, Darrak, Delg, Eberk, Einkil, Fargrim, Flint, Gardain, Harbek, Kildrak, Morgran, Orsik, Oskar, Rangrim, Rurik, Taklinn, Thoradin, Thorin, Tordek, Traubon, Travok, Ulfgar, Veit, Vondal\n\n**Female Names:** Amber, Artin, Audhild, Bardryn, Dagnal, Diesa, Eldeth, Falkrunn, Finellen, Gunnloda, Gurdis, Helja, Hlin, Kathra, Kristryd, Ilde, Liftrasa, Mardred, Riswynn, Sannl, Torbera, Torgga, Vistra'],
      ['Elf', '**Male Names:** Adran, Aelar, Aramil, Arannis, Aust, Beiro, Berrian, Carric, Enialis, Erdan, Erevan, Galinndan, Hadarai, Heian, Himo, Immeral, Ivellios, Laucian, Mindartis, Paelias, Peren, Quarion, Riardon, Rolen, Soveliss, Thamior, Tharivol, Theren, Varis\n\n**Female Names:** Adrie, Althaea, Anastrianna, Andraste, Antinua, Bethrynna, Birel, Caelynn, Drusilia, Enna, Felosial, Ielenia, Jelenneth, Keyleth, Leshanna, Lia, Meriele, Mialee, Naivara, Quelenna, Quillathe, Sariel, Shanairra, Shava, Silaqui, Theirastra, Thia, Vadania, Valanthe, Xanaphia'],
      ['Halfling', '**Male Names:** Alton, Ander, Cade, Corrin, Eldon, Errich, Finnan, Garret, Lindal, Lyle, Merric, Milo, Osborn, Perrin, Reed, Roscoe, Wellby\n\n**Female Names:** Andry, Bree, Callie, Cora, Euphemia, Jillian, Kithri, Lavinia, Lidda, Merla, Nedda, Paela, Portia, Seraphina, Shaena, Trym, Vani, Verna'], 
      ['Human', 'idk'], 
      ['Dragonborn', '**Male Names:** Arjhan, Balasar, Bharash, Donaar, Ghesh, Heskan, Kriv, Medrash, Mehen, Nadarr, Pandjed, Patrin, Rhogar, Shamash, Shedinn, Tarhun, Torinn\n\n**Female Names:** Akra, Biri, Daar, Farideh, Harann, Havilar, Jheri, Kava, Korinn, Mishann, Nala, Perra, Raiann, Sora, Surina, Thava, Uadjit'],
      ['Rock Gnome', '**Male Names:** Alston, Alvyn, Boddynock, Brocc, Burgell, Dimble, Eldon, Erky, Fonkin, Frug, Gerbo, Gimble, Glim, Jebeddo, Kellen, Namfoodle, Orryn, Roondar, Seebo, Sindri, Warryn, Wrenn, Zook\n\n**Female Names:** Bimpnottin, Breena, Caramip, Carlin, Donella, Duvamil, Ella, Ellyjobell, Ellywick, Lilli, Loopmottin, Lorilla, Mardnab, Nissa, Nyx, Oda, Orla, Roywyn, Shamil, Tana, Waywocket, Zanna'], 
      ['Half-Elf', '**Male Names:** Adran, Aelar, Aramil, Arannis, Aust, Beiro, Berrian, Carric, Enialis, Erdan, Erevan, Galinndan, Hadarai, Heian, Himo, Immeral, Ivellios, Laucian, Mindartis, Paelias, Peren, Quarion, Riardon, Rolen, Soveliss, Thamior, Tharivol, Theren, Varis\n\n**Female Names:** Adrie, Althaea, Anastrianna, Andraste, Antinua, Bethrynna, Birel, Caelynn, Drusilia, Enna, Felosial, Ielenia, Jelenneth, Keyleth, Leshanna, Lia, Meriele, Mialee, Naivara, Quelenna, Quillathe, Sariel, Shanairra, Shava, Silaqui, Theirastra, Thia, Vadania, Valanthe, Xanaphia'], 
      ['Half-Orc', '**Male Names:** Dench, Feng, Gell, Henk, Holg, Imsh, Keth, Krusk, Mhurren, Ront, Shump, Thokk\n\n**Female Names:** Baggi, Emen, Engong, Kansif, Myev, Neega, Ovak, Ownka, Shautha, Sutha, Vola, Volen, Yevelda'], 
      ['Tiefling', '**Male Names:** Akmenos, Amnon, Barakas, Damakos, Ekemon, Iados, Kairon, Leucis, Melech, Mordai, Morthos, Pelaios, Skamos, Therai\n\n**Female Names:** Akta, Anakis, Bryseis, Criella, Damaia, Ea, Kallista, Lerissa, Makaria, Nemeia, Orianna, Phelaia, Rieta'] 
    ]),

    raceHEIGHT: new Map([
      ['Dwarf', 'between 4 and 5 feet tall'],
      ['Elf', 'range from under 5 to over 6 feet tall'],
      ['Halfling', 'average about 3 feet tall'], 
      ['Human', 'from barely 5 feet to well over 6 feet tall'], 
      ['Dragonborn', 'over 6 feet tall'],
      ['Rock Gnome', 'between 3 and 4 feet tall'], 
      ['Half-Elf', 'from 5 to 6 feet tall'], 
      ['Half-Orc', 'from 5 to well over 6 feet tall'], 
      ['Tiefling', 'from barely 5 feet to well over 6 feet tall'] 
    ]),

    raceWEIGHT: new Map([
      ['Dwarf', 'average about 150 pounds'],
      ['Elf', 'N/A'],
      ['Halfling', 'about 40 pounds'], 
      ['Human', 'N/A'], 
      ['Dragonborn', 'averaging almost 250 pounds'],
      ['Rock Gnome', 'average about 40 pounds'], 
      ['Half-Elf', 'N/A'], 
      ['Half-Orc', 'N/A'], 
      ['Tiefling', 'N/A'] 
    ]),

    raceSIZE: new Map([
      ['Dwarf', 'Medium'],
      ['Elf', 'Medium'],
      ['Halfling', 'Small'], 
      ['Human', 'Medium'], 
      ['Dragonborn', 'Medium.'],
      ['Rock Gnome', 'Small'], 
      ['Half-Elf', 'Medium'], 
      ['Half-Orc', 'Medium'], 
      ['Tiefling', 'Medium'] 
    ]),

    raceLang: new Map([
      ['Dwarf', ['Common', 'Dwarvish']],
      ['Elf', ['Common', 'Elvish']],
      ['Halfling', ['Common', 'Halfling']], 
      ['Human', ['Common']], 
      ['Dragonborn', ['Common', 'Draconic']],
      ['Rock Gnome', ['Common', 'Gnomish']], 
      ['Half-Elf', ['Common', 'Elvish']], 
      ['Half-Orc', ['Common', 'Orc']], 
      ['Tiefling', ['Common', 'Infernal']] 
    ]),

    subraces: new Map([
      ['Dwarf', ['Hill Dwarf', 'Mountain Dwarf']],
      ['Elf', ['High Elf', 'Wood Elf']],
      ['Halfling', ['Lightfoot Halfling', 'Stout Halfling']], 
      ['Dragonborn', ['Black Dragonborn', 'Blue Dragonborn', 'Bronze Dragonborn', 'Copper Dragonborn', 'Gold Dragonborn', 'Green Dragonborn', 'Red Dragonborn', 'Silver Dragonborn', 'White Dragonborn']]
    ]),

    classes: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],

    alignment: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'],

    background: ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier'],

    acolyte : new Map([
      ['personality', ['I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.',
          'I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.',
          'I see omens in every event and action. The gods try to speak to us, we just need to listen.',
          'Nothing can shake my optimistic attitude.',
          'I quote (or misquote) sacred texts and proverbs in almost every situation.',
          'I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.',
          'I’ve enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me.', 
          'I’ve spent so long in the temple that I have little practical experience dealing with people in the outside world.'
      ]],
      ['ideal', ['**Tradition.** The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)',
          '**Charity.** I always try to help those in need, no matter what the personal cost. (Good)',
          '**Change.** We must help bring about the changes the gods are constantly working in the world. (Chaotic)',
          '**Power.** I hope to one day rise to the top of my faith’s religious hierarchy. (Lawful)',
          '**Faith.** I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)',
          '**Aspiration.** I seek to prove myself worthy of my god’s favor by matching my actions against his or her teachings. (Any)'
      ]],
      ['bond', ['I would die to recover an ancient relic of my faith that was lost long ago.',
          'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
          'I owe my life to the priest who took me in when my parents died.',
          'Everything I do is for the common people.',
          'I will do anything to protect the temple where I served.',
          'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.'
      ]],
      ['flaw', ['I judge others harshly, and myself even more severely.',
          'I put too much trust in those who wield power within my temple’s hierarchy.',
          'My piety sometimes leads me to blindly trust those that profess faith in my god.',
          'I am inflexible in my thinking.',
          'I am suspicious of strangers and expect the worst of them.',
          'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
      ]]
    ]),

    criminal : new Map([
      ['personality', ['I always have a plan for what to do when things go wrong.',
          'I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.',
          'The first thing I do in a new place is note the locations of everything valuable — or where such things could be hidden.',
          'I would rather make a new friend than a new enemy.',
          'I am incredibly slow to trust. Those who seem the fairest often have the most to hide.',
          'I don’t pay attention to the risks in a situation. Never tell me the odds.',
          'The best way to get me to do something is to tell me I can’t do it.', 
          'I blow up at the slightest insult.'
      ]],
      ['ideal', ['**Honor.** I don’t steal from others in the trade. (Lawful)',
          '**Freedom.** Chains are meant to be broken, as are those who would forge them. (Chaotic)',
          '**Charity.** I steal from the wealthy so that I can help people in need. (Good)',
          '**Greed.** I will do whatever it takes to become wealthy. (Evil)',
          '**People.** I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral',
          '**Redemption.** There’s a spark of good in everyone. (Good)'
      ]],
      ['bond', ['I’m trying to pay off an old debt I owe to a generous benefactor.',
          'My ill-gotten gains go to support my family.',
          'Something important was taken from me, and I aim to steal it back.',
          'I will become the greatest thief that ever lived.',
          'I’m guilty of a terrible crime. I hope I can redeem myself for it.',
          'Someone I loved died because of I mistake I made. That will never happen again.'
      ]],
      ['flaw', ['When I see something valuable, I can’t think about anything but how to steal it.',
          'When faced with a choice between money and my friends, I usually choose the money.',
          'If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it.',
          'I have a “tell” that reveals when I’m lying.',
          'I turn tail and run when things look bad.',
          '	An innocent person is in prison for a crime that I committed. I’m okay with that.'
      ]]
    ]),

    folkhero : new Map([
      ['personality', ['I judge people by their actions, not their words.',
          'If someone is in trouble, I’m always ready to lend help.',
          'When I set my mind to something, I follow through no matter what gets in my way.',
          'I have a strong sense of fair play and always try to find the most equitable solution to arguments.',
          'I’m confident in my own abilities and do what I can to instill confidence in others.',
          'Thinking is for other people. I prefer action.',
          'I misuse long words in an attempt to sound smarter.', 
          'I get bored easily. When am I going to get on with my destiny?'
      ]],
      ['ideal', ['**Respect.** People deserve to be treated with dignity and respect. (Good)',
          '**Fairness.** No one should get preferential treatment before the law, and no one is above the law. (Lawful)',
          '**Freedom.** Tyrants must not be allowed to oppress the people. (Chaotic)',
          '**Might.** If I become strong, I can take what I want — what I deserve. (Evil)',
          '**Sincerity.** There’s no good in pretending to be something I’m not. (Neutral)',
          '**Destiny.** Nothing and no one can steer me away from my higher calling. (Any)'
      ]],
      ['bond', ['I have a family, but I have no idea where they are. One day, I hope to see them again.',
          'I worked the land, I love the land, and I will protect the land.',
          'A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.',
          'My tools are symbols of my past life, and I carry them so that I will never forget my roots.',
          'I protect those who cannot protect themselves.',
          'I wish my childhood sweetheart had come with me to pursue my destiny.'
      ]],
      ['flaw', ['The tyrant who rules my land will stop at nothing to see me killed.',
          'I’m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.',
          'The people who knew me when I was young know my shameful secret, so I can never go home again.',
          'I have a weakness for the vices of the city, especially hard drink.',
          'Secretly, I believe that things would be better if I were a tyrant lording over the land.',
          'I have trouble trusting in my allies.'
      ]]
    ]),

    noble: new Map([
      ['personality', [
          'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
          'The common folk love me for my kindness and generosity.',
          'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.',
          'I take great pains to always look my best and follow the latest fashions.',
          'I don’t like to get my hands dirty, and I won’t be caught dead in unsuitable accommodations.',
          'Despite my noble birth, I do not place myself above other folk. We all have the same blood.',
          'My favor, once lost, is lost forever.',
          'If you do me an injury, I will crush you, ruin your name, and salt your fields.'
      ]],
      ['ideal', [
          '**Respect.** Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)',
          '**Responsibility.** It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)',
          '**Independence.** I must prove that I can handle myself without the coddling of my family. (Chaotic)',
          '**Power.** If I can attain more power, no one will tell me what to do. (Evil)',
          '**Family.** Blood runs thicker than water. (Any)',
          '**Noble Obligation.** It is my duty to protect and care for the people beneath me. (Good)'
      ]],
      ['bond', [
          'I will face any challenge to win the approval of my family.',
          'My house’s alliance with another noble family must be sustained at all costs.',
          'Nothing is more important than the other members of my family.',
          'I am in love with the heir of a family that my family despises.',
          'My loyalty to my sovereign is unwavering.',
          'The common folk must see me as a hero of the people.'
      ]],
      ['flaw', [
          'I secretly believe that everyone is beneath me.',
          'I hide a truly scandalous secret that could ruin my family forever.',
          'I too often hear veiled insults and threats in every word addressed to me, and I’m quick to anger.',
          'I have an insatiable desire for carnal pleasures.',
          'In fact, the world does revolve around me.',
          'By my words and actions, I often bring shame to my family.'
      ]]
    ]),

    sage: new Map([
      ['personality', [
          'I use polysyllabic words that convey the impression of great erudition.',
          'I’ve read every book in the world’s greatest libraries — or I like to boast that I have.',
          'I’m used to helping out those who aren’t as smart as I am, and I patiently explain anything and everything to others.',
          'There’s nothing I like more than a good mystery.',
          'I’m willing to listen to every side of an argument before I make my own judgment.',
          'I . . . speak . . . slowly . . . when talking . . . to idiots, . . . which . . . almost . . . everyone . . . is . . . compared . . . to me.',
          'I am horribly, horribly awkward in social situations.',
          'I’m convinced that people are always trying to steal my secrets.'
      ]],
      ['ideal', [
          '**Knowledge.** The path to power and self-improvement is through knowledge. (Neutral)',
          '**Beauty.** What is beautiful points us beyond itself toward what is true. (Good)',
          '**Logic.** Emotions must not cloud our logical thinking. (Lawful)',
          '**No Limits.** Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)',
          '**Power.** Knowledge is the path to power and domination. (Evil)',
          '**Self-Improvement.** The goal of a life of study is the betterment of oneself. (Any)'
      ]],
      ['bond', [
          'It is my duty to protect my students.',
          'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
          'I work to preserve a library, university, scriptorium, or monastery.',
          'My life’s work is a series of tomes related to a specific field of lore.',
          'I’ve been searching my whole life for the answer to a certain question.',
          'I sold my soul for knowledge. I hope to do great deeds and win it back.'
      ]],
      ['flaw', [
          'I am easily distracted by the promise of information.',
          'Most people scream and run when they see a demon. I stop and take notes on its anatomy.',
          'Unlocking an ancient mystery is worth the price of a civilization.',
          'I overlook obvious solutions in favor of complicated ones.',
          'I speak without really thinking through my words, invariably insulting others.',
          'I can’t keep a secret to save my life, or anyone else’s.'
      ]]
    ]),

    soldier: new Map([
      ['personality', [
          'I’m always polite and respectful.',
          'I’m haunted by memories of war. I can’t get the images of violence out of my mind.',
          'I’ve lost too many friends, and I’m slow to make new ones.',
          'I’m full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.',
          'I can stare down a hell hound without flinching.',
          'I enjoy being strong and like breaking things.',
          'I have a crude sense of humor.',
          'I face problems head-on. A simple, direct solution is the best path to success.'
      ]],
      ['ideal', [
          '**Greater Good.** Our lot is to lay down our lives in defense of others. (Good)',
          '**Responsibility.** I do what I must and obey just authority. (Lawful)',
          '**Independence.** When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)',
          '**Might.** In life as in war, the stronger force wins. (Evil)',
          '**Live and Let Live.** Ideals aren’t worth killing over or going to war for. (Neutral)',
          '**Nation.** My city, nation, or people are all that matter. (Any)'
      ]],
      ['bond', [
          'I would still lay down my life for the people I served with.',
          'Someone saved my life on the battlefield. To this day, I will never leave a friend behind.',
          'My honor is my life.',
          'I’ll never forget the crushing defeat my company suffered or the enemies who dealt it.',
          'Those who fight beside me are those worth dying for.',
          'I fight for those who cannot fight for themselves.'
      ]],
      ['flaw', [
          'The monstrous enemy we faced in battle still leaves me quivering with fear.',
          'I have little respect for anyone who is not a proven warrior.',
          'I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.',
          'My hatred of my enemies is blind and unreasoning.',
          'I obey the law, even if the law causes misery.',
          'I’d rather eat my armor than admit when I’m wrong.'
      ]]
    ]),

  },

  skills: ['Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'],
  
  lang: ["Common", "Dwarvish", "Elvish", "Giant", 'Gnomish', "Goblin", "Halfling", "Orc", "Abyssal", "Celestia", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan", "Undercommon"],

  equipment: {
    tools: {
      'Artisans Tools': [
        {name: "Alchemist's supplies", value: 50, weight: 8},
        {name: "Brewer's supplies", value: 20, weight: 9},
        {name: "Calligrapher's supplies", value: 10, weight: 5},
        {name: "Carpenter's tools", value: 8, weight: 6},
        {name: "Cartographer's tools", value: 15, weight: 6},
        {name: "Cobbler's tools", value: 5, weight: 5},
        {name: "Cook's utensils", value: 1, weight: 8},
        {name: "Glassblower's tools", value: 30, weight: 5},
        {name: "Jeweler's tools", value: 25, weight: 2},
        {name: "Leatherworker's tools", value: 5, weight: 5},
        {name: "Mason's tools", value: 10, weight: 8},
        {name: "Painter's supplies", value: 10, weight: 5},
        {name: "Potter's tools", value: 10, weight: 3},
        {name: "Smith's tools", value: 20, weight: 8},
        {name: "Tinker's tools", value: 50, weight: 10},
        {name: "Weaver's tools", value: 1, weight: 5},
        {name: "Woodcarver's tools", value: 1, weight: 5}
      ],
      'Gaming Set': [
        {name: 'Dice set', value: 0.1, weight: 0}, 
        {name: 'Dragonchess set', value: 1, weight: 0.5}, 
        {name: 'Playing card set', value: 0.1, weight: 0}
      ],
      'Musical Instrument': [
        {name: 'Bagpipes', value: 30, weight:6}, 
        {name: 'Drum', value: 6, weight:3}, 
        {name: 'Dulcimer', value: 25, weight:10}, 
        {name: 'Flute', value: 2, weight: 1}, 
        {name: 'Lute', value: 35, weight: 2}, 
        {name: 'Lyre', value: 30, weight: 2}, 
        {name: 'Horn', value: 3, weight: 2}, 
        {name: 'Pan flute', value: 12, weight: 2}, 
        {name: 'Shawm', value: 2, weight: 1}, 
        {name: 'Viol', value: 30, weight: 1}
      ],
      'Other Tools': [
        {name: "Disguise kit", value: 25, weight: 3},
        {name: "Forgery kit", value: 15, weight: 5},
        {name: "Herbalism kit", value: 5, weight: 3},
        {name: "Navigator's tools", value: 25, weight: 2},
        {name: "Poisoner's kit", value: 50, weight: 2},
        {name: "Thieves' tools", value: 25, weight: 1}
      ]
    },
    armor: {
      'Light Armor': [
        {name: "Padded", value: 5, AC: 11, strength: null, stealth: 'dadv', weight: 8},
        {name: "Leather", value: 10, AC: 11, strength: null, stealth: null, weight: 10},
        {name: "Studded Leather", value: 45, AC: 12, strength: null, stealth: null, weight: 13},
        {don: 1, doff: 1}
      ],
      'Medium Armor': [
        {name: "Hide", value: 10, AC: 12, strength: null, stealth: null, weight: 12},
        {name: "Chain shirt", value: 50, AC: 13, strength: null, stealth: null, weight: 20},
        {name: "Scale mail", value: 50, AC: 14, strength: null, stealth: 'dadv', weight: 45},
        {name: "Breastplate", value: 400, AC: 14, strength: null, stealth: null, weight: 20},
        {name: "Half plate", value: 750, AC: 15, strength: null, stealth: 'dadv', weight: 40},
        {don: 5, doff: 1}
      ],
      'Heavy Armor': [
        {name: "Ring mail", value: 30, AC: 14, strength: null, stealth: 'dadv', weight: 40},
        {name: "Chain mail", value: 75, AC: 16, strength: 13, stealth: 'dadv', weight: 55},
        {name: "Splint", value: 200, AC: 17, strength: 15, stealth: 'dadv', weight: 60},
        {name: "Plate", value: 1500, AC: 18, strength: 15, stealth: 'dadv', weight: 65},
        {don: 10, doff: 5}
      ],
      'Shield': [
        {name: "Shield", value: 10, AC: +2, strength: null, stealth: null, weight: 6},
      ],
    },
    weapons: {
      'Simple Melee Weapons': [
        {name: "Club", value: 0.1, damage: '1d4 bludgeoning', weight: 2, prop: 'light'},
        {name: "Dagger", value: 2, damage: '1d4 piercing', weight: 1, prop: 'finesse, light, thrown(range 20/60)'},
        {name: "Greatclub", value: 0.2, damage: '1d8 bludgeoning', weight: 10, prop: 'two-handed'},
        {name: "Handaxe", value: 5, damage: '1d6 slashing', weight: 2, prop: 'light, thrown(range 20/60)'},
        {name: "Javelin", value: 0.5, damage: '1d6 piercing', weight: 2, prop: 'thrown(range 30/120)'},
        {name: "Light hammer", value: 2, damage: '1d4 bludgeoning', weight: 2, prop: 'light, thrown(range 20/60)'},
        {name: "Mace", value: 5, damage: '1d6 bludgeoning', weight: 4, prop: ''},
        {name: "Quarterstaff", value: 0.2, damage: '1d6 bludgeoning', weight: 4, prop: 'versatile(1d8)'},
        {name: "Sickle", value: 1, damage: '1d4 slashing', weight: 2, prop: 'light'},
        {name: "Spear", value: 1, damage: '1d6 piercing', weight: 3, prop: 'thrown(range 20/60), versatile(1d8)'},
      ],
      'Simple Ranged Weapons': [
        {name: "Crossbow, light", value: 25, damage: '1d8 piercing', weight: 5, prop: 'ammunition(range 80/320), loading, two-handed'},
        {name: "Dart", value: 0.05, damage: '1d4 piercing', weight: 0.25, prop: 'finesse, thrown(range 20/60)'},
        {name: "Shortbow", value: 25, damage: '1d6 piercing', weight: 2, prop: 'ammunition(range 80/320), two-handed'},
        {name: "Sling", value: 0.1, damage: '1d4 bludgeoning', weight: 0, prop: 'ammunition(range 30/120)'},
      ],
      'Martial Melee Weapons': [
        {name: "Battleaxe", value: 10, damage: '1d8 slashing', weight: 4, prop: 'versatile(1d10)'},
        {name: "Flail", value: 10, damage: '1d8 bludgeoning', weight: 2, prop: ''},
        {name: "Glaive", value: 20, damage: '1d10 slashing', weight: 6, prop: 'heavy, reach, two-handed'},
        {name: "Greataxe", value: 30, damage: '1d12 slashing', weight: 7, prop: 'heavy, two-handed'},
        {name: "Greatsword", value: 50, damage: '2d6 slashing', weight: 6, prop: 'heavy, two-handed'},
        {name: "Halberd", value: 20, damage: '1d10 slashing', weight: 6, prop: 'heavy, reach, two-handed'},
        {name: "Lance", value: 10, damage: '1d12 piercing', weight: 6, prop: 'reach, special'},
        {name: "Longsword", value: 15, damage: '1d8 slashing', weight: 3, prop: 'versatile(1d10)'},
        {name: "Maul", value: 10, damage: '2d6 bludgeoning', weight: 10, prop: 'heavy, two-handed'},
        {name: "Morningstar", value: 15, damage: '1d8 piercing', weight: 4, prop: ''},
        {name: "Pike", value: 5, damage: '1d10 piercing', weight: 18, prop: 'heavy, reach, two-handed'},
        {name: "Rapier", value: 25, damage: '1d8 piercing', weight: 2, prop: 'finesse'},
        {name: "Scimitar", value: 25, damage: '1d6 slashing', weight: 3, prop: 'finesse, light'},
        {name: "Shortsword", value: 10, damage: '1d6 piercing', weight: 2, prop: 'finesse, light'},
        {name: "Trident", value: 5, damage: '1d6 piercing', weight: 4, prop: 'thrown(range 20/60), versatile(1d8)'},
        {name: "War pick", value: 5, damage: '1d8 piercing', weight: 2, prop: ''},
        {name: "Warhammer", value: 15, damage: '1d8 bludgeoning', weight: 2, prop: 'versatile(1d10)'},
        {name: "Whip", value: 2, damage: '1d4 slashing', weight: 3, prop: 'finesse, reach'},
      ],
      'Martial Ranged Weapons': [
        {name: "Blowgun", value: 10, damage: '1 piercing', weight: 1, prop: 'ammunition(range 25/100), loading'},
        {name: "Crossbow, hand", value: 75, damage: '1d6 piercing', weight: 3, prop: 'ammunition(range 30/120), light, loading'},
        {name: "Crossbow, heavy", value: 50, damage: '1d10 piercing', weight: 18, prop: 'ammunition(range 100/400), heavy, loading, two-handed'},
        {name: "Longbow", value: 50, damage: '1d8 piercing', weight: 2, prop: 'ammunition(range 150/600), heavy, two-handed'},
        {name: "Net", value: 1, damage: '-', weight: 3, prop: 'special, thrown(range 5/15)'},
      ],
    }, 
    gear: {
      Ammunition: [
        { name: "Arrows", amount: 20, value: 1, weight: 1 },
        { name: "Blowgun needles", amount: 50, value: 1, weight: 1 },
        { name: "Crossbow bolts", amount: 20, value: 1, weight: 1.5 },
        { name: "Sling bullets", amount: 20, value: 0.04, weight: 1.5 },
      ],
      Arcane: [
        { name: "Crystal", value: 10, weight: 1 },
        { name: "Orb", value: 20, weight: 3 },
        { name: "Rod", value: 10, weight: 2 },
        { name: "Staff", value: 5, weight: 4 },
        { name: "Wand", value: 10, weight: 1 },
      ],
      Druidic: [
        { name: "Sprig of mistletoe", value: 1, weight: 0 },
        { name: "Totem", value: 1, weight: 0 },
        { name: "Wooden staff", value: 5, weight: 4 },
        { name: "Yew wand", value: 10, weight: 1 },
      ],
      HolySymbol: [
        { name: "Amulet", value: 5, weight: 1 },
        { name: "Emblem", value: 5, weight: 0 },
        { name: "Reliquary", value: 5, weight: 2 },
      ],
      Other: [
        { name: "Abacus", value: 2, weight: 2 },
        { name: "Acid (vial)", value: 25, weight: 1 },
        { name: "Alchemist's fire (flask)", value: 50, weight: 1 },
        { name: "Antitoxin (vial)", value: 50, weight: 0 },
        { name: "Backpack", value: 2, weight: 5, capacity: '1 cubic foot/30 pounds of gear' },
        { name: "Ball bearings (bag of 1,000)", value: 1, weight: 2 },
        { name: "Barrel", value: 2, weight: 70, capacity: '40 gallons liquid, 4 cubic feet solid' },
        { name: "Basket", value: 0.4, weight: 2, capacity: '2 cubic feet/40 pounds of gear' },
        { name: "Bedroll", value: 1, weight: 7 },
        { name: "Bell", value: 1, weight: 0 },
        { name: "Blanket", value: 0.5, weight: 3 },
        { name: "Block and tackle", value: 1, weight: 5 },
        { name: "Book", value: 25, weight: 5 },
        { name: "Bottle, glass", value: 2, weight: 2, capacity: '1.5 pints liquid' },
        { name: "Bucket", value: 0.05, weight: 2, capacity: '3 gallons liquid, 1/2 cubic foot solid' },
        { name: "Caltrops (bag of 20)", value: 1, weight: 2 },
        { name: "Candle", value: 0.01, weight: 0 },
        { name: "Case, crossbow bolt", value: 1, weight: 1 },
        { name: "Case, map or scroll", value: 1, weight: 1 },
        { name: "Chain (10 feet)", value: 5, weight: 10 },
        { name: "Chalk (1 piece)", value: 0.01, weight: 0 },
        { name: "Chest", value: 5, weight: 25, capacity: '12 cubic feet/300 pounds of gear' },
        { name: "Climber's kit", value: 25, weight: 12 },
        { name: "Clothes, common", value: 0.5, weight: 3 },
        { name: "Clothes, costume", value: 5, weight: 4 },
        { name: "Clothes, fine", value: 15, weight: 6 },
        { name: "Clothes, traveler's", value: 2, weight: 4 },
        { name: "Component pouch", value: 25, weight: 2 },
        { name: "Crowbar", value: 2, weight: 5 },
        { name: "Fishing tackle", value: 1, weight: 4 },
        { name: "Flask or tankard", value: 0.02, weight: 1, capacity: '1 pint liquid' },
        { name: "Grappling hook", value: 2, weight: 4 },
        { name: "Hammer", value: 1, weight: 3 },
        { name: "Hammer, sledge", value: 2, weight: 10 },
        { name: "Healer's kit", value: 5, weight: 3 },
        { name: "Holy water (flask)", value: 25, weight: 1 },
        { name: "Hourglass", value: 25, weight: 1 },
        { name: "Hunting trap", value: 5, weight: 25 },
        { name: "Ink (1 oz bottle)", value: 10, weight: 0 },
        { name: "Ink pen", value: 0.02, weight: 0 },
        { name: "Jug or pitcher", value: 0.02, weight: 4, capacity: '1 gallon liquid' },
        { name: "Ladder (10-foot)", value: 0.1, weight: 25 },
        { name: "Lamp", value: 0.5, weight: 1 },
        { name: "Lantern, bullseye", value: 10, weight: 2 },
        { name: "Lantern, hooded", value: 5, weight: 2 },
        { name: "Lock", value: 10, weight: 1 },
        { name: "Magnifying glass", value: 100, weight: 0 },
        { name: "Manacles", value: 2, weight: 6 },
        { name: "Mess kit", value: 0.2, weight: 1 },
        { name: "Mirror, steel", value: 5, weight: 0.5 },
        { name: "Oil (flask)", value: 0.1, weight: 1 },
        { name: "Paper (one sheet)", value: 0.2, weight: 0 },
        { name: "Parchment (one sheet)", value: 0.1, weight: 0 },
        { name: "Perfume (vial)", value: 5, weight: 0 },
        { name: "Pick, miner's", value: 2, weight: 10 },
        { name: "Piton", value: 0.05, weight: 0.25 },
        { name: "Poison, basic (vial)", value: 100, weight: 0 },
        { name: "Pole (10-foot)", value: 0.05, weight: 7 },
        { name: "Pot, iron", value: 2, weight: 10, capacity: '1 gallon liquid' },
        { name: "Potion of healing", value: 50, weight: 0.5 },
        { name: "Pouch", value: 0.5, weight: 1, capacity: '1/5 cubic foot/6 pounds of gear' },
        { name: "Quiver", value: 1, weight: 1 },
        { name: "Ram, portable", value: 4, weight: 35 },
        { name: "Rations (1 day)", value: 0.5, weight: 2 },
        { name: "Robes", value: 1, weight: 4 },
        { name: "Rope, hempen (50 feet)", value: 1, weight: 10 },
        { name: "Rope, silk (50 feet)", value: 10, weight: 5 },
        { name: "Sack", value: 0.01, weight: 0.5, capacity: '1 cubic foot/30 pounds of gear' },
        { name: "Scale, merchant's", value: 5, weight: 3 },
        { name: "Sealing wax", value: 0.5, weight: 0 },
        { name: "Shovel", value: 2, weight: 5 },
        { name: "Signal whistle", value: 0.05, weight: 0 },
        { name: "Signet ring", value: 5, weight: 0 },
        { name: "Soap", value: 0.02, weight: 0 },
        { name: "Spellbook", value: 50, weight: 3 },
        { name: "Spikes, iron (10)", value: 1, weight: 5 },
        { name: "Spyglass", value: 1000, weight: 1 },
        { name: "Tent, two-person", value: 2, weight: 20 },
        { name: "Tinderbox", value: 0.5, weight: 1 },
        { name: "Torch", value: 0.01, weight: 1 },
        { name: "Vial", value: 1, weight: 0, capacity: '4 ounces liquid' },
        { name: "Waterskin", value: 0.2, weight: 5, capacity: '4 pints liquid (full)' },
        { name: "Whetstone", value: 0.01, weight: 1 },
      ],
    }
  },

  state: {
      userSteps: new Map(),
      currentStep: 0,
      channel: null,
      id: null,
      embedMessage: null,
      subEmbedMessage: null,
      content: null,
      msg: null
      
  },

  init(ID, CONTENT, MSG){

      this.initPacks();
      this.initClass();
      this.initBackground();
      this.state.id = ID;
      this.state.content = CONTENT;
      this.state.msg = MSG;
      this.state.userSteps.set(this.state.id, 1);

      this.constant.personality = new Map([
          ['Acolyte', this.constant.acolyte.get('personality')],
          ['Criminal', this.constant.criminal.get('personality')],
          ['Folk Hero', this.constant.folkhero.get('personality')],
          ['Noble', this.constant.noble.get('personality')],
          ['Sage', this.constant.sage.get('personality')],
          ['Soldier', this.constant.soldier.get('personality')]
      ]);

      this.constant.ideal = new Map([
          ['Acolyte', this.constant.acolyte.get('ideal')],
          ['Criminal', this.constant.criminal.get('ideal')],
          ['Folk Hero', this.constant.folkhero.get('ideal')],
          ['Noble', this.constant.noble.get('ideal')],
          ['Sage', this.constant.sage.get('ideal')],
          ['Soldier', this.constant.soldier.get('ideal')]
      ]);

      this.constant.bond = new Map([
          ['Acolyte', this.constant.acolyte.get('bond')],
          ['Criminal', this.constant.criminal.get('bond')],
          ['Folk Hero', this.constant.folkhero.get('bond')],
          ['Noble', this.constant.noble.get('bond')],
          ['Sage', this.constant.sage.get('bond')],
          ['Soldier', this.constant.soldier.get('bond')]
      ]);

      this.constant.flaw = new Map([
          ['Acolyte', this.constant.acolyte.get('flaw')],
          ['Criminal', this.constant.criminal.get('flaw')],
          ['Folk Hero', this.constant.folkhero.get('flaw')],
          ['Noble', this.constant.noble.get('flaw')],
          ['Sage', this.constant.sage.get('flaw')],
          ['Soldier', this.constant.soldier.get('flaw')]
      ]);

  },

  initClass(){

    function getEquipmentByName(categoryObject, itemNames) {
      const result = [];
    
      for (const value of Object.values(categoryObject)) {
        if (Array.isArray(value)) {
          const matches = value.filter(item => itemNames.includes(item.name));
          result.push(...matches);
        } else if (typeof value === 'object' && value !== null) {
          result.push(...getEquipmentByName(value, itemNames));
        }
      }
    
      return result;
    }

    this.constant.Barbarian = {
      "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Greataxe"]),
          builder.equipment.weapons['Martial Melee Weapons']
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, [...Array(2).fill("Handaxe")]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Explorer's Pack", ...Array(2).fill("Javelin")])
        ],
      }
    }, 
    
    this.constant.Bard = {
      "tools": {
        "choose": 3,
        "from": this.equipment.tools['Musical Instrument']
      },
      "skills": {
        "choose": 3,
        "from": this.skills
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Rapier"]),
          getEquipmentByName(builder.equipment, ["Longsword"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Diplomat's Pack"]),
          getEquipmentByName(builder.equipment, ["Entertainer's Pack"])
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Lute"]),
          builder.equipment.tools['Musical Instrument']
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Leather", "Dagger"])
        ],
      }
    },  
    
    this.constant.Cleric = {
      "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["History", "Insight", "Medicine", "Persuasion", "Religion"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Crossbow, light", "Crossbow bolts"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Priest's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Amulet"]),
          getEquipmentByName(builder.equipment, ["Emblem"]),
          getEquipmentByName(builder.equipment, ["Reliquary"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Mace", "Scale mail", "Shield"])
        ],
      }
    },  
    
    this.constant.Druid = {
      "tools": "Herbalism kit",
      "skills": {
        "choose": 2,
        "from": ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Shield"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Scimitar"]),
          builder.equipment.weapons['Simple Melee Weapons']
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Sprig of mistletoe"]),
          getEquipmentByName(builder.equipment, ["Totem"]),
          getEquipmentByName(builder.equipment, ["Wooden staff"]),
          getEquipmentByName(builder.equipment, ["Yew wand"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Leather", "Explorer's Pack"])
        ],
      }
    },  
    
    this.constant.Fighter = {
      "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Chain mail"]),
          getEquipmentByName(builder.equipment, ["Leather", "Longbow", "Arrows"])
        ],
        "choose-2": [
          [...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons'], getEquipmentByName(builder.equipment, ["Shield"])],
          [[...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons']], [...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons']]]
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Crossbow, light", "Crossbow bolts"]),
          getEquipmentByName(builder.equipment, [...Array(2).fill("Handaxe")])
        ],
        "choose-4": [
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
      }
    },  
    
    this.constant.Monk = {
      "tools": {
        "choose": [this.equipment.tools['Artisans Tools'], this.equipment.tools['Musical Instrument']],
      },
      "skills": {
        "choose": 2,
        "from": ["Acrobatics", "Athletics", "History", "Insight", "Religion", 'Stealth']
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Shortsword"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, [...Array(10).fill("Dart")])
        ],
      }
    },  
    
    this.constant.Paladin = {
      "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"]
      },
      "items": {
        "choose-1": [
          [...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons'], getEquipmentByName(builder.equipment, ["Shield"])],
          [[...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons']], [...builder.equipment.weapons['Martial Melee Weapons'], ...builder.equipment.weapons['Martial Ranged Weapons']]]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, [...Array(5).fill("Javelin")]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Priest's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "choose-4": [
          getEquipmentByName(builder.equipment, ["Amulet"]),
          getEquipmentByName(builder.equipment, ["Emblem"]),
          getEquipmentByName(builder.equipment, ["Reliquary"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Chain mail"])
        ],
      }
    },  
    
    this.constant.Ranger = {
      "tools": "None",
      "skills": {
        "choose": 3,
        "from": ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Scale mail"]),
          getEquipmentByName(builder.equipment, ["Leather"])
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, [...Array(2).fill("Shortsword")]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Melee Weapons']]
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Longbow", "Arrows", "Quiver"])
        ],
      }
    },  
    
    this.constant.Rogue = {
        "tools": "Thieves’ tools",
      "skills": {
        "choose": 4,
        "from": ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Rapie"]),
          getEquipmentByName(builder.equipment, ["Shortsword"])
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Shortbow", "Arrows", "Quiver"]),
          getEquipmentByName(builder.equipment, ["Shortsword"])
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Burglar's Pack"]),
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Leather", ...Array(2).fill("Dagger"), "Thieves’ tools"])
        ],
      }
    },  
    
    this.constant.Sorcerer = {
        "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Crossbow, light", "Crossbow bolts"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Component pouch"]),
          builder.equipment.gear.Arcane
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Explorer's Pack"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, [...Array(2).fill("Dagger")])
        ],
      }
    },  
    
    this.constant.Warlock = {
        "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Crossbow, light", "Crossbow bolts"]),
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Component pouch"]),
          builder.equipment.gear.Arcane
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Dungeoneer's Pack"]),
          getEquipmentByName(builder.equipment, ["Scholar's Pack"])
        ],
        "choose-4": [
          [...builder.equipment.weapons['Simple Melee Weapons'], ...builder.equipment.weapons['Simple Ranged Weapons']]
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Leather", ...Array(2).fill("Dagger")])
        ],
      }
    },  
    
    this.constant.Wizard = {
        "tools": "None",
      "skills": {
        "choose": 2,
        "from": ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]
      },
      "items": {
        "choose-1": [
          getEquipmentByName(builder.equipment, ["Quarterstaff"]),
          getEquipmentByName(builder.equipment, ["Dagger"])
        ],
        "choose-2": [
          getEquipmentByName(builder.equipment, ["Component pouch"]),
          builder.equipment.gear.Arcane
        ],
        "choose-3": [
          getEquipmentByName(builder.equipment, ["Explorer's Pack"]),
          getEquipmentByName(builder.equipment, ["Scholar's Pack"])
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Spellbook"])
        ],
      }
    }

  },

  initBackground(){

    function getEquipmentByName(categoryObject, itemNames) {
      const result = [];
    
      for (const value of Object.values(categoryObject)) {
        if (Array.isArray(value)) {
          const matches = value.filter(item => itemNames.includes(item.name));
          result.push(...matches);
        } else if (typeof value === 'object' && value !== null) {
          result.push(...getEquipmentByName(value, itemNames));
        }
      }
    
      return result;
    }

    builder.constant["Acolyte"] = {
      "skills": ["Insight", "Religion"],
      "lang": 2,
      "items": {
        "choose": [
          getEquipmentByName(builder.equipment, ["Amulet"]),
          getEquipmentByName(builder.equipment, ["Emblem"]),
          getEquipmentByName(builder.equipment, ["Reliquary"])
        ],
        "fixed": [
          [getEquipmentByName(builder.equipment, ["Book", "Clothes, common"]), "5 sticks of incense", "vestments"]
        ],
      },
      "money": 15,
    }, 
    builder.constant["Criminal"] = {
      "skills": ["Deception", "Stealth"],
      "lang": 0,
      "tools": {
        "choose": [
          getEquipmentByName(builder.equipment, ["Dice set"]),
          getEquipmentByName(builder.equipment, ["Dragonchess set"]),
          getEquipmentByName(builder.equipment, ["Playing card set"])
        ],
        "fixed": "Thieves’ tools",
      },
      "items": getEquipmentByName(builder.equipment, ["Crowbar", "Clothes, common"]),
      "money": 15,
    }, 
    builder.constant["Folk Hero"] = {
      "skills": ["Animal Handling", "Survival"],
      "lang": 0,
      "tools": {
        "choose": this.equipment.tools['Artisans Tools'],
        "fixed": "vehicles (land)",
      },
      "items": {
        "choose": [
          this.equipment.tools['Artisans Tools']
        ],
        "fixed": [
          getEquipmentByName(builder.equipment, ["Shovel", "Pot, iron", "Clothes, common"])
        ],
      },
      "money": 10,
    }, 
    builder.constant["Noble"] = {
      "skills": [ "History", "Persuasion"],
      "tools": {
        "choose": [
          getEquipmentByName(builder.equipment, ["Dice set"]),
          getEquipmentByName(builder.equipment, ["Dragonchess set"]),
          getEquipmentByName(builder.equipment, ["Playing card set"])
      ]},
      "lang": 1,
      "items": [getEquipmentByName(builder.equipment, ["Signet ring", "Clothes, fine"]), "scroll of pedigree"],
      "money": 25,
    }, 
    builder.constant["Sage"] = {
      "skills": ["Arcana", "History"],
      "lang": 2,
      "items": [getEquipmentByName(builder.equipment, ["Ink (1 ounce bottle)", "Clothes, common"]), "quill", "small knife", "letter from a dead colleague posing a question you have not yet been able to answer"],
      "money": 10,
    }, 
    builder.constant["Soldier"] = {
      "skills": ["Athletics", "Intimidation"],
      "lang": 0,
      "tools": {
        "choose": [
          getEquipmentByName(builder.equipment, ["Dice set"]),
          getEquipmentByName(builder.equipment, ["Dragonchess set"]),
          getEquipmentByName(builder.equipment, ["Playing card set"])
        ],
        "fixed": "vehicles (land)",
      },
      "items": {
        "choose": ["trophy taken from a fallen enemy:", "dagger", "broken blade", "piece of a banner"],
        "choose-6": [
          getEquipmentByName(builder.equipment, ["Dice set"]),
          getEquipmentByName(builder.equipment, ["Playing card set"])
        ],
        "fixed": [
          [getEquipmentByName(builder.equipment, ["Clothes, common"]), "insignia of rank", "vestments"]
        ],
      },
      "money": 10,
    }
    
  },

  initPacks(){

    function getEquipmentByName(categoryObject, itemNames) {
      const result = [];
    
      for (const value of Object.values(categoryObject)) {
        if (Array.isArray(value)) {
          const matches = value.filter(item => itemNames.includes(item.name));
          result.push(...matches);
        } else if (typeof value === 'object' && value !== null) {
          result.push(...getEquipmentByName(value, itemNames));
        }
      }
    
      return result;
    }

    this.equipment.pack = [
      {name: "Burglar's Pack", value: 16, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Ball bearings (bag of 1,000)", "Bell", ...Array(5).fill("Candle"), "Crowbar", 'Hammer', "Lantern, hooded", ...Array(2).fill("Oil"), ...Array(5).fill("Rations (1 day)"), "Waterskin", "Rope, hempen (50 feet)", "Tinderbox"]), 
        '10 feet of string', '10 pitons']},
      {name: "Diplomat's Pack", value: 39, content: [...getEquipmentByName(builder.equipment, 
        ["Chest", ...Array(2).fill("Case, map or scroll"), "Clothes, fine", "Ink (1 ounce bottle)", "Ink pen", 'Lamp', ...Array(2).fill("Oil"), ...Array(5).fill("Paper (one sheet)"), "Perfume (vial)", "Sealing wax", "Soap"])]},
      {name: "Dungeoneer's Pack", value: 12, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Crowbar", 'Hammer', ...Array(8).fill("Torch"), "Tinderbox", ...Array(10).fill("Rations (1 day)"), "Waterskin", "Rope, hempen (50 feet)"]),
        '10 pitons']},
      {name: "Entertainer's Pack", value: 40, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Bedroll", ...Array(2).fill("Clothes, costume"), ...Array(5).fill("Candle"), ...Array(5).fill("Rations (1 day)"), "Waterskin", "Disguise kit"])]},
      {name: "Explorer's Pack", value: 10, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Bedroll", "Mess kit", "Tinderbox", ...Array(10).fill("Torch"), ...Array(10).fill("Rations (1 day)"), "Waterskin", "Rope, hempen (50 feet)"])]},
      {name: "Priest's Pack ", value: 19, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Blanket", ...Array(10).fill("Candle"), "Tinderbox", ...Array(2).fill("Rations (1 day)"), "Waterskin"]),
        "alms box", "2 blocks of incense", "censer", "vestments"]},
      {name: "Scholar's Pack", value: 40, content: [...getEquipmentByName(builder.equipment, 
        ["Backpack", "Book", "Ink (1 ounce bottle)", "Ink pen", ...Array(10).fill("Parchment (one sheet)")]),
        "little bag of sand", "small knife"]},
    ]

  },

  setCurrentStep() {
      this.state.currentStep = this.state.userSteps.get(this.state.id);
  },

  setUser(Name) {
      this.results.playerNAME = Name;
  },

  getCurrentStep() {
      return this.state.currentStep;
  },

  async continue(SetChannel, SetID) {
      this.state.channel = SetChannel;
      this.state.id = SetID;

      console.log('User (' + this.state.id + ') is continuing at step ' + this.state.currentStep);
      if (builder.run.steps[this.state.currentStep]) {
          return await builder.run.steps[this.state.currentStep]();
      } else {
          console.log("Step not found!");
          return null;
      }
  },

  async return(SetChannel, SetID) {
      this.state.channel = SetChannel;
      this.state.id = SetID;
  
      this.state.currentStep = (this.state.currentStep % 1 !== 0)
          ? Math.round((this.state.currentStep - 0.1) * 10) / 10
          : this.state.currentStep - 1;
      
      console.log('User (' + this.state.id + ') is returning to ' + this.state.currentStep);
      if (builder.run.steps[this.state.currentStep]) {
          return await builder.run.steps[this.state.currentStep]();
      } else {
          console.log("Step not found!");
          return null;
      }
  },

  async run(step, SetChannel, SetID) {
      this.state.channel = SetChannel;
      this.state.id = SetID;
  
      console.log('User (' + this.state.id + ') is running step ' + this.state.currentStep);
      if (builder.run.steps[step]) {
          return await builder.run.steps[step]();
      } else {
          console.log("Step not found!");
          return null;
      }
  },

  async check(attr) {

      console.log('A Check Function is running on User (' + builder.state.id + ')');
      const emojiOptions = ['❌', '✅'];

      builder.state.subEmbedMessage = await embed.createNew(
          'IST DAS RICHTIG?',
          `${attr}`,
          builder.state.channel
      );   

      const index = await embed.AddReact(emojiOptions, builder.state.id, builder.state.subEmbedMessage);
      if (index === null) return;

      const checked = index === 1;
      await embed.delete(builder.state.subEmbedMessage)
      return checked;

  },

  run: {
      steps: {
          // 1. STEP - CHOOSE A RACE
          1: async function () {
          console.log('User (' + builder.state.id + ') is choosing a race');
  
          builder.state.embedMessage = await embed.createNew(
              'WÄHLE EIN VOLK',
              '** DWARF ** -> `1`\n\n** ELF ** -> `2`\n\n** HALFLING ** -> `3`\n\n** HUMAN ** -> `4`\n\n** DRAGONBORN ** -> `5`\n\n** ROCK GNOME ** -> `6`\n\n** HALF-ELF ** -> `7`\n\n** HALF-ORC ** -> `8`\n\n** TIEFLING ** -> `9`\n\nReagiere mit einer Zahl, um dein Volk zu wählen. Mehr Infos: <#1366770903014183063>',
              builder.state.channel
          );
  
          const index = await embed.AddReact(builder.util.Emojis, builder.state.id, builder.state.embedMessage);
          if (index === null) return;
  
          builder.results.race = builder.constant.races[index];
          builder.util.race = builder.constant.races[index];
          console.log('User (' + builder.state.id + ') has choose the race ' + builder.results.race);
          builder.state.userSteps.set(builder.state.id, 1.1);
          builder.state.currentStep = 1.1;
          await builder.continue(builder.state.channel, builder.state.id);
          return;
          },
          
          // 1.1 STEP - CHOOSE A SUB-RACE
          1.1: async function () {
              console.log('User (' + builder.state.id + ') is choosing a sub-race');

              if (builder.constant.subraces.get(builder.results.race)) {

                  const subOptions = builder.constant.subraces.get(builder.results.race);
                  let subOptionsText = subOptions.join('\n');

                  builder.state.subEmbedMessage = await embed.createNew(' ', `${subOptionsText}\n\nReagiere mit einer Zahl, um dein genaues Volk zu wählen. Mehr Infos: <#1366770903014183063>`, builder.state.channel);
                  const subIndex = await embed.AddReact(builder.util.Emojis.slice(0, subOptions.length), builder.state.id, builder.state.subEmbedMessage);
      
                  builder.results.race = subOptions[subIndex];
                  console.log('User (' + builder.state.id + ') has choose the sub-race ' + builder.results.race);
                  await embed.delete(builder.state.embedMessage);
                  await embed.delete(builder.state.subEmbedMessage);
                  builder.state.userSteps.set(builder.state.id, 2);
                  builder.state.currentStep = 2;
                  await builder.state.channel.send(`Volk ausgewählt: ${builder.results.race}`);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }
              
              else {

                  await embed.delete(builder.state.embedMessage);
                  builder.state.userSteps.set(builder.state.id, 2);
                  builder.state.currentStep = 2;
                  await builder.state.channel.send(`Volk ausgewählt: ${builder.results.race}`);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;

              }

          },

          // 2. STEP - CHOOSE A CLASS
          2: async function () {
              console.log('User (' + builder.state.id + ') is choosing a class');
              const emojiOptions = ['🪓', '🎵', '✝️', '🌿', '⚔️', '🧘', '🛡️', '🏹', '🗡️', '🔮', '📜', '📘'];
      
              builder.state.embedMessage = await embed.createNew(
                  'WÄHLE EINE KLASSE',
                  '**BARBARIAN** -> `🪓`\n' +
                  '_Ein wilder Krieger aus primitiver Herkunft, der in Kampfraserei verfallen kann._\n\n' +
                  '**BARD** -> `🎵`\n' +
                  '_Ein inspirierender Magier, dessen Macht aus der Musik der Schöpfung stammt._\n\n' +
                  '**CLERIC** -> `✝️`\n' +
                  '_Ein priesterlicher Streiter, der göttliche Magie im Dienst einer höheren Macht wirkt._\n\n' +
                  '**DRUID** -> `🌿`\n' +
                  '_Ein Priester des Alten Glaubens, der Naturkräfte wie Mondlicht, Pflanzenwachstum, Feuer und Blitz nutzt und Tiergestalten annimmt._\n\n' +
                  '**FIGHTER** -> `⚔️`\n' +
                  '_Ein Meister des Kampfes, geübt im Umgang mit vielen Waffen und Rüstungen._\n\n' +
                  '**MONK** -> `🧘`\n' +
                  '_Ein Meister der Kampfkunst, der die Kraft seines Körpers zur körperlichen und geistigen Vollkommenheit nutzt._\n\n' +
                  '**PALADIN** -> `🛡️`\n' +
                  '_Ein heiliger Krieger, der an einen heiligen Eid gebunden ist._\n\n' +
                  '**RANGER** -> `🏹`\n' +
                  '_Ein Kämpfer, der mit Kampfkunst und Naturmagie Bedrohungen am Rande der Zivilisation begegnet._\n\n' +
                  '**ROGUE** -> `🗡️`\n' +
                  '_Ein Gauner, der mit Heimlichkeit und Tricks Hindernisse und Feinde überwindet._\n\n' +
                  '**SORCERER** -> `🔮`\n' +
                  '_Ein Zauberwirker, der auf angeborene Magie aus einer Gabe oder Blutlinie zurückgreift._\n\n' +
                  '**WARLOCK** -> `📜`\n' +
                  '_Ein Magieanwender, dessen Kraft aus einem Pakt mit einem außerweltlichen Wesen stammt._\n\n' +
                  '**WIZARD** -> `📘`\n' +
                  '_Ein gelehrter Magier, der die Struktur der Realität manipulieren kann._\n\n' +
                  'Reagiere mit einem Emoji, um deine Klasse zu wählen. Mehr Infos: <#1366770919670022255>',
                  builder.state.channel
              );
      
              const index = await embed.AddReact(emojiOptions, builder.state.id, builder.state.embedMessage);
              if (index === null) return;
      
              builder.results.classes = builder.constant.classes[index];
              console.log('User (' + builder.state.id + ') has choose the class ' + builder.results.classes);
              await embed.delete(builder.state.embedMessage);
              builder.state.userSteps.set(builder.state.id, 3);
              builder.state.currentStep = 3;
              await builder.state.channel.send(`Klasse ausgewählt: ${builder.results.classes}`);
              await builder.continue(builder.state.channel, builder.state.id);

          },

          // 3. STEP - CHOOSE ATTRIBUTES
          3: async function () {
              console.log('User (' + builder.state.id + ') is choosing a attributes');
              const emojiOptions = ['❌', '✅']; // ❌ = manual, ✅ = random

              builder.state.embedMessage = await embed.createNew(
                  'LEGE DIE ATTRIBUTSWERTE FEST',
                  'Willst du die Attribute selbst wählen oder zufällig generieren? Reagiere mit einem Emoji.\nMehr Infos: <#1366770877768794173>',
                  builder.state.channel
              );

              const index = await embed.AddReact(emojiOptions, builder.state.id, builder.state.embedMessage);
              if (index === null) return;

              const useRandom = index === 1;

              if (useRandom) {
                  console.log('at Random');
                  const stats = [];
                  const rollStat = () => {
                      let rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
                      rolls.sort((a, b) => b - a); // sort descending
                      return rolls[0] + rolls[1] + rolls[2]; // take top 3
                  };

                  for (let i = 0; i < 6; i++) {
                      stats.push(rollStat());
                  }

                  let statText = stats.map((stat, i) => `Wert ${i + 1}: **${stat}**`).join('\n');

                  builder.state.subEmbedMessage = await embed.createNew(
                      'ZUFÄLLIGE ATTRIBUTSWERTE',
                      `Diese Werte wurden generiert:\n\n${statText}\n\nHier sidn alle Attribute:\nStrength(Stärke) = str\nDexterity(Geschicklichkeit) = dex\nConstitution(Konstitution) = con\nIntelligence(Intelligenz) = int\nWisdom(Weisheit) = wis\nCharisma = cha\n\nNutze den Command \`!str 1\`, \`!dex 2\`, etc., um Werte zuzuweisen.`,
                      builder.state.channel
                  );

                  // Save the rolled stats temporarily
                  console.log('Random Numbers were generated');
                  builder.util.randomStats = stats;
                  builder.util.assignedStats = {}; // empty map like {STR: 16}
                  builder.util.remainingStats = [...stats]; // values not yet assigned
                  builder.state.userSteps.set(builder.state.id, 3.1); // Next step
                  builder.state.currentStep = 3.1;
                  
                  return;
              } 
              
              if (!useRandom) {
                  console.log('not random Random');
                  const stats = [15,14,13,12,10,8];
                  let statText = stats.map((stat, i) => `Wert ${i + 1}: **${stat}**`).join('\n');

                  builder.state.subEmbedMessage = await embed.createNew(
                      'VORBESTIMMTE ATTRIBUTSWERTE',
                      `Diese Werte wurden generiert:\n\n${statText}\n\nHier sidn alle Attribute:\nStrength(Stärke) = str\nDexterity(Geschicklichkeit) = dex\nConstitution(Konstitution) = con\nIntelligence(Intelligenz) = int\nWisdom(Weisheit) = wis\nCharisma = cha\n\nNutze den Command \`!str 1\`, \`!dex 2\`, etc., um Werte zuzuweisen.`,
                      builder.state.channel
                  );

                  // inside step 3: after generating and displaying the random stats
                  builder.util.randomStats = stats;
                  builder.util.assignedStats = {}; // empty map like {STR: 16}
                  builder.util.remainingStats = [...stats]; // values not yet assigned
                  builder.state.userSteps.set(builder.state.id, 3.1); // set new substep
                  builder.state.currentStep = 3.1;


                  return;
              };
              
              // Otherwise, let user assign manually in next step
              builder.state.userSteps.set(builder.state.id, 4);
              builder.state.currentStep = 4;
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character name');

              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter ein Name.
                  \n\n BEISPIEL NAMEN FÜR **${builder.results.race}**: 
                  \n${builder.constant.raceNAMEs.get(builder.util.race)}
                  \n\nMehr Infos: <#1366770903014183063>`,
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const charName = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(charName))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.charNAME = charName;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.charNAME);
              builder.state.userSteps.set(builder.state.id, 4.1);
              builder.state.currentStep = 4.1;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.1: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character gender');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  'Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter ein Geschlecht.',
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const gender = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(gender))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.gender = gender;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.gender);
              builder.state.userSteps.set(builder.state.id, 4.2);
              builder.state.currentStep = 4.2;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.2: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter seine Höhe an.\n
                  Typish für dein Volk ist:\n 
                  ${builder.constant.raceHEIGHT.get(builder.util.race)}
                  `,
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const height = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(height))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.height = height;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.height);
              builder.state.userSteps.set(builder.state.id, 4.3);
              builder.state.currentStep = 4.3;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.3: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter seinen Gewicht an.\n
                  Typish für dein Volk ist:\n 
                  ${builder.constant.raceWEIGHT.get(builder.util.race)}
                  `,
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const weight = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(weight))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.weight = weight;
              builder.results.size = builder.constant.raceSIZE.get(builder.results.race);
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.weight);
              builder.state.userSteps.set(builder.state.id, 4.4);
              builder.state.currentStep = 4.4;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.4: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character age');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  'Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter sein Alter. Mehr Infos: <#1366770903014183063>',
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const age = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(age))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.age = age;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.age);
              builder.state.userSteps.set(builder.state.id, 4.5);
              builder.state.currentStep = 4.5;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.5: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character eyes');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  'Zeit für ein bisschen Personalisierung von dein DnD Charakter. Gibt dein Charakter seine Augenfarbe.',
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const eyes = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(eyes))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.eyes = eyes;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.eyes);
              builder.state.userSteps.set(builder.state.id, 4.6);
              builder.state.currentStep = 4.6;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.6: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character hair');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  'Zeit für ein bisschen Personalisierung von dein DnD Charakter. Was für Haare hat dein Charakter? Mehr Infos: <#1366770903014183063>',
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const hair = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(hair))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.hair = hair;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.hair);
              builder.state.userSteps.set(builder.state.id, 4.7);
              builder.state.currentStep = 4.7;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          4.7: async function () {
              console.log('User (' + builder.state.id + ') is choosing a personalizing character skin');
              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  'Zeit für ein bisschen Personalisierung von dein DnD Charakter. Was für eine Haut hat dein Charakter. Mehr Infos: <#1366770903014183063>',
                  builder.state.channel
              );
      
              // Wait for user's next message in the same channel
              const filter = m => m.author.id === builder.state.id;
              const collected = await builder.state.channel.awaitMessages({ filter, max: 1, time: 600000 });

              if (!collected.size) {
                  builder.state.channel.send("Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const nameMsg = collected.first();
              const skin = nameMsg.content.trim();

              // Ask for confirmation
              if (!(await builder.check(skin))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.skin = skin;
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.skin);
              builder.state.userSteps.set(builder.state.id, 5);
              builder.state.currentStep = 5;

              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);

          },

          5: async function () {
              console.log('User (' + builder.state.id + ') is choosing a background');
      
              builder.state.embedMessage = await embed.createNew(
                  'WÄHLE EINEN HINTERGRUND',
                  '** ACOLYTE ** -> `1`\n\n** CRIMINAL ** -> `2`\n\n** FOLK HERO ** -> `3`\n\n** NOBLE ** -> `4`\n\n** SAGE ** -> `5`\n\n** SOLDIER ** -> `6`\n\nReagiere mit einer Emoji, um deinen Hintergrund zu wählen.',
                  builder.state.channel
              );
      
              const index = await embed.AddReact(builder.util.Emojis.slice(0, builder.constant.background.length), builder.state.id, builder.state.embedMessage);
              if (index === null) return;
      
              builder.results.background = builder.constant.background[index];
              console.log('User (' + builder.state.id + ') has choose the background of ' + builder.results.background);
              await embed.delete(builder.state.embedMessage);
              builder.state.userSteps.set(builder.state.id, 6);
              builder.state.currentStep = 6;
              await builder.state.channel.send(`Hintergrund ausgewählt: ${builder.results.background}`);
              await builder.continue(builder.state.channel, builder.state.id);

          },

          6: async function () {
              console.log('User (' + builder.state.id + ') is choosing a allignment');
              builder.state.embedMessage = await embed.createNew(
                  'WÄHLE EINE NEIGUNG',
                  '** LAWFUL GOOD ** -> `1`\n\n** LAWFUL NEUTRAL ** -> `2`\n\n** LAWFUL EVIL ** -> `3`\n\n** NEUTRAK GOOD ** -> `4`\n\n** TRUE NEUTRAL ** -> `5`\n\n** NEUTRAL EVIL ** -> `6`\n\n** CHAOTIC GOOD ** -> `7`\n\n** CHAOTIC NEUTRAL ** -> `8`\n\n** CHAOTIC EVIL ** -> `9`\n\nReagiere mit einer Emoji, um deine Neigung zu wählen.',
                  builder.state.channel
              );
      
              const index = await embed.AddReact(builder.util.Emojis, builder.state.id, builder.state.embedMessage);
              if (index === null) return;
      
              builder.results.alignment = builder.constant.alignment[index];
              console.log('User (' + builder.state.id + ') has choose ' + builder.results.alignment);
              await embed.delete(builder.state.embedMessage);
              builder.state.userSteps.set(builder.state.id, 7);
              builder.state.currentStep = 7;
              await builder.state.channel.send(`Neigung ausgewählt: ${builder.results.alignment}`);
              await builder.continue(builder.state.channel, builder.state.id);

          },

          7: async function () {
              console.log('User (' + builder.state.id + ') is personalizing story');

              let Text = builder.constant.personality.get(builder.results.background).map((personality, i) => `${i + 1}. **${personality}**`).join('\n');

              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter Hintergrund.\n\n📝 Du kannst eine eigene Persönlichkeit schreiben **oder** eine aus den Optionen wählen.\n\n
                  FÜR ${builder.results.background}:\n
                  ${Text}`,
                  builder.state.channel
              );
              
              // Start both collectors in parallel
              const messagePromise = builder.state.channel.awaitMessages({
                  filter: m => m.author.id === builder.state.id,
                  max: 1,
                  time: 1800000,
              }).then(collected => ({ type: 'message', data: collected.first()?.content?.trim() }));
              
              const reactionPromise = embed.AddReact(builder.util.Emojis.slice(0, builder.constant.personality.get(builder.results.background).length), builder.state.id, builder.state.embedMessage)
              .then(index => ({ type: 'reaction', data: index }));

              // Whichever comes first:
              const result = await Promise.race([messagePromise, reactionPromise]);

              if (!result || (result.type === 'message' && !result.data)) {
                  builder.state.channel.send("⏰ Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const personality = result.type === 'reaction'
                  ? builder.constant.personality.get(builder.results.background)[result.data]
                  : result.data;

              // Ask for confirmation
              if (!(await builder.check(personality))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.personality = personality;
              console.log(`User (${builder.state.id}) chose personality: ${personality}`);
              builder.state.userSteps.set(builder.state.id, 7.1);
              builder.state.currentStep = 7.1;
              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          7.1: async function () {
              console.log('User (' + builder.state.id + ') is personalizing story');

              let Text = builder.constant.ideal.get(builder.results.background).map((ideal, i) => `${i + 1}. **${ideal}**`).join('\n');

              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter Hintergrund.\n\n📝 Du kannst eigene Ideale schreiben **oder** eine aus den Optionen wählen.\n\n
                  FÜR ${builder.results.background}:\n
                  ${Text}`,
                  builder.state.channel
              );
              
              // Start both collectors in parallel
              const messagePromise = builder.state.channel.awaitMessages({
                  filter: m => m.author.id === builder.state.id,
                  max: 1,
                  time: 1800000,
              }).then(collected => ({ type: 'message', data: collected.first()?.content?.trim() }));
              
              const reactionPromise = embed.AddReact(builder.util.Emojis.slice(0, builder.constant.ideal.get(builder.results.background).length), builder.state.id, builder.state.embedMessage)
              .then(index => ({ type: 'reaction', data: index }));

              // Whichever comes first:
              const result = await Promise.race([messagePromise, reactionPromise]);

              if (!result || (result.type === 'message' && !result.data)) {
                  builder.state.channel.send("⏰ Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const ideal = result.type === 'reaction'
                  ? builder.constant.ideal.get(builder.results.background)[result.data]
                  : result.data;

              // Ask for confirmation
              if (!(await builder.check(ideal))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.ideals = ideal;
              console.log(`User (${builder.state.id}) chose personality: ${ideal}`);
              builder.state.userSteps.set(builder.state.id, 7.2);
              builder.state.currentStep = 7.2;
              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          7.2: async function () {
              console.log('User (' + builder.state.id + ') is personalizing story');

              let Text = builder.constant.bond.get(builder.results.background).map((bond, i) => `${i + 1}. **${bond}**`).join('\n');

              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter Hintergrund.\n\n📝 Du kannst eigene Bindungen schreiben **oder** eine aus den Optionen wählen.\n\n
                  FÜR ${builder.results.background}:\n
                  ${Text}`,
                  builder.state.channel
              );
              
              // Start both collectors in parallel
              const messagePromise = builder.state.channel.awaitMessages({
                  filter: m => m.author.id === builder.state.id,
                  max: 1,
                  time: 1800000,
              }).then(collected => ({ type: 'message', data: collected.first()?.content?.trim() }));
              
              const reactionPromise = embed.AddReact(builder.util.Emojis.slice(0, builder.constant.bond.get(builder.results.background).length), builder.state.id, builder.state.embedMessage)
              .then(index => ({ type: 'reaction', data: index }));

              // Whichever comes first:
              const result = await Promise.race([messagePromise, reactionPromise]);

              if (!result || (result.type === 'message' && !result.data)) {
                  builder.state.channel.send("⏰ Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const bond = result.type === 'reaction'
                  ? builder.constant.bond.get(builder.results.background)[result.data]
                  : result.data;

              // Ask for confirmation
              if (!(await builder.check(bond))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.bonds = bond;
              console.log(`User (${builder.state.id}) chose personality: ${bond}`);
              builder.state.userSteps.set(builder.state.id, 7.3);
              builder.state.currentStep = 7.3;
              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);
          },

          7.3: async function () {
              console.log('User (' + builder.state.id + ') is personalizing story');

              let Text = builder.constant.flaw.get(builder.results.background).map((flaw, i) => `${i + 1}. **${flaw}**`).join('\n');

              builder.state.embedMessage = await embed.createNew(
                  'PERSONALISIERUNG',
                  `Zeit für ein bisschen Personalisierung von dein DnD Charakter Hintergrund.\n\n📝 Du kannst eigene Makeln schreiben **oder** eine aus den Optionen wählen.\n\n
                  FÜR ${builder.results.background}:\n
                  ${Text}`,
                  builder.state.channel
              );
              
              // Start both collectors in parallel
              const messagePromise = builder.state.channel.awaitMessages({
                  filter: m => m.author.id === builder.state.id,
                  max: 1,
                  time: 1800000,
              }).then(collected => ({ type: 'message', data: collected.first()?.content?.trim() }));
              
              const reactionPromise = embed.AddReact(builder.util.Emojis.slice(0, builder.constant.flaw.get(builder.results.background).length), builder.state.id, builder.state.embedMessage)
              .then(index => ({ type: 'reaction', data: index }));

              // Whichever comes first:
              const result = await Promise.race([messagePromise, reactionPromise]);

              if (!result || (result.type === 'message' && !result.data)) {
                  builder.state.channel.send("⏰ Zeitüberschreitung! Bitte starte mit `!continue` neu.");
                  await embed.delete(builder.state.embedMessage);
                  return;
              }

              const flaw = result.type === 'reaction'
                  ? builder.constant.flaw.get(builder.results.background)[result.data]
                  : result.data;

              // Ask for confirmation
              if (!(await builder.check(flaw))) {
                  await embed.delete(builder.state.embedMessage);
                  await builder.continue(builder.state.channel, builder.state.id);
                  return;
              }

              // Set the name and continue
              builder.results.flaws = flaw;
              console.log(`User (${builder.state.id}) chose personality: ${flaw}`);
              builder.state.userSteps.set(builder.state.id, 8);
              builder.state.currentStep = 8;
              await embed.delete(builder.state.embedMessage);
              await builder.continue(builder.state.channel, builder.state.id);

          },

          8: async function () {
            console.log('User (' + builder.state.id + ') is choosing lang');
    
            const raceLang = builder.constant.raceLang.get(builder.util.race);
            const availableLangs = builder.lang.filter(lang => !raceLang.includes(lang));
            let Text = availableLangs.map((lang, i) => `**${lang}**`).join('\n');

            if(builder.constant[builder.results.background]["lang"] == 0){

              console.log(`User (${builder.state.id}) doesn't have lang to choose`);
              builder.results.lang = builder.lang.filter(lang => raceLang.includes(lang));
              builder.state.userSteps.set(builder.state.id, 9); // Next step
              builder.state.currentStep = 9;
              await builder.continue(builder.state.channel, builder.state.id);

            }
            
            else{
              builder.state.embedMessage = await embed.createNew(
                'WÄHLE DEINE ZUSÄTZLICHEN SPRACHEN',
                `Durch deine Hintergrund kannst du noch ${builder.constant[builder.results.background]["lang"]} Sprache für dein Charakter aussuchen. Hier sind deine Optionen:\n\n${Text}\n\nSchreibe deine gewählte Sprache mit den command ![lang].\nZu Beispiel: !elvish`,
                builder.state.channel
              );

              builder.util.amountLang = builder.constant[builder.results.background]["lang"];
              builder.util.availableLang = availableLangs;
              builder.util.assignedLang = [null]; // empty map like {STR: 16}
              builder.util.remainingLang = [...availableLangs]; // values not yet assigned
              builder.state.userSteps.set(builder.state.id, 8.1); // Next step
              builder.state.currentStep = 8.1;
              return;
            }
          },

          9: async function () {
            console.log('User (' + builder.state.id + ') is choosing skills');
            
            const backgroundSkills = builder.constant[builder.results.background]["skills"]
            const skillsCHOICES = builder.constant[builder.results.classes]["skills"]["from"];
            const availableSkills = skillsCHOICES.filter(skills => !backgroundSkills.includes(skills));
            let alreadyText = backgroundSkills.map((skill, i) => `**${skill}**`).join('\n');
            let availableText = availableSkills.map((skill, i) => `**${skill}**`).join('\n');

            builder.state.embedMessage = await embed.createNew(
              'WÄHLE DEINE ZUSÄTZLICHEN SKILLS',
              `Durch deine Hintergrund besitzt dein Charakter folgende Skills:\n
              ${alreadyText}\n\n 
              Und durch deine Klasse kannst du noch ${builder.constant[builder.results.classes]["skills"]["choose"]} Skills für dein Charakter aussuchen.\n 
              Hier sind deine Optionen:\n\n
              ${availableText}\n\nSchreibe deine gewählte Sprache mit den command ![skill]`,
              builder.state.channel
            );

            builder.util.amountSkills = builder.constant[builder.results.classes]["skills"]["choose"];
            builder.util.availableSkills = availableSkills;
            builder.util.assignedSkills = [backgroundSkills]; // empty map like {STR: 16}
            builder.util.remainingSkills = [...availableSkills]; // values not yet assigned
            builder.state.userSteps.set(builder.state.id, 9.1); // Next step
            builder.state.currentStep = 9.1;
            return;

          },

          // 10: async function () {
          //   console.log('User (' + builder.state.id + ') is choosing tool');
          
          //   function extractTools(source) {
          //     if (!source || source === "None") return [];
          
          //     const toolsChoose = [];
          //     const toolsFixed = [];
          
          //     // If source is an object (not a string like "None")
          //     if (typeof source === 'object') {
          //       // Handle "choose.from" or "choose"
          //       if (Array.isArray(source.from)) toolsChoose.push(...source.from);
          //       if (Array.isArray(source.choose)) {
          //         for (const option of source.choose) {
          //           if (Array.isArray(option)) {
          //             toolsChoose.push(...option); // for nested arrays like sets of options
          //           } else {
          //             toolsChoose.push(option);
          //           }
          //         }
          //       }
          //       // Handle "fixed"
          //       if (source.fixed) {
          //         if (Array.isArray(source.fixed)) toolsFixed.push(...source.fixed);
          //         else toolsFixed.push(source.fixed);
          //       }
          //     }
          
          //     return tools;
          //   }
          
          //   const classTools = extractTools(builder.constant[builder.results.classes]?.tools);
          //   const backgroundTools = extractTools(builder.constant[builder.results.background]?.tools);
            
          //   // Combine and filter duplicates
          //   const allTools = [...new Set([...classTools, ...backgroundTools].filter(t => t && t !== "None"))];
          
          //   if (allTools.length === 0) {
          //     console.log(`User (${builder.state.id}) has no tools to choose.`);
          //     builder.results.tool = [];
          //     builder.state.userSteps.set(builder.state.id, 11);
          //     builder.state.currentStep = 11;
          //     await builder.continue(builder.state.channel, builder.state.id);
          //     return;
          //   }
          
          //   const Text = allTools.map((tool, i) => `**${typeof tool === 'string' ? tool : tool.name || tool}**`).join('\n');
          
          //   builder.state.embedMessage = await embed.createNew(
          //     'WÄHLE DEIN WERKZEUG (TOOL)',
          //     `Basierend auf deiner Klasse und deinem Hintergrund kannst du ein Werkzeug auswählen.\nHier sind deine Optionen:\n\n${Text}\n\nSchreibe dein gewähltes Werkzeug mit dem Befehl \`!toolname\`.`,
          //     builder.state.channel
          //   );
          
          //   builder.util.availableTools = allTools;
          //   builder.util.assignedTool = null;
          //   builder.state.userSteps.set(builder.state.id, 10.1);
          //   builder.state.currentStep = 10.1;
          // }   
          
          11: async function () {
            console.log('User (' + builder.state.id + ') is choosing items');
            
            // Function to extract items from the source
            function extractItems(source) {
                const chooseItems = [];
                const fixedItems = [];
                
                if (typeof source === 'object') {
                    Object.keys(source).forEach(key => {
                        if (key.startsWith("choose")) {  // If it's a choose-x array
                            const chooseKey = source[key];
                            if (Array.isArray(chooseKey)) {
                                chooseItems.push(chooseKey);  // Preserve the structure (don't flatten)
                            }
                        } else if (key === "fixed") {  // If it's a fixed array
                            const fixedKey = source[key];
                            if (Array.isArray(fixedKey)) {
                                fixedItems.push(...fixedKey);
                            } else {
                                fixedItems.push(fixedKey);
                            }
                        }
                    });
                }
                
                for(let i=0; i < chooseItems.length; i++){
                  console.log(chooseItems[i]);
                };
                
                for(let i=0; i < fixedItems.length; i++){
                  console.log(fixedItems[i]);
                };
                return { fixedItems, chooseItems }; // Return as an object for clarity
            }

            // Function to extract the basic details (name, value, weight) of an item
            function extractItemDetails(item) {
                if (typeof item !== 'object') return {};  // If item is not an object, return an empty object
                
                const { name, value, weight } = item;  // Destructure to get the details you care about
                console.log(name, value, weight);
                return { name, value, weight };  // Return only the necessary details
            }

            // Extract class and background items
            const classItems = extractItems(builder.constant[builder.results.classes]?.items);
            const backgroundItems = extractItems(builder.constant[builder.results.background]?.items);

            // Combine the choose items and fixed items separately
            const allChooseItems = [
                ...classItems.chooseItems,
                ...backgroundItems.chooseItems
            ];

            const allItems = [
                ...classItems.fixedItems,
                ...backgroundItems.fixedItems
            ];

            for(let i=0; i < allChooseItems.length; i++){
              console.log(allChooseItems[i]);
            };
            
            for(let i=0; i < allItems.length; i++){
              console.log(allItems[i]);
            };

            // Extract details for each item (for fixed items too)
            const itemDetails = allItems.map(extractItemDetails);
            const chooseItemDetails = allChooseItems.map(group => {
                // For each group in the "choose-x", extract the details for each item in that group
                return group.map(extractItemDetails);
            });

            for(let i=0; i < itemDetails.length; i++){
              console.log(itemDetails[i]);
            };
            
            for(let i=0; i < chooseItemDetails.length; i++){
              console.log(chooseItemDetails[i]);
            };

            let itemText = '';
            chooseItemDetails.forEach((group, index) => {
                itemText += `**Option ${index + 1}:**\n`;
                group.forEach((item, subIndex) => {
                    itemText += `  **Item ${subIndex + 1}: ${item.name}**\nWert: ${item.value}\nGewicht: ${item.weight}\n\n`;
                });
            });

            // Set the fixed items text for display (if any)
            const fixedText = itemDetails.map(item => {
                return `**${item.name}**\nWert: ${item.value}\nGewicht: ${item.weight}`;
            }).join('\n\n');
            
            // Create the message to send to the user
          
            builder.state.embedMessage = await embed.createNew(
              'DEIN INVENTORY',
              `Basierend auf deiner Klasse und deinem Hintergrund, bekommst du gewisse Items und du kannst anderen Items auswählen.\n` +
              `Hier ist dein Inventar bis jetzt:\n\n${fixedText}\n\n`,
              builder.state.channel
            );

            builder.state.subEmbedMessage = await embed.createNew(
              'WÄHLE DEIN INVENTORY',
              `Hier sind deine Optionen zu wählen:\n\n${itemText}\n\n` +
              `Schreibe dein gewähltes Item mit dem Befehl \`!itemname\`.`,
              builder.state.channel
            );
          
            // Store available tools and reset assignment
            builder.results.money = builder.constant[builder.results.background]["money"]
            builder.util.availableItems = allItems;  // Store all items as available tools (with their basic details)
            builder.util.assignedItems = null;
            builder.state.userSteps.set(builder.state.id, 11.1);
            builder.state.currentStep = 11.1;
            return;

          },
      }
  },

  result() {
      console.log('Results (' + builder.results + ') are being pushed');
      return this.results;
  },

  reset() {

      console.log('Builder is being reset');
      builder.results = { 
          playerNAME: null, 
          race: null, 
          classes: null,  
          str: null, 
          dex: null, 
          con: null, 
          int: null, 
          wis: null, 
          cha: null, 
          charNAME: null, 
          gender: null, 
          height: null,
          weight: null, 
          size: null, 
          age: null, 
          eyes: null, 
          hair: null, 
          skin: null, 
          background: null, 
          alignment: null, 
          personality: null, 
          ideals: null, 
          bonds: null, 
          flaws: null, 
          lang: null, 
          skills: null, 
          tool: null,
          items: null, 
          money: null, 
        },
      
        builder.util = {
      
          Emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
      
          race: null,
      
          randomStats: null, 
          assignedStats: null,
          remainingStats: null,
      
          amountLang: null,
          availableLang: null,
          assignedLang: null,
          remainingLang: null,
      
          amountSkills: null,
          availableSkills: null,
          assignedSkills: null,
          remainingSkills: null,
      
        },
      
        builder.constant= {
      
          races: ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Rock Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'],
      
          raceNAMEs: new Map([
            ['Dwarf', '**Male Names:** Adrik, Alberich, Baern, Barendd, Brottor, Bruenor, Dain, Darrak, Delg, Eberk, Einkil, Fargrim, Flint, Gardain, Harbek, Kildrak, Morgran, Orsik, Oskar, Rangrim, Rurik, Taklinn, Thoradin, Thorin, Tordek, Traubon, Travok, Ulfgar, Veit, Vondal\n\n**Female Names:** Amber, Artin, Audhild, Bardryn, Dagnal, Diesa, Eldeth, Falkrunn, Finellen, Gunnloda, Gurdis, Helja, Hlin, Kathra, Kristryd, Ilde, Liftrasa, Mardred, Riswynn, Sannl, Torbera, Torgga, Vistra'],
            ['Elf', '**Male Names:** Adran, Aelar, Aramil, Arannis, Aust, Beiro, Berrian, Carric, Enialis, Erdan, Erevan, Galinndan, Hadarai, Heian, Himo, Immeral, Ivellios, Laucian, Mindartis, Paelias, Peren, Quarion, Riardon, Rolen, Soveliss, Thamior, Tharivol, Theren, Varis\n\n**Female Names:** Adrie, Althaea, Anastrianna, Andraste, Antinua, Bethrynna, Birel, Caelynn, Drusilia, Enna, Felosial, Ielenia, Jelenneth, Keyleth, Leshanna, Lia, Meriele, Mialee, Naivara, Quelenna, Quillathe, Sariel, Shanairra, Shava, Silaqui, Theirastra, Thia, Vadania, Valanthe, Xanaphia'],
            ['Halfling', '**Male Names:** Alton, Ander, Cade, Corrin, Eldon, Errich, Finnan, Garret, Lindal, Lyle, Merric, Milo, Osborn, Perrin, Reed, Roscoe, Wellby\n\n**Female Names:** Andry, Bree, Callie, Cora, Euphemia, Jillian, Kithri, Lavinia, Lidda, Merla, Nedda, Paela, Portia, Seraphina, Shaena, Trym, Vani, Verna'], 
            ['Human', 'idk'], 
            ['Dragonborn', '**Male Names:** Arjhan, Balasar, Bharash, Donaar, Ghesh, Heskan, Kriv, Medrash, Mehen, Nadarr, Pandjed, Patrin, Rhogar, Shamash, Shedinn, Tarhun, Torinn\n\n**Female Names:** Akra, Biri, Daar, Farideh, Harann, Havilar, Jheri, Kava, Korinn, Mishann, Nala, Perra, Raiann, Sora, Surina, Thava, Uadjit'],
            ['Rock Gnome', '**Male Names:** Alston, Alvyn, Boddynock, Brocc, Burgell, Dimble, Eldon, Erky, Fonkin, Frug, Gerbo, Gimble, Glim, Jebeddo, Kellen, Namfoodle, Orryn, Roondar, Seebo, Sindri, Warryn, Wrenn, Zook\n\n**Female Names:** Bimpnottin, Breena, Caramip, Carlin, Donella, Duvamil, Ella, Ellyjobell, Ellywick, Lilli, Loopmottin, Lorilla, Mardnab, Nissa, Nyx, Oda, Orla, Roywyn, Shamil, Tana, Waywocket, Zanna'], 
            ['Half-Elf', '**Male Names:** Adran, Aelar, Aramil, Arannis, Aust, Beiro, Berrian, Carric, Enialis, Erdan, Erevan, Galinndan, Hadarai, Heian, Himo, Immeral, Ivellios, Laucian, Mindartis, Paelias, Peren, Quarion, Riardon, Rolen, Soveliss, Thamior, Tharivol, Theren, Varis\n\n**Female Names:** Adrie, Althaea, Anastrianna, Andraste, Antinua, Bethrynna, Birel, Caelynn, Drusilia, Enna, Felosial, Ielenia, Jelenneth, Keyleth, Leshanna, Lia, Meriele, Mialee, Naivara, Quelenna, Quillathe, Sariel, Shanairra, Shava, Silaqui, Theirastra, Thia, Vadania, Valanthe, Xanaphia'], 
            ['Half-Orc', '**Male Names:** Dench, Feng, Gell, Henk, Holg, Imsh, Keth, Krusk, Mhurren, Ront, Shump, Thokk\n\n**Female Names:** Baggi, Emen, Engong, Kansif, Myev, Neega, Ovak, Ownka, Shautha, Sutha, Vola, Volen, Yevelda'], 
            ['Tiefling', '**Male Names:** Akmenos, Amnon, Barakas, Damakos, Ekemon, Iados, Kairon, Leucis, Melech, Mordai, Morthos, Pelaios, Skamos, Therai\n\n**Female Names:** Akta, Anakis, Bryseis, Criella, Damaia, Ea, Kallista, Lerissa, Makaria, Nemeia, Orianna, Phelaia, Rieta'] 
          ]),
      
          raceHEIGHT: new Map([
            ['Dwarf', 'between 4 and 5 feet tall'],
            ['Elf', 'range from under 5 to over 6 feet tall'],
            ['Halfling', 'average about 3 feet tall'], 
            ['Human', 'from barely 5 feet to well over 6 feet tall'], 
            ['Dragonborn', 'over 6 feet tall'],
            ['Rock Gnome', 'between 3 and 4 feet tall'], 
            ['Half-Elf', 'from 5 to 6 feet tall'], 
            ['Half-Orc', 'from 5 to well over 6 feet tall'], 
            ['Tiefling', 'from barely 5 feet to well over 6 feet tall'] 
          ]),
      
          raceWEIGHT: new Map([
            ['Dwarf', 'average about 150 pounds'],
            ['Elf', 'N/A'],
            ['Halfling', 'about 40 pounds'], 
            ['Human', 'N/A'], 
            ['Dragonborn', 'averaging almost 250 pounds'],
            ['Rock Gnome', 'average about 40 pounds'], 
            ['Half-Elf', 'N/A'], 
            ['Half-Orc', 'N/A'], 
            ['Tiefling', 'N/A'] 
          ]),
      
          raceSIZE: new Map([
            ['Dwarf', 'Medium'],
            ['Elf', 'Medium'],
            ['Halfling', 'Small'], 
            ['Human', 'Medium'], 
            ['Dragonborn', 'Medium.'],
            ['Rock Gnome', 'Small'], 
            ['Half-Elf', 'Medium'], 
            ['Half-Orc', 'Medium'], 
            ['Tiefling', 'Medium'] 
          ]),
      
          raceLang: new Map([
            ['Dwarf', ['Common', 'Dwarvish']],
            ['Elf', ['Common', 'Elvish']],
            ['Halfling', ['Common', 'Halfling']], 
            ['Human', ['Common']], 
            ['Dragonborn', ['Common', 'Draconic']],
            ['Rock Gnome', ['Common', 'Gnomish']], 
            ['Half-Elf', ['Common', 'Elvish']], 
            ['Half-Orc', ['Common', 'Orc']], 
            ['Tiefling', ['Common', 'Infernal']] 
          ]),
      
          subraces: new Map([
            ['Dwarf', ['Hill Dwarf', 'Mountain Dwarf']],
            ['Elf', ['High Elf', 'Wood Elf']],
            ['Halfling', ['Lightfoot Halfling', 'Stout Halfling']], 
            ['Dragonborn', ['Black Dragonborn', 'Blue Dragonborn', 'Bronze Dragonborn', 'Copper Dragonborn', 'Gold Dragonborn', 'Green Dragonborn', 'Red Dragonborn', 'Silver Dragonborn', 'White Dragonborn']]
          ]),
      
          classes: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
      
          alignment: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'],
      
          background: ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier'],
      
          acolyte : new Map([
            ['personality', ['I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.',
                'I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.',
                'I see omens in every event and action. The gods try to speak to us, we just need to listen.',
                'Nothing can shake my optimistic attitude.',
                'I quote (or misquote) sacred texts and proverbs in almost every situation.',
                'I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.',
                'I’ve enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me.', 
                'I’ve spent so long in the temple that I have little practical experience dealing with people in the outside world.'
            ]],
            ['ideal', ['**Tradition.** The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)',
                '**Charity.** I always try to help those in need, no matter what the personal cost. (Good)',
                '**Change.** We must help bring about the changes the gods are constantly working in the world. (Chaotic)',
                '**Power.** I hope to one day rise to the top of my faith’s religious hierarchy. (Lawful)',
                '**Faith.** I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)',
                '**Aspiration.** I seek to prove myself worthy of my god’s favor by matching my actions against his or her teachings. (Any)'
            ]],
            ['bond', ['I would die to recover an ancient relic of my faith that was lost long ago.',
                'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
                'I owe my life to the priest who took me in when my parents died.',
                'Everything I do is for the common people.',
                'I will do anything to protect the temple where I served.',
                'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.'
            ]],
            ['flaw', ['I judge others harshly, and myself even more severely.',
                'I put too much trust in those who wield power within my temple’s hierarchy.',
                'My piety sometimes leads me to blindly trust those that profess faith in my god.',
                'I am inflexible in my thinking.',
                'I am suspicious of strangers and expect the worst of them.',
                'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
            ]]
          ]),
      
          criminal : new Map([
            ['personality', ['I always have a plan for what to do when things go wrong.',
                'I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.',
                'The first thing I do in a new place is note the locations of everything valuable — or where such things could be hidden.',
                'I would rather make a new friend than a new enemy.',
                'I am incredibly slow to trust. Those who seem the fairest often have the most to hide.',
                'I don’t pay attention to the risks in a situation. Never tell me the odds.',
                'The best way to get me to do something is to tell me I can’t do it.', 
                'I blow up at the slightest insult.'
            ]],
            ['ideal', ['**Honor.** I don’t steal from others in the trade. (Lawful)',
                '**Freedom.** Chains are meant to be broken, as are those who would forge them. (Chaotic)',
                '**Charity.** I steal from the wealthy so that I can help people in need. (Good)',
                '**Greed.** I will do whatever it takes to become wealthy. (Evil)',
                '**People.** I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral',
                '**Redemption.** There’s a spark of good in everyone. (Good)'
            ]],
            ['bond', ['I’m trying to pay off an old debt I owe to a generous benefactor.',
                'My ill-gotten gains go to support my family.',
                'Something important was taken from me, and I aim to steal it back.',
                'I will become the greatest thief that ever lived.',
                'I’m guilty of a terrible crime. I hope I can redeem myself for it.',
                'Someone I loved died because of I mistake I made. That will never happen again.'
            ]],
            ['flaw', ['When I see something valuable, I can’t think about anything but how to steal it.',
                'When faced with a choice between money and my friends, I usually choose the money.',
                'If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it.',
                'I have a “tell” that reveals when I’m lying.',
                'I turn tail and run when things look bad.',
                '	An innocent person is in prison for a crime that I committed. I’m okay with that.'
            ]]
          ]),
      
          folkhero : new Map([
            ['personality', ['I judge people by their actions, not their words.',
                'If someone is in trouble, I’m always ready to lend help.',
                'When I set my mind to something, I follow through no matter what gets in my way.',
                'I have a strong sense of fair play and always try to find the most equitable solution to arguments.',
                'I’m confident in my own abilities and do what I can to instill confidence in others.',
                'Thinking is for other people. I prefer action.',
                'I misuse long words in an attempt to sound smarter.', 
                'I get bored easily. When am I going to get on with my destiny?'
            ]],
            ['ideal', ['**Respect.** People deserve to be treated with dignity and respect. (Good)',
                '**Fairness.** No one should get preferential treatment before the law, and no one is above the law. (Lawful)',
                '**Freedom.** Tyrants must not be allowed to oppress the people. (Chaotic)',
                '**Might.** If I become strong, I can take what I want — what I deserve. (Evil)',
                '**Sincerity.** There’s no good in pretending to be something I’m not. (Neutral)',
                '**Destiny.** Nothing and no one can steer me away from my higher calling. (Any)'
            ]],
            ['bond', ['I have a family, but I have no idea where they are. One day, I hope to see them again.',
                'I worked the land, I love the land, and I will protect the land.',
                'A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.',
                'My tools are symbols of my past life, and I carry them so that I will never forget my roots.',
                'I protect those who cannot protect themselves.',
                'I wish my childhood sweetheart had come with me to pursue my destiny.'
            ]],
            ['flaw', ['The tyrant who rules my land will stop at nothing to see me killed.',
                'I’m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.',
                'The people who knew me when I was young know my shameful secret, so I can never go home again.',
                'I have a weakness for the vices of the city, especially hard drink.',
                'Secretly, I believe that things would be better if I were a tyrant lording over the land.',
                'I have trouble trusting in my allies.'
            ]]
          ]),
      
          noble: new Map([
            ['personality', [
                'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
                'The common folk love me for my kindness and generosity.',
                'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.',
                'I take great pains to always look my best and follow the latest fashions.',
                'I don’t like to get my hands dirty, and I won’t be caught dead in unsuitable accommodations.',
                'Despite my noble birth, I do not place myself above other folk. We all have the same blood.',
                'My favor, once lost, is lost forever.',
                'If you do me an injury, I will crush you, ruin your name, and salt your fields.'
            ]],
            ['ideal', [
                '**Respect.** Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)',
                '**Responsibility.** It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)',
                '**Independence.** I must prove that I can handle myself without the coddling of my family. (Chaotic)',
                '**Power.** If I can attain more power, no one will tell me what to do. (Evil)',
                '**Family.** Blood runs thicker than water. (Any)',
                '**Noble Obligation.** It is my duty to protect and care for the people beneath me. (Good)'
            ]],
            ['bond', [
                'I will face any challenge to win the approval of my family.',
                'My house’s alliance with another noble family must be sustained at all costs.',
                'Nothing is more important than the other members of my family.',
                'I am in love with the heir of a family that my family despises.',
                'My loyalty to my sovereign is unwavering.',
                'The common folk must see me as a hero of the people.'
            ]],
            ['flaw', [
                'I secretly believe that everyone is beneath me.',
                'I hide a truly scandalous secret that could ruin my family forever.',
                'I too often hear veiled insults and threats in every word addressed to me, and I’m quick to anger.',
                'I have an insatiable desire for carnal pleasures.',
                'In fact, the world does revolve around me.',
                'By my words and actions, I often bring shame to my family.'
            ]]
          ]),
      
          sage: new Map([
            ['personality', [
                'I use polysyllabic words that convey the impression of great erudition.',
                'I’ve read every book in the world’s greatest libraries — or I like to boast that I have.',
                'I’m used to helping out those who aren’t as smart as I am, and I patiently explain anything and everything to others.',
                'There’s nothing I like more than a good mystery.',
                'I’m willing to listen to every side of an argument before I make my own judgment.',
                'I . . . speak . . . slowly . . . when talking . . . to idiots, . . . which . . . almost . . . everyone . . . is . . . compared . . . to me.',
                'I am horribly, horribly awkward in social situations.',
                'I’m convinced that people are always trying to steal my secrets.'
            ]],
            ['ideal', [
                '**Knowledge.** The path to power and self-improvement is through knowledge. (Neutral)',
                '**Beauty.** What is beautiful points us beyond itself toward what is true. (Good)',
                '**Logic.** Emotions must not cloud our logical thinking. (Lawful)',
                '**No Limits.** Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)',
                '**Power.** Knowledge is the path to power and domination. (Evil)',
                '**Self-Improvement.** The goal of a life of study is the betterment of oneself. (Any)'
            ]],
            ['bond', [
                'It is my duty to protect my students.',
                'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
                'I work to preserve a library, university, scriptorium, or monastery.',
                'My life’s work is a series of tomes related to a specific field of lore.',
                'I’ve been searching my whole life for the answer to a certain question.',
                'I sold my soul for knowledge. I hope to do great deeds and win it back.'
            ]],
            ['flaw', [
                'I am easily distracted by the promise of information.',
                'Most people scream and run when they see a demon. I stop and take notes on its anatomy.',
                'Unlocking an ancient mystery is worth the price of a civilization.',
                'I overlook obvious solutions in favor of complicated ones.',
                'I speak without really thinking through my words, invariably insulting others.',
                'I can’t keep a secret to save my life, or anyone else’s.'
            ]]
          ]),
      
          soldier: new Map([
            ['personality', [
                'I’m always polite and respectful.',
                'I’m haunted by memories of war. I can’t get the images of violence out of my mind.',
                'I’ve lost too many friends, and I’m slow to make new ones.',
                'I’m full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.',
                'I can stare down a hell hound without flinching.',
                'I enjoy being strong and like breaking things.',
                'I have a crude sense of humor.',
                'I face problems head-on. A simple, direct solution is the best path to success.'
            ]],
            ['ideal', [
                '**Greater Good.** Our lot is to lay down our lives in defense of others. (Good)',
                '**Responsibility.** I do what I must and obey just authority. (Lawful)',
                '**Independence.** When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)',
                '**Might.** In life as in war, the stronger force wins. (Evil)',
                '**Live and Let Live.** Ideals aren’t worth killing over or going to war for. (Neutral)',
                '**Nation.** My city, nation, or people are all that matter. (Any)'
            ]],
            ['bond', [
                'I would still lay down my life for the people I served with.',
                'Someone saved my life on the battlefield. To this day, I will never leave a friend behind.',
                'My honor is my life.',
                'I’ll never forget the crushing defeat my company suffered or the enemies who dealt it.',
                'Those who fight beside me are those worth dying for.',
                'I fight for those who cannot fight for themselves.'
            ]],
            ['flaw', [
                'The monstrous enemy we faced in battle still leaves me quivering with fear.',
                'I have little respect for anyone who is not a proven warrior.',
                'I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.',
                'My hatred of my enemies is blind and unreasoning.',
                'I obey the law, even if the law causes misery.',
                'I’d rather eat my armor than admit when I’m wrong.'
            ]]
          ]),
      
        },
      
        builder.skills= ['Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'],
        
        builder.lang= ["Common", "Dwarvish", "Elvish", "Giant", 'Gnomish', "Goblin", "Halfling", "Orc", "Abyssal", "Celestia", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan", "Undercommon"],
      
        builder.equipment= {
          tools: {
            'Artisans Tools': [
              {name: "Alchemist's supplies", value: 50, weight: 8},
              {name: "Brewer's supplies", value: 20, weight: 9},
              {name: "Calligrapher's supplies", value: 10, weight: 5},
              {name: "Carpenter's tools", value: 8, weight: 6},
              {name: "Cartographer's tools", value: 15, weight: 6},
              {name: "Cobbler's tools", value: 5, weight: 5},
              {name: "Cook's utensils", value: 1, weight: 8},
              {name: "Glassblower's tools", value: 30, weight: 5},
              {name: "Jeweler's tools", value: 25, weight: 2},
              {name: "Leatherworker's tools", value: 5, weight: 5},
              {name: "Mason's tools", value: 10, weight: 8},
              {name: "Painter's supplies", value: 10, weight: 5},
              {name: "Potter's tools", value: 10, weight: 3},
              {name: "Smith's tools", value: 20, weight: 8},
              {name: "Tinker's tools", value: 50, weight: 10},
              {name: "Weaver's tools", value: 1, weight: 5},
              {name: "Woodcarver's tools", value: 1, weight: 5}
            ],
            'Gaming Set': [
              {name: 'Dice set', value: 0.1, weight: 0}, 
              {name: 'Dragonchess set', value: 1, weight: 0.5}, 
              {name: 'Playing card set', value: 0.1, weight: 0}
            ],
            'Musical Instrument': [
              {name: 'Bagpipes', value: 30, weight:6}, 
              {name: 'Drum', value: 6, weight:3}, 
              {name: 'Dulcimer', value: 25, weight:10}, 
              {name: 'Flute', value: 2, weight: 1}, 
              {name: 'Lute', value: 35, weight: 2}, 
              {name: 'Lyre', value: 30, weight: 2}, 
              {name: 'Horn', value: 3, weight: 2}, 
              {name: 'Pan flute', value: 12, weight: 2}, 
              {name: 'Shawm', value: 2, weight: 1}, 
              {name: 'Viol', value: 30, weight: 1}
            ],
            'Other Tools': [
              {name: "Disguise kit", value: 25, weight: 3},
              {name: "Forgery kit", value: 15, weight: 5},
              {name: "Herbalism kit", value: 5, weight: 3},
              {name: "Navigator's tools", value: 25, weight: 2},
              {name: "Poisoner's kit", value: 50, weight: 2},
              {name: "Thieves' tools", value: 25, weight: 1}
            ]
          },
          armor: {
            'Light Armor': [
              {name: "Padded", value: 5, AC: 11, strength: null, stealth: 'dadv', weight: 8},
              {name: "Leather", value: 10, AC: 11, strength: null, stealth: null, weight: 10},
              {name: "Studded Leather", value: 45, AC: 12, strength: null, stealth: null, weight: 13},
              {don: 1, doff: 1}
            ],
            'Medium Armor': [
              {name: "Hide", value: 10, AC: 12, strength: null, stealth: null, weight: 12},
              {name: "Chain shirt", value: 50, AC: 13, strength: null, stealth: null, weight: 20},
              {name: "Scale mail", value: 50, AC: 14, strength: null, stealth: 'dadv', weight: 45},
              {name: "Breastplate", value: 400, AC: 14, strength: null, stealth: null, weight: 20},
              {name: "Half plate", value: 750, AC: 15, strength: null, stealth: 'dadv', weight: 40},
              {don: 5, doff: 1}
            ],
            'Heavy Armor': [
              {name: "Ring mail", value: 30, AC: 14, strength: null, stealth: 'dadv', weight: 40},
              {name: "Chain mail", value: 75, AC: 16, strength: 13, stealth: 'dadv', weight: 55},
              {name: "Splint", value: 200, AC: 17, strength: 15, stealth: 'dadv', weight: 60},
              {name: "Plate", value: 1500, AC: 18, strength: 15, stealth: 'dadv', weight: 65},
              {don: 10, doff: 5}
            ],
            'Shield': [
              {name: "Shield", value: 10, AC: +2, strength: null, stealth: null, weight: 6},
            ],
          },
          weapons: {
            'Simple Melee Weapons': [
              {name: "Club", value: 0.1, damage: '1d4 bludgeoning', weight: 2, prop: 'light'},
              {name: "Dagger", value: 2, damage: '1d4 piercing', weight: 1, prop: 'finesse, light, thrown(range 20/60)'},
              {name: "Greatclub", value: 0.2, damage: '1d8 bludgeoning', weight: 10, prop: 'two-handed'},
              {name: "Handaxe", value: 5, damage: '1d6 slashing', weight: 2, prop: 'light, thrown(range 20/60)'},
              {name: "Javelin", value: 0.5, damage: '1d6 piercing', weight: 2, prop: 'thrown(range 30/120)'},
              {name: "Light hammer", value: 2, damage: '1d4 bludgeoning', weight: 2, prop: 'light, thrown(range 20/60)'},
              {name: "Mace", value: 5, damage: '1d6 bludgeoning', weight: 4, prop: ''},
              {name: "Quarterstaff", value: 0.2, damage: '1d6 bludgeoning', weight: 4, prop: 'versatile(1d8)'},
              {name: "Sickle", value: 1, damage: '1d4 slashing', weight: 2, prop: 'light'},
              {name: "Spear", value: 1, damage: '1d6 piercing', weight: 3, prop: 'thrown(range 20/60), versatile(1d8)'},
            ],
            'Simple Ranged Weapons': [
              {name: "Crossbow, light", value: 25, damage: '1d8 piercing', weight: 5, prop: 'ammunition(range 80/320), loading, two-handed'},
              {name: "Dart", value: 0.05, damage: '1d4 piercing', weight: 0.25, prop: 'finesse, thrown(range 20/60)'},
              {name: "Shortbow", value: 25, damage: '1d6 piercing', weight: 2, prop: 'ammunition(range 80/320), two-handed'},
              {name: "Sling", value: 0.1, damage: '1d4 bludgeoning', weight: 0, prop: 'ammunition(range 30/120)'},
            ],
            'Martial Melee Weapons': [
              {name: "Battleaxe", value: 10, damage: '1d8 slashing', weight: 4, prop: 'versatile(1d10)'},
              {name: "Flail", value: 10, damage: '1d8 bludgeoning', weight: 2, prop: ''},
              {name: "Glaive", value: 20, damage: '1d10 slashing', weight: 6, prop: 'heavy, reach, two-handed'},
              {name: "Greataxe", value: 30, damage: '1d12 slashing', weight: 7, prop: 'heavy, two-handed'},
              {name: "Greatsword", value: 50, damage: '2d6 slashing', weight: 6, prop: 'heavy, two-handed'},
              {name: "Halberd", value: 20, damage: '1d10 slashing', weight: 6, prop: 'heavy, reach, two-handed'},
              {name: "Lance", value: 10, damage: '1d12 piercing', weight: 6, prop: 'reach, special'},
              {name: "Longsword", value: 15, damage: '1d8 slashing', weight: 3, prop: 'versatile(1d10)'},
              {name: "Maul", value: 10, damage: '2d6 bludgeoning', weight: 10, prop: 'heavy, two-handed'},
              {name: "Morningstar", value: 15, damage: '1d8 piercing', weight: 4, prop: ''},
              {name: "Pike", value: 5, damage: '1d10 piercing', weight: 18, prop: 'heavy, reach, two-handed'},
              {name: "Rapier", value: 25, damage: '1d8 piercing', weight: 2, prop: 'finesse'},
              {name: "Scimitar", value: 25, damage: '1d6 slashing', weight: 3, prop: 'finesse, light'},
              {name: "Shortsword", value: 10, damage: '1d6 piercing', weight: 2, prop: 'finesse, light'},
              {name: "Trident", value: 5, damage: '1d6 piercing', weight: 4, prop: 'thrown(range 20/60), versatile(1d8)'},
              {name: "War pick", value: 5, damage: '1d8 piercing', weight: 2, prop: ''},
              {name: "Warhammer", value: 15, damage: '1d8 bludgeoning', weight: 2, prop: 'versatile(1d10)'},
              {name: "Whip", value: 2, damage: '1d4 slashing', weight: 3, prop: 'finesse, reach'},
            ],
            'Martial Ranged Weapons': [
              {name: "Blowgun", value: 10, damage: '1 piercing', weight: 1, prop: 'ammunition(range 25/100), loading'},
              {name: "Crossbow, hand", value: 75, damage: '1d6 piercing', weight: 3, prop: 'ammunition(range 30/120), light, loading'},
              {name: "Crossbow, heavy", value: 50, damage: '1d10 piercing', weight: 18, prop: 'ammunition(range 100/400), heavy, loading, two-handed'},
              {name: "Longbow", value: 50, damage: '1d8 piercing', weight: 2, prop: 'ammunition(range 150/600), heavy, two-handed'},
              {name: "Net", value: 1, damage: '-', weight: 3, prop: 'special, thrown(range 5/15)'},
            ],
          }, 
          gear: {
            Ammunition: [
              { name: "Arrows", amount: 20, value: 1, weight: 1 },
              { name: "Blowgun needles", amount: 50, value: 1, weight: 1 },
              { name: "Crossbow bolts", amount: 20, value: 1, weight: 1.5 },
              { name: "Sling bullets", amount: 20, value: 0.04, weight: 1.5 },
            ],
            Arcane: [
              { name: "Crystal", value: 10, weight: 1 },
              { name: "Orb", value: 20, weight: 3 },
              { name: "Rod", value: 10, weight: 2 },
              { name: "Staff", value: 5, weight: 4 },
              { name: "Wand", value: 10, weight: 1 },
            ],
            Druidic: [
              { name: "Sprig of mistletoe", value: 1, weight: 0 },
              { name: "Totem", value: 1, weight: 0 },
              { name: "Wooden staff", value: 5, weight: 4 },
              { name: "Yew wand", value: 10, weight: 1 },
            ],
            HolySymbol: [
              { name: "Amulet", value: 5, weight: 1 },
              { name: "Emblem", value: 5, weight: 0 },
              { name: "Reliquary", value: 5, weight: 2 },
            ],
            Other: [
              { name: "Abacus", value: 2, weight: 2 },
              { name: "Acid (vial)", value: 25, weight: 1 },
              { name: "Alchemist's fire (flask)", value: 50, weight: 1 },
              { name: "Antitoxin (vial)", value: 50, weight: 0 },
              { name: "Backpack", value: 2, weight: 5, capacity: '1 cubic foot/30 pounds of gear' },
              { name: "Ball bearings (bag of 1,000)", value: 1, weight: 2 },
              { name: "Barrel", value: 2, weight: 70, capacity: '40 gallons liquid, 4 cubic feet solid' },
              { name: "Basket", value: 0.4, weight: 2, capacity: '2 cubic feet/40 pounds of gear' },
              { name: "Bedroll", value: 1, weight: 7 },
              { name: "Bell", value: 1, weight: 0 },
              { name: "Blanket", value: 0.5, weight: 3 },
              { name: "Block and tackle", value: 1, weight: 5 },
              { name: "Book", value: 25, weight: 5 },
              { name: "Bottle, glass", value: 2, weight: 2, capacity: '1.5 pints liquid' },
              { name: "Bucket", value: 0.05, weight: 2, capacity: '3 gallons liquid, 1/2 cubic foot solid' },
              { name: "Caltrops (bag of 20)", value: 1, weight: 2 },
              { name: "Candle", value: 0.01, weight: 0 },
              { name: "Case, crossbow bolt", value: 1, weight: 1 },
              { name: "Case, map or scroll", value: 1, weight: 1 },
              { name: "Chain (10 feet)", value: 5, weight: 10 },
              { name: "Chalk (1 piece)", value: 0.01, weight: 0 },
              { name: "Chest", value: 5, weight: 25, capacity: '12 cubic feet/300 pounds of gear' },
              { name: "Climber's kit", value: 25, weight: 12 },
              { name: "Clothes, common", value: 0.5, weight: 3 },
              { name: "Clothes, costume", value: 5, weight: 4 },
              { name: "Clothes, fine", value: 15, weight: 6 },
              { name: "Clothes, traveler's", value: 2, weight: 4 },
              { name: "Component pouch", value: 25, weight: 2 },
              { name: "Crowbar", value: 2, weight: 5 },
              { name: "Fishing tackle", value: 1, weight: 4 },
              { name: "Flask or tankard", value: 0.02, weight: 1, capacity: '1 pint liquid' },
              { name: "Grappling hook", value: 2, weight: 4 },
              { name: "Hammer", value: 1, weight: 3 },
              { name: "Hammer, sledge", value: 2, weight: 10 },
              { name: "Healer's kit", value: 5, weight: 3 },
              { name: "Holy water (flask)", value: 25, weight: 1 },
              { name: "Hourglass", value: 25, weight: 1 },
              { name: "Hunting trap", value: 5, weight: 25 },
              { name: "Ink (1 oz bottle)", value: 10, weight: 0 },
              { name: "Ink pen", value: 0.02, weight: 0 },
              { name: "Jug or pitcher", value: 0.02, weight: 4, capacity: '1 gallon liquid' },
              { name: "Ladder (10-foot)", value: 0.1, weight: 25 },
              { name: "Lamp", value: 0.5, weight: 1 },
              { name: "Lantern, bullseye", value: 10, weight: 2 },
              { name: "Lantern, hooded", value: 5, weight: 2 },
              { name: "Lock", value: 10, weight: 1 },
              { name: "Magnifying glass", value: 100, weight: 0 },
              { name: "Manacles", value: 2, weight: 6 },
              { name: "Mess kit", value: 0.2, weight: 1 },
              { name: "Mirror, steel", value: 5, weight: 0.5 },
              { name: "Oil (flask)", value: 0.1, weight: 1 },
              { name: "Paper (one sheet)", value: 0.2, weight: 0 },
              { name: "Parchment (one sheet)", value: 0.1, weight: 0 },
              { name: "Perfume (vial)", value: 5, weight: 0 },
              { name: "Pick, miner's", value: 2, weight: 10 },
              { name: "Piton", value: 0.05, weight: 0.25 },
              { name: "Poison, basic (vial)", value: 100, weight: 0 },
              { name: "Pole (10-foot)", value: 0.05, weight: 7 },
              { name: "Pot, iron", value: 2, weight: 10, capacity: '1 gallon liquid' },
              { name: "Potion of healing", value: 50, weight: 0.5 },
              { name: "Pouch", value: 0.5, weight: 1, capacity: '1/5 cubic foot/6 pounds of gear' },
              { name: "Quiver", value: 1, weight: 1 },
              { name: "Ram, portable", value: 4, weight: 35 },
              { name: "Rations (1 day)", value: 0.5, weight: 2 },
              { name: "Robes", value: 1, weight: 4 },
              { name: "Rope, hempen (50 feet)", value: 1, weight: 10 },
              { name: "Rope, silk (50 feet)", value: 10, weight: 5 },
              { name: "Sack", value: 0.01, weight: 0.5, capacity: '1 cubic foot/30 pounds of gear' },
              { name: "Scale, merchant's", value: 5, weight: 3 },
              { name: "Sealing wax", value: 0.5, weight: 0 },
              { name: "Shovel", value: 2, weight: 5 },
              { name: "Signal whistle", value: 0.05, weight: 0 },
              { name: "Signet ring", value: 5, weight: 0 },
              { name: "Soap", value: 0.02, weight: 0 },
              { name: "Spellbook", value: 50, weight: 3 },
              { name: "Spikes, iron (10)", value: 1, weight: 5 },
              { name: "Spyglass", value: 1000, weight: 1 },
              { name: "Tent, two-person", value: 2, weight: 20 },
              { name: "Tinderbox", value: 0.5, weight: 1 },
              { name: "Torch", value: 0.01, weight: 1 },
              { name: "Vial", value: 1, weight: 0, capacity: '4 ounces liquid' },
              { name: "Waterskin", value: 0.2, weight: 5, capacity: '4 pints liquid (full)' },
              { name: "Whetstone", value: 0.01, weight: 1 },
            ],
          }
        },
      
        builder.state = {
            userSteps: new Map(),
            currentStep: 0,
            channel: null,
            id: null,
            embedMessage: null,
            subEmbedMessage: null,
            content: null,
            msg: null
            
        }

  }

};

export default builder;