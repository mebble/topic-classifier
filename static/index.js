$('#doc-form').submit(function(event) {
    const doc1 = $('textarea#doc1').val();
    const doc2 = $('textarea#doc2').val();
    const data = {
        doc1: doc1,
        doc2: doc2
    };

    $.ajax({
        type: 'POST',
        url: '/predict',
        data: JSON.stringify(data),
        success: function(response) {
            updatePredictions(response);
        },
        contentType: 'application/json'
    });
    event.preventDefault();
});

function updatePredictions(predictions) {
    const { prob: prob1, label: label1 } = predictions.doc1;
    const { prob: prob2, label: label2 } = predictions.doc2;
    const { concept_diff } = predictions;

    let result = '';
    result += predictionRow('Probability', probabilityTable(prob1, prob2));
    result += predictionRow('Labels', predictionCols(label(label1), label(label2)));
    result += predictionRow('Concept Difference', conceptDiff(concept_diff));

    $('#prediction-container').html(result);
}

function probabilityTable(probs1, probs2) {
    const formattedProbs = probs1.map((prob, i) => {
        const label = prob[0];
        const value1 = prob[1];
        const value2 = probs2[i][1];
        return { label, value1, value2 };
    });
    const table = `
        <div class="col">
            <table class="table text-center">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Probability</th>
                        <th scope="col">Label</th>
                        <th scope="col">Probability</th>
                    </tr>
                </thead>
                <tbody>
                    ${formattedProbs.map(prob => `
                        <tr>
                            <td>${prob.value1.toFixed(5)}</td>
                            <th scope="row">${prob.label}</th>
                            <td>${prob.value2.toFixed(5)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    return table;
}

function label(label) {
    const result = `
        <h3 class="pred-label">${label}</h3>
    `;
    return result;
}

function predictionRow(title, body) {
    const row = `
        <div class="row">
            <div class="col">
                <div class="row pred-title">
                    <div class="col"><h2>${title}</h2></div>
                </div>
                <div class="row">
                    ${body}
                </div>
            </div>
        </div>
    `;
    return row;
}

function predictionCols(col1, col2) {
    const result = `
        <div class="col">${col1}</div>
        <div class="col">${col2}</div>
    `;
    return result;
}

function conceptDiff(num) {
    const percentage = (num * 100).toFixed(2);
    const result = `
        <div class="col">
            <h3 id="concept-diff">${percentage}%</h3>
        </div>
    `;
    return result;
}
