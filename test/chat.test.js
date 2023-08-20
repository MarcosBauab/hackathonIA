//Unit tests for oerderTopicsByParameters function
describe('orderTopicsByParameters', () => {
  const OPENAI_API_KEY = "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"
  const basic =   `
                  Tópico 1: Assunto 1
                  Tópico 2: Assunto 2
                  `
  const intermediate =  `
                        Tópico 1: Assunto 1
                        Tópico 2: Assunto 2
                        `
  const advanced =  `
                    Tópico 1: Assunto 1
                    Tópico 2: Assunto 2
                    `

  const promptToOrder =   `
                          Tópico 1: Assunto 1
                          Tópico 2: Assunto 2
                          `
  const axios = require('axios')
  const orderTopicsByParameters = require('../js/preview-chat.js')
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + OPENAI_API_KEY,
  }

  it('should send a POST request to the OpenAI API with the prompt structure and headers', async () => {
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

    const response = await axios.post('https://api.openai.com/v1/chat/completions', prompt1Structure, {headers})
    expect(response.status).toBe(200)
    expect(response.data.choices[0].message.content).toBeDefined()
  }, 20000)

  it('should return the content of the first message choice from the API response', async () => {
    const response = {
      data: {
        choices: [
          {
            message: {
              content: "First message choice content"
            }
          }
        ]
      }
    }

    axios.post = jest.fn().mockResolvedValue(response)
    const result = await orderTopicsByParameters()

    expect(result).toBe("First message choice content")
  })

  it('should successfully complete a request to the OpenAI API and return the ordered topics', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { choices: [{ message: { content: 'ordered topics' } }] } })

    const result = await orderTopicsByParameters()

    expect(result).toBe('ordered topics')
  }, 20000)

  it('should log an error message when the API request fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')
    const errorResponse = { response: { data: 'Error message' } }
    axios.post.mockRejectedValue(errorResponse)

    await orderTopicsByParameters()

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro na requisição:', errorResponse.response.data)
    consoleErrorSpy.mockRestore()
  })
})

//Unit tests for divideTopics function
describe('divideTopics', () => {
  const axios = require('axios')
  const divideTopics = require("../js/preview-chat.js")

  it('should return the content of the first message when the function is called', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { choices: [{ message: { content: "Test content" } }] } });

    const result = await divideTopics();
  
    expect(result).toEqual("Test content");
  });

  it('should successfully complete a request to the OpenAI API and return the ordered topics', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { choices: [{ message: { content: 'ordered topics' } }] } });
  
    const result = await divideTopics();
  
    expect(result).toBe('ordered topics');
  }, 20000);
})