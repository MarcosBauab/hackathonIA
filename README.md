# Geração de Cronograma de Estudos Personalizado com CalendarAI

Bem-vindo ao projeto **CalendarAI**, uma aplicação que utiliza a poderosa API da OpenAI para criar um cronograma de estudos totalmente adaptado às suas necessidades e objetivos. Vamos mergulhar neste código incrível que combina tecnologia e aprendizado de maneira inteligente. Acompanhe a explicação passo a passo:

## 1. Configuração Inicial

O pontapé inicial do nosso projeto é como sintonizar os instrumentos antes de uma apresentação. Importamos duas peças-chave: `dotenv` e `axios`. O `dotenv` lida com informações sensíveis, como chaves de API, enquanto o `axios` é a nossa ferramenta para fazer requisições HTTP.

## 2. Estruturas de Tópicos

Imagine os tópicos de estudo como os blocos de construção do conhecimento. Criamos três grupos de tópicos: básico, intermediário e avançado. Esses grupos são como as fundações sobre as quais vamos construir o seu cronograma personalizado.

## 3. Ordenando Tópicos de Estudo

Aqui está onde a mágica acontece. Nós criamos um prompt que é como ter uma conversa com a OpenAI. Nós fornecemos os tópicos de estudo de todos os níveis e pedimos à API para classificá-los com base na sua relevância para um objetivo específico, como uma entrevista de emprego, por exemplo.

## 4. Criando a Ordem dos Tópicos

Com a ajuda da OpenAI, recebemos de volta uma lista maravilhosamente organizada de tópicos. Imagine isso como uma playlist personalizada para o seu sucesso educacional.

## 5. Configurando o Seu Cronograma

Agora é hora de construir o seu cronograma de estudos. Você define o tempo que tem disponível por dia, os dias que pode estudar e uma breve descrição do seu perfil. É como montar um quebra-cabeça único para o seu sucesso.

## 6. Gerando o Cronograma

Lembra da conversa com a OpenAI? Agora, estamos pedindo a ela para criar o cronograma perfeito para você. Ela pega a ordem dos tópicos, suas preferências de tempo e perfil e gera um cronograma em JSON sob medida que é utilizado para gerar o seu calendário personalizado.

## 7. Explorando o Seu Novo Cronograma

Agora com base nas configurações e a estrutura do seu cronograma, montamos o calendário personalizado para a sua experiência de aprendizado de um novo idioma.

Este projeto é uma fusão de inteligência artificial e educação, oferecendo um cronograma de estudos que se adapta a você e às suas metas.

## Código Exemplo

Aqui está um exemplo do código que utiliza a API da OpenAI para gerar o cronograma personalizado:

```javascript
// Código para ordenar tópicos de estudo com base no objetivo de estudar o idioma
const prompt1Structure = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": basic}, //Carrega os tópicos de nível básico
    {"role": "system", "content": intermediate}, //Carrega os tópicos de nível intermediário
    {"role": "system", "content": advanced}, //Carrega os tópicos de nivel avançado
    {"role": "system", "content": promptToOrder} //Envia um prompt para a API que ordena os dados com base na relevância e importância no contexto do objetivo selecionado
  ],
  max_tokens: 2048,
  temperature: 0.3,
})

async function orderTopicsByParameters() {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', prompt1Structure, {headers})
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Erro na requisição:', error.response.data)
  }
}

// Código para gerar o cronograma com base nos parâmetros definidos
const prompt2Structure = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": promptToJSON} //Envia o prompt responsável por organizar o cronograma e gera o json que é utilizado para gerar o calendário
  ],
  max_tokens: 2048,
  temperature: 0.25,
})

async function divideTopics() {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', prompt2Structure, {headers})
    console.log(response.data.choices[0].message.content)
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Erro na requisição:', error.response.data)
  }
}