(function (CONF, undefined) {

    CONF.map = {
        mapCfg: {
            scrollwheel: false,
            center: new google.maps.LatLng(37.794850850976495, -24.65378750000002),
            zoom: 3,
            panControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        infoBoxCfg: {
            disableAutoPan: false,
            maxWidth: '150px',
            pixelOffset: new google.maps.Size(-90, -55),
            alignBottom: true,
            zIndex: null,
            boxStyle: { 
                //background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                opacity: 0.9,
                width: '300px'
            },
            closeBoxMargin: '12px 4px 2px 2px',
            closeBoxURL: 'http://www.google.com/intl/en_us/mapfiles/close.gif',
            infoBoxClearance: new google.maps.Size(1, 1)
	},
        destinationLinesCfg: {
            strokeColor: "#039",
            strokeOpacity: 0.5,
            geodesic: true,
            strokeWeight: 2
        }
    };

})(window.CONF = window.CONF || {});

