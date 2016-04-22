/* global google, _ */
(function (G_MAP, $, _, undefined) {
    "use strict";

    /* Private bars */
    var mapCfg,
        infoBox, 
        map, 
        markers = [],
        markerEvents = {
            click: 'G_MAP:markerClicked'
        };

    /* Private functions */
    function addEventsToMarker(marker) {
        google.maps.event.addListener(marker, 'click', function () {
            mapCfg.$eventListener.trigger(markerEvents.click, [marker]);
        });
    }
    
    function initMarkers(arrObjs) {
        infoBox = new InfoBox(mapCfg.infoBoxCfg);
        markers = _.reduce(arrObjs, function (memo, obj) {
            var marker = new google.maps.Marker({
                position: obj.position,
                map: map,
                infoBoxHtml: obj.infoBoxHtml,
                all: obj.all
            });
            addEventsToMarker(marker);
            return memo.concat(marker);
        }, []);
    }

    function closeInfoBox() {
        if (infoBox) {
            infoBox.close();
        }
    }

    function resetAllMarkers() {
        closeInfoBox();
        markers = _.reduce(markers, function(_, marker) {
            marker.setMap(null);
        }, []);
    }
    
    function getMap() {
        return map ? map : createMap();
    }
    
    function createMap() {
        map = new google.maps.Map(mapCfg.canvasEl, mapCfg.mapCfg);
    }

    /* public interface */
    G_MAP.openMarkerInfo = function(marker) {
        infoBox.setContent(marker.infoBoxHtml);
        infoBox.open(map, marker);
    };
    
    G_MAP.getMarkerEvent = function (str) {
        return markerEvents[str];
    };

    G_MAP.setDestinationLinesFrom = function (marker) {
        var from = marker.position;
        _.each(markers, function (marker) {
            var to = marker.position;
            if (!from.equals(to)) {
                new google.maps.Polyline(_.extend({}, mapCfg.destinationLinesCfg, {map: map, path: [from, to]}));
            }
        });
    };

    // { lat: double, lon: double, title: string, extra: obj, icon: string, shadowIcon: string }
    G_MAP.createMarkersFromArray = function (arr) {
        resetAllMarkers();
        initMarkers(arr);
        return this;
    };

    G_MAP.setZoom = function (newZoom) {
        getMap().setZoom(newZoom);
        return this;
    };

    // google.maps.LatLng
    G_MAP.setCenterCoords = function (mapsLatLng) {
        getMap().setCenter(mapsLatLng);
        return this;
    };
    
    G_MAP.getMarkerByKeyValue = function (obj) {
        return _.find(markers, function(marker) {
            return _.isMatch(marker.all, obj);
        });
    };
    
    // { canvasEl: htmlObj, $eventListener: jQueryObj, mapCfg: obj, infoBoxCfg: obj, destinationLinesCfg: obj}
    G_MAP.initMap = function (obj) {
        mapCfg = obj;
        createMap();
        return this;
    };
}(window.G_MAP = window.G_MAP || {}, jQuery, _));