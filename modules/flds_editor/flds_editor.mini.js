/*
 * copyright BraDypUS 
 */
var flds_editor={init:function(){core.open({title:core.tr('edit_flds_data'),obj:'flds_editor_ctrl',method:'tb_list'});},loadFldList:function(form_container,tb){form_container.html(core.loading).load('controller.php?obj=flds_editor_ctrl&method=show_list&tb='+tb,function(){$(this).find('button.add_new_fld').click(function(){flds_editor.loadform($(this).data('table'),false,form_container);});$(this).find('.edit_fld').click(function(){flds_editor.loadform($(this).data('table'),$(this).data('field'),form_container);});});},loadform:function(tb,fld,form_container){core.open({title:'Table: '+tb,obj:'flds_editor_ctrl',method:'show_form',param:{'tb':tb,'fld':fld},buttons:[{text:core.tr('save'),click:function(){$('#modal form').submit();}},{text:core.tr('close'),action:'close'}],loaded:function(){$('#modal form').on('submit',function(event){core.getJSON('flds_editor_ctrl','save',false,$(this).serializeArray(),function(data){core.message(data.text,data.status);if(data.status=='success'){flds_editor.loadFldList(form_container,tb);$('#modal').modal('hide');}});event.preventDefault();});var dics=$('#modal').find('tr.tr_vocabulary_set, tr.tr_get_values_from_tb, tr.tr_id_from_tb');var type=$('#modal').find(':input.input_type').val();if($.inArray(type,['select','combo_select','multi_select'])==-1)
{dics.hide();}
$('#modal').find(':input.input_type').change(function(){if($.inArray($(this).val(),['select','combo_select','multi_select'])>-1){dics.show();}else{dics.hide();}});}},'modal');}};