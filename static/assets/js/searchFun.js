var searchResult = [3,4,5,6,7];
	
					function setResult()
					{
						$('#three').empty();
						var popContent = '<h1 align="center"><搜尋結果></h1>';
						for(var i=0;i*3<searchResult.length;i++){
							popContent += '<div class="inner flex flex-3">';
							for(var j=0;j<3 && i*3+j < searchResult.length;j++){
								popContent +=
									'<div class="flex-item box"><a href={{searchResult['+(i*3+j)+'].http}} style="text-decoration:none;" target="_blank">';
								popContent +=
									'<div class="image fit"><img src={{searchResult['+(i*3+j)+'].img}} alt="" /></div>';
								popContent +=
									'<div class="content">'+
									'<h3>【潮一夏】 —探訪八斗子潮間帶生態</h3>'+
									'<p><b><span style="color:#AAAAAA;">活動時間 : '+(i*3+j)+'</b></p>'+
									'<p><b><span style="color:#AAAAAA;">活動地點 : 基隆市中正區北寧路369巷61號</span></b></p>'+
									'</a></div></div>';
							}
							popContent += '</div>';
						}
	
						$('#three').append(popContent);
					}
	
					function createSearchBarNode()
						{
							$('#main').empty();
							var popContent =
								'<form method="get" action=" http://127.0.0.1:5000/complete">'+				
										'<p><input type="text" name="searchEventName" id="eventName" placeholder="請輸入活動名稱" autofocus></p>'+
										'<div class="12u$">'+
													'<ul class="actions">'+
														'<li><input type="submit" value="確認送出" / onclick="setResult()"></li>'+
														'<li><input type="reset" value="取消" class="alt" /></li>'+
													'</ul></div></form>';
				
							$('#main').append(popContent);
							//return newNode;
						}