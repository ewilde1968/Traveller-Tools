/*
 * Service model
*/

const initialCoreServices = [
    {
        name:           'Agent',
        description:    'Law enforcement agencies, corporate operatives, spies, and others who work in the shadoes.',
        assignment:     [{
            name:           'Law Enforcement',
            description:    'You are a police officer or detective.',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6},
            title:          [
                                {name:'Rookie'},
                                {name:'Corporal',bonus:{name:'Streetwise',rank:1}},
                                {name:'Sergeant'},
                                {name:'Detective'},
                                {name:'Lieutenant',bonus:{name:'Investigate',rank:1}},
                                {name:'Chief',bonus:{name:'Admin',rank:1}},
                                {name:'Commissioner',bonus:{name:'Social Status'}}
                            ],
            skills:         ['Investigate','Recon','Streetwise','Stealth','Melee','Advocate']
        },{
            name:           'Intelligence',
            description:    'You work as a spy or saboteur.',
            survival:       {stat:'Intelligence', difficulty: 7},
            advancement:    {stat:'Intelligence', difficulty: 5},
            title:          [
                                {name:'Rookie'},
                                {name:'Agent',bonus:{name:'Deception',rank:1}},
                                {name:'Field Agent',bonus:{name:'Investigate',rank:1}},
                                {name:'Field Agent'},
                                {name:'Special Agent',bonus:{name:'Gun Combat',rank:1}},
                                {name:'Assistant Director'},
                                {name:'Director'}
                            ],
            skills:         ['Investigate','Recon','Electonics (Comm)','Stealth','Persuade','Deception']
        },{
            name:           'Corporate',
            description:    'You work for a corporation, spying on rival organizations.',
            survival:       {stat:'Intelligence', difficulty: 5},
            advancement:    {stat:'Intelligence', difficulty: 7},
            title:          [
                                {name:'Rookie'},
                                {name:'Agent',bonus:{name:'Deception',rank:1}},
                                {name:'Field Agent',bonus:{name:'Investigate',rank:1}},
                                {name:'Field Agent'},
                                {name:'Special Agent',bonus:{name:'Gun Combat',rank:1}},
                                {name:'Assistant Director'},
                                {name:'Director'}
                            ],
            skills:         ['Investigate','Electronics (Computers)','Stealth','Carouse','Deception','Streetwise']
        }],
        qualification:  {stat:'Intelligence', difficulty: 6},
        personal:       ['Gun Combat','Dexterity','Endurance','Melee','Intelligence','Athletics'],
        service:        ['Streetwise', 'Drive', 'Investigate', 'Flyer', 'Recon', 'Gun Combat'],
        education:      {min:8,list:['Advocate','Language','Explosives','Medic','Vacc Suit','Electronics']}
    },
    {
        name:           'Army',
        description:    'Members of the planetary armed fighting forces. Soldiers deal with planetary surface actions, battles, and campaigns. Such individuals may also be mercenaries for hire.',
        assignment:     [{
            name:           'Support',
            description:    'You are an engineer, cook, or perform some other role behind the front lines.',
            survival:       {stat:'Endurance', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 7},
            skills:         ['Mechanic','Drive/Fly','Profession','Explosives','Electronics (Comm)','Medic']            
        },{
            name:           'Infantry',
            description:    'You are one of the Poor Bloody Infantry on the ground.',
            survival:       {stat:'Strength', difficulty: 6},
            advancement:    {stat:'Education', difficulty: 6},
            skills:         ['Gun Combat','Melee','Heavy Weapons','Stealth','Athletics','Recon']
        },{
            name:           'Cavalry',
            description:    'You are one of the crew of a gunship or tank.',
            survival:       {stat:'Dexterity', difficulty: 7},
            advancement:    {stat:'Intelligence', difficulty: 5},
            skills:         ['Mechanic','Drive/Fly','Drive/Fly','Recon','Heavy Weapons (Vehicle)','Electronics (Sensors)']
        }],
        title:          {
            enlisted:       [
                {name:'Private',bonus:{name:'Gun Combat',rank:1}},
                {name:'Lance Corporal',bonus:{name:'Recon',rank:1}},
                {name:'Corporal'},
                {name:'Lance Sergeant',bonus:{name:'Leadership',rank:1}},
                {name:'Sergeant'},
                {name:'Gunnery Sergeant'},
                {name:'Sergeant Major'}
            ],
            officer:        [
                {name:'Lieutenant',bonus:{name:'Leadership',rank:1}},
                {name:'Captain'},
                {name:'Major',bonus:{name:'Tactics (Military)',rank:1}},
                {name:'Lieutenant Colonel'},
                {name:'Colonel'},
                {name:'General',bonus:{name:'Social Status',value:10}}
            ]
        },
        commission:     {stat:'Social Status', difficulty: 8},
        qualification:  {stat:'Endurance', difficulty: 5, age:{limit:30,mod:-2}},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Medic','Melee'],
        service:        ['Drive/Fly','Athletics','Gun Combat','Recon','Melee','Heavy Weapons'],
        education:      {min:8,list:['Tactics (Military)','Electronics','Navigation','Explosives','Engineer','Survival']},
        officer:        ['Tactics (Military)','Leadership','Advocate','Diplomat','Electronics','Admin']
    },
    {
        name:           'Citizen',
        description:    'Individuals serving in a corporation, bureaucracy, or industry; or, who are making a new life on an untamed planet.',
        assignment:     [{
            name:           'Corporate',
            description:    'You are an executive or manager in a large corporation.',
            survival:       {stat:'Social Status', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6},
            skills:         ['Advocate','Admin','Broker','Electronics (Computers)','Diplomat','Leadership'],
            title:      [
                {name:'Employee'},
                {name:'Employee'},
                {name:'Manager',bonus:{name:'Admin',rank:1}},
                {name:'Manager'},
                {name:'Senior Manager',bonus:{name:'Advocate',rank:1}},
                {name:'Senior Manager'},
                {name:'Director',bonus:{name:'Social Status'}}
            ]
        },{
            name:           'Worker',
            description:    'You are a blue collar worker on an industrial or higher world.',
            survival:       {stat:'Endurance', difficulty: 4},
            advancement:    {stat:'Education', difficulty: 8},
            skills:         ['Drive/Fly','Mechanic','Electronics','Engineer','Profession','Science'],
            title:      [
                {name:'Employee'},
                {name:'Employee'},
                {name:'Technician',bonus:{name:'Profession',rank:1}},
                {name:'Technician'},
                {name:'Craftsman',bonus:{name:'Mechanic',rank:1}},
                {name:'Craftsman'},
                {name:'Master Technician',bonus:{name:'Engineer',rank:1}}
            ]
        },{
            name:           'Colonist',
            description:    'You are building a new life on a recently settled world that still needs taming.',
            survival:       {stat:'Intelligence', difficulty: 7},
            advancement:    {stat:'Endurance', difficulty: 5},
            skills:         ['Animals','Athletics','Jack-of-all-Trades','Drive/Fly','Survival','Recon'],
            title:      [
                {name:'Colonist'},
                {name:'Colonist'},
                {name:'Settler',bonus:{name:'Survival',rank:1}},
                {name:'Settler'},
                {name:'Explorer',bonus:{name:'Navigation',rank:1}},
                {name:'Explorer'},
                {name:'Master Technician',bonus:{name:'Gun Combat',rank:1}}
            ]

        }],
        qualification:  {stat:'Education', difficulty: 5},
        personal:       ['Education','Intelligence','Carouse','Gambler','Drive/Fly','Jack-of-all-Trades'],
        service:        ['Drive/Fly','Drive/Fly','Streetwise','Melee','Steward','Profession'],
        education:      {min:10,list:['Art','Advocate','Diplomat','Language','Electronics (Computers)','Medic']}
    },
    {
        name:           'Barbarian',
        description:    'You live on a primitive world without the benefit of technology.',
        survival:       {stat:'Endurance', difficulty: 7},
        advancement:    {stat:'Strength', difficulty: 7},
        service:        ['Athletics','Melee (Unarmed)','Recon','Streetwise','Stealth','Survival'],
        personal:       ['Strength','Endurance','Dexterity','Language','Profession','Jack-of-all-Trades'],
        skills:         ['Animals','Carouse','Melee (Blade)','Stealth','Seafarer','Survival'],
        title:          [
            {name:'Barbarian'},
            {name:'Barbarian',bonus:{name:'Survival',rank:1}},
            {name:'Warrior',bonus:{name:'Melee (Blade)',rank:1}},
            {name:'Warrior'},
            {name:'Chieftain',bonus:{name:'Leadership',rank:1}},
            {name:'Chieftain'},
            {name:'Warlord'}
        ]
    },{
        name:           'Wanderer',
        description:    'You are a space bum, living hand-to-mouth in slums and spaceports across the galaxy. (Endurance, Intelligence)',
        survival:       {stat:'Endurance', difficulty: 7},
        advancement:    {stat:'Intelligence', difficulty: 7},
        promotion:      {stat:'Intelligence', difficulty:7},
        personal:       ['Strength','Dexterity','Endurance','Language','Profession','Jack-of-all-Trades'],
        service:        ['Athletics','Melee (Unarmed)','Recon','Streetwise','Stealth','Survival'],
        skills:     ['Drive','Deception','Recon','Stealth','Streetwise','Survival'],
        title:          [
            {name:'Wanderer'},
            {name:'Wanderer',bonus:{name:'Streetwise',rank:1}},
            {name:'Wanderer'},
            {name:'Wanderer',bonus:{name:'Deception',rank:1}},
            {name:'Wanderer'},
            {name:'Wanderer'},
            {name:'Wanderer'}
        ]
   },{
        name:           'Scavenger',
        description:    'You work as a belter (asteroid miner) or on a salvage crew.',
        survival:       {stat:'Dexterity', difficulty: 7},
        advancement:    {stat:'Endurance', difficulty: 7},
        service:        ['Athletics','Melee (Unarmed)','Recon','Streetwise','Stealth','Survival'],
        personal:       ['Strength','Endurance','Dexterity','Language','Profession','Jack-of-all-Trades'],
        skills:         ['Pilot (Small Craft)','Mechanic','Astrogation','Vacc Suit','Profession','Gun Combat'],
        title:          [
            {name:'Scavenger'},
            {name:'Scavenger',bonus:{name:'Vacc Suit',rank:1}},
            {name:'Scavenger'},
            {name:'Scavenger',bonus:{name:'Mechanic',rank:1}},
            {name:'Scavenger'},
            {name:'Scavenger'},
            {name:'Scavenger'}
        ]
    },{
        name:           'Artist',
        description:    'You are a writer, holographer, or other creative.',
        survival:       {stat:'Social Status', difficulty: 6},
        advancement:    {stat:'Intelligence', difficulty: 6},
        qualification:  {stat:'Intelligence', difficulty: 5},
        service:        ['Art','Carouse','Deception','Drive/Fly','Persuade','Steward'],
        personal:       ['Dexterity','Intelligence','Social Status','Language','Carouse','Jack-of-all-Trades'],
        skills:         ['Art','Carouse','Electronics (Computers)','Gambler','Persuade','Profession'],
        education:      {min:10,list:['Advocate','Broker','Deception','Science','Streetwise','Diplomat']},
        title:          [
            {name:'Starving Artist'},
            {name:'Starving Artist',bonus:{name:'Art',rank:1}},
            {name:'Starving Artist'},
            {name:'Starving Artist',bonus:{name:'Investigate',rank:1}},
            {name:'Starving Artist'},
            {name:'Famous Artist',bonus:{name:'Social Status'}},
            {name:'Famous Artist'}
        ]
    },{
        name:           'Journalist',
        description:    'You report on local or galactic events for a news feed, the TAS, or other organization.',
        survival:       {stat:'Education', difficulty: 7},
        advancement:    {stat:'Intelligence', difficulty: 5},
        qualification:  {stat:'Intelligence', difficulty: 5},
        service:        ['Art','Carouse','Deception','Drive/Fly','Persuade','Steward'],
        personal:       ['Dexterity','Intelligence','Social Status','Language','Carouse','Jack-of-all-Trades'],
        skills:         ['Art','Electronics','Drive/Fly','Investigate','Recon','Streetwise'],
        education:      {min:10,list:['Advocate','Broker','Deception','Science','Streetwise','Diplomat']},
        title:          [
            {name:'Journeyman'},
            {name:'Freelancer',bonus:{name:'Electronics (Comms)',rank:1}},
            {name:'Staff Writer',bonus:{name:'Investigate',rank:1}},
            {name:'Staff Writer'},
            {name:'Correspondent',bonus:{name:'Persuade',rank:1}},
            {name:'Correspondent'},
            {name:'Senior Correspondent',bonus:{name:'Social Status'}}
        ]
    },{
        name:           'Performer',
        description:    'You are an actor, dancer, acrobat, professional athlete, or other public performer.',
        survival:       {stat:'Intelligence', difficulty: 5},
        advancement:    {stat:'Dextrity', difficulty: 7},
        qualification:  {stat:'Dexterity', difficulty: 5},   // TODO also possible to use INT
        service:        ['Art','Carouse','Deception','Drive/Fly','Persuade','Steward'],
        personal:       ['Dexterity','Intelligence','Social Status','Language','Carouse','Jack-of-all-Trades'],
        skills:         ['Art','Athletics','Carouse','Deception','Stealth','Streetwise'],
        education:      {min:10,list:['Advocate','Broker','Deception','Science','Streetwise','Diplomat']},
        title:          [
            {name:'Journeyman'},
            {name:'Journeyman',bonus:{name:'Dexterity'}},
            {name:'Journeyman'},
            {name:'Journeyman',bonus:{name:'Strength'}},
            {name:'Journeyman'},
            {name:'Famouse Performer',bonus:{name:'Social Status'}},
            {name:'Famouse Performer'}
        ]
    },{
        name:           'Marine',
        description:    'Members of the armed fighting forces carried aboard starships, marines deal with piracy and boarding actions in space, defend the starports and bases belonging to the navy, and supplement ground forces such as the army.',
        assignment:     [{
            name:           'Support',
            description:    'You are a quartermaster, engineer or battlefield medic in the marines. (Endurance, Education, Social Status)',
            survival:       {stat:'Endurance', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 7},
            skills:         ['Electronics','Mechanic','Drive','Medic','Heavy Weapons','Gun Combat']
        },{
            name:           'Star Marine',
            description:    'You are trained to fight boarding actions and capture enemy vessels.',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Education', difficulty: 6},
            skills:         ['Vacc Suit','Athletics','Gunner','Melee (Blade)','Electronics','Gun Combat']
        },{
            name:           'Ground Assault',
            description:    'You are kicked out of a spacecraft in high orbit and told to "capture that planet"',
            survival:       {stat:'Endurance', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 5},
            skills:         ['Vacc Suit','Heavy Weapons','Recon','Melee (Blade)','Tactics (Military)','Gun Combat']
        }],
        qualification:  {stat:'Endurance', difficulty: 6, age:{limit:30,mod:-2}},
        commission:     {stat:'Social Status', difficulty: 8},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Melee (Unarmed)','Melee (Blade)'],
        service:        ['Athletics','Vacc Suit','Tactics','Heavy Weapons','Gun Combat','Stealth'],
        education:      {min:8,list:['Medic','Survival','Explosives','Engineer','Pilot','Navigation']},
        officer:        ['Electronics','Tactics','Admin','Advocate','Vacc Suit','Leadership'],
        title:          {
            enlisted:       [
                {name:'Marine',bonus:{name:'Gun Combat',rank:1}},   // TODO or Melee
                {name:'Lance Corporal',bonus:{name:'Gun Combat',rank:1}},   // TODO choose another specialty
                {name:'Corporal'},
                {name:'Lance Sergeant',bonus:{name:'Leadership',rank:1}},
                {name:'Sergeant'},
                {name:'Gunnery Sergeant',bonus:{name:'Endurance'}},
                {name:'Sergeant Major'}
            ],
            officer:        [
                {name:'Lieutenant',bonus:{name:'Leadership',rank:1}},
                {name:'Captain'},
                {name:'Force Commander',bonus:{name:'Tactics',rank:1}},
                {name:'Lieutenant Colonel'},
                {name:'Colonel'},
                {name:'Brigadier',bonus:{name:'Social Status',value:10}}    // TODO test this
            ]
        }
    },{
        name:           'Merchant Marine',
        description:    'You work on one of the massive cargo haulers run by th eImperium or the megacorporations.',
        survival:       {stat:'Education', difficulty: 4},
        advancement:    {stat:'Intelligence', difficulty: 7},
        qualification:  {stat:'Intelligence', difficulty: 4},
        skills:         ['Pilot','Vacc Suit','Athletics','Mechanic','Engineer','Electronics'],
        title:          [
            {name:'Crewman'},
            {name:'Senior Crewman',bonus:{name:'Mechanic',rank:1}},
            {name:'4th Officer'},
            {name:'3rd Officer'},
            {name:'2nd Officer',bonus:{name:'Pilot',rank:1}},
            {name:'1st Officer',bonus:{name:'Social Status'}},
            {name:'Captain'}
        ],
        personal:       ['Strength','Dexterity','Endurance','Intelligence','Language','Streetwise'],
        service:        ['Drive/Fly','Vacc Suit','Broker','Steward','Electronics','Persuade'],
        education:      {min:8,list:['Engineer','Astrogation','Electronics','Pilot','Admin','Advocate']}
    },{
        name:           'Free Trader',
        description:    'You are part of the crew of a tramp trader.',
        survival:       {stat:'Dexterity', difficulty: 6},
        advancement:    {stat:'Intelligence', difficulty: 6},
        qualification:  {stat:'Intelligence', difficulty: 4},
        skills:         ['Pilot (Spacecraft)','Vacc Suit','Deception','Mechanic','Streetwise','Gunner'],
        title:          [
            {name:'Trader'},
            {name:'Trader',bonus:{name:'Persuade',rank:1}},
            {name:'Trader'},
            {name:'Experienced Trader',bonus:{name:'Jack-of-all-Trades',rank:1}},
            {name:'Experienced Trader'},
            {name:'Experienced Trader'},
            {name:'Experienced Trader'}
        ],
        personal:       ['Strength','Dexterity','Endurance','Intelligence','Language','Streetwise'],
        service:        ['Drive/Fly','Vacc Suit','Broker','Steward','Electronics','Persuade'],
        education:      {min:8,list:['Engineer','Astrogation','Electronics','Pilot','Admin','Advocate']}
    },{
        name:           'Broker',
        description:    'You work in a planetside brokerage or starport.',
        survival:       {stat:'Education', difficulty: 5},
        advancement:    {stat:'Intelligence', difficulty: 7},
        qualification:  {stat:'Intelligence', difficulty: 4},
        skills:         ['Admin','Advocate','Broker','Streetwise','Deception','Persuade'],
        title:          [
            {name:'Broker'},
            {name:'Broker',bonus:{name:'Broker',rank:1}},
            {name:'Broker'},
            {name:'Experienced Broker',bonus:{name:'Streetwise',rank:1}},
            {name:'Experienced Broker'},
            {name:'Experienced Broker'},
            {name:'Experienced Broker'}
        ],
        personal:       ['Strength','Dexterity','Endurance','Intelligence','Language','Streetwise'],
        service:        ['Drive/Fly','Vacc Suit','Broker','Steward','Electronics','Persuade'],
        education:      {min:8,list:['Engineer','Astrogation','Electronics','Pilot','Admin','Advocate']}
    },{
        name:           'Navy',
        description:    'Members of the interstellar navy which patrols space between the stars. The navy has the responsibility for the protection of society from foreign powers and lawless elements in the interstellar trade channels.',
        assignment:     [{
            name:           'Line/Crew',
            description:    'You serve as a general crewman or officer on a ship of the line.',
            survival:       {stat:'Intelligence', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 7},
            skills:         ['Electronics','Mechanic','Gun Combat','Drive/Fly','Melee','Vacc Suit']
        },{
            name:           'Engineer/Gunner',
            description:    'You serve as a specialist technician on a starship.',
            survival:       {stat:'Intelligence', difficulty: 6},
            advancement:    {stat:'Education', difficulty: 6},
            skills:         ['Engineer','Mechanic','Electronics','Engineer','Gunner','Drive/Fly']
        },{
            name:           'Flight',
            description:    'You are a pilot of a shuttle, fighter, or other light craft.',
            survival:       {stat:'Dexterity', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 5},
            skills:         ['Pilot','Drive/Fly','Gunner','Pilot (Small Craft)','Astrogation','Electronics']
        }],
        qualification:  {stat:'Intelligence', difficulty: 6, age:{limit:34,mod:-2}},
        personal:       ['Strength','Dexterity','Endurance','Intelligence','Education','Social Status'],
        service:        ['Pilot','Vacc Suit','Athletics','Gunner','Mechanic','Gun Combat'],
        education:      {min:8,list:['Electronics','Astrogation','Engineer','Drive/Fly','Navigation','Admin']},
        officer:        ['Leadership','Electronics','Pilot','Melee (Blade)','Admin','Tactics (Naval)'],
        title:          {
            enlisted:   [
                {name:'Crewman'},
                {name:'Able Spacehand', bonus:{name:'Mechanic',rank:1}},
                {name:'Petty Officer, 3rd Class', bonus:{name:'Vacc Suit',rank:1}},
                {name:'Petty Officer, 2nd Class'},
                {name:'Petty Officer, 1st Class', bonus:{name:'Endurance'}},
                {name:'Chief Petty Officer'},
                {name:'Master Chief'}
            ],
            officer:    [
                {name:'Ensign', bonus:{name:'Melee (Blade)',rank:1}},
                {name:'Sublieutenant', bonus:{name:'Leadership',rank:1}},
                {name:'Lieutenant'},
                {name:'Commander', bonus:{name:'Tactics (Naval)',rank:1}},
                {name:'Captain',bonus:{name:'Social Status',value:10}},
                {name:'Admiral',bonus:{name:'Social Status',value:12}}
            ]
        }
    },{
        name:           'Noble',
        description:    'Individuals of the upper class who perform little consistent function; but, often have large amounts of readly available credits.',
        assignment:     [{
            name:           'Administrator',
            description:    'You serve in the planetary government or even rule over a fiefdom.',
            survival:       {stat:'Intelligence', difficulty: 4},
            advancement:    {stat:'Education', difficulty: 6},
            skills:         ['Admin','Advocate','Electronics','Diplomat','Investigate','Persuade'],
            title:          [
                {name:'Assissstant'},
                {name:'Clerk',bonus:{name:'Admin',rank:1}},
                {name:'Supervisor'},
                {name:'Manager',bonus:{name:'Advocate',rank:1}},
                {name:'Chief'},
                {name:'Director',bonus:{name:'Leadership',rank:1}},
                {name:'Minister'}
            ]
        },{
            name:           'Diplomat',
            description:    'You are a diplomat or other state official.',
            survival:       {stat:'Intelligence', difficulty: 5},
            advancement:    {stat:'Social Status', difficulty: 7},
            skills:         ['Advocate','Carouse','Electronics','Steward','Diplomat','Deception'],
            title:          [
                {name:'Intern'},
                {name:'3rd Secretary',bonus:{name:'Admin',rank:1}},
                {name:'2rd Secretary'},
                {name:'1st Secretary',bonus:{name:'Advocate',rank:1}},
                {name:'Counsellor'},
                {name:'Minister',bonus:{name:'Diplomat',rank:1}},
                {name:'Ambassador'}
            ]
        },{
            name:           'Dilettante',
            description:    'You are known for being a celebrity and have absolutely no useful function in society.',
            survival:       {stat:'Social Status', difficulty: 3},
            advancement:    {stat:'Intelligence', difficulty: 8},
            skills:         ['Admin','Advocate','Electronics','Diplomat','Investigate','Persuade'],
            title:          [
                {name:'Wastrel'},
                {name:'Wastrel'},
                {name:'Ingrate',bonus:{name:'Carouse',rank:1}},
                {name:'Ingrate'},
                {name:'Black Sheep',bonus:{name:'Persuade',rank:1}},
                {name:'Black Sheep'},
                {name:'Scoundrel',bonus:{name:'Jack-of-all-Trades',rank:1}}
            ]
        }],
        qualification:  {stat:'Social Status', difficulty: 10,
                        autostat:{name:'Social Status',value:10}},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Gun Combat','Melee'],
        service:        ['Admin','Advocate','Electronics','Diplomat','Investigate','Persuade'],
        education:      {min:8,list:['Admin','Advocate','Language','Leadership','Diplomat','Art']}
    },{
        name:           'Rogue',
        description:    'Criminal elements familiar with the rougher or more illegal methods of attaining goals.',
        assignment:     [{
            name:           'Thief',
            description:    'You steal from the rich and give to... well, yourself.',
            survival:       {stat:'Intelligence', difficulty: 6},
            advancement:    {stat:'Dexterity', difficulty: 6},
            skills:         ['Stealth','Electronics','Recon','Streetwise','Deception','Athletics'],
            title:          [
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Stealth',rank:1}},
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Streetwise',rank:1}},
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Recon',rank:1}},
                {name:'Rogue'},
            ]
        },{
            name:           'Enforcer',
            description:    'You are a leg breaker, thug, or assissin for a criminal group.',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Strength', difficulty: 6},
            skills:         ['Gun Combat','Melee','Streetwise','Persuade','Athletics','Drive'],
            title:          [
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Persuade',rank:1}},
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Gun Combat',rank:1}},    // TODO or Melee
                {name:'Rogue'},
                {name:'Rogue',bonus:{name:'Streetwise',rank:1}},
                {name:'Rogue'},
            ]
        },{
            name:           'Pirate',
            description:    'You are a space-going corsair.',
            survival:       {stat:'Dexterity', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6},
            skills:         ['Pilot','Astrogation','Gunner','Engineer','Vacc Suit','Melee'],
            title:          [
                {name:'Lackey'},
                {name:'Henchman',bonus:{name:'Pilot',rank:1}},
                {name:'Corporal'},
                {name:'Sergeant',bonus:{name:'Gun Combat',rank:1}},    // TODO or Melee
                {name:'Lieutenant'},
                {name:'Leader',bonus:{name:'Engineer',rank:1}},
                {name:'Captain'},
            ]
        }],
        qualification:  {stat:'Dexterity', difficulty: 6},
        personal:       ['Carouse','Dexterity','Endurance','Gambler','Melee','Gun Combat'],
        service:        ['Deception','Recon','Athletics','Gun Combat','Stealth','Streetwise'],
        education:      {min:10,list:['Electronics','Navigation','Medic','Investigate','Broker','Advocate']}
    },{
        name:           'Scholar',
        description:    'Individuals trained in technological or research sciences who conduct investigations into materials, situations, and phenomena, or who practice medicine.',
        assignment:     [{
            name:           'Field Researcher',
            description:    'You are an explorer or field researcher, equally at home in the laboratiory or wilderness.',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6},
            skills:         ['Electronics','Vacc Suit','Navigation','Survival','Investigate','Science'],
            title:      [
                {name:'Scholar'},
                {name:'Scholar',bonus:{name:'Science',rank:1}},
                {name:'Scholar',bonus:{name:'Electronics (Computers)',rank:1}},
                {name:'Scholar',bonus:{name:'Investigate',rank:1}},
                {name:'Scholar'},
                {name:'Scholar',bonus:{name:'Science',rank:2}},
                {name:'Scholar'}
            ]
        },{
            name:           'Scientist',
            description:    'You are a researcher in some corporation or institute, or a mad scientist in an orbiting laboratory.',
            survival:       {stat:'Education', difficulty: 4},
            advancement:    {stat:'Intelligence', difficulty: 8},
            skills:         ['Admin','Engineer','Science','Science','Electronics','Science'],
            title:         [
                {name:'Scholar'},
                {name:'Scholar',bonus:{name:'Science',rank:1}},
                {name:'Scholar',bonus:{name:'Electronics (Computers)',rank:1}},
                {name:'Scholar',bonus:{name:'Investigate',rank:1}},
                {name:'Scholar'},
                {name:'Scholar',bonus:{name:'Science',rank:2}},
                {name:'Scholar'}
            ]
        },{
            name:           'Physician',
            description:    'You are a doctor, healer, or medical researcher.',
            survival:       {stat:'Education', difficulty: 4},
            advancement:    {stat:'Education', difficulty: 8},
            skills:         ['Medic','Electronics','Investigate','Medic','Persuade','Science'],
            title: [
                {name:'Intern'},
                {name:'Medic',bonus:{name:'Medic',rank:1}},
                {name:'Doctor'},
                {name:'Doctor',bonus:{name:'Science',rank:1}},
                {name:'Doctor'},
                {name:'Doctor',bonus:{name:'Science',rank:2}},
                {name:'Doctor'}
            ]
        }],
        qualification:  {stat:'Intelligence', difficulty: 6},
        personal:       ['Intelligence','Education','Social Status','Dexterity','Endurance','Language'],
        service:        ['Drive/Fly','Electronics','Diplomat','Medic','Investigate','Science'], // TODO separate Drive/Fly
        education:      {min:10,list:['Art','Advocate','Electronics','Language','Engineer','Science']}
    },{
        name:           'Scout',
        description:    'Members of the exploratory service. Scouts explore new areas, map and survey known or newly discovered areas, and maintain communication routes betweeen worlds of the galaxy.',
        assignment:     [{
            name:           'Courier',
            description:    'You are responsible for shuttling messages and high value packages around the galaxy.',
            survival:       {stat:'Endurance', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 9},
            skills:         ['Electronics','Drive/Fly','Pilot (Spacecraft)','Engineer','Athletics','Astrogation']
        },{
            name:           'Surveyor',
            description:    'You visit border worlds and assess their worth.',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 8},
            skills:         ['Electronics','Persuade','Pilot','Navigation','Diplomat','Streetwise']
        },{
            name:           'Explorer',
            description:    'You go wherever the map is blank, exploring unknown worlds and uncharted space.',
            survival:       {stat:'Endurance', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 7},
            skills:         ['Electronics','Pilot','Engineer','Science','Stealth','Recon']
        }],
        qualification:  {stat:'Intelligence', difficulty: 5},
        personal:       ['Strength','Dexterity','Endurance','Intelligence','Education','Jack-of-all-Trades'],
        service:        ['Pilot','Survival','Mechanic','Astrogation','Vacc Suit','Gun Combat'],
        education:      {min:8,list:['Medic','Navigation','Seafarer','Explosives','Science','Jack-of-all-Trades']},
        title: {
            enlisted: [
                {name:'Journeyman'},
                {name:'Scout',bonus:{name:'Vacc Suit',rank:1}},
                {name:'Scout'},
                {name:'Senior Scout',bonus:{name:'Pilot',rank:1}},
                {name:'Senior Scout'},
                {name:'Senior Scout'},
                {name:'Senior Scout'},
            ]
        }
    }
];

var splitServiceName = function(str) {
    var result = new Array,
        specialtyStart = str.indexOf('(');

    if(-1 == specialtyStart) {
        // this is just a base string
        result[0] = str.trim();
        result[1] = null;
    } else {
        result[0] = str.substring(0,specialtyStart).trim();
        result[1] = str.substring(specialtyStart+1, str.indexOf(')',specialtyStart));
    }
    
    return result;
};

module.exports.findService = function(str,findBase) {
    var serviceNames = splitServiceName(str),
        base = initialCoreServices.find((e) => e.name.includes(serviceNames[0]));
    
    if(!findBase && base && base.assignment && serviceNames[1]) {
        var sp = base.assignment.find((e) => serviceNames[1].includes(e.name));
        return sp;
    }

    return base;
};

module.exports.initialServices = initialCoreServices;
