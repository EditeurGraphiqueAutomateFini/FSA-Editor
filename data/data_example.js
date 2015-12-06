// données d'exemple format JSON selon la structure "Finite State Automata" (FSA)
//from link : http://fsa4streams.readthedocs.org/en/latest/syntax.html#example
define(function(){
    return [
        {
            "allow_overlap": true,
            "states": {
                "start": {
                    "max_noise": 0,
                    "transitions": [
                        {
                            "condition": "a",
                            "target": "start"
                        },
                        {
                            "condition": "a",
                            "target": "s1"
                        },
                        {
                            "condition": "d",
                            "target": "s2"
                        }
                    ]
                },
                "s1": {
                    "transitions": [
                        {
                            "condition": "b",
                            "target": "s1"
                        },
                        {
                            "condition": "c",
                            "target": "success"
                        },
                        {
                            "condition": "d",
                            "target": "error"
                        }
                    ]
                },
                "s2": {
                    "max_noise": 4,
                    "transitions": [
                        {
                            "condition": "d",
                            "target": "success"
                        }
                    ]
                },
                "success": {
                    "terminal": true
                },
                "error": {
                    "terminal": true
                }
            }
        }
    ]
});
