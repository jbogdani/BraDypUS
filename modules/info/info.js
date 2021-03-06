/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var info = {
		init: function(what){
      
      switch(what){
        case 'getIP':
          info.getIP();
          break;
        case 'copyright':
          info.copyright();
          break;
        case 'faq':
          info.faq();
          break;
      }
		},
		
		getIP: function(){
			
			core.getJSON('info_ctrl', 'getIP', false, false, function(data){
				if (data.status == 'error'){
					core.message(data.text, data.status);
				} else if (data.status == 'success'){
					var html = $('<div />').append(
							$('<div />').css({
								'font-size': '1.5em',
								padding : '20px'
							}).text(data.text),
							
							$('<code />').text(data.cmd),
							
							$('<pre />').text(data.more)
							);
					
					
					core.open({
						html: html,
						title: 'Internet Protocol',
						buttons:[
						         {
						         text: core.tr('close'),
						         click: 'close'
						         }
						         ]
					}, 'modal');
				}
			});
			
		},

		faq: function(){
			core.open({
				obj:'info_ctrl', 
				method: 'faq',
				title:'FAQ',
			});
		},
		
		copyright: function(){
			core.open({
				obj:'info_ctrl', 
				method: 'copyright',
				title:core.tr('info'),
			});
		}
};