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
    $('#doc1-pred').html(probability_table(predictions.doc1.prob));
    $('#doc2-pred').html(probability_table(predictions.doc2.prob));
    $('#doc1-label').html(label(predictions.doc1.label));
    $('#doc2-label').html(label(predictions.doc2.label));
}

function probability_table(probs) {
    var table = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Probability</th>
                </tr>
            </thead>
            <tbody>
                ${probs.map(prob => `
                    <tr>
                        <th scope="row">${prob[0]}</th>
                        <td>${prob[1]}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    return table;
}

function label(label) {
    return `<h1 class="text-center">${label}</h1>`;
}
