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
    $('#doc1-pred').text(predictions.doc1.label)
    $('#doc2-pred').text(predictions.doc2.label)
}
