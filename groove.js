const fs = require("fs");
let ruta = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
//console.log(ruta);
ruta = ruta+"/Music";
/*fs.readdir(ruta, (err, dir) => {
//console.log(dir);
for(let filePath of dir)
console.log(filePath);
});*/
var canciones=[];
function getAllFilesFromFolder(){
  var walk    = require('walk');
  var files   = [];

  // Walker options
  var walker  = walk.walk(ruta, { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      files.push(root + '/' + stat.name);
      //console.log(files);
      next();
  });

  walker.on('end', function() {
      //console.log(files);
      //logger.end()
      canciones = files;
      depurarArchivos();
  });
}
var musicFiles = [];
function getFileExtension2(filename) {
  return filename.split('.').pop();
}
function depurarArchivos(){

var str = "'"+canciones+"'";
var toSplit = str.split(",");

for (var i = 0; i < toSplit.length; i++) {
    var extension=getFileExtension2(toSplit[i]);
    if(extension == 'mp3' || extension == 'm4a'){
            musicFiles.push(toSplit[i]);
    }
}
imprimir();
}

function imprimir(){
fs.appendFile('musica.txt', musicFiles, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})}


function ListaExistente(){
    if(!fs.existsSync('./musica.txt')){
        console.log("escaneando");
        getAllFilesFromFolder();
    }
    CargarCanciones();
}
ListaExistente();

var Songs=[];
var TotalCanciones= 0;
function CargarCanciones(){
    fs.readFile('./musica.txt', 'utf8', function(err, data) {  
    if (err) throw err;
    Songs=data.split(",");
    TotalCanciones=data.split(",").length;
    //$("#Contenido").html(Songs);
    
    console.log(TotalCanciones);
    console.log(Songs[1]);
    listarCanciones();
});
}

var jsmediatags = require("jsmediatags");
function listarCanciones () {
    //console.log(Songs);
    var contador=1;
    for(var z=0; z<400;z++){ 
        // Advanced API 
new jsmediatags.Reader(Songs[z])
  .setTagsToRead(["title", "artist","album","picture"])
  .read({
    onSuccess: function(tag) {
        
    //console.log(z);
      $(".table").append(`<tr>
            <td>
            <div id="Title`+(contador-1)+`">`+tag.tags.title+`</div>
                <span class="glyph glyph-play" onclick="playSong(`+(contador++)+`)"></span>
            </td>
            <td>
                
                <div id="Artist`+(contador-1)+`">`+tag.tags.artist+`</div>
            </td>
        </tr>`);
    },
    onError: function(error) {
      console.log(':(', error.type, error.info);
    }
  });
    }
}
var song = new Audio();
window.playSong = function playSong (titlesong) {
    song.src = Songs[titlesong];
	song.playbackRate = 1;
		song.play();
    $(".Artist").html($("#Artist"+titlesong).html());
     $(".Title").html($("#Title"+titlesong).html());    
	
}
window.playOrPause = function playOrPauseSong () {
	song.playbackRate = 1;
	if(song.paused){
		song.play();
	}else{
		song.pause();
	}
    $("#play").toggleClass("glyph-pause");
}