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
        education:      ['Advocate','Language','Explosives','Medic','Vacc Suit','Electronics']
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
        qualification:  {stat:'Endurance', difficulty: 5},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Medic','Melee'],
        service:        ['Drive/Fly','Athletics','Gun Combat','Recon','Melee','Heavy Weapons'],
        education:      ['Tactics (Military)','Electronics','Navigation','Explosives','Engineer','Survival'],
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
        qualification:  {stat:'Education', difficulty: 5}
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
        description:    'TODO',
        survival:       {stat:'Social Status', difficulty: 6},
        advancement:    {stat:'Intelligence', difficulty: 6},
        qualification:  {stat:['Dexterity','Intelligence'], difficulty: 5}
    },{
        name:           'Journalist',
        description:    'TODO',
        survival:       {stat:'Education', difficulty: 7},
        advancement:    {stat:'Intelligence', difficulty: 5},
        qualification:  {stat:['Dexterity','Intelligence'], difficulty: 5}
    },{
        name:           'Performer',
        description:    'TODO',
        survival:       {stat:'Intelligence', difficulty: 5},
        advancement:    {stat:'Dextrity', difficulty: 7},
        qualification:  {stat:['Dexterity','Intelligence'], difficulty: 5}
    },{
        name:           'Marine',
        assignment:     [{
            name:           'Support',
            description:    'You are a quartermaster, engineer or battlefield medic in the marines. (Endurance, Education, Social Status)',
            survival:       {stat:'Endurance', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 7},
            skills:         ['Electronics','Mechanic','Drive','Medic','Heavy Weapons','Gun Combat']
        },{
            name:           'Star Marine',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Education', difficulty: 6}
        },{
            name:           'Ground Assault',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 5}
        }],
        qualification:  {stat:'Endurance', difficulty: 6},
        commission:     {stat:'Social Status', difficulty: 8},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Melee (Unarmed)','Melee (Blade)'],
        service:        ['Athletics','Vacc Suit','Tactics','Heavy Weapons','Gun Combat','Stealth'],
        higherEd:       ['Medic','Survival','Explosives','Engineer','Pilot','Navigation'],
        officer:        ['Electronics','Tactics','Admin','Advocate','Vacc Suit','Leadership'],
    },{
        name:           'Merchant Marine',
        description:    'TODO',
        survival:       {stat:'Education', difficulty: 4},
        advancement:    {stat:'Intelligence', difficulty: 7},
        qualification:  {stat:'Intelligence', difficulty: 4}
    },{
        name:           'Free Trader',
        description:    'TODO',
        survival:       {stat:'Dexterity', difficulty: 6},
        advancement:    {stat:'Intelligence', difficulty: 6},
        qualification:  {stat:'Intelligence', difficulty: 4}
    },{
        name:           'Broker',
        description:    'TODO',
        survival:       {stat:'Education', difficulty: 5},
        advancement:    {stat:'Intelligence', difficulty: 7},
        qualification:  {stat:'Intelligence', difficulty: 4}
    },{
        name:           'Navy',
        assignment:     [{
            name:           'Line/Crew',
            description:    'TODO',
            survival:       {stat:'Intelligence', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 7}
        },{
            name:           'Engineer/Gunner',
            description:    'TODO',
            survival:       {stat:'Intelligence', difficulty: 6},
            advancement:    {stat:'Education', difficulty: 6}
        },{
            name:           'Flight',
            description:    'TODO',
            survival:       {stat:'Dexterity', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 5}
        }],
        qualification:  {stat:'Intelligence', difficulty: 6}
    },{
        name:           'Noble',
        assignment:     [{
            name:           'Administrator',
            description:    'TODO',
            survival:       {stat:'Intelligence', difficulty: 4},
            advancement:    {stat:'Education', difficulty: 6}
        },{
            name:           'Diplomat',
            description:    'TODO',
            survival:       {stat:'Intelligence', difficulty: 5},
            advancement:    {stat:'Social Status', difficulty: 7}
        },{
            name:           'Dilettante',
            description:    'TODO',
            survival:       {stat:'Social Status', difficulty: 3},
            advancement:    {stat:'Intelligence', difficulty: 8}
        }],
        qualification:  {stat:'Social Status', difficulty: 10}
    },{
        name:           'Rogue',
        assignment:     [{
            name:           'Thief',
            description:    'TODO',
            survival:       {stat:'Intelligence', difficulty: 6},
            advancement:    {stat:'Dexterity', difficulty: 6}
        },{
            name:           'Enforcer',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Strength', difficulty: 6}
        },{
            name:           'Colonist',
            description:    'TODO',
            survival:       {stat:'Dexterity', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6}
        }],
        qualification:  {stat:'Dexterity', difficulty: 6}
    },{
        name:           'Scholar',
        assignment:     [{
            name:           'Field Researcher',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 6}
        },{
            name:           'Scientist',
            description:    'TODO',
            survival:       {stat:'Education', difficulty: 4},
            advancement:    {stat:'Intelligence', difficulty: 8}
        },{
            name:           'Physician',
            description:    'TODO',
            survival:       {stat:'Education', difficulty: 4},
            advancement:    {stat:'Education', difficulty: 8}
        }],
        qualification:  {stat:'Intelligence', difficulty: 6}
    },{
        name:           'Scout',
        assignment:     [{
            name:           'Courier',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 5},
            advancement:    {stat:'Education', difficulty: 9}
        },{
            name:           'Surveyor',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 6},
            advancement:    {stat:'Intelligence', difficulty: 8}
        },{
            name:           'Explorer',
            description:    'TODO',
            survival:       {stat:'Endurance', difficulty: 7},
            advancement:    {stat:'Education', difficulty: 7}
        }],
        qualification:  {stat:'Intelligence', difficulty: 5}
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
        base = initialCoreServices.find((e) => e.name.match(serviceNames[0]));
    
    if(!findBase && base && base.assignment && serviceNames[1]) {
        var sp = base.assignment.find((e) => serviceNames[1].match(e.name));
        return sp;
    }

    return base;
};

module.exports.initialServices = initialCoreServices;
