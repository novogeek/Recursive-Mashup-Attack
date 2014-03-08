function showpics(query){
	//http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=22be9f15d99539c2659fb86f42db037b&tags=flower&per_page=3

	var apikey="22be9f15d99539c2659fb86f42db037b";
	var perPage=9;
	var url="http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+
		"&text="+query+"&per_page="+perPage+"&format=json&nojsoncallback=1";
	var s="";
	$.getJSON(url,
	  function(rsp){ 
		for (var i=0; i < rsp.photos.photo.length; i++) {
		  photo = rsp.photos.photo[i];
		  t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
				photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
				
		  p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
		  s +=  '<span class="spFlickrImg"><a target="_blank" href="' + p_url + '">' + '<img alt="'+ photo.title + 
			'"src="' + t_url + '"/>' + '</a></span>';
		}
		$("#flickr-canvas").hide().html(s).fadeIn('fast');
  })
};
window.onload=showpics("hyderabad");
//Refer: http://mashupguide.net/1.0/html/ch08s07.xhtml