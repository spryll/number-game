var PlcEnum = {
    STATIC: 1, MOTILE: 2,
    properties: {
        1: {name: "static", value: 1, code: "S"},
        2: {name: "motile", value: 2, code: "M"}
    }
};

var SeqEnum = {
    FORWARD: 6, REVERSE: 7, RANDOM: 8, ADDITIVE: 9,
      properties: {
        6: {name: "forward", value: 6, code: "F"},
        7: {name: "reverse", value: 7, code: "V"},
        8: {name: "random", value: 8, code: "R"},
        9: {name: "additive", value: 9, code: "A"}
    }
};

var staticPlacement = [2, 4, 8, 12, 14, 16, 18, 20, 22 , 24];

if (Object.freeze) {
      Object.freeze(PlcEnum);
      Object.freeze(SeqEnum);
      Object.freeze(staticPlacement);
}

var config = {
    "levels": [ {
        "level": 1,
        "placement": PlcEnum.STATIC,
        "sequence": SeqEnum.FORWARD,
        "factor": 1
    }, {
        "level": 2,
        "placement": PlcEnum.STATIC,
        "sequence": SeqEnum.REVERSE,
        "factor": 1
    }, {
        "level": 3,
        "placement": PlcEnum.STATIC,
        "sequence": SeqEnum.RANDOM,
        "factor": 1
    }, {
        "level": 4,
        "placement": PlcEnum.MOTILE,
        "sequence": SeqEnum.FORWARD,
        "factor": 1
    }, {
        "level": 5,
        "placement": PlcEnum.STATIC,
        "sequence": SeqEnum.FORWARD,
        "factor": 2.5
    }, {
        "level": 6,
        "placement": PlcEnum.MOTILE,
        "sequence": SeqEnum.FORWARD,
        "factor": 2.5
    }, {
        "level": 7,
        "placement": PlcEnum.MOTILE,
        "sequence": SeqEnum.FORWARD,
        "factor": 5
    }, {
        "level": 8,
        "placement": PlcEnum.STATIC,
        "sequence": SeqEnum.ADDITIVE,
        "factor": 1
    }]
 };