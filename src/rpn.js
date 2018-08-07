/*!
 * RPN.js
 * Copyright (C) 2018 Wender Oliveira
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * https://github.com/wendero/rpn.js
 */
class RPN {
    static Init() {
        if (!this.Loaded) {
            this.Loaded = true;
            this.OPERATORS = [
                "+", "-", "*", "/", ">", "<", "=", "==", "!=", "<>", ">=", "<=", "++", "--", "+=", "-=",
                "pop", "popx", "min", "max", "clr", "not", "!", "ret", "retif", "&", "&&", "and", "|", "||", "or", "if", "ife",
                "case", "end", "pi", "%", "^", "pow", "log", "round", "exp", "logb", "log10", "abs", "ucase",
                "lcase", "strfmt", "sum", "sumk", "sin", "cos", "tan", "acos", "asin", "atan", "sinh", "cosh", "tanh",
                "atan2", "ceiling", "ceil", "floor", "truncate", "trunc", "sqrt", "todate", "fromindex",
                "&gt;", "&lt;", "&amp;", "&amp;&amp;", "&lt;&gt;", "&lt;=", "&gt;=", "stringify", "parse", "data", "date", "perc"
            ];
            this.HTMLOPERATOR = [

            ]
        }
    }

    static Eval(rpn, objects) {
        this.Init();

        let data = objects ? objects : [];
        let split = rpn.split(' ');
        let stack = [];
        let blocks = {};

        for (let i = 0; i < split.length; i++) {
            let s = split[i];
            if (!isNaN(s)) {
                stack.push(Number.parseFloat(s));
                continue;
            } else if (this.OPERATORS.includes(s)) {
                switch (s) {
                    case "+":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a + b);
                            break;
                        }
                    case "-":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a - b);
                            break;
                        }
                    case "*":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a * b);
                            break;
                        }
                    case "/":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a / b);
                            break;
                        }
                    case "=":
                    case "==":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a == b);
                            break;
                        }
                    case "!=":
                    case "&lt;&gt;":
                    case "<>":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a != b);
                            break;
                        }
                    case "!":
                    case "not":
                        {
                            let b = stack.pop();
                            stack.push(!b);
                            break;
                        }
                    case "&":
                    case "&&":
                    case "&amp;":
                    case "&amp;&amp;":
                    case "and":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a && b);
                            break;
                        }
                    case "|":
                    case "||":
                    case "or":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a || b);
                            break;
                        }
                    case "&gt;":
                    case ">":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a > b);
                            break;
                        }
                    case "&lt;":
                    case "<":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a < b);
                            break;
                        }
                    case "&gt;=":
                    case ">=":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a >= b);
                            break;
                        }
                    case "&lt;=":
                    case "<=":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a <= b);
                            break;
                        }
                    case "+=":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a += b);
                            break;
                        }
                    case "-=":
                        {
                            let b = stack.pop();
                            let a = stack.pop();
                            stack.push(a -= b);
                            break;
                        }
                    case "++":
                        {
                            let b = stack.pop();
                            stack.push(b + 1);
                            break;
                        }
                    case "--":
                        {
                            let b = stack.pop();
                            stack.push(b - 1);
                            break;
                        }
                    case "pop":
                        {
                            stack.pop();
                            break;
                        }
                    case "popx":
                        {
                            let temp = [];
                            var x = stack.pop();
                            for (let ix = 0; ix < x; ix++) {
                                temp.push(stack.pop());
                            }

                            stack.pop();

                            while (temp.length > 0) {
                                stack.push(temp.pop());
                            }
                            break;
                        }
                    case "clr":
                        {
                            stack = [];
                            break;
                        }
                    case "max":
                        {
                            stack.push(Math.max(...stack));
                            break;
                        }
                    case "min":
                        {
                            stack.push(Math.min(...stack));
                            break;
                        }
                    case "ret":
                        {
                            return stack.pop();
                        }
                    case "retif":
                        {
                            let cond = stack.pop();
                            if (cond)
                                return stack.pop();
                            break;
                        }
                    case "pi":
                        stack.push(Math.PI);
                        break;
                    case "%":
                        {
                            let x = stack.pop();
                            let y = stack.pop();
                            stack.push(y % x);
                        }
                        break;
                    case "^":
                    case "pow":
                        {
                            let x = stack.pop();
                            let y = stack.pop();
                            stack.push(Math.pow(y, x));
                        }
                        break;
                    case "sqrt":
                        {
                            stack.push(Math.sqrt(stack.pop()));
                        }
                        break;
                    case "todate":
                        {
                            let format = stack.pop();
                            let value = stack.pop();

                            let dt = new Date(value);
                            let newFormat = format == 'default' ? "yyyy-MM-dd HH:mm:ss" : format;

                            let yyyy = dt.getFullYear();
                            let MM = (dt.getMonth() + 1).toString().padStart(2, '0');
                            let dd = (dt.getDate()).toString().padStart(2, '0');
                            let HH = (dt.getHours()).toString().padStart(2, '0');
                            let mm = (dt.getMinutes()).toString().padStart(2, '0');
                            let ss = (dt.getSeconds()).toString().padStart(2, '0');

                            stack.push(newFormat.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd).replace("HH", HH).replace("mm", mm).replace("ss", ss));
                        }
                        break;
                    case "date":
                        {
                            let len = stack.pop();
                            let parts = [];
                            for (let ix = 0; ix < len; ix++)
                                parts.push(stack.pop());
                            parts = parts.reverse();
                            parts[1]--;

                            let date = new Date(...parts);

                            stack.push(date);
                        }
                        break;
                    case "perc":
                        {
                            var a = stack.pop();
                            var b = stack.pop();
                            stack.push(Math.round(100 * a / b));
                        }
                        break;
                    case "fromindex":
                        {
                            let index = stack.pop();
                            let len = stack.pop();
                            let arr = [];
                            for (let ix = 1; ix <= len; ix++)
                                arr.push(stack.pop());

                            stack.push(arr[index]);
                        }
                        break;
                    case "log":
                        stack.push(Math.log(stack.pop()));
                        break;
                    case "abs":
                        stack.push(Math.abs(stack.pop()));
                        break;
                    case "round":
                        {
                            let x = Math.pow(10, stack.pop());
                            let y = stack.pop();
                            stack.push(Math.round(y * x) / x);
                        }
                        break;
                    case "exp":
                        stack.push(Math.exp(stack.pop()));
                        break;
                    case "logb":
                        {
                            let x = stack.pop();
                            let y = stack.pop();
                            stack.push(Math.log(y) / Math.log(x));
                        }
                        break;
                    case "log10":
                        {
                            stack.push(Math.log10(stack.pop()));
                        }
                        break;
                    case "sum":
                        {
                            let sum = 0;
                            while (stack.length > 0) {
                                let val = stack.pop();
                                sum += val;
                            }
                            stack.push(sum);
                        }
                        break;
                    case "sumk":
                        {
                            let sum = 0;
                            let k = stack.pop();
                            for (let ik = 0; ik < k; ik++) {
                                let val = stack.pop();
                                sum += val;
                            }
                            stack.push(sum);
                        }
                        break;
                    case "sin":
                        {
                            stack.push(Math.sin(stack.pop()));
                        }
                        break;
                    case "cos":
                        {
                            stack.push(Math.cos(stack.pop()));
                        }
                        break;
                    case "tan":
                        {
                            stack.push(Math.tan(stack.pop()));
                        }
                        break;
                    case "asin":
                        {
                            stack.push(Math.asin(stack.pop()));
                        }
                        break;
                    case "acos":
                        {
                            stack.push(Math.acos(stack.pop()));
                        }
                        break;
                    case "atan":
                        {
                            stack.push(Math.atan(stack.pop()));
                        }
                        break;
                    case "atan2":
                        {
                            let x = stack.pop();
                            let y = stack.pop();
                            stack.push(Math.atan2(y, x));
                        }
                        break;
                    case "sinh":
                        {
                            stack.push(Math.sinh(stack.pop()));
                        }
                        break;
                    case "cosh":
                        {
                            stack.push(Math.cosh(stack.pop()));
                        }
                        break;
                    case "tanh":
                        {
                            stack.push(Math.tanh(stack.pop()));
                        }
                        break;
                    case "ceil":
                    case "ceiling":
                        {
                            stack.push(Math.ceil(stack.pop()));
                        }
                        break;
                    case "trunc":
                    case "truncate":
                        {
                            stack.push(Math.trunc(stack.pop()));
                        }
                        break;
                    case "floor":
                        {
                            stack.push(Math.floor(stack.pop()));
                        }
                        break;
                    case "if":
                        {
                            let value = stack.pop();
                            let cond = stack.pop();
                            if (cond)
                                stack.push(value);
                            break;
                        }
                    case "ife":
                        {
                            let falseValue = stack.pop();
                            let trueValue = stack.pop();
                            let cond = stack.pop();
                            if (cond)
                                stack.push(trueValue);
                            else
                                stack.push(falseValue);
                            break;
                        }
                    case "case":
                        {
                            let caseTrue = stack.pop();
                            let caseValue = stack.pop();
                            let switchValue = stack[stack.length - 1];
                            if (caseValue == switchValue) {
                                stack.pop();
                                stack.push(caseTrue);
                                while (split[++i] != "end");
                            }
                            break;
                        }
                    case "end":
                        break;
                    case "ucase":
                        stack.push(stack.pop().toUpperCase());
                        break;
                    case "lcase":
                        stack.push(stack.pop().toLowerCase());
                        break;
                    case "stringify":
                        stack.push(JSON.stringify(stack.pop()));
                        break;
                    case "parse":
                        data.push(JSON.parse(stack.pop()));
                        break;
                    case "data":
                        data.push(stack.pop());
                        break;
                    // case "strfmt":
                    //     {
                    //         let str = stack.pop().replace("\\.", "&dot;");
                    //         let newStr = "";
                    //         let reverse = str.split("").reverse();
                    //         for (let ix = 0; ix < reverse.length; ix++) {
                    //             if (reverse[ix] == 'x')
                    //                 newStr = stack.pop() + newStr;
                    //             else if (reverse[ix] == '.')
                    //                 newStr = " " + newStr;
                    //             else
                    //                 newStr = reverse[ix] + newStr;
                    //         }

                    //         stack.push(newStr.replace("&dot;", "."));
                    //         break;
                    //     }
                    case "strfmt":
                        {
                            let str = stack.pop();
                            let rx = /{(\d*)}/gi;
                            let m;
                            let indexes = [];
                            do {
                                m = rx.exec(str);
                                if (m) indexes.push(m[1]);
                            } while (m);

                            let max = Math.max(...indexes);
                            for (let is = max; is >= 0; is--) {
                                let val = stack.pop();
                                str = str.replace(`{${is}}`, val);
                            }
                            stack.push(str);
                        }
                        break;
                }
            } else if (s.startsWith("@(")) {
                let str = [];
                s = s.substring(2);

                while (i < split.length) {
                    if (s.endsWith(')@')) {
                        s = s.slice(0, -2);
                        str.push(s);
                        let join = str.join(' ').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, " ");
                        data = eval(join)();
                        break;
                    }
                    str.push(s);
                    s = split[++i];
                }
            } else if (s.startsWith("@[")) {
                let str = [];
                s = s.substring(1);

                while (i < split.length) {
                    if (s.endsWith(']')) {
                        str.push(s);
                        let join = str.join(' ');
                        data = eval(join);
                        break;
                    }
                    str.push(s);
                    s = split[++i];
                }
            } else if (s.startsWith("`")) {
                let str = [];
                s = s.substring(1);

                while (i < split.length) {
                    if (s.endsWith('`')) {
                        s = s.slice(0, -1);
                        str.push(s);
                        let join = str.join(' ');
                        stack.push(join);
                        break;
                    }
                    str.push(s);
                    s = split[++i];
                }
            } else if (s.startsWith("$")) {
                let objSplit = s.replace("[", ".").replace("]", "").trim('.').split('.');
                let objIdx = Number(objSplit.shift().replace("$", ""));
                let obj = data[objIdx];

                if (objSplit.length > 0) {
                    let propname = objSplit.join('.');
                    let value = this.GetPropertyValue(propname, obj);
                    stack.push(value);
                } else {
                    stack.push(obj);
                }
            } else if (s.endsWith("%")) {
                s = s.slice(0, -1);
                console.log(s);
                let num = Number.parseFloat(s);
                let a = stack.pop();
                let b = a * (num / 100);
                stack.push(a);
                stack.push(b);
                continue;
            } else if (s.startsWith("@@")) {
                let value = RPN.Eval(blocks[s], data);
                stack.push(value);
            } else if (s.startsWith("@")) {
                let label = s;
                let list = [];

                s = split[++i];
                while (s != label) {
                    list.push(s);
                    s = split[++i];
                }
                blocks["@" + label] = list.join(" ");
            } else if (s == "true" || s == "false") {
                stack.push(s == "true");
            } else if (s == "...") {
                let prop = stack.pop();
                let arr = stack.pop();
                for (let k = 0; k < arr.length; k++) {
                    let val = this.GetPropertyValue(prop, arr[k]);
                    stack.push(val);
                }
            } else {
                stack.push(s);
            }
        }
        return stack.pop();
    }
    static GetPropertyValue(propertyName, obj) {
        if (obj == null)
            return null;
        let split = propertyName.replace("[", ".").replace("]", "").split('.');
        let _obj = obj;
        split.forEach(s => {
            _obj = _obj[s];
        });
        return _obj;
    }
}