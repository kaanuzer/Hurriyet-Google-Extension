function getNewsData() {
    $('#waitRequest').show();
    $.getJSON({
        url: "https://api.hurriyet.com.tr/v1/articles?apikey=533e5c3bb6584c70aab5d2fe1bb6433e&$top=5",
        type: "GET",
        cache: false,
        crossDomain: true,
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (data != [] && data != undefined) {
                $('#waitRequest').hide();
                data.forEach(function(value, index) {

                    var itemTitle = value.Title;
                    var itemUrl = value.Url;
                    var imgUrl = null;
                    if (value.Files == null || value.Files == [] || value.Files == undefined || value.Files.length == 0) {
                        imgUrl = "Assets/img/hurriyetlogo-128.png";
                    } else {
                        imgUrl = value.Files[0].FileUrl;
                    }

                    $('#result').append("<div class='list-group-item list-group-item-action row'><div class='photo col-xs-3'><img class='img-thumbnail' src='" + imgUrl + "'</img></div><div class='content col-xs-9'><a href='" + itemUrl + "' target='_blank'>" + itemTitle + "</a></div></div>");
                });
            }

        },
        error: function(data) {
            $('#waitRequest').hide();
            if (data.status == 500) {
                $('#result').append("<div class='list-group-item list-group-item-action row'>Lütfen daha sonra tekrar deneyiniz.</div>");
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getNewsData();
});