//var searchResult;
var postType = ["byName","byLocation","byType"];
var postReg;
function setResult(searchResult)
{
	$('#three').empty();
	var popContent = '<h1 align="center"><搜尋結果></h1>';
	for(var i=0;i*3<searchResult.length;i++){
		popContent += '<div class="inner flex flex-3">';
		for(var j=0;j<3 && i*3+j < searchResult.length;j++){
			popContent +=
				'<div class="flex-item box"><a href={{searchResult['+(i*3+j)+'].http}} style="text-decoration:none;" target="_blank">';
			popContent +=
				'<div class="image fit"><img src="searchResult['+(i*3+j)+'].eventName" alt="" /></div>';
			popContent +=
				'<div class="content">'+
				'<h3>'+searchResult[i*3+j].eventName+'</h3>'+
				'<p><b><span style="color:#AAAAAA;">活動時間 : '+searchResult[i*3+j].eventB_M+'</b></p>'+
				'<p><b><span style="color:#AAAAAA;">活動地點 : '+searchResult[i*3+j].eventLocation+'</span></b></p>'+
				'</a></div></div>';
		}
		popContent += '</div>';
	}

	$('#three').append(popContent);
}


function searchRequest(){
	$.ajax({
		type: 'POST',
		url: "http://140.121.199.231:27018/searchcomplete",
		data: {"type" : "ggg" , "data" : "goal"},
		dataType: 'json',
		success: setResult
	});
	
	//searchRequest = $.post("http://140.121.199.231:27018/searchcomplete",{"type" : postType[postReg] , "data" : $('#eventName').value},setResult(),"json");
}

function createSearchBarNode()
	{
		postReg = 0;
		$('#main').empty();
		var popContent =			
					'<p><input type="text" name="searchEventName" id="eventName" placeholder="請輸入活動名稱" autofocus></p>'+
					'<div class="12u$">'+
								'<ul class="actions">'+
									'<li><input type="submit" value="確認送出" / onclick="searchRequest()"></li>'+
									'<li><input type="reset" value="取消" class="alt" /></li>'+
								'</ul></div>';

		$('#main').append(popContent);
		//return newNode;
	}