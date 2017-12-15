var MAX_LATIN_ZOOM = 5;

var latinizeLayer = function(layer) {
  layer.id += '-latin';
  layer.maxzoom = layer.maxzoom || MAX_LATIN_ZOOM;
  layer.layout['text-field'] = "{name:latin}";
};

exports.cfg = {
  layerFilter: function(layer) {
    return layer.layout
        && layer.layout['text-field']
        && [
            "{name:latin} {name:nonlatin}",
            "{name:latin}\n{name:nonlatin}"
        ].indexOf(layer.layout['text-field']) >= 0
        &&
        (layer.minzoom || 0) < MAX_LATIN_ZOOM
  },
  decorator: function(layer) {
    result = [layer];
    if((layer.maxzoom || 24) > MAX_LATIN_ZOOM) {
      var latinLayer = JSON.parse(JSON.stringify(layer));
      latinizeLayer(latinLayer);
      result.push(latinLayer);
      layer.minzoom = MAX_LATIN_ZOOM;
    } else {
      latinizeLayer(layer);

    }
    return result;
  }
};