/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var myExport= {
		init: function(){
						$.get('./?obj=myExport_ctrl&method=getContent', function(data){
				
				if (data == ''){
					core.message(core.tr('export_dir_empty'), 'error');
					
				} else {
					
					core.open({
						html:data,
						title: core.tr('available_exports'),
						buttons:[
						         {
						        	 text: core.tr('close'),
						        	 click: 'close'
						         }
						         ]
					}, 'modal');
					
					$('#modal .download').click(function(){
						window.open($(this).data('file'));
					});
			
					$('#modal .erase').click(function(){
						var $this = $(this);
						$.get('./?obj=myExport_ctrl&method=erase&file=' + $this.data('file'),function(data){
							core.message(data.text, data.status);
							if (data.status == 'success'){
								$this.parents('tr').remove();
							}
						},
						'json'
						);
					});
				}
			});
		}
};