/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var login = {
		init: function(){
			
			switch(arguments[0]){
				case 'autologin':
					login.autologin(arguments[1]);
					break;
					
				case 'loadResetPwd':
					login.loadResetPwd(arguments[1], arguments[2], arguments[3]);
					break;
					
				case 'lost_pwd':
					login.lost_pwd_form();
					break;
					
				case 'new_user_form':
					login.new_user_form();
					break;
			}
		},
		
		loadLogin : function(app){
			if (!app){
				app = hashActions.getHash('app');
			}
			
			$('#wrapper').html(core.loading).load('./?obj=login_ctrl&method=select_app' + (app ? '&app=' + app : ''));
		},
		
		loadCreateApp: () => {
			core.open({
				obj:'new_app_ctrl',
				method: 'new_app_form',
				title: core.tr('app_create'),
				buttons:[
					{
						text: core.tr('close'),
						action: 'close'
					}
					]
			}, 'modal');
		},
		
		autologin: function(app){
			if (!app){
				app = hashActions.getHash('app');
			}
			// try autologin (cookie authentication or application free autologin)
			core.getJSON('login_ctrl', 'autolog', {'app': app}, false, function(data){
				if (data.status == 'success'){
					window.location.reload();
				}
			});
		},
		
		loadResetPwd: function(app, address, token){
			core.open({
				obj: 'login_ctrl',
				method: 'resetPwd',
				param:{
					'app': app, 
					'address': address,
					'token': token
				},
				title: core.tr('reset_password'),
				buttons:[
				         {
				        	 text: core.tr('close'),
				        	 action: 'close'
				         }
				         ]
			}, 'modal');
		},
		
		new_user_form: function(app){
			core.open({
				 obj:'login_ctrl',
				 method: 'newUserForm',
				 param:{'app': app},
				 title:core.tr('register_new_user')
			 }, 'modal');
		},
		
		lost_pwd: function(app){
			core.open({
				html:'<p class="lead">' + core.tr('enter_email_to_get_password') + '</p>'
					+ '<input type="email" class="email form-control" placeholder="' + core.tr('email') + '" />',
				title: core.tr('lost_passsword'),
				buttons:[
				         {
				        	 text: core.tr('send'),
				        	 addclass: 'btn-primary',
				        	 click: function(){
				        		 var email = $('#modal input.email').val();
				        		 if (!email || email ==''){
				        			 core.message(core.tr('all_fields_required'), 'error');
				        		 }else{
				        			 core.getJSON('login_ctrl', 'sendToken', { 'app': app, 'email': email }, false,function(data){
				        				 if (data.status == 'success'){
				        					 $('#modal .modal-body').html('<h3>' + core.tr('forgot_text', ['<u>' + email + '</u>']) + '</h3>');
				        				 } else {
				        					 core.message(data.text, data.status);
				        				 }
				        			 });
				        		 }
				        	 }
				         },
				         {
				        	 text: core.tr('close'),
				        	 action: 'close'
				         }
				         ]
			}, 'modal');
		}
};