(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("tiled_tile_map",
{ "height":10,
 "layers":[
        {
         "data":[32, 31, 31, 31, 1, 1, 31, 31, 31, 32, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 32, 1, 26, 1, 26, 1, 26, 1, 1, 32, 32, 26, 1, 1, 26, 1, 1, 26, 1, 32, 32, 1, 1, 1, 26, 26, 1, 26, 1, 32, 32, 1, 1, 26, 1, 1, 1, 26, 1, 32, 32, 1, 1, 1, 1, 1, 1, 26, 1, 32, 1, 1, 26, 1, 26, 1, 26, 1, 1, 1, 32, 1, 1, 1, 1, 1, 1, 1, 1, 32, 32, 31, 31, 31, 1, 31, 31, 31, 31, 32],
         "height":10,
         "name":"\u5757\u5c42 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"C:\/Users\/shangpo.zw\/Desktop\/html5canvas\/ch4\/tanks_sheet.png",
         "imageheight":128,
         "imagewidth":256,
         "margin":0,
         "name":"tanks_sheet",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":10
});