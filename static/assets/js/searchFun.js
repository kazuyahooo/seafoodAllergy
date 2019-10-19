//var searchResult;
var postType = ["byName","byLocation","byType"];
var postReg;
var ipconfig = "140.121.199.231:27018"

function setResult(searchResult)
{
	$('#three').empty();
	var popContent = '<h1 align="center"><搜尋結果></h1>';
	for(var i=0;i*3<searchResult.length;i++){
		popContent += '<div class="inner flex flex-3">';
		for(var j=0;j<3 && i*3+j < searchResult.length;j++){
			popContent +=
				'<><div class="flex-item box"><a style="text-decoration:none;" target="_blank">';
			popContent +=
				'<div class="image fit"><img src="static/images/'+searchResult[(i*3+j)].eventName+'.jpg" alt="" /></div>';
			popContent +=
				'<div class="content">'+
				'<h3>'+searchResult[i*3+j].eventName+'</h3>'+
				'<p><b><span style="color:#AAAAAA;">活動時間 : '+searchResult[i*3+j].eventM_B+'</b></p>'+
				'<p><b><span style="color:#AAAAAA;">活動地點 : '+searchResult[i*3+j].eventLocation+'</span></b></p>'+
				'</a></div></div>';
		}
		popContent += '</div>';
	}

	$('#three').append(popContent);
}


function searchRequest(){
	var selected= [];
	console.log($('#eventName').val());
	if(postReg == 0){
		$.ajax({
		type: 'POST',
		url: "http://"+ipconfig+"/searchcomplete",
		data: JSON.stringify({"type" : postType[postReg] , "data" : $('#eventName').val().toString()}),
		contentType: 'application/json; charset=utf-8',
		success: setResult
		});
	}
	if(postReg == 2){
		if($('#learn').check){selected.push("learn");}
		if($('#art').check){selected.push("art");}
		if($('#sport').check){selected.push("sport");}
		if($('#ocean').check){selected.push("ocean");}
		if($('#fishery').check){selected.push("fishery");}
		if($('#welfare').check){selected.push("welfare");}
		if($('#techlogy').check){selected.push("techlogy");}
		if($('#health').check){selected.push("health");}
		if($('#entertainment').check){selected.push("entertainment");}

		$.ajax({
		type: 'POST',
		url: "http://"+ipconfig+"/searchcomplete",
		data: {"type" : postType[postReg] , "data" : selected},
		contentType: 'application/json; charset=utf-8',
		success: setResult
		});
	}
	
	
	//searchRequest = $.post("http://140.121.199.231:27018/searchcomplete",{"type" : postType[postReg] , "data" : $('#eventName').value},setResult(),"json");
}

function createSearchBarNode()
	{
		postReg = 0;
		$('#main').empty();
		var popContent =			
					'<div class="inner"><input type="text" name="searchEventName" id="eventName" placeholder="請輸入活動名稱" autofocus></div><br>'+
					'<div class="inner">'+
								'<ul class="actions" style="text-align:right;" >'+
									'<li><input type="submit" value="確認送出" onclick="searchRequest()"/></li>'+
									'<li><input type="reset" value="取消" class="alt" /></li>'+
								'</ul></div>';

		$('#main').append(popContent);
		//return newNode;
	}

	function createTypeBoxNode()
	{
		postReg = 2;
		$('#main').empty();
		var popContent =
				'<div class="inner"><div style="font-size: 16pt">'+
				'<p><label style="font-size: 20pt"> 請勾選籌畫狀況(可複選,至少一項)'+
				'<div style="display: inline-block;"><input type="checkbox" name="done" id="done" ><label for="done">已完成</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="planning" id="planning" checked><label for="planning">籌畫中</label></div><p>'+			
				'<p><label style="font-size: 20pt"> 請勾選活動分類(可複選,至少一項)'+
				'<div style="display: inline-block;"><input type="checkbox" name="learn" id="learn" ><label for="learn">學習</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="art" id="art" ><label for="art">藝文</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="sport" id="sport" ><label for="sport">運動</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="ocean" id="ocean" ><label for="ocean">海洋</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="fishery" id="fishery" ><label for="fishery">漁業</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="welfare" id="welfare" ><label for="welfare">公益</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="techlogy" id="techlogy" ><label for="techlogy">科技</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="health" id="health" ><label for="health">健康</label></div>'+
				'<div style="display: inline-block;"><input type="checkbox" name="entertainment" id="entertainment" ><label for="entertainment">娛樂</label></div>'
				'</p></div></div><br>';
			popContent += '<div class="inner">'+
			'<ul class="actions" style="text-align:left;" >'+
				'<li><input type="submit" value="確認送出" onclick="searchRequest()"/></li>'+
				'<li><input type="reset" value="取消" class="alt" /></li>'+
			'</ul></div>';

		$('#main').append(popContent);
	}




	