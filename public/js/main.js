var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "", {
    preload: preload,
    create: create,
});

function preload() {
    Bits.initialize();
    Sounds.initialize();
}

function create() {
    game.input.onDown.add(click);
    game.stage.backgroundColor = "#f0ff84";
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 400;
    game.physics.p2.restitution = 0.8;
}

function click(pointer) {
    Bits.spawn(Utils.positionFrom(pointer));
    Sounds.playRandom();
}            

var Sounds = {
    _sounds: [],
    _filenames: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "15", "16", "21", "25", "27"],

    initialize: function() {
        var file, sound;
        for (var i = 0; i < this._filenames.length; i++) {
            file = this._filenames[i]
            game.load.audio(this.getName(file), this.getPath(file));
            sound = game.add.audio(this.getName(file));
            this._sounds.push(sound);
        }                    
    },

    playRandom: function() {
        this.random().play();
    },

    random: function() {
        var index = Math.floor(Math.random() * this._sounds.length);
        return this._sounds[index];
    },

    getName: function(filename) {
        return "sound_" + filename;
    },

    getPath: function(filename) {
        return Utils.path("sounds/" + filename + ".wav");
    }                
};

var Bits = {
    settings: {
        length : 19,
        scale  : 0.7
    },

    initialize: function() {
        for (var i = 1; i <= this.settings.length; i++) {
            game.load.image(this.getName(i), this.getPath(i));
        }
    },

    spawn: function(position) {
        var bit = game.add.sprite(position.x, position.y, this.random());
        bit.scale = this.scale();
        bit.position = position;
        game.physics.p2.enable(bit);
    },

    scale: function() {
        return new Phaser.Point(this.settings.scale, this.settings.scale);
    },

    random: function() {
        var index = 1 + Math.floor(Math.random() * (this.settings.length - 1));
        return this.getName(index);
    },

    getName: function(bit) {
        return "bit_" + bit;
    },

    getPath: function(bit) {
        return Utils.path("img/bits/" + bit + ".png");
    }
};

var Utils = {
	path: function(path) {
		return "public/" + path;
	},

    positionFrom: function(pointer) {
        return new Phaser.Point(pointer.pageX, pointer.pageY);
    }
};
