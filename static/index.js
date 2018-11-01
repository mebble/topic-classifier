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
    var predictions = `
        ${predictionRow('Probability', probabilityTable(predictions.doc1.prob), probabilityTable(predictions.doc2.prob))}
        ${predictionRow('Labels', label(predictions.doc1.label), label(predictions.doc2.label))}
    `;
    $('#prediction-container').html(predictions);
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
                        <td>${prob[1].toFixed(7)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    return table;
}

function label(label) {
    var label = `
        <h3 class="pred-label">${label}</h3>
    `;
    return label;
}

function predictionRow(title, doc1, doc2) {
    var row = `
        <div class="row">
            <div class="col">
                <div class="row pred-title">
                    <div class="col"><h2>${title}</h2></div>
                </div>
                <div class="row">
                    <div class="col">${doc1}</div>
                    <div class="col">${doc2}</div>
                </div>
            </div>
        </div>
    `;
    return row;
}