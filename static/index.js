$('#doc-form').submit(function(event) {
    var doc1 = $('textarea#doc1').val();
    var doc2 = $('textarea#doc2').val();
    var data = {
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
    var prob1 = predictions.doc1.prob;
    var prob2 = predictions.doc2.prob;
    var label1 = predictions.doc1.label;
    var label2 = predictions.doc2.label;
    var concept_diff = predictions.concept_diff;

    var result = '';
    result += predictionRow('Probability', predictionCols(probabilityTable(prob1), probabilityTable(prob2)));
    result += predictionRow('Labels', predictionCols(label(label1), label(label2)));
    result += predictionRow('Concept Difference', conceptDiff(concept_diff));

    $('#prediction-container').html(result);
}

function probabilityTable(probs) {
    var table = `
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Probability</th>
                </tr>
            </thead>
            <tbody>
                ${probs.map(prob => `
                    <tr>
                        <th scope="row">${prob[0]}</th>
                        <td>${prob[1].toFixed(5)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    return table;
}

function label(label) {
    var result = `
        <h3 class="pred-label">${label}</h3>
    `;
    return result;
}

function predictionRow(title, body) {
    var row = `
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
    var result = `
        <div class="col">${col1}</div>
        <div class="col">${col2}</div>
    `;
    return result;
}

function conceptDiff(num) {
    var percentage = (num * 100).toFixed(2);
    var result = `
        <div class="col">
            <h3 id="concept-diff">${percentage}%</h3>
        </div>
    `;
    return result;
}
