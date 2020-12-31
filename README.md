# Arch Front <h1>
### **Resumo** <h3>
Arch front é uma ferramenta para ser usada em html junto com javascript, ele possibilitar utilizar codigos javascrit direto no html

#### **Implementação** <h4>
<p> Para utilizar o Arch Front é necessario importar o arquivo archFront.js no seu html,, é importante que o archFront deve ser importado antes de qualquer outro script
<p> No seu javaScript devem ser enviadas as variaveis que devem ser lidas no html, para isso utilize a função archFront() como no exemplo abaixo:<br>
<b> É muito importante enviar as variaveis para o archFront em um json, pois ele aceita apenas este tipo de variavel</b>

```
    const variavel = {
        nome:'Antônio',
        sobreNome:'Carlos'
    }

    archFront(variavel)
```

<p> E no seu html utilize os seguintes codigos para ler as variaveis:



```
<li>O seu nome é {{nome}} {{sobreNome}}</li>
```
o Resultado sera:
<li>O seu Nome é Antônio Carlos</li>
<br>

### **codigos** <h3>
<p>O archFront ira identificar as tags que estejam apenas dentro do body, ou do title. Pode ser usada qualquer metodo tradicional do javascript utilizando os exemplos que serão listados.</p>

#### **tags** <h4>
<p>As seguintes tags devem ser utilizadas para indicar ao ardhFront os codigos que devem ser utilizados</p>
<p>{{ variavel }} esta tag deve ser utilizada apenas para as variaveis que são enviadas para o html pelo archFront, tambem podem ser utilizadas expressões nas variaveis, como por exemplo {{ n1 + n2 }}, {{ parseInt(n1) }}, {{ n1.toFixed(2) }} e assim port diante, porem como ja foi dito, esta tag é para ser utilizada apenas com as variaveis enviadas, não serão novas funções que podem estar dentro das tags</p>
<br>
<p>{% metodo %} esta tag deve ser utilizada para qualquer metodo padrão do javascript, como por exemplo for, while, if, else e assim por diante, apenas diferenciando, o else if,  deve ser escrito como elif, ao final de cada expressão deve ser utilizado {% end %} indicando que é o fim daquele bloco de comando, abaixo estão alguns exmplos de como deve ser utilizadas as tags
</p>


#### **if** <h4>
```
{% if(nome == 'Antônio') %}
    <li>O seu nome é {{nome}} {{sobreNome}}</li>
{% end %}
```

#### **else** <h4>
```
{% if(nome == 'Antônio') %}
    <li>O seu nome é {{nome}} {{sobreNome}}</li>
{% else %}
    <li>Não conhecemos você</li>
{% end %}
```

#### **else if** <h4>
```
{% if(nome == 'Antônio') %}
    <li>O seu nome é {{nome}} {{sobreNome}}</li>
{% elif (sobreNome == 'Carlos') %}
    <li>Sabemos que o seu sobre nome é {{sobreNome}}</li>
{% else%}
    <li>Não conhecemos você</li>
{% end %}
```

#### **for** <h4>
<p> Para o comando for, utilizaremos a seguinte variavel javascript

```
const variavel = {
    nomes:[
        {nome:'Antônio'},
        {nome:'Carlos'},
        {nome:'Claudia'}
    ]
}

archFront(variavel)
```
<p> E no html:

```
{% for(let i = 0; i < nomes.length; i++) %}
    <li>{{nomes[i]['nome']}}</li>
{% end %}
```
o resultado será:
<li>Antônio</li>
<li>Carlos</li>
<li>Claudia</li>
<br>

#### **Funções aninhadas** <h4>

```
{% for(let i = 0; i < nomes.length; i++) %}
    {% if(nomes[i]['nome'] == 'Antônio') %}
        <li>{{nomes[i]['nome']}}</li>
    {% end %}
{% end %}
```

<p>O Resultado será:

<li>Atônio</li>


