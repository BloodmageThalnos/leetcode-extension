function doit(){
    const HEADER_PY = "from copy import deepcopy \n\
import sys \n\
sys.setrecursionlimit(10008) \n\
mod = 10**9+7 \n\
 \n\
from random import random, randint \n\
# random()       [0,1)实数 \n\
# randint(a, b)  [a,b]整数 \n\
 \n\
from collections import Counter \n\
# Counter('gallahad')              # 从可迭代对象 \n\
# Counter({'red': 4, 'blue': 2})   # 从map \n\
# keys(), values() \n\
# most_common() \n\
 \n\
from heapq import heapify, heappush, heappop \n\
# heapify(s) 建堆 \n\
# heappush(s, val) 插入元素 \n\
# s[0]  访问堆顶 \n\
# heappop(s) 弹出堆顶 \n\
 \n\
from queue import PriorityQueue \n\
# pq.put(x)    \n\
# pq.get(x)   取最小 \n\
# pq.qsize()  队列大小 \n\
 \n\
from collections import deque \n\
# dq.append \n\
# dq.appendleft \n\
# dq.pop \n\
# dq.popleft \n\
# dq.count \n\
 \n\
from sortedcontainers import SortedList \n\
# s = SortedList([1,2,3]) \n\
mod = 10**9+7";

    const HEADER_CPP = 'string to_string(string s) { return \'"\' + s + \'"\'; }\n\
string to_string(const char *s) { return to_string((string) s); }\n\
string to_string(bool b) { return (b ? "true" : "false"); }\n\
string to_string(short s) { return to_string((int)s); }\n\
template<typename A, typename B>\n\
string to_string(pair<A, B> p) {\n\
    string sA = to_string(p.first), sB = to_string(p.second);\n\
    return "(" + sA + "," + (sA.length()>7?"\\n":" ") + sB + ")";\n\
}\n\
template<typename A, typename B, typename C>\n\
string to_string(tuple<A, B, C> t){\n\
    string sA = to_string(get<0>(t)), sB = to_string(get<1>(t)), sC = to_string(get<2>(t));\n\
    return "(" + sA + "," + (sA.length()>7?"\\n":" ") + sB + "," + (sB.length()>7?"\\n":" ") + sC + ")";\n\
}\n\
template<typename A>string to_string(A v) {\n\
    bool first = true;\n\
    string res = "{";\n\
    for(const auto &x : v) {\n\
        if(!first) { res += ", "; }\n\
        first = false;\n\
        res += to_string(x);\n\
    }\n\
    res += "}";\n\
    return res;\n\
}\n\
void debug() { cout << endl; }\n\
template<typename Head, typename... Tail>\n\
void debug(Head H, Tail... T) {\n\
    cout << " " << to_string(H);\n\
    debug(T...);\n\
}\n\
// __attribute__((no_sanitize("all")))\n\
static int x=[](){\n\
    std::ios::sync_with_stdio(false);\n\
    cin.tie(NULL);\n\
    return 0;\n\
}();\n\
const int mod = 1000000007;\n\
const double pi = 3.1415926535898;\n\
typedef long long ll;';

    function log(a){
        console.log("leetcode-extention: ",a)
    }

    function checkHeader(code, lang){    // check if the code needs to add header.
        if(lang==="python3"){
            return code.substr(0, 5)!=="#####";
        }
        else if(lang==="cpp"){
            return code.substr(0, 5)!=="/////";
        }
        return false;
    }

    function addHeader(code, lang){
        if(lang==="python3"){
            return '##### Template \n'
            + HEADER_PY
            + ' \n\n##### Solution \n'
            + code
            + '\t\t\n\n\n';
        }
        else if(lang==="cpp"){
            return '///// Template \n'
            + HEADER_CPP
            + ' \n\n///// Solution \n'
            + code
            + '\t\t\n\n\n'
        }
    }

    function doModel(m){
        let lang = m._languageIdentifier.language;

        monaco.languages.setLanguageConfiguration(lang,{autoClosingPairs:[],surroundingPairs:[]});
        log("SUCCESS: set autoBracketing=False for "+lang);
        
        let now = m.getValue();
        if(checkHeader(now, lang)){
            m.setValue(addHeader(now, lang));
        }
    }

    setTimeout(()=>{
        if(window.monaco){
            let m = monaco.editor.getModels()[0];
            doModel(m);

            monaco.editor.onDidChangeModelLanguage((e)=>{
                setTimeout(()=>{
                    let m = e.model;
                    doModel(m);
                }, 400);
            });
        }
    }, 2400);

    if(window.pageData) {
        let cpp_code = pageData.codeDefinition[0].defaultCode;
        pageData.codeDefinition[0].defaultCode = (
            addHeader(cpp_code, 'cpp')
            );
        let python3_code = pageData.codeDefinition[3].defaultCode;
        pageData.codeDefinition[3].defaultCode = (
            addHeader(python3_code, 'python3')
            );
    }
}

$(()=>{
    scriptContent = doit.toString() + ';doit();';
    var script = document.createElement('script');
    script.id = 'leetcode-extention-js';
    script.appendChild(document.createTextNode(scriptContent));
    document.documentElement.appendChild(script);
});
