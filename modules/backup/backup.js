/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var backup = {
		init: function(){
			
			core.open({
				obj: 'backup_ctrl',
				method: 'list_all_backups',
				title: core.tr('backup')
			});
		},

		create: function() {
			core.runAndRespond('backup_ctrl', 'doBackup', data => {
				layout.tabs.reloadActive()
			});
		},
		
		erase: function(file, button){
			core.runAndRespond('backup_ctrl', 'deleteBackup', {file: file}, data => {
				layout.tabs.reloadActive()
			});
		},
		restore: function(file, button){
			api.confirmSuperAdmPwd( () => {
				core.runAndRespond('backup_ctrl', 'restoreBackup', {file: file});
			});
		},
		
		download: function(file){
			window.open(file);
		}
};

