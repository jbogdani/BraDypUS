/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var sys_mail = {
		init: function(){
			
			core.open({
				title: core.tr('system_email'),
				obj: 'sys_mail_ctrl',
				method: 'showForm',
				buttons:[
				         {
				        	 text: core.tr('send'),
				        	 click: function(){
				        		 var form = $('#modal form');
				        		 sys_mail.send(form);
				        	 }
				         },
				         {
				        	 text: core.tr('close'),
				        	 action: 'close'
				         }
				         ]
			}, 'modal');
		},
		
		send: function(form){
			if(
   				 !form.find(':input[name="to[]"]').is(':checked')
   				 ||
   				 !form.find(':input[name="subject"]').val()
   				 ||
   				 !form.find(':input[name="body"]').val()
   				 ){
   			 core.message(core.tr('recipient_subject_body_required'), 'error');
   		 } else {
   			 core.open({
   				 obj: 'sys_mail_ctrl',
   				 method: 'send',
   				 post: form.serializeArray(),
   				 buttons:[
   				          {
   				        	  text: core.tr('close'),
   				        	  action: 'close'
   				          }
   				          ]
   			 }, 'modal');
   		 }
		}
};