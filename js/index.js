const OPENAI_API_KEY = "";

let idioma = "inglês"
let nivel = "básico"
let tempoAprendizado = "3 semanas"
let diasSemana = "Segunda-feira, Terça-Feira, Quinta-feira"
let tempoDia = "30 minutos"
var promptCronograma = `Você é um professor de idiomas renomado e com qualificações e pesquisa na área de gerenciamento de tempo. 
                Monte um cronograma de estudos de para um aluno que deseja aprender ${idioma}, está no nível ${nivel}, tem ${tempoAprendizado} disponível para concluir o curso
                com ${diasSemana} para estudar, tendo ${tempoDia} de estudo por dia. A resposta deve estar no formato json, sendo que os dias da semana são as chaves principais, e as colunas dentro são: `;
let messages = [ 
    {"role": "system", "content": promptCronograma},
]

async function sendQuestion(messages){
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 2048,
            temperature: 0.5,
        }),
        });
    
        console.log("teste")
    
        if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
        }
    
        const json = await response.json();
    
        if (json.error?.message) {
        console.error(`Error: ${json.error.message}`);
        } else if (json.choices?.[0].message) {
        const message = json.choices[0].message || "Sem resposta";
        console.log("Chat GPT:", message.content);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

sendQuestion(messages)
