# FSA Graphic Editor

A graphic editor to display and edit a Finished State Automaton

Usage : ```fsa_editor(object,mode)``` where ```object``` is either a JS object or a URL leading to a JSON object, and ```mode``` is a string (```"view"``` or ```"edit"```) stating the mode in which the editor must launch.

jQuery and D3JS must be include in the page, along with fsa_editor.js
An example can be found in ```index.html```.

Sample code :
```
    .   // html document here
    .   // html document here
    .   // html document here

        <!-- the div that will be filled with the editor -->
        <div id="fsa_editor"></div>

        <!-- jquery is needed -->
        <script src="http://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
        <!-- d3js is needed -->
        <script src="http://d3js.org/d3.v3.min.js" type="text/javascript"></script>

        <!-- fsa_editor library-->
        <script src="./dist/fsa-editor.js" type="text/javascript"></script>

        <!-- calling library with proper parameters -->
        <script>
            //calling function with a URL
            fsa_editor('http://www.fsaeditor.com',"edit");
            //calling function with an embedded JS object
            fsa_editor({
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
                                "condition": "b",
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
            },"edit");

        </script>
    </body>
</html>
```



## To install the project and start working on it :

```
git clone https://github.com/EditeurGraphiqueAutomateFini/FSA-Editor.git && cd FSA-Editor
npm install
npm start
go to http://localhost:3000
```

Please run ```"npm run production"``` in order to build the production file in the "/dist" directory

Please run ```"npm run documentation"``` in order to generate the jsdoc documentation (HTML) in the "/documentation" folder
