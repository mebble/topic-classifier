$('#doc-form').submit(function(event) {
    const doc1 = $('textarea#doc1').val();
    const doc2 = $('textarea#doc2').val();
    const data = { doc1, doc2 };

    $.ajax({
        type: 'POST',
        url: '/predict',
        data: JSON.stringify(data),
        success: function(response) {
            updatePredictions(response);
            $('.pred-progress-bar')
                .each(function() {
                    const $this = $(this);
                    const percentage = $this.data('prob') * 100;
                    $this.animate({ width: `${percentage}%` }, 300, 'easeOutExpo', function () {
                        console.log('Animation completed');
                    });
                });
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
            <table class="pred-table table text-center">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" colspan="2">Probability</th>
                        <th scope="col">Label</th>
                        <th scope="col" colspan="2">Probability</th>
                    </tr>
                </thead>
                <tbody>
                    ${formattedProbs.map(prob => `
                        <tr>
                            <td>${progressBar(prob.value1, true)}</td>
                            <td class="narrow-cell">${prob.value1.toFixed(5)}</td>
                            <th class="narrow-cell" scope="row">${prob.label}</th>
                            <td class="narrow-cell">${prob.value2.toFixed(5)}</td>
                            <td>${progressBar(prob.value2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    return table;
}

function progressBar(prob, isRight) {
    const percentage = prob * 100;
    const right = isRight ? 'progress-right' : '';
    const result = `
        <div class="progress pred-progress ${right}">
            <div class="progress-bar pred-progress-bar" data-prob="${prob.toFixed(5)}" role="progressbar" style="width: 0%" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    `;
    return result;
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
