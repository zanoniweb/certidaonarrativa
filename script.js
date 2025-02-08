async function buscarDados() {
    const inscricao = document.getElementById('inscricaoMunicipal').value;
    const anos = [2020, 2021, 2022, 2023, 2024, 2025];
    let resultados = [];
  
    for (let ano of anos) {
      const url = `tabelas/${ano}.xlsx`; // Certifique-se de que os arquivos de Excel estejam no diretório "tabelas"
      const data = await fetch(url).then(res => res.arrayBuffer());
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      json.forEach(row => {
        if (row[0] && row[0].includes(inscricao)) {
          resultados.push({
            inscricao: row[0],
            quadra: row[1],
            lote: row[2],
            ano,
            metragem: row[4]
          });
        }
      });
    }
  
    exibirResultados(resultados);
  }
  
  function exibirResultados(resultados) {
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';
  
    resultados.forEach(resultado => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${resultado.inscricao}</td>
        <td>${resultado.quadra}</td>
        <td>${resultado.lote}</td>
        <td>${resultado.ano}</td>
        <td>${resultado.metragem}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  