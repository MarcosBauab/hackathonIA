/**
 * Este script faz solicitações à API da OpenAI para gerar um cronograma de estudos com base em tópicos de estudo baseados no nível do idioma e perfis de usuários.
 *
 * O script utiliza as respostas da API para criar um cronograma de estudos personalizado, distribuindo os tópicos de acordo com a relevância e o tempo disponível.
 * O cronograma é gerado em formato JSON e contém informações sobre os tópicos a serem estudados, o tempo dedicado a cada tópico, atividades recomendadas e sugestões de conteúdo relacionado.
 *
 * Requer o uso da biblioteca 'axios' para realizar solicitações HTTP à API da OpenAI.
 *
 * @module orderTopicsByParameters
 * @module divideTopics
 * @requires axios
 * @requires dotenv
 * @requires process
 * @requires OPENAI_API_KEY
 * @requires headers
 * @requires basic
 * @requires intermediate
 * @requires advanced
 * @requires timeToFinish
 * @requires daysToStudy
 * @requires timePerDay
 * @requires profile
 * @requires orderedTopics
 * @requires promptToJSON
 * @requires prompt1Structure
 * @requires prompt2Structure
 * @exports {Function} orderTopicsByParameters - Gera um cronograma de estudos com base nos parâmetros fornecidos.
 * @exports {Function} divideTopics - Gera um cronograma de estudos em formato JSON com base nas respostas da API da OpenAI.
 */

require('dotenv').config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const axios = require('axios')

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + OPENAI_API_KEY,
}

const basic = `   
            Principais tópicos de nível básico:
            Alphabet and Numbers: Learning the pronunciation of alphabet letters and basic numbers.
            Greetings: Expressions for greeting and bidding farewell in different situations.
            Pronouns: Introduction to personal pronouns (I, you, he/she/it, we, they).
            Verbs: Basic forms of verbs (to be, to have, to do), regular and irregular verbs in the present.
            Articles: Use of definite articles (the) and indefinite articles (a, an).
            Nouns: Identification of nouns and their gender (masculine/feminine).
            Adjectives: Basic understanding of adjectives for simple descriptions.
            Days, Hours, and Dates: Names of the days of the week, expression of hours, and basic dates.
            Colors: Names of basic colors and their descriptions.
            Food: Vocabulary related to simple foods and beverages.
            Everyday Expressions: Useful phrases for everyday situations.
            `
const intermediate = `    
                  Principais tópicos de nível intermediário:
                  Adverbs: Different types of adverbs, adverbs of frequency, adverbs of manner, adverbs of place, adverbs of time.
                  Simple Present: Formation and usage of simple present tense, affirmative, negative, and interrogative sentences.
                  Present Continuous: Forming present continuous tense, using it to describe ongoing actions.
                  Present Perfect: Understanding the present perfect tense, its usage for past actions with present relevance.
                  Present Perfect Continuous: Usage and formation of present perfect continuous tense.
                  Reported Speech: Transforming direct speech into reported speech, changes in tenses and pronouns.
                  Revision with Texts: Review and practice through reading comprehension.
                  Adverbs: Exploring adverbs of degree, frequency, manner, place, and time.
                  Simple Past: Formation and usage of simple past tense, regular and irregular verbs.
                  There Was/There Were: Using 'there was' and 'there were' to describe existence.
                  Simple Past Continuous: Forming and using past continuous tense to describe ongoing actions in the past.
                  Past Perfect: Understanding and applying past perfect tense.
                  Passive Voice: Formation of passive voice, changing active sentences into passive.
                  Word Order: Sentence structure and word order in English.
                  False Cognates: Identifying and understanding false cognates.
                  Conjunctions: Different types of conjunctions and their usage in sentences.
                  Simple Future: Formation and use of simple future tense.
                  Future Continuous: Understanding and using future continuous tense.
                  Simple Conditional: Formation and usage of simple conditional sentences.
                  If/Whether: Differentiating between 'if' and 'whether' in sentences.
                  Phrasal Verbs I: Introduction to phrasal verbs and their meanings.
                  Phrasal Verbs II: Advanced phrasal verbs and their contexts.
                  The Imperative/The Infinitive: Using the imperative mood and infinitive forms of verbs.
                  Many/Much/Few/Little: Usage of quantifiers.
                  `
const advanced = `
            Principais tópicos de nível avançado:
            Also/Too/Either/Neither/Both: Usage and differences between these expressions.
            Relative Clauses: Understanding and forming relative clauses in sentences.
            The Possessive Case: In-depth study of the possessive case.
            Had Better/Would Rather: Exploring the use of these expressions for advice and preferences.
            Anomalous Verbs 1: Study of irregular verb forms.
            Anomalous Verbs 2: Further exploration of irregular verbs and their forms.
            The Gerund: Comprehensive understanding and usage of gerund forms.
            Reading and Comprehension: Advanced reading exercises for deeper comprehension.
            Oral Production: Practice in spoken language to enhance fluency.
            Written Production: Developing complex writing skills for various purposes.
            Listening Production: Advanced listening exercises to improve comprehension.
            `

// - Setting enviroment
//Test
let language = "Inglês"
let level = "Básico"
let goal = "Entrevista de emprego"
let promptToOrder = `Ordene os tópicos salvos de estudo de ${language} de nível ${level} com base na importância e relevância para se preparar para ${goal} seguindo uma ordem de estudo relacionada ao contexto do ${goal}. 
                    Garanta uma ordem consistente para que a classificação seja uniforme em todas as consultas. 
                    Após a análise dos dados, liste os itens ordenados de acordo com a classificação determinada e implemente a descrição de cada tópico com base no contexto ${goal}.
                    Dica para garantir consistência: considere o impacto direto do tópico e relevância na sua preparação para a ${goal} e dê prioridade aos tópicos que fornecem uma base sólida e direcionada ao contexto do ${goal}.

                    Após a análise dos dados, liste os itens ordenados de acordo com a classificação determinada. Esta ordem deve permanecer consistente para todas as consultas subsequentes.
                    Por exemplo, para um nível intermediário, com uma prova ou vestibular como objetivo, uma saída plausível seria com uma descrição completa e descritiva:
                    1. Revision with Texts: Revisão e prática por meio de exercícios de compreensão de leitura. (Essa atividade ajuda a desenvolver habilidades de leitura e compreensão, que são essenciais para a Prova ou vestibular.)
                    2. Simple Present: Formação e uso do tempo presente simples, frases afirmativas, negativas e interrogativas. (O tempo presente é amplamente utilizado na língua inglesa e é importante para a comunicação básica.)
                    3. Simple Past: Formação e uso do tempo passado simples, verbos regulares e irregulares. (O tempo passado é frequentemente usado para descrever eventos passados, o que pode ser relevante para a Prova ou vestibular.)
                    4. Present Continuous: Formação do tempo presente contínuo, uso para descrever ações em andamento. (O tempo presente contínuo é útil para descrever ações que estão acontecendo no momento, o que pode ser relevante para a Prova ou vestibular.)
                    5. Present Perfect: Compreensão do tempo presente perfeito, uso para ações passadas com relevância no presente. (O tempo presente perfeito é usado para descrever ações que ocorreram em algum momento no passado, mas têm relevância no presente, o que pode ser útil para a Prova ou vestibular.)
                    6. Simple Future: Formação e uso do tempo futuro simples. (O tempo futuro é usado para descrever ações que ocorrerão no futuro, o que pode ser relevante para a Prova ou vestibular.)
                    7. Passive Voice: Formação da voz passiva, transformando frases ativas em passivas. (A voz passiva é usada para enfatizar o objeto da ação em vez do sujeito, o que pode ser útil para a Prova ou vestibular.)
                    8. Relative Clauses: Compreensão e formação de orações relativas em frases. (As orações relativas são usadas para fornecer informações adicionais sobre um substantivo, o que pode ser relevante para a Prova ou vestibular.)
                    9. Reported Speech: Transformação do discurso direto em discurso indireto, mudanças nos tempos verbais e pronomes. (O discurso indireto é usado para relatar o que alguém disse, o que pode ser útil para a Prova ou vestibular.)
                    10. Phrasal Verbs I: Introdução aos phrasal verbs e seus significados. (Os phrasal verbs são comumente usados na língua inglesa e podem ser relevantes para a Prova ou vestibular.)
                    11. Phrasal Verbs II: Phrasal verbs avançados e seus contextos. (Aprofundamento no estudo dos phrasal verbs, o que pode ser útil para a Prova ou vestibular.)
                    12. Word Order: Estrutura de frases e ordem das palavras em inglês. (A ordem das palavras em inglês pode ser diferente da do português, e entender isso é importante para a Prova ou vestibular.)
                    13. Conjunctions: Diferentes tipos de conjunções e seu uso em frases. (As conjunções são usadas para conectar palavras, frases ou cláusulas, o que pode ser relevante para a Prova ou vestibular.)
                    14. False Cognates: Identificação e compreensão de falsos cognatos. (Falsos cognatos são palavras que parecem semelhantes em diferentes idiomas, mas têm significados diferentes, o que pode ser útil para a Prova ou vestibular.)
                    15. The Imperative/The Infinitive: Uso do modo imperativo e formas infinitivas de verbos. (O modo imperativo é usado para dar ordens ou fazer pedidos, o que pode ser relevante para a Prova ou vestibular.)
                    16. Many/Much/Few/Little: Uso de quantificadores. (Os quantificadores são usados para expressar quantidade, o que pode ser útil para a Prova ou vestibular.)
                    
                    Sua resposta deve conter apenas a lista ordenada`

const prompt1Structure = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": basic},
    {"role": "system", "content": intermediate},
    {"role": "system", "content": advanced},
    {"role": "system", "content": promptToOrder}
  ],
  max_tokens: 2048,
  temperature: 0.3,
})

async function orderTopicsByParameters() {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', prompt1Structure, {headers})
    //console.log(response.data.choices[0].message.content)
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Erro na requisição:', error.response.data)
  }
}

// - Configure timeline
//Test
let timeToFinish = "4 semanas"
let daysToStudy = "Segunda-feira, Terça-feira"
let timePerDay = "60 minutos"
let profile = `Me chamo Otávio, tenho 17 anos e ainda estou no ensino médio e estou em busca da minha primeira oportunidade de emprego, gosto muito de séries de comédia e da lingua inglesa, quero aprender ingles para poder conseguir meu primeiro emprego e de preferência na área da saúde
               pois tenho vontade de cursar medicina futuramente`
const orderedTopics = orderTopicsByParameters()
const promptToJSON = `Sua missão é gerar um cronograma de estudos com base nas seguintes informações:
                      - Tópicos ordenados por relvancia: ${orderedTopics}
                      - Tempo para finalizar o curso: ${timeToFinish}
                      - Dias da semana disponíveis para estudar: ${daysToStudy}
                      - Horário disponível por dia: ${timePerDay}
                      - Recomendação de conteúdo baseada no perfil: ${profile}
                      Utilize essas informações para criar um cronograma que distribui o estudo dos tópicos ao longo do período de tempo definido.
                      Não é obrigatório abranger todos os tópicos dentro do período, apenas mantenha uma consistência e qualidade nas sessões de estudo diárias mas mantenha a sequência da lista de tópicos ${orderedTopics}.
                      Priorize os tópicos de acordo com a relevância (Os tópicos já estão ordenados com base no objetivo).
                      Leve em consideração que o tempo de estudo diário deve ser distribuído entre teoria e prática e o tempo disponível por dia.
                      A recomendação de conteúdo deve ser baseada no perfil do usuário, ou seja, as recomendações devem se basear nos gostos, hobbies, objetivos, idade e outras características do usuário de modo a condizer com 
                      os tópicos de estudo sugeridos, relevância dentro dos temas e modo de fala do usuário e note que a recomendação não deve ser genérica mas sim mostrar conteúdo real como programas, livros, series, filmes ou músicas que abrangem os gostos do usuário. 
                      Não recomende softwares de aprendizado de idiomas, ou conversação, pois esse não é o objetivo.
                      As recomendações devem se ater aos tópicos e caracteristicas do perfil disponibilizado.
                      Os tópicos contidos no subject devem ser os presentes na lista de tópicos ${orderedTopics}.
                      O JSON deve conter {} no início e final, obrigatóriamente.
                      O cronograma deve estar em um formato json que siga o estritamente a estrutura do seguinte exemplo:
                      // -- Exemplo -- 
                      Exemplo resposta:
                      perfil:
                      Idioma: Inglês,
                      Nível: Intermediário,
                      Objetivo: Entrevista de emprego,
                      Tempo para o curso: 2 semanas,
                      Dias disponíveis: Segunda, Terça, Quinta,
                      Tempo disponível por dia: 20 minutos,
                      Conversa com usuário : Sou estudante de ciência da computação, trabalho com sistemas embarcados em uma empresa de aviação
                                                                    e tenho grande interesse em desenvolvimento de sofware e programação e esse é meu principal hobbie, 
                                                                    gosto bastante de filmes e o principal objetivo de estudar inglês é aprimorar meus conhecimentos
                                                                    e buscar uma oportunidade de emprego internacional.
                      json:
                      {
                        "weekOne": {
                            "Segunda-feira": {
                                "weekDay": "Segunda-feira",
                                "time": "20 minutos",
                                "subject": "Presente Simples: Formação e uso do tempo presente simples, frases afirmativas, negativas e interrogativas.",
                                "activities": [{
                                        "content": "Ver material teórico"
                                    },
                                    {
                                        "content": "Fazer exercícios"
                                    }
                                ]
                            },
                            "Terça-feira": {
                                "weekDay": "Terça-feira",
                                "time": "20 minutos",
                                "subject": "Passado Simples: Formação e uso do tempo passado simples, verbos regulares e irregulares.",
                                "activities": [{
                                        "content": "Ver material teórico"
                                    },
                                    {
                                        "content": "Fazer exercícios"
                                    }
                                ]
                            },
                            "Quinta-feira": {
                                "weekDay": "Quinta-feira",
                                "time": "20 minutos",
                                "subject": "Presente Contínuo: Formação do tempo presente contínuo e seu uso para descrever ações em andamento.",
                                "activities": [{
                                        "content": "Ver material teórico"
                                    },
                                    {
                                        "content": "Fazer exercícios"
                                    }
                                ]
                            }
                        },
                    
                        "weekTwo": {
                            "Segunda-feira": {
                                "weekDay": "Segunda-feira",
                                "time": "20 minutos",
                                "subject": "Advérbios: Diferentes tipos de advérbios, advérbios de frequência, advérbios de modo, advérbios de lugar, advérbios de tempo.",
                                "activities": [{
                                        "content": "Ver material teórico"
                                    },
                                    {
                                        "content": "Fazer exercícios"
                                    }
                                ]
                            },
                            "Terça-feira": {
                                "weekDay": "Terça-feira",
                                "time": "20 minutos",
                                "subject": "Ordem das Palavras: Estrutura de frases e ordem das palavras em inglês.",
                                "activities": [{
                                        "content": "Ver material teórico"
                                    },
                                    {
                                        "content": "Fazer exercícios"
                                    }
                                ]
                            },
                            "Quinta-feira": {
                                "weekDay": "Quinta-feira",
                                "time": "20 minutos",
                                "subject": "Conversação: Fala e Escuta",
                                "activities": [{
                                        "content": "Praticar speaking"
                                    },
                                    {
                                        "content": "Praticar listening"
                                    }
                                ]
                            }
                        },
                        "recomendations": "Aqui esta seu cronograma!!organizado com base no seu tempo disponível e seu objetivo de se preparar para as suas entrevistas de emprego, vale ressaltar que é interessante atrelar seus estudos ao tema e área de atuação das diferentes empresas das quais for fazer entrevista. Além disso, para auxliar nos seus estudos, pode ser que você goste desses conteúdos: •Jobs(2013) um filme biográfico sobre a vida de Steve Jobs, que pode ser uma fonte de motivação pra você que deseja ter sucesso na industria de tecnologia e praticar seu Listening• Participar de discussões em fóruns como o Stack Overflow vai te auxiliar a resolver problemas de programação enquanto aprimora sua comunicação em inglês técnico.•Para aprimorar sua escrita, você pode escrever artigos sobre programação em inglês e publicar em plataformas como o Medium, assim você pratica sua escrita e compartilha conhecimento com a comunidade."
                      }
                      Note que acima esta apenas um exemplo hipotético de perfil e parametros. Você deve construir o json utilizando os itens e tópicos de ${orderedTopics} visando preencher o período de estudo seguindo a ordem de relevância predefinida na lista.
                      Sua resposta deve conter apenas o json.`

const prompt2Structure = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": promptToJSON}
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

divideTopics()



module.exports = orderTopicsByParameters;
module.exports = divideTopics;