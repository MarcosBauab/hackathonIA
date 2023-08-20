
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#schedule-table tbody');
    const apiURL = 'http://127.0.0.1:3000/api'; // Atualize com a URL do seu servidor
  
    // Realiza a requisição HTTP para obter o JSON
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data)
        console.log(typeof data)
        let weekOne = data.weekOne
        const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
        Object.values(weekOne).forEach(item => {
          const tableBody = document.getElementById('body')
          const tableRow = document.createElement('tr');
  
          const dayCell = document.createElement('td');
          dayCell.textContent = item.weekDay; // Substitua por suas propriedades

          const elementToRemove = item.weekDay;
          const indexToRemove = daysOfWeek.indexOf(elementToRemove);

          if (indexToRemove !== -1) {
              daysOfWeek.splice(indexToRemove, 1);
          } else {
              console.log("Element not found in the array.");
          }
          
          tableRow.appendChild(dayCell);
  
          const topicCell = document.createElement('td');
          topicCell.textContent = item.subject; // Substitua por suas propriedades
          tableRow.appendChild(topicCell);
  

          tableBody.appendChild(tableRow);
        });
        const recomendation = document.getElementById('recomendations')
        const recomendationP= document.createElement('p');
        recomendationP.textContent = data.recomendations;
        recomendation.appendChild(recomendationP);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  });