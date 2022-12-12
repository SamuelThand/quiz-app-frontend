
    Frontend instruktioner:

    Klona repot och kör "npm install --dev"

    Installera ESlint extension
    - Lintar automatiskt all typescript 
    
    Installera Stylelint extension
    - Lintar och varnar CSS under PROBLEMS
    
    Installera Prettier extension
    - CTRL-SHIFT-P -> format document (Fixar all indentering och formattering) 

    sök på eslint.options och eslint.validate i VScode settings och lägg till så det ser ut såhär: 

    "eslint.options": {
    "extensions": [".ts", ".html"]
    },

    // ... more config

    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "html"
    ],

    // ... more config



    

    Utveckling:

    Kör alltid git pull det första du gör för att få senaste från remote

    Git push pushar automatiskt till båda repos