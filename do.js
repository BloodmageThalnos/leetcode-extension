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
    int count = 0;\n\
    string res = "{";\n\
    for(const auto &x : v) {\n\
        if(count++) { res += ", "; }\n\
        if(count>3 && res.length()>160) { res += ".."; break;}\n\
        res += to_string(x);\n\
    }\n\
    return res + \'}\';\n\
}\n\
#define DEBUG_1(WHAT, X) WHAT(X) \n\
#define DEBUG_2(WHAT, X, ...) WHAT(X)DEBUG_1(WHAT, __VA_ARGS__)\n\
#define DEBUG_3(WHAT, X, ...) WHAT(X)DEBUG_2(WHAT, __VA_ARGS__)\n\
#define DEBUG_4(WHAT, X, ...) WHAT(X)DEBUG_3(WHAT, __VA_ARGS__)\n\
#define DEBUG__(_0,_1,_2,_3,_4,NAME,...) NAME \n\
#define DEBUG_IMPL(x) debug_impl(#x, x);\n\
#define debug(...) DEBUG__(_0,__VA_ARGS__,DEBUG_4,DEBUG_3,DEBUG_2,DEBUG_1)(DEBUG_IMPL,__VA_ARGS__)\n\
template<typename T>\n\
void debug_impl(const char* name, T x) {\n\
    cout << name << " " << to_string(x) << endl;\n\
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
            + '\t\t\n\n\n\n\n\n\n\n\n';
        }
        else if(lang==="cpp"){
            return '///// Template \n'
            + HEADER_CPP
            + ' \n\n///// Solution \n'
            + code
            + '\t\t\n\n\n\n\n\n\n\n\n'
        }
    }

    function autoEdit(code, lang){
        if(lang==="cpp"){
            let regex = /(?<prefix>(\/\*[^\/]+\/\n)?class (?<class_name>[a-zA-Z0-9]*) {\npublic:\s*(?<return_type>[a-zA-Z0-9<>\*&]*) (?<func_name>[a-zA-Z0-9]*)\((?<parameters>.*)\) {\n)\s*\n(?<postfix> +}\s*}[\s\S]*)/g;
            result = regex.exec(code);
            if(result){
                console.log(result.groups);
                data = result.groups; // class_name, return_type, func_name, parameters
                return_type = data.return_type;
                func_name = data.func_name;
                parameters = data.parameters;
                let regex2 = /(?<type>[a-zA-Z0-9<>\*&]+) (?<var>[a-zA-Z0-9]+)/g;
                para_list = []
                for(let result2; result2 = regex2.exec(parameters);){
                    para_list.push([result2.groups?.type, result2.groups?.var]);
                }
                console.log(return_type, func_name, para_list);
                
                generated = "";
                add_line = (x)=>{
                    generated += '        '+x+'\n';
                };
                add_lines = (x)=>x.split('\n').forEach((y)=>{
                    add_line(y);
                });
                
                // Generate  *.size()  for vectors and strings
                let one_dimention_types = ["vector<int>", "vector<double>", "string"];
                let two_dimention_types = ["vector<vector<int>>", "vector<string>"];
                let siz_var_count = 0;
                get_var_name = ()=>{
                    if(++siz_var_count==1) return "n";
                    return "n"+siz_var_count;
                };
                for(let i in para_list){
                    let type = para_list[i][0], name = para_list[i][1];
                    for(let j of one_dimention_types){
                        if(type.indexOf(j) == 0){
                            add_line(`int ${get_var_name()} = ${name}.size();`);
                        }
                    }
                    for(let j of two_dimention_types){
                        if(type.indexOf(j) == 0){
                            add_line(`int ${get_var_name()} = ${name}.size();`);
                        }
                    }
                }

                // Generate return value;
                if(return_type !== "void"){
                    if(return_type === "int" || return_type === "long long" || return_type === "double"){
                        add_line(`${return_type} ans = 0;`);
                    }
                    else if(return_type === "string"){
                        add_line(`${return_type} ans = "";`);
                    }
                    else if(return_type[return_type.length-1] === '*'){
                        add_line(`${return_type} ans = NULL;`);
                    }
                    else{
                        add_line(`${return_type} ans = {};`);  // although {} should work in all cases, 0 and "" would be clearer to read.
                    }
                }
                add_lines("\n");
                if(return_type != "void"){
                    add_line(`return ans;`);
                }
                console.log(generated);

                return data.prefix + generated + data.postfix;
            }
        }
        return code;
    }

    function set_checked(dom){
        if(!$(dom).prop('checked')) $(dom).click();
    }

    function change_react_value(input, value){
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            input.__proto__, "value").set;
        nativeInputValueSetter.call(input, value);
    
        var inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
    }

    function doModel(m){
        let lang = m._languageIdentifier.language;

        monaco.languages.setLanguageConfiguration(lang,{autoClosingPairs:[],surroundingPairs:[]});
        log("SUCCESS: set autoBracketing=False for "+lang);
        
        let code = m.getValue();
        if(checkHeader(code, lang)){
            //m.setValue(autoEdit(code, lang));
            m.setValue(addHeader(autoEdit(code, lang), lang));
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
    }, 3000);

    if(window.pageData) {
        let cpp_code = pageData.codeDefinition[0].defaultCode;
        pageData.codeDefinition[0].defaultCode = (
            addHeader(cpp_code, 'cpp')
            );
        let python3_code = pageData.codeDefinition[3].defaultCode;
        pageData.codeDefinition[3].defaultCode = (
            addHeader(python3_code, 'python3')
            );

        setTimeout(()=>{
            let source = pageData.questionSourceContent.replace(/<[^>]*>?/gm, '');
            let test_input = "";
            let get_inputs = /Input:(.*)\n/g;
            for(let result; result = get_inputs.exec(source);){
                content = result[1];
                let get_value = / = (\[.*\]|".*"|[0-9]+)/g;
                for(let result2; result2 = get_value.exec(content);){
                    value = result2[1];
                    test_input += value + '\n';
                }
            }
            console.log(test_input);
            if(test_input){
                set_checked('#custom_testcase');
                let target = $('.testCaseInputArea');
                change_react_value(target[0], test_input);
            }
        }, 3000);
    }
}

$(()=>{
    scriptContent = doit.toString() + ';doit();';
    var script = document.createElement('script');
    script.id = 'leetcode-extention-js';
    script.appendChild(document.createTextNode(scriptContent));
    document.documentElement.appendChild(script);
});
