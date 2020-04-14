function doit(){
    setInterval(()=>{
        monaco.languages.setLanguageConfiguration("python",{autoClosingPairs:[],surroundingPairs:[]});
        monaco.languages.setLanguageConfiguration("python3",{autoClosingPairs:[],surroundingPairs:[]});
        monaco.languages.setLanguageConfiguration("cpp",{autoClosingPairs:[],surroundingPairs:[]});
    }, 2000);
}

$(()=>{
    scriptContent = doit.toSource() + ';doit();';
    var script = document.createElement('script');
    script.id = 'leetcode-extention-js';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);
});