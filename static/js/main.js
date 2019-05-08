'use strict';

(function (window, document, $) {
    function getReviews() {
        var results = $('.reviews');

        var request = $.ajax({
            url: 'http://127.0.0.1:8000/review',
            crossDomain: true,
            method: 'GET',
            dataType: 'json'
        })

        request.done(function(data, textStatus, jqXHR) {
            // Make blog from data
            for (var i = 0; i < data.length; i++) {
                var review = $('<div>').addClass('review col-sm-5 col-md-3 card card-body');
                var title = $('<h3>').addClass('title card-title').text(data[i].title);
                var content = $('<p>').addClass('content card-text').text(data[i].content);

                review.append(title);
                review.append(content);

                results.append(review);
            }

            // Add input form as a post block with Bootstrap 4
            // Block
            var review = $('<div>').attr('id', 'review-form');
            results.append(review);
            $('#review-form').addClass('review col-sm-5 col-md-3 card card-body');
            // Title
            var inputTitle = $('<input>').attr('id', 'input-title');
            review.append(inputTitle);
            $('#input-title').addClass('card-title form-control');
            $('#input-title').attr('type', 'text').attr('name', 'title');
            // Text area
            var inputContent = $('<textarea>').attr('id', 'input-content');
            review.append(inputContent);
            $('#input-content').addClass('card-text form-control');
            $('#input-content').attr('name', 'content').attr('rows', '2');
            // Button
            var button = $('<button>').attr('id', 'send-btn');
            review.append(button);
            $('#send-btn').addClass('btn').text('send');

            // Append to template
            results.append(review);
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('request fail');
        })
    }

    function postReview() {
        var titleField = $('#input-title').val()
        var contentField = $('#input-content').val()

        var request = $.ajax({
            url: 'http://127.0.0.1:8000/review',
            crossDomain: true,
            method: 'POST',
            dataType: 'json',
            data: {
                title: titleField,
                content: contentField
            },
        })

        request.done(function(data, textStatus, jqXHR) {
            var results = $('.reviews');

            // Delete form
            var reviewForm = $('#review-form')
            $('#input-title').val('');
            $('#input-content').val('');
            reviewForm.remove()

            // Make new post
            var review = $('<div>').addClass('review col-sm-5 col-md-3 card card-body');
            var title = $('<h3>').addClass('title card-title').text(titleField);
            var content = $('<p>').addClass('content card-text').text(contentField);

            // Add all
            review.append(title);
            review.append(content);
            results.append(review);
            results.append(reviewForm);
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('fail!');
        })
    }



    $(document).ready(function() {
        getReviews();
        $('.reviews').on('click', '#send-btn', function() {
            postReview();
        })
    })
})(window, document, jQuery);
