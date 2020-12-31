function archFront(props){
    const title = document.querySelector('title')
    const body = document.querySelector('body')
    let htmlBody = body.innerHTML
    let htmlTitle = title.innerHTML
    title.innerHTML = assing(props,htmlTitle)
    body.innerHTML = assing(props,htmlBody)
}

function assing(props,HTML){
    let html = new String(HTML)
    html =  html.replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    let variaveis = criateVariables(props)
    while (html.includes('{{'))html =  html.replace('{{','${')
    while (html.includes('}}'))html =  html.replace('}}','}')
    let cod = "html +=`"
    let codMethod = ""
    let isMethod = false
    let hasFunction = true
    if(!html.includes('%}')){
        hasFunction = false
    }
    for (let i = 0; i < html.length; i++){
        const tagStart = html[i] + html[i + 1]
        const tagEnd = html[i - 1] + html[i]
        
        if(!isMethod){
            if(tagStart != '{%'){
                cod += html[i]
            }
            if(tagStart == '{%'){
                isMethod = true
                codMethod += html[i] 
            }
        }
        else {
            codMethod += (html[i])
            if(tagEnd == '%}'){       
                isMethod = false
                codMethod += html[i + 1]
                codMethod += html[i + 2]
                if(codMethod.includes('end')){
                    cod+= codMethod.replace(codMethod,'`;}\n html+= `')           
                }
                else if(codMethod.includes('else')){
                    cod+= codMethod.replace(codMethod,'` }\n else{ \n html += `')
                }
                else if(codMethod.includes('elif')){
                    codMethod = codMethod.replace('{%','` }\n')
                    codMethod = codMethod.replace('elif','else if')
                    cod+= codMethod.replace('%}','{ \n html += `')
                }
                else{
                    codMethod = codMethod.replace('{%', '`;')
                    codMethod = codMethod.replace('%}', '{html += `')
                    cod += codMethod                      
                }
                codMethod = ""
            } 
        }
    }
    cod += '`'
    html = gear(variaveis,cod)
    return html
}

function criateVariables(props){
    let variaveis = ""
    variaveis += "let html = '';\n"
    for(let key in props){
        if(props[key][0] == '[' || props[key][0] == '{'){
            props[key] =  JSON.parse(props[key])
        }
        if(typeof(props[key]) == 'object') {
            props[key] = JSON.stringify(props[key])
            variaveis += `const ${key} = ${props[key].toString()};\n`
        }
        else{
            variaveis += `const ${key} = "${props[key]}";\n`
        }
    }
    return variaveis
}

function gear(variaveis,cod){
    const F = new Function(`${variaveis}
    ${cod}
    return html`)
    return F()
}