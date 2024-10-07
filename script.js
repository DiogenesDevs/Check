document.addEventListener("DOMContentLoaded", () => {
    const checklistItems = document.querySelectorAll('.box');
    const resultContainer = document.getElementById('result');

    // Configuração dos eventos para cada item da checklist
    checklistItems.forEach(item => {
        const yesButton = item.querySelector('.yes');
        const noButton = item.querySelector('.no');
        const label = item.querySelector('span');

        yesButton.addEventListener('click', () => {
            item.style.backgroundColor = '#4CAF50'; // Verde
            label.style.textDecoration = 'line-through'; // Tacha o texto
        });

        noButton.addEventListener('click', () => {
            item.style.backgroundColor = '#f44336'; // Vermelho
            label.style.textDecoration = 'line-through'; // Tacha o texto
        });
    });

    const generatePDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Adiciona o logotipo ao PDF
        const logoUrl = 'assets/urla2.jpeg'; // URL ou caminho do logotipo
        const img = new Image();
        img.src = logoUrl;

        img.onload = () => {
            doc.addImage(img, 'PNG', 10, 10, 30, 30); // Adiciona o logotipo na posição (10, 10)

            // Captura as informações do motorista
            const driverName = document.getElementById('driverName').value;
            const registration = document.getElementById('registration').value;
            const tacho = document.getElementById('tacho').value;
            const fleetNumber = document.getElementById('fleetNumber').value;
            const dateTime = document.getElementById('dateTime').value;

            // Adiciona informações do motorista ao PDF
            doc.text(`Nome do Motorista: ${driverName}`, 10, 50);
            doc.text(`Matrícula: ${registration}`, 10, 58);
            doc.text(`Tacógrafo: ${tacho}`, 10, 66);
            doc.text(`Número da Frota: ${fleetNumber}`, 10, 74);
            doc.text(`Data e Hora: ${dateTime}`, 10, 82);
            doc.text('Checklist: Concluido', 10, 90);

            let yPosition = 100; // Posição inicial para o checklist
            checklistItems.forEach(item => {
                const label = item.querySelector('span').textContent;
                const isChecked = item.style.backgroundColor === 'rgb(76, 175, 80)' ? 'Conforme' : 'Não Conforme';
                doc.text(`${label}: ${isChecked}`, 10, yPosition);
                yPosition += 8; // Espaço entre os itens
            });

            // Salvar o PDF
            doc.save(`Checklist ${driverName}.pdf`);
        };

        img.onerror = () => {
            console.error('Erro ao carregar a imagem do logotipo');
        };
    };

    // Adicionar botão para gerar PDF
    const pdfButton = document.createElement('button');
    pdfButton.textContent = 'Gerar PDF';
    pdfButton.style.marginTop = '20px';
    pdfButton.style.padding = '10px 15px';
    pdfButton.style.fontSize = '16px';
    pdfButton.style.backgroundColor = '#007bff'; // Azul
    pdfButton.style.color = 'white';
    pdfButton.style.border = 'none';
    pdfButton.style.borderRadius = '5px';
    pdfButton.style.cursor = 'pointer';
    pdfButton.onclick = generatePDF;

    resultContainer.appendChild(pdfButton);
});
