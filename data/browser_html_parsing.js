//example with how a browser parse HTML tags

var browser_html_parsing = {
        states: {
            "start": {
                transitions: [
                    {
                        target:"data"
                    }
                ]
            },
            "data": {
                transitions: [
                    {
                        target: "data",
                        condition: "consume a-z / emit character token"
                    },
                    {
                        target: "tag open",
                        condition: "consume \"<\" "
                    },
                    {
                        target: "end",
                        condition: "EOF"
                    }
                ]
            },
            "tag open": {
                transitions: [
                    {
                        target: "close tag open state",
                        condition: "consume \"/\" / create new end tag open"
                    },
                    {
                        target: "tag name",
                        condition: "consume a-z / create new start tag token"
                    }
                ]
            },
            "close tag open state": {
                transitions: [
                    {
                        target: "tag name",
                        condition: "consume a-z"
                    }
                ]

            },
            "tag name": {
                transitions: [
                    {
                        target: "data",
                        condition: "consume \">\" / emit tag token"
                    },
                    {
                        target: "tag name",
                        condition: "consume a-z"
                    }
                ]
            },
            "end": {
                terminal: true
            }
        }
    };
