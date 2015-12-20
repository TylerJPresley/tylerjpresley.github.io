
/* Google Maps API */
if (typeof google != 'undefined')
{
	var map_latlng = new google.maps.LatLng(35.090004, -92.442838);
	var map_options = {
		zoom: 13,
		center: map_latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		mapTypeControl: false,
		disableDefaultUI: true,
        styles: [
            {
                stylers: [
                    { saturation: -50 },
                    { hue: "#ffffff" }
                ]
            },
            {
                elementType: "labels.text.fill"
            }
        ]
	};
}

function initializeMap(el, options)
{
	if (typeof google == 'undefined') 
		return false;
	
	var map = new google.maps.Map(document.getElementById(el), options);
	var marker = new google.maps.Marker({
	    position: map_latlng,
	    title: 'My Location',
	    shadow: new google.maps.MarkerImage("/_assets/img/marker_shadow.png", new google.maps.Size(37, 21), new google.maps.Point(0,0), new google.maps.Point(20, 10)),
	    icon: new google.maps.MarkerImage("/_assets/img/marker.png", new google.maps.Size(44, 56), new google.maps.Point(0, 0), new google.maps.Point(22, 56)),
	    map: map
	});
}

function trackOutboundLink(link, category, action) {

    try {
        _gaq.push(['_trackEvent', category , action]);
    } catch(err){}

    setTimeout('document.location = "' + link.href + '"', 100); window.open(this.href);
}

function showContactMsg(msg)
{
    $('.error-msg-loading, .error-msg-wrapper').hide();
    $('.error-msg-txt').text(msg);
    $('.error-msg-wrapper').show();
    setTimeout(function() {
        $('.error-msg-txt').text('');
    }, 4000);
}

$(function()
{
	// tooltips
	$('[data-toggle="tooltip"]').tooltip();

    $('.btn-send-msg').unbind('click').click(function(e) {
        e.preventDefault();

        if ($('.txt-phone').val().length > 0)
        {
            return;
        }

        $('.error-msg-loading').show();

        var txtName = $('.txt-name');
        var txtEmail = $('.txt-email');
        var txtMsg = $('.txt-msg');

        var emailVal = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(txtEmail.val());

        if (emailVal && txtName.val().length > 0 && txtEmail.val().length > 0 && txtMsg.val().length > 0)
        {
            if (emailVal)
            {
                $.post('/mail.php'
                    , { "txtname": txtName.val(), "txtemail": txtEmail.val(), "txtmsg": txtMsg.val() }
                    , function(data)
                    {
                        if (data.code == '1')
                        {
                            showContactMsg("Success!");
                        }
                        else
                        {
                            showContactMsg("Failed!");
                        }
                    }
                    , 'json');
            }
            else
            {
                showContactMsg("Invalid Email!");
            }
        }
        else
        {
            showContactMsg("All fields are required!");
        }

        txtName.val('');
        txtEmail.val('');
        txtMsg.val('');
    });

	// Contact Page Google Maps
	if ($('#contact_gmap').size() > 0 && typeof google != 'undefined')
	{
		map_options.zoom = 15;
		initializeMap('contact_gmap', map_options);
	}
	
	if ($('.progress').length)
	{
		$.each($('.progress'), function(k,v)
		{
			var b = $(this).find('.bar');
			b.width(b.attr('data-width'));
		});
	}

});