/**
 * @author			Julian Bogdani <jbogdani@gmail.com>
 * @copyright		BraDypUS, Julian Bogdani <jbogdani@gmail.com>
 * @license			See file LICENSE distributed with this code
 */

var rs = {
	init: function(){
		$.each($('div.showRS'), function(i, el){
			rs._show($(el));
		});
	},
	_deleteRS: function(id, elToRemove){
		core.getJSON('rs_ctrl', 'deleteRS', { "id": id }, false, function(data){
			core.message(data.text, data.status);
			if (data.status === 'success'){
				elToRemove.remove();
			}
		});
	},

	_addRS: function(tb, first, relation, second, el){
		core.getJSON('rs_ctrl', 'saveNewRS', { "tb": tb, "first": first, "relation": relation, "second": second }, false, function(data){
			core.message(data.text, data.status);

			if (data.status === 'success'){
				el.find('input.second').val('');
				el.find('td.r' + relation).append(
					$('<div />').append(
						second,
						' ',
						$('<span />').attr({
							'data-id': data.id,
							'title': core.tr('erase')
						})
						.addClass('delete_js a')
						.text('[x]')
						.click(function(){
							rs._deleteRS( data.id , $(this).parent('div'));
						})
					)
				);
			}
		});
	},

	_show: function(el){

		if (el.length === 0) {
			return false;
		}

		var tb = el.data('table');
		// ID value is encoded for URL usage, to escape spaces or other special chars
		var id = encodeURI(el.data('id'));
		var context = el.data('context');

		if (!tb || !id || !context){
			return false;
		}

		if ( el.children().length > 0 ) {
			return false;
		}

		if (el.data('pending') === true || el.data('done') === true) {
			return false;
		}

		el.data('pending', true);

		el.load('./?obj=rs_ctrl&method=getAllRS&tb=' + tb + '&id=' + id + '&context=' + context, function(){

			el.data('done', true);
			el.data('pending', false);

			if (context === 'read'){
				el.find('div.rsEl').on('click', function(){
					api.record.read(tb, [$(this).text()], true	);
				});

			}
			//add action
			else if (context === 'edit'){
				el.find('button.save').click(function(){
					var relation = el.find('select.rel').val();
					var second = el.find('input.second').val();

					if (!second){
						core.message(core.tr('rs_all_fields_required'), 'error');
					} else {
						rs._addRS( tb, id, relation, second, el);
					}
				});
			}

			//delete action
			el.find('a.delete').click(function(){
				rs._deleteRS($(this).data('id'), $(this).parent('div'));
			});

		});
	}
};
