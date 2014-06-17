/** Name Generator Class **/
function NameGenerator() {
    this.syllable_lists = [];
    this.name_list = [];
}

NameGenerator.prototype.setSyllableList = function(list, num_syllables) {
    this.syllable_lists[num_syllables] = list;
}

NameGenerator.prototype.setNameList = function(list) {
    this.name_list = list;
}

NameGenerator.prototype.getName = function() {
    var name_type, name, first_list;

    name_type = getWeightedOption([22,22,22,22,11.8,0.2]);
    first_list = getRandomInt(2,0);

    /** 2 -- 1+1 **/
    if (name_type == 0) {
        name = this.syllable_lists[2*Math.pow(-1,first_list)].getWord();
        name += " " + this.syllable_lists[1].getWord();
        name += this.syllable_lists[-1].getWord();
    }

    /** 1 -- 1+2 **/
    if (name_type == 1) {
        name = this.syllable_lists[1*Math.pow(-1,first_list)].getWord();
        name += " " + this.syllable_lists[1].getWord();
        name += this.syllable_lists[-2].getWord();
    }

    /** 1 -- 2+1 **/
    if (name_type == 2) {
        name = this.syllable_lists[1*Math.pow(-1,first_list)].getWord();
        name += " " + this.syllable_lists[2].getWord();
        name += this.syllable_lists[-1].getWord();
    }

    /** 2 -- 2+1 **/
    if (name_type == 3) {
        name = this.syllable_lists[2*Math.pow(-1,first_list)].getWord();
        name += " " + this.syllable_lists[2].getWord();
        name += this.syllable_lists[-1].getWord();
    }

    /** 1 -- 3 **/
    if (name_type == 4) {
        name = this.syllable_lists[1*Math.pow(-1,first_list)].getWord();
        name += " " + this.syllable_lists[3].getWord();
    }

    /** Special Name **/
    if (name_type == 5) {
        name = this.name_list.getWord();
    }

    return name;
}


/** Word List Class **/
function WordList(word_list) {
    this.list = word_list;
}

WordList.prototype.getWord = function() {
    var index;

    index = getRandomInt(this.list.length, 0);

    return this.list[index];
}


/** Auxilliary Functions **/
function getRandomInt(max, offset) {
    return Math.floor(Math.random() * max) + offset;
}

function getWeightedOption(weights) {
    var num, keys, total, count, ans;

    total = 0;
    weights.forEach(function(weight) {
        total += weight;
    });


    num = Math.random()*total;

    count = 0;
    ans = null;
    weights.forEach(function(weight, index) {
        count += weight;
        if (!ans && count >= num) {
            ans = index;
        }
    });

    return ans;
}


var one_syll_first = new WordList([
    'felt',
    'flip',
    'flop',
    'sig',
    'pudd',
    'poon',
    'toast',
    'pork',
    'tamb',
    'chin',
    'spud',
    'fig',
    'chip',
    'kam',
    'snug',
    'pim',
    'pum',
    'bunt',
    'bung',
    'dunn',
]);

var one_syll_last = new WordList([
    'toast',
    'ship',
    'pim',
    'tim',
    'tom',
    'plum',
    'pie',
    'flamb',
    'sack',
    'gim',
    'gum',
    'bug',
    'shelf',
    'pots',
    'graw',
    'bumbo',
    'lamp',
    'chim',
    'sled',
    'pang',
    'kip',
    'wax',
    'chease',
    'pug',
    'fred',
    'bill',
    'bug',
    'paw',
    'pat',
    'spin',
    'scrimp',
    'borg',
    'bug',
    'melk',
    'bat',
    'spoon',
    'jock',
    'rug',
    'balks',
    'box',
    'pup',
    'björn',
]);

var two_syll_first = new WordList([
    'papsy',
    'punkin',
    'bookey',
    'bungle',
    'grumble',
    'spatzle',
    'kegel',
    'tickle',
    'teackle',
    'pengin',
    'hammock',
    'coaster',
    'rango',
    'tipsy',
    'bumbo',
    'hockey',
    'cable',
    'yogurt',
    'goggle',
    'hundle',
    'tse tse',
    'pickle',
    'maple',
    'pample',
    'plester',
    'bulgur',
    'bupple',
    'chacken',
    'flimsy',
    'papal',
    'bunker',
    'chackle',
    'fussey',
    'fanger',
    'pentzl',
    'pratzl',
    'knuckle',
    'shmappi',
]);

var two_syll_last = new WordList([
    'spinach',
    'bumbo',
    'perkey',
    'goggle',
    'bungle',
    'pickle',
    'piza',
    'donald',
    'tickle',
    'freckle',
    'hammock',
    'pengin',
    'beegall',
    'pasta',
    'bupple',
    'staðir',
    'locker',
    'peggle',
    'pangle',
    'chango',
    'chatka',
    'knuckle',
]);

var three_syll = new WordList([
    'cabbagepatch',
    'mangosteen',
    'iguana',
    'tortilla',
    'zamboni',
    'canoli',
    'papaya',
]);

var four_syll = new WordList([
    'fundarstjöri',
    'avocado',
    'pumpernickel',
]);

var secret_names = new WordList([
    'joyce chen',
    'jay pee pee pachaygr',
    'lord of my life',
    'your great aunt from beligum',
    'john newman',
    'hissan nahib',
    'pj j jay defender of the universe,',
]);

var long_syll = three_syll.concat(four_syll);

var ng = new NameGenerator();
ng.setSyllableList(one_syll_first, 1);
ng.setSyllableList(one_syll_last, -1);
ng.setSyllableList(two_syll_first, 2);
ng.setSyllableList(two_syll_last, -2);
ng.setSyllableList(long_syll, 3);
ng.setNameList(secret_names);

$("#name").text(ng.getName());

$("#name").on('click', function() {
    $("#name").text(ng.getName());
});

