/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var free_sql = {
	init: function(){
		free_sql.show_form();
	},
	
	show_form: function(){
		
		core.open({
			obj: 'free_sql_ctrl',
			method: 'input',
			title: 'Run free SQL query',
			loaded: function(){
				api.fileUpload($('#modal .upload'), './?obj=file_ctrl&method=upload', {
					limit2one: true,
					limitExtensions: ['sql', 'gz'],
					complete: function(id, name, resp){
						var status_div = $('#modal .status');
						
						status_div.show();
						status_div.find('.progress').show();
						status_div.find('.bar').width('0%');
						status_div.find('.verbose').html('');
						
						free_sql.restoreSQL(status_div, resp.uploadDir + '' + resp.filename + '.' + resp.ext);
					}
				});
			},
			buttons:[
			         {
			        	 text: 'Run',
			        	 click: function(){
			        		var text = $('#modal textarea').val();
			        		if (!text){
			        			core.message('Query text can not be empty', 'error');
			        			$('#modal textarea').focus();
			        		} else{
			        			core.getJSON('free_sql_ctrl','run',false,{sql:text},function(data){
			        				$('#modal .status').show();
			        				$('#modal .progress').hide();
			        				$('#modal .verbose').html('<p class="text-' + data.status + '">' + data.text + '</p>');
			        			});
			        		}
			        	 }
			         },
			         {
			         	text: 'Close',
			         	click: 'close'
			         }
			         ]
		}, 'modal');
	},
	
	restoreSQL: function(status, filename, start, offset, totalqueries){
		// TODO:brackets
		core.getJSON(
			'free_sql_ctrl',
			'import',
			{
				filename:filename, 
				start:start, 
				offset:offset, 
				totalqueries:totalqueries
			},
			false,
			function(data){
			if(data.status == 'loading'){
				
				status.find('.bar').width(data.percent_done + '%');
				
				status.find('.verbose').html('<p class="text-info">' + percent_done + '%' + core.loading + '</p>');
				
				free_sql.restoreSQL(status, escape(filename), (data.lines_done+1), data.bytes_done, data.queries_done);
			} else if (data.status == 'completed'){
				
				status.find('.bar').width('100%');
				
				status.find('.verbose')
					.html('<p class="text-success">Congrats! Upload finished<br />' + data.queries_done +' queries executed<br />' + data.bytes_done/1024 + ' bytes processed!</p>');
				
			} else if (data.status == 'error'){
				status.find('.verbose')
					.html('<p class="text-error">' + data.text + '</p>');
			}
		});
	}
};