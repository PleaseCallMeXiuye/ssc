/*****************************
* 新增快捷和正常投注
*****************************/
function kuijie(){
	$('#td_input_money').show();
	$('#td_input_money1').show();
	if($('#kuijie').attr('class')!='intype_hover'){
		$('#kuijie').attr('class','intype_hover');
		$('#yiban').attr('class','intype_normal'); 
		$('.je').hide();
		$('.o').each(function(){ 
			//$(this).css('width', '50px' );
			$(this).next().hide(); 
		}) 
		
		//处理表格
		$('table.wqs,table.wq').each(function(){ 
			if($(this).find("colgroup").size() > 0)
			{
				var td_num = $(this).find("tr").eq(1).find("td:visible").length;
				
				$(this).find("colgroup").html("");
				//计算宽度
				var td_width = 99/td_num;
				var colgroup_str = '';
				for (var i=0;i<td_num;i++)
				{
					colgroup_str += '<col style="width:'+td_width+'%">';
				}
				$(this).find("colgroup").html(colgroup_str);
			}
		})
		 
		/*添加效果*/  
		$('.caption_1,.o').bind({'mouseenter':function(){ 
			if( $(this).attr('title')!='选中' ){ //未选中
				if($(this).attr('class')=='o' && $(this).prev().attr('class').indexOf('caption_1')>=0){
					$(this).css({'background-color':'#ffd094','cursor':'pointer'});	  
					$(this).prev().css({'background-color':'#ffd094','cursor':'pointer'});	 
				}
				if($(this).attr('class').indexOf('caption_1')>=0 && $(this).next().attr('class')=='o'){
					$(this).next().css({'background-color':'#ffd094','cursor':'pointer'});	  
					$(this).css({'background-color':'#ffd094','cursor':'pointer'});	 
				}
			}
			 
		},'mouseleave':function(){ 
			if( $(this).attr('title')!='选中' ){ //未选中
				if($(this).attr('class')=='o' && $(this).prev().attr('class').indexOf('caption_1')>=0){
					$(this).css({'background-color':'#fff','cursor':'pointer'});	  
					$(this).prev().css({'background-color':'#FDF8F2','cursor':'pointer'});	 
				}
				if($(this).attr('class').indexOf('caption_1')>=0 && $(this).next().attr('class')=='o'){
					$(this).next().css({'background-color':'#fff','cursor':'pointer'});	  
					$(this).css({'background-color':'#FDF8F2','cursor':'pointer'});	 
				}
			}
		},'click':function(){
			if($(this).attr('class')=='o' && $(this).prev().attr('class').indexOf('caption_1')>=0){ 
				if( $(this).attr('title')=='选中' ){ //已选中 取消选中
					$(this).css({'background-color':'#fff','cursor':'pointer'});	  
					$(this).prev().css({'background-color':'#FDF8F2','cursor':'pointer'});	
					$(this).attr('title','');
					$(this).prev().attr('title','');
				}else{												//选中
					$(this).css({'background-color':'#ffc214','cursor':'pointer'});	  
					$(this).prev().css({'background-color':'#ffc214','cursor':'pointer'});	 
					$(this).attr('title','选中');
					$(this).prev().attr('title','选中');
				}
			}
			if($(this).attr('class').indexOf('caption_1')>=0 && $(this).next().attr('class')=='o'){
				if( $(this).attr('title')=='选中' ){ //已选中 取消选中
					$(this).next().css({'background-color':'#fff','cursor':'pointer'});	  
					$(this).css({'background-color':'#FDF8F2','cursor':'pointer'});	 
					$(this).attr('title','');
					$(this).next().attr('title','');
				}else{												//选中
					$(this).next().css({'background-color':'#ffc214','cursor':'pointer'});	  
					$(this).css({'background-color':'#ffc214','cursor':'pointer'});	
					$(this).attr('title','选中');
					$(this).next().attr('title','选中');
				}
			}	
		}})
	}
}
function yiban(){
	if($('#yiban').attr('class')!='intype_hover'){
		$('#yiban').attr('class','intype_hover');
		$('#kuijie').attr('class','intype_normal'); 
		$('.o').each(function(){ 
			//$(this).css('width', '50px' );
			$(this).next().show(); 
		}) 
		
	}	
	//处理表格
	$('table.wqs,table.wq').each(function(){ 
		if($(this).find("colgroup").size() > 0)
		{
			var td_num = $(this).find("tr").eq(1).find("td:visible").length;
			
			$(this).find("colgroup").html("");
			//计算宽度
			var td_width = 99/td_num;
			var colgroup_str = '';
			for (var i=0;i<td_num;i++)
			{
				colgroup_str += '<col style="width:'+td_width+'%">';
			}
			$(this).find("colgroup").html(colgroup_str);
		}
	})
	
	$('.caption_1,.o').unbind('mouseenter').unbind('mouseleave').unbind('click');
	$('.caption_1').css({'background-color':'#FDF8F2','cursor':''});
	$('.o').css({'background-color':'#fff','cursor':''});
	$('#td_input_money').hide();
	$('#td_input_money1').hide();
	$('.je').show();
}
function MyReset(){
	$('.caption_1').css({'background-color':'#FDF8F2','cursor':''});
	$('.o').css({'background-color':'#fff','cursor':''});
	$('.caption_1').attr('title','');
	$('.o').attr('title','');
	$('.inp1').val('');
	$('#AllMoney').val('');
}

function AllMoney(){ 
	var sel=false;
	$('td.loads').each(function(){
		if(  $(this).prev().attr('title')=='选中' ){ //已选中 
			$(this).find('input').val( $('#AllMoney').val() );
			 
			sel=true;
		}
	}) 
	return sel;
}
function iSubmit(){
	if($('#kuijie').attr('class')=='intype_hover'){	
		var sel = AllMoney();
		if(sel==false){
			alert('您未选择号码！');
			return false;
		}
	}
	return true;
}

/**************************************/
var setResultcq = new Array();
(function(){
	var _hiden, _endtime, _opentime, _refreshtime, _openNumber, _lock=false;			
	$(function(){
		$("#dp").attr("action","./inc/DataProcessingcq.php?idt="+encodeURI($("#tys").html()));
		_hiden = $("#hiden").val();
		_hiden = _hiden.replace("g","");
		loadGameInfo(false);
		loadDayInfo();
		setOpnumberTirem();
		
		$('#kuijie').bind('click',function(){
			kuijie();							   
		})
		$('#yiban').bind('click',function(){
			yiban();							   
		})

        kuijie();
        if (typeof  common_action_set != undefined) {
            common_action_set(function() {
                submitforms();
            });
        }
	});
	
	function loadGameInfo(bool){
		var number = $("#number");
		var sy = $("#sy");
		$.post("/ajax/cqJson.php", { typeid : 1, mid : _hiden}, function(data){
            console.log(data);
			_Number (data.number, data.ballArr);
            if (data.number != number.text()) {
                kaijiang_sound();
            }
			openNumberCount(data, bool);
			sy.html(data.winMoney);
		}, "json");
	}
	
	function loadDayInfo(){
		$.post("/ajax/cqJson.php", { typeid : 2, mid : _hiden}, function(data){
            console.log(data);
			openNumber(data.Phases);
			opentimes(data.openTime);
			endtimes(data.endTime);
			refreshTimes(data.refreshTime);
			loadodds(data.oddslist, data.endTime, data.Phases);
			loadinput(data.endTime, _hiden);
		}, "json");
	}
	
	function loadinput(endtime, id){
		var loads = $(".loads");
		var count=lock1=lock2=lock3=lock4=lock5=0, s, n="";
		loads.each(function(){
			if (endtime < 1){
				$(this).html(n);
			} else {
				count++;
				if (count<=14){
					lock1++;
					s = "Ball_"+id+"mah"+lock1;
				} else if (count >14 && count <22){
					lock2++;
					s = "Ball_6mbh"+lock2;
				} else if (count > 21 && count < 27){
					lock3++;
					s = "Ball_7mch"+lock3;
				} else if (count > 26 && count < 32){
					lock4++;
					s = "Ball_8mdh"+lock4;
				} else {
					lock5++;
					s = "Ball_9meh"+lock5;
				}
				n = "<input name=\""+s+"\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"this.className='inp1m'\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"9\"/>"
				$(this).html(n);
			}
		});
	}
	
	function loadodds(oddslist, endtime, number){
		var a = ["a","b","c","d","e"];
		var odds, link, urls;
		if (oddslist == null || oddslist == "" || endtime <1) {
			$(".o").html("");
			return false;
		}
		for (var n=0; n<oddslist.length; n++){
			for (var i in oddslist[n]){
				odds = oddslist[n][i];
				urls = "fn2.php?tid="+bc(a[n])+"&numberid="+number+"&hid="+a[n]+i;
				link = "<span class=\"bgh\">"+odds+"</span>";
				$("#"+a[n]+i).html(link);
			}
		}
	}
	
	function bc(str){
		switch (str){
			case "a" : return "Ball_"+_hiden;
			case "b" : return "Ball_6";
			case "c" : return "Ball_7";
			case "d" : return "Ball_8";
			case "e" : return "Ball_9";
		}
	}
	
	function openNumber(numberId){
		$("#o").html(numberId);
	}
	
	function opentimes(opentime){
		var openTime = $("#endTimes");
		_opentime = opentime;
		if (_opentime >1)
			openTime.html(settime(_opentime));
		var interval = setInterval(function(){
			if (_opentime <= 1) {
				clearInterval(interval);
				_lock = true;
				_refreshtime = 5;
				openTime.html("00:00");
                //开奖时间结束也就是要开下一期的时候：要刷新左侧的注单
                window.parent.leftFrame.$('#new_orders').html('');
                window.parent.leftFrame.$('#used_money').html('0');
				return false;
			}
			_opentime--;
			openTime.html(settime(_opentime));
		}, 1000);
	}
	
	function endtimes(endtime){
if(getCookie("soundbut")=="on" || getCookie("soundbut")==null || getCookie("soundbut")==""){
		SetCookie("soundbut","on");
		$("#soundbut").attr("value","on");
		$("#soundbut").attr("src","images/soundon.png");
		}else{
			$("#soundbut").attr("value","off");
		$("#soundbut").attr("src","images/soundoff.png");
			}
		var endTime = $("#endTime");
		_endtime = endtime;
		if (_endtime >1)
			endTime.html(settime(_endtime));
		var interval = setInterval(function(){
											if (_endtime<10&&_endtime>0){
												if($("#soundbut").attr("value")=="on"){
				$("#look").html("<embed width=\"0\" height=\"0\" src=\"js/d.swf\" type=\"application/x-shockwave-flash\" hidden=\"true\" />");		}
						}	
			if (_endtime <= 1) {
				clearInterval(interval);
				endTime.html("00:00");
				loadodds(null, endtime, null);
				loadinput(-1, _hiden);
				return false;
			}
			_endtime--;
			endTime.html(settime(_endtime));
		}, 1000);
	}
	
	function refreshTimes(refreshtime){
		_refreshtime = refreshtime;
		var refreshTime = $("#endTimea");
		refreshTime.html(_refreshtime);
		var interval = setInterval(function(){
			if (_refreshtime <= 1) {
				refreshTime.html("加載中...");
				clearInterval(interval);
				$.post("/ajax/cqJson.php", {typeid : 2, mid : _hiden}, function(data){
					if (_lock == true){
						endtimes(data.endTime);
						opentimes(data.openTime);
						loadinput(data.endTime, _hiden);
						 openNumber(data.Phases);
						 setOpnumberTirem();
						_lock = false;
					}
					 _endtime =data.endTime;
					 _opentime =data.openTime;
					 _refreshtime =data.refreshTime;
					 loadodds(data.oddslist, _endtime, data.Phases);
					 refreshTimes(_refreshtime);
				}, "json");
				return false;
			}
			_refreshtime--;
			refreshTime.html(_refreshtime);
		}, 1000);
	}
	
	function setOpnumberTirem(){
		var opnumber = $("#number").html();
		var nownumer = $("#o").html();
		if (opnumber != ""){
			var _nownumber = parseInt(nownumer);
			var sum = _nownumber -  parseInt(opnumber);
			if (sum == 2 || sum == 882) {
				var interval = setInterval(function(){
					$.post("/ajax/cqJson.php", {typeid : 3}, function(data){
						var a = _nownumber - parseInt(data);
						if (a == 1 || a == 881){
							clearInterval(interval);
							loadGameInfo(true);
							return false;
						}
					}, "text");
				}, 2000);
			}
		} else {
			setTimeout(setOpnumberTirem, 1000);
		}
	}
	
	function _Number (number, ballArr) {
		var Clss = null;
		var idArr = ["#a","#b","#c","#d","#e","#f","#g","#h"];
		$("#number").html(number);
		for (var i = 0; i<ballArr.length; i++) {
			Clss = "No_cq"+ballArr[i];
		$(idArr[i]).removeClass().addClass(Clss);
		}
	}
	
	function openNumberCount(row, bool){
		var rowHtml1 = new Array();
		var rowHtml2 = new Array();
		var rowHtml3 = new Array();
		for (var i in row.row1){
            if (row.row1[i] >= 4) {
                row.row1[i] = '<span style="color: red">'+row.row1[i]+'</span>'
            }
			rowHtml1.push("<td>"+row.row1[i]+"</td>");
		}
		$("#su").html(rowHtml1.join(''));
		for (var k in row.row2){
			rowHtml2.push(row.row2[k]);
		}
		$("#z_cl").html(rowHtml2.join(''));
		$(".z_cl:even").addClass("hhg");
		if (row.row8 != ""){
			for (var key in row.row8){
				rowHtml3.push("<tr bgcolor=\"#fff\" height=\"22\"><td style=\"padding-left:5px; background:#fff4eb; color:#511e02\">"+key+"</td><td style=\"background:#ffffff; width:35px; color:red; text-align:center\">"+row.row8[key]+" 期</td></tr>");
			}
			var cHtml = '<tr class="t_list_caption"><th colspan="2">兩面長龍排行</th></tr>';
			$("#cl").html(cHtml+rowHtml3.join(""));
		}
		if (bool == true) {
			if($("#soundbut").attr("value")=="on"){
			$("#look").html("<embed width=\"0\" height=\"0\" src=\"js/c.swf\" type=\"application/x-shockwave-flash\" hidden=\"true\" />");
		}
		}
		setResultcq[0] = row.row2;
		setResultcq[1] = row.row3;
		setResultcq[2] = row.row4;
		setResultcq[3] = row.row5;
		setResultcq[4] = row.row6;
		setResultcq[5] = row.row7;
	}

	function settime(time){
		var MinutesRound = Math.floor(time / 60);
		var SecondsRound = Math.round(time - (60 * MinutesRound));
		var Minutes = MinutesRound.toString().length <= 1 ? "0"+MinutesRound : MinutesRound;
		var Seconds = SecondsRound.toString().length <= 1 ? "0"+SecondsRound : SecondsRound;
		var strtime = Minutes + ":" + Seconds;
		return strtime;
	}
})();

function getResult($this){
	$(".nv_a").addClass("nv").removeClass("nv_a");
	$($this).removeClass("nv").addClass("nv_a");
	$(".nv_ab").removeClass("nv_ab");
	$($this).parent().addClass("nv_ab");
	var rowHtml = new Array();
	var data = stringByInt ($($this).html());
	for (var k in data){
		rowHtml.push(data[k]);
	}
	$("#z_cl").html(rowHtml.join(''));
	$(".z_cl:even").addClass("hhg");
}

function stringByInt (str){
	if (str == "第1球" || str == "第2球" || str == "第3球" || str == "第4球" || str == "第5球")
		return setResultcq[0];
	switch (str){
		case "大小" : return setResultcq[1];
		case "单双" : return setResultcq[2];
		case "总和大小" : return setResultcq[3];
		case "总和单双" : return setResultcq[4];
		case "龙虎和" : return setResultcq[5];
	}
}

function digitOnly ($this) {
	var n = $($this);
	var r = /^\+?[1-9][0-9]*$/;
	if (!r.test(n.val())) {
		n.val("");
	}
}

function submitforms(){
	if(iSubmit()==false)return false;
	var ss="", a = false, c= true, count = countmoney =0, names=[], value, s, z, o, n, m;
	var input = $("input.inp1");
	var mixmoney = parseInt($("#mix").val());
	$.ajax({type : "POST",data : {typeid : "sessionId"},url : "../ajax/Default.ajax.php",dataType : "text",async : false,success:function(data){a = data == 1 ? true : false;}});
    var ball_array = new Array();
    var odd_array = new Array();
    var money_array = new Array();
	input.each(function(){
		value = $(this).val();
		if (value != ""){
			value = parseInt(value);
			if (value < mixmoney) {c=false;return;}
			count++;
			countmoney += value;
			s = $(this).attr("name").split("m");
			ss += s+","+value+"|";
			z = nameformatcq(s[0]);
			if(s[1]=="ah1" || s[1]=="ah2" || s[1]=="ah3" || s[1]=="ah4" || s[1]=="ah5" || s[1]=="ah6" || s[1]=="ah7" || s[1]=="ah8" || s[1]=="ah9" || s[1]=="ah10"  ){
			var tt=s[1].substr(2);
			m=tt-1;
			}else{
			m= $("."+s[1]).html();
			}
			o = $("#"+s[1]).text();
			if (z == "總和、龍虎和") {
				n = m+" @ "+o+" x ￥"+value;
                ball_array.push(m);
            } else  {
				n = z+"["+m+"] @ "+o+" x ￥"+value;
                ball_array.push(z+ ' ' + m);
            }
            odd_array.push(o);
            money_array.push(value);
			names.push(n+"\n");
		}
	});
	if (c == false){ my_alert("最低下注金额为："+mixmoney+"￥");return false;}
	if (count == 0){my_alert("请您填写下注金额");return false;}
/*	var confrims = "共 ￥"+countmoney+" / "+count+"筆，確定下註嗎？\n\n下註明細如下：\n\n";
	confrims +=names.join('');
	if (confirm(confrims)){*/
		input.val("");
		MyReset();
		var number = $("#o").html();
		var s_type = '<input type="hidden" name="s_cq" value="'+ss+'"><input type="hidden" name="s_number" value="'+number+'">';
		$(".actiionn").html(s_type);
/*		return a;
	}
	return false;*/
    submit_confirm(ball_array,odd_array,money_array);
}

function nameformatcq(str){
	switch(str){
		case "Ball_1" : return "第一球";
		case "Ball_2" : return "第二球";
		case "Ball_3" : return "第三球";
		case "Ball_4" : return "第四球";
		case "Ball_5" : return "第五球";
		case "Ball_6" : return "總和、龍虎和";
		case "Ball_7" : return "前三";
		case "Ball_8" : return "中三";
		case "Ball_9" : return "后三";
	}
}



