'use strict';


(function (window, document, $) {
    // Formatting publication time
    function niceDateTime(rawTime) {
        var dateAndTime = rawTime.split('T');
        var date = dateAndTime[0].split('-').reverse().join('/');
        var time = dateAndTime[dateAndTime.length - 1].split('+')[0].split(':').splice(0, 2).join(':');
        return date + ' ' + time;
    }

    // Request to loading page
    function getReviews() {
        var results = $('.reviews');
        // Request to database
        var request = $.ajax({
            url: 'http://127.0.0.1:8000/review/',
            crossDomain: true,
            method: 'GET',
            dataType: 'json'
        })
        // If a positive response came
        request.done(function(data, textStatus, jqXHR) {
            // Display blog using response data
            data = JSON.parse(data)
            var form = $('#form');

            for (var i = 0; i < data.length; i++) {
                var post = data[i].fields;
                var review = $('<div>').addClass(
                    'review col-sm-5 col-md-3 card card-body');
                // Fields
                var title = $('<h3>').addClass(
                    'title card-title').text(post.title);
                var content = $('<p>').addClass(
                    'content card-text').text(post.content);
                var time = $('<p>').addClass(
                    'time card-text');
                time.append($('<span>').addClass('text-muted').text(niceDateTime(post.time)));

                review.append(title);
                review.append(content);
                review.append(time);
                results.append(review);
            }

            // Add input form as a reviw block using Bootstrap 4
            // Block
            var review = $('<div>').attr('id', 'form-as-review');
            results.append(review);
            $('#form-as-review').addClass(
                'review col-sm-5 col-md-3 card card-body');
            // Title
            var inputTitle = $('<input>').attr('id', 'input-title');
            form.append(inputTitle);
            $('#input-title').addClass('card-title form-control');
            $('#input-title').attr('type', 'text').attr('name', 'title');
            // Text area
            var inputContent = $('<textarea>').attr('id', 'input-content');
            form.append(inputContent);
            $('#input-content').addClass('card-text form-control');
            $('#input-content').attr('name', 'content').attr('rows', '2');
            // Button
            var button = $('<input>').attr('id', 'send-btn');
            button.attr('type', 'button').attr('value', 'send');
            form.append(button);
            $('#send-btn').addClass('btn').text('send');

            // Append to template
            review.append(form);
        })
        // If a negative response came
        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('Server error!');
        })
    }

    // Request to posting review
    function postReview() {
        var titleField = $('#input-title').val()
        var contentField = $('#input-content').val()
        // Send form of user to server
        var request = $.ajax({
            url: 'http://127.0.0.1:8000/review/',
            crossDomain: true,
            method: 'POST',
            dataType: 'text',
            data: {
                title: titleField,
                content: contentField,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        })

        // If a positive response came
        request.done(function(data, textStatus, jqXHR) {
            var results = $('.reviews');
            var form = $('#form');

            // Delete form
            var reviewForm = $('#form-as-review')
            $('#input-title').val('');
            $('#input-content').val('');
            reviewForm.remove();

            // Make new post
            var review = $('<div>').addClass('review col-sm-5 col-md-3 card card-body');
            var title = $('<h3>').addClass('title card-title').text(titleField);
            var content = $('<p>').addClass('content card-text').text(contentField);
            var time = $('<p>').addClass('time card-text');
            time.append($('<span>').addClass('text-muted').text('now'));

            // Add all
            review.append(title);
            review.append(content);
            review.append(time);
            results.append(review);
            results.append(reviewForm);
        })
        // If a negative response came
        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('Incorrect form!');
        })
    }

    // If the site is fully loaded
    $(document).ready(function() {
        getReviews();
        $('.reviews').on('click', '#send-btn', function() {
            postReview();
        })
    })
})(window, document, jQuery);
